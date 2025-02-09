import { Expression, FunctionStatement } from "../parse/expressions";
import { Range } from "../parse/tokens";
import { assert, match } from "../utils";
import { evaluateStatement, invokeFunction } from "./invoke-function";
import {
    Globals,
    Reference,
    resolveName,
    RuntimeValue,
    Scope,
} from "./runtime-value";
import { inspect, structOf } from "./std";
import { isObject } from "./utils";

export type Context = (
    | {
          // We can mutate slots and variables in this context. Once execution
          // is complete, bound pure functions will be re-evaluated and for ex.
          // UI will be updated.
          type: "mut";

          listMappings: ListMappingsMap;
      }
    | {
          // We cannot mutate slots, but we can mutate local variables.
          type: "pure";
      }
    | {
          // Reactive implies it's pure, and additionally we keep track of slots.
          type: "reactive";
          /**
           * If `null`, there was no prior instantiation of that context. This
           * is meant to be mutated by the invoked function with the new
           * slot context, in that case.
           */
          slotContext: SlotContextBox;
          listMappings: ListMappingsMap;
      }
) & {
    globals: Globals;
};

export type SlotContextBox = { value: SlotContext | null };
export type SlotContext =
    | {
          type: "function";
          /**
           * Keep track of the values for each slot in the current function. For
           * example, if we encounter statement `slot text = ""` we will first look
           * for the expression object in this map, and if it's not found, we will
           * create a new slot with the initialization value (here, an empty string).
           */
          slots: Map<object, { value: RuntimeValue }>;
          /**
           * Maps function call expressions to the slots they depend on, and their own
           * function calls map to, in turn. For example if we encounter function call
           * `renderTask(task)` we will look for the inner slot of that function call
           * instance.
           */
          subContexts: Map<object, SlotContextBox>;
      }
    | {
          type: "list";
          subContexts: SlotContextBox[];
      };

export type FunctionSlotContext = SlotContext & { type: "function" };

export type ListMappingsMap = Map<
    RuntimeValue & { type: "list" },
    ListMappings
>;

export type ListMappings = readonly ListMapping[];
export type ListMapping = Readonly<{
    startIndex: number;
    endIndex: number;
    originalIndex: number;
}>;

type ExpressionEvalResult = {
    /**
     * The plain value of the expression.
     */
    value: RuntimeValue;
    /**
     * The reference to the value, if it can be mutated.
     */
    reference?: Reference;
};

export function evaluateExpression(
    exp: Expression,
    scope: Scope,
    context: Context,
): ExpressionEvalResult {
    const result = evaluateExpressionOptional(exp, scope, context);
    assertEval(
        result.value != null,
        exp,
        "this expression does not have a value and can't be used in this position",
    );
    // We checked that `value` is not undefined above.
    return result as ExpressionEvalResult;
}

type OptionalExpEvalResult = {
    value: RuntimeValue | null;
    reference?: Reference;
};

export function evaluateExpressionOptional(
    exp: Expression,
    scope: Scope,
    context: Context,
): OptionalExpEvalResult {
    return match(exp, "type", {
        string: (exp) => {
            const values = exp.expressions.map(
                (subExp) => evaluateExpression(subExp, scope, context).value,
            );
            return { value: calculateStringTemplate(exp.parts, values) };
        },

        integer: (exp) => {
            return { value: exp.value };
        },

        unary_operation: (exp) => {
            const preIncrement = (inc: number) => () => {
                const target = evaluateExpression(exp.target, scope, context);

                // TODO: these checks should be done in the static analysis.
                assertEval(
                    target.reference !== undefined,
                    exp.target,
                    "cannot increment a literal value",
                );
                assert(
                    typeof target.value === "number",
                    "can only increment integers",
                );

                const newValue = target.value + inc;
                setRefValue(target.reference, newValue, context);
                return { value: newValue, reference: target.reference };
            };

            return match(exp, "operation", {
                "++": preIncrement(1),
                "--": preIncrement(-1),
                "-": () => {
                    const target = evaluateExpressionOptional(
                        exp.target,
                        scope,
                        context,
                    );
                    assertEval(
                        typeof target.value === "number",
                        exp.target,
                        "can only negate numbers",
                    );
                    return { value: -target.value };
                },
                "!": () => {
                    const target = evaluateExpressionOptional(
                        exp.target,
                        scope,
                        context,
                    );
                    assertEval(
                        typeof target.value === "boolean",
                        exp.target,
                        "! operator can only be applied to booleans",
                    );
                    return { value: !target.value };
                },
                "&": () => {
                    const target = evaluateExpressionOptional(
                        exp.target,
                        scope,
                        context,
                    );
                    assertEval(
                        target.reference !== undefined,
                        exp.target,
                        "cannot get the reference of a literal value",
                    );
                    return {
                        value: { type: "reference", target: target.reference },
                    };
                },
                "^": (exp) => {
                    const target = evaluateExpression(
                        exp.target,
                        scope,
                        context,
                    );
                    assertEval(
                        isObject(target.value) &&
                            target.value.type === "reference",
                        exp.target,
                        "can only dereference a reference",
                    );
                    const innerRef = target.value.target;
                    return {
                        // TODO: should lazy-evaluate the reference. We should
                        // not fill the value and instead have a `getValue(res: ExpressionEvalResult)`
                        // function that we call when we need the value.
                        value: getRefValue(innerRef),
                        reference: innerRef,
                    };
                },
            });
        },

        function: (exp) => {
            return {
                value: {
                    type: "function",
                    definition: exp,
                    scope,
                },
            };
        },

        if: (exp) => {
            const condition = evaluateExpression(exp.condition, scope, context);
            assertEval(
                typeof condition.value === "boolean",
                exp.condition,
                "condition must be a boolean",
            );
            if (condition.value) {
                return evaluateBlock(exp.thenBranch, scope, context);
            }
            if (exp.elseBranch) {
                return evaluateBlock(exp.elseBranch, scope, context);
            }
            return { value: null };
        },

        identifier: (exp) => {
            let resolved = resolveName(scope, exp.name);
            assertEval(
                resolved !== undefined,
                exp,
                `Unknown identifier "${exp.name}".`,
            );

            return {
                value:
                    resolved.type === "slot"
                        ? resolved.ref.value
                        : resolved.value,
                reference:
                    resolved.type === "slot" || resolved.type === "let"
                        ? resolved
                        : undefined,
            } as ExpressionEvalResult;
        },

        member_access: (exp): ExpressionEvalResult => {
            let target = evaluateExpression(exp.target, scope, context);
            const name = exp.name.value;

            assertEval(
                isObject(target.value),
                exp.target,
                `cannot access field on non-object`,
            );
            if (target.value.type === "struct") {
                const val = target.value.staticFields[name];
                assertEval(
                    val !== undefined,
                    exp.name,
                    `cannot find object member`,
                );
                return { value: val };
            }

            let struct = structOf(target.value, context);
            if (struct && struct.staticFields[name] !== undefined) {
                const fn = struct.staticFields[name];
                assertEval(
                    typeof fn === "object" &&
                        fn !== null &&
                        (fn.type === "builtin_function" ||
                            fn.type === "function"),
                    exp.name,
                    "only functions can be accessed with short-hand notation",
                );

                const isMut =
                    fn.type === "builtin_function"
                        ? fn.isMut
                        : fn.definition.isMut;

                const { reference } = target;
                assertEval(
                    !isMut || reference !== undefined,
                    exp.target,
                    "short-hand notation with mut function requires reference",
                );

                // Construct a new function which binds the target as the first argument.
                return {
                    value: {
                        type: "builtin_function",
                        invoke: (args, context) =>
                            invokeFunction(
                                fn,
                                // FIXME: we should actually pass the ref in the case of
                                // `foo.push()` for example.
                                [
                                    isMut
                                        ? {
                                              type: "reference",
                                              target: reference!,
                                          }
                                        : target.value,
                                    ...args,
                                ],
                                context,
                            ),
                        isMut,
                    },
                };
            }

            assertEval(
                target.value.type === "object",
                exp.target,
                `cannot access field on non-object`,
            );

            const val = target.value.fields[name];
            assertEval(
                val !== undefined,
                exp.name,
                `cannot find object member`,
            );
            return {
                value: val,
                reference: target.reference && {
                    type: "memberAccess",
                    target: target.reference,
                    name,
                },
            };
        },

        index_access: (exp): OptionalExpEvalResult => {
            let target = evaluateExpression(exp.target, scope, context);
            let index = evaluateExpression(exp.index, scope, context);

            assertEval(
                isObject(target.value) &&
                    (target.value.type === "list" ||
                        target.value.type === "dict"),
                exp.target,
                `only lists and dicts can be indexed`,
            );

            if (target.value.type === "list") {
                assert(
                    typeof index.value === "number",
                    "list index must be a number",
                );
                const value = target.value.values[index.value];
                assertEval(
                    value !== undefined,
                    exp.index,
                    `index out of bounds`,
                );

                return {
                    value,
                    reference: target.reference && {
                        type: "indexAccess",
                        target: target.reference,
                        index: index.value,
                    },
                };
            }

            const key = getValueUniqueKey(index.value);
            const value = target.value.values.get(key);

            return {
                // We allow `value` to be `undefined` in which case we return a
                // reference to the key in the dict that can be set later on.
                value: value ? value[1] : null,
                reference: target.reference && {
                    type: "keyAccess",
                    target: target.reference,
                    keyValue: index.value,
                    uniqueKey: key,
                },
            };
        },

        function_call: (exp) => {
            const target = evaluateExpression(exp.target, scope, context);
            const args = exp.arguments.map(
                (arg) => evaluateExpression(arg, scope, context).value,
            );
            const innerContext: Context = (() => {
                if (context.type !== "reactive") return context;

                assert(
                    context.slotContext.value !== null &&
                        context.slotContext.value.type === "function",
                    "reactive context must have a slot context",
                );

                const subContexts = context.slotContext.value.subContexts;
                let innerSlotContext = subContexts.get(exp) ?? null;
                if (innerSlotContext === null) {
                    innerSlotContext = { value: null };
                    subContexts.set(exp, innerSlotContext);
                }
                return {
                    type: "reactive",
                    globals: context.globals,
                    listMappings: context.listMappings,
                    slotContext: innerSlotContext,
                };
            })();

            const value = invokeFunction(target.value, args, innerContext);
            return { value };
        },

        html_element: (exp) => {
            const children = exp.children.map((child): RuntimeValue => {
                if (typeof child === "string") {
                    return child;
                }
                return evaluateExpression(child, scope, context).value;
            });

            const attributes = new Map<string, [RuntimeValue, RuntimeValue]>();
            for (const attribute of exp.attributes) {
                attributes.set(getValueUniqueKey(attribute.name), [
                    attribute.name,
                    evaluateExpression(attribute.value, scope, context).value,
                ] as const);
            }

            const value = {
                type: "object",
                struct: context.globals.std.Element,
                refCount: 0,
                fields: {
                    tagName: exp.tagName,
                    attributes: {
                        type: "dict",
                        refCount: 1,
                        values: attributes,
                    },
                    children: { type: "list", refCount: 1, values: children },
                },
            } as RuntimeValue;
            return { value };
        },

        binary_operation: (exp) => {
            const makeOp =
                (op: (a: RuntimeValue, b: RuntimeValue) => RuntimeValue) =>
                () => {
                    const left = evaluateExpression(exp.left, scope, context);
                    const right = evaluateExpression(exp.right, scope, context);
                    return { value: op(left.value, right.value) };
                };

            const makeMathOp =
                (op: (a: number, b: number) => RuntimeValue) => () => {
                    const left = evaluateExpression(exp.left, scope, context);
                    const right = evaluateExpression(exp.right, scope, context);
                    assertEval(
                        typeof left.value === "number" &&
                            typeof right.value === "number",
                        exp,
                        "can only operate on numbers",
                    );
                    return { value: op(left.value, right.value) };
                };

            const makeBoolOp =
                (op: (a: boolean, b: boolean) => RuntimeValue) => () => {
                    const left = evaluateExpression(exp.left, scope, context);
                    const right = evaluateExpression(exp.right, scope, context);
                    assertEval(
                        typeof left.value === "boolean" &&
                            typeof right.value === "boolean",
                        exp,
                        "can only compare or combine booleans",
                    );
                    return { value: op(left.value, right.value) };
                };

            return match(exp, "operator", {
                "=": (exp) => {
                    const target = evaluateExpressionOptional(
                        exp.left,
                        scope,
                        context,
                    );
                    const value = evaluateExpression(exp.right, scope, context);
                    assertEval(
                        target.reference !== undefined,
                        exp.left,
                        `Cannot assign a value to a literal expression.`,
                    );
                    setRefValue(target.reference, value.value, context);

                    return value;
                },

                "+": makeMathOp((a, b) => a + b),
                "-": makeMathOp((a, b) => a - b),
                "*": makeMathOp((a, b) => a * b),
                "/": makeMathOp((a, b) => a / b),
                "<=": makeMathOp((a, b) => a <= b),
                ">=": makeMathOp((a, b) => a >= b),
                ">": makeMathOp((a, b) => a > b),
                "<": makeMathOp((a, b) => a < b),
                "==": makeOp((a, b) => areEqual(a, b)),
                "!=": makeOp((a, b) => !areEqual(a, b)),
                "&&": makeBoolOp((a, b) => a && b),
                "||": makeBoolOp((a, b) => a || b),
            });
        },

        object: (exp) => {
            const fields: { [key: string]: RuntimeValue } = {};
            for (const field of exp.fields) {
                const value = evaluateExpression(field.value, scope, context);
                fields[field.name] = incrObjectRefCount(value.value);
            }
            return {
                value: {
                    type: "object",
                    fields,
                    // Literals have no reference until assigned to ex. a variable or object field.
                    refCount: 0,
                },
            };
        },

        list: (exp) => {
            const values = exp.items.map((item) =>
                incrObjectRefCount(
                    evaluateExpression(item, scope, context).value,
                ),
            );
            return { value: { type: "list", values, refCount: 0 } };
        },

        dict: (exp) => {
            const values = new Map<string, [RuntimeValue, RuntimeValue]>();
            for (const item of exp.items) {
                const key = evaluateExpression(item.key, scope, context);
                const value = evaluateExpression(item.value, scope, context);
                const uniqueKey = getValueUniqueKey(key.value);
                values.set(uniqueKey, [
                    incrObjectRefCount(key.value),
                    incrObjectRefCount(value.value),
                ]);
            }

            return {
                value: {
                    type: "dict",
                    values,
                    refCount: 0,
                },
            };
        },

        struct: (exp) => {
            return {
                value: {
                    type: "struct",
                    staticFields: {},
                },
            };
        },

        boolean: (exp) => {
            return { value: exp.value };
        },
    });
}

export function incrObjectRefCount(obj: RuntimeValue): RuntimeValue {
    if (isObject(obj) && "refCount" in obj) {
        ++obj.refCount;
    }
    return obj;
}

export function decrObjectRefCount(obj: RuntimeValue): RuntimeValue {
    if (isObject(obj) && "refCount" in obj) {
        --obj.refCount;
    }
    return obj;
}

/**
 * Given a reference (ex. a variable or object field), set its value.
 */
export function setRefValue(
    ref: Reference,
    value: RuntimeValue,
    context: Context,
) {
    match(ref, "type", {
        let: (ref) => {
            ref.value = value;
        },
        slot: (ref) => {
            assertMutContext(ref, context);
            ref.ref.value = value;
        },
        memberAccess: (ref) => {
            const obj = resolveRef({
                ref: ref.target,
                transform: makeObjectUnique,
                context,
            });
            assert(
                isObject(obj) && obj.type === "object",
                "cannot access field on non-object",
            );
            obj.fields[ref.name] = value;
        },
        indexAccess: (ref) => {
            const obj = resolveRef({
                ref: ref.target,
                transform: makeObjectUnique,
                context,
            });
            assert(
                isObject(obj) && obj.type === "list",
                "cannot index on non-list",
            );
            assert(ref.index < obj.values.length, "index out of bounds");
            obj.values[ref.index] = value;
        },
        keyAccess: (ref) => {
            const obj = resolveRef({
                ref: ref.target,
                transform: makeObjectUnique,
                context,
            });
            assert(
                isObject(obj) && obj.type === "dict",
                "cannot index on non-dict",
            );
            obj.values.set(`${ref.uniqueKey}`, [ref.keyValue, value]);
        },
    });
}

function noop(v: RuntimeValue) {
    return v;
}

/**
 * Given a shared object, make a shallow unique copy.
 */
function makeObjectUnique(obj: RuntimeValue): RuntimeValue {
    if (!isObject(obj) || !("refCount" in obj) || obj.refCount <= 1) {
        return obj;
    }

    // Copy the object.
    obj.refCount--;
    return match(obj, "type", {
        object: (obj) => {
            const newObj = { ...obj, refCount: 1, fields: { ...obj.fields } };
            for (const key of Object.keys(newObj.fields)) {
                incrObjectRefCount(newObj.fields[key]);
            }
            return newObj;
        },
        list: (obj) => {
            // FIXME: we should also copy over the list mappings, otherwise
            // they are lost. We need to clone the mappings as the list might
            // get furhter mutated down the line.
            const newObj = {
                ...obj,
                refCount: 1,
                values: obj.values.map((val) => incrObjectRefCount(val)),
            };
            return newObj;
        },
        dict: (obj) => {
            const newObj = { ...obj, refCount: 1, values: new Map(obj.values) };
            for (const value of newObj.values.values()) {
                incrObjectRefCount(value[0]);
                incrObjectRefCount(value[1]);
            }
            return newObj;
        },
    });
}

function assertMutContext(ref: Reference, context: Context | null) {
    if (context === null) return;
    // FIXME: at that stage we don't know the location of the error (Range).
    // Reference shouldn't have a range because it can be dereferenced in
    // multiple places. Instead, we should have a stack trace mechanism for this
    // type of errors. (Of course, this kind of errors will be tracked at
    // compile-time eventually, not runtime).
    assert(
        context.type === "mut",
        "A slot can only be mutated in a mut context",
    );
}

function resolveRef({
    ref,
    transform,
    context,
}: {
    ref: Reference;
    transform: (v: RuntimeValue) => RuntimeValue;
    /**
     * If provided, ensure the context allows mutation of the reference.
     */
    context: Context | null;
}): RuntimeValue {
    function resolveImpl(ref: Reference): RuntimeValue {
        return match(ref, "type", {
            slot: (ref) => {
                assertMutContext(ref, context);
                ref.ref.value = transform(ref.ref.value);
                return ref.ref.value;
            },
            let: (ref) => {
                ref.value = transform(ref.value);
                return ref.value;
            },
            memberAccess: (ref): RuntimeValue => {
                const obj = resolveImpl(ref.target);
                assert(
                    isObject(obj) && obj.type === "object",
                    `cannot access field ${ref.name} on non-object value`,
                );

                return (obj.fields[ref.name] = transform(obj.fields[ref.name]));
            },
            indexAccess: (ref): RuntimeValue => {
                const obj = resolveImpl(ref.target);
                assert(
                    isObject(obj) && obj.type === "list",
                    `cannot index on non-list value`,
                );
                assert(ref.index < obj.values.length, "index out of bounds");

                return (obj.values[ref.index] = transform(
                    obj.values[ref.index],
                ));
            },
            keyAccess: (ref): RuntimeValue => {
                const obj = resolveImpl(ref.target);
                assert(
                    isObject(obj) && obj.type === "dict",
                    `cannot index on non-dict value`,
                );

                const value = obj.values.get(ref.uniqueKey);
                assert(
                    value !== undefined,
                    `Key ${inspect(ref.keyValue, 0)} not found in dict.`,
                );

                const newVal = transform(value[1]);
                if (newVal === value[1]) {
                    return newVal;
                }
                obj.values.set(ref.uniqueKey, [ref.keyValue, newVal]);
                return newVal;
            },
        });
    }
    return resolveImpl(ref);
}

let nextUniqueId = 0;
const uniqueObjKeys = new WeakMap<object, string>();

function getOpaqueUniqueKey(obj: object): string {
    let key = uniqueObjKeys.get(obj);
    if (key) return key;

    key = `@${++nextUniqueId}`;
    uniqueObjKeys.set(obj, key);
    return key;
}

/**
 * Get a unique key for runtime values such that they can be used as keys in
 * dictionaries. It's fairly inneficient for now, and should be revised later,
 * perhaps caching the keys in the objects themselves.
 */
function getValueUniqueKey(value: RuntimeValue): string {
    if (typeof value === "string") {
        return JSON.stringify(value);
    }
    if (typeof value === "number") {
        return `${value}`;
    }
    if (typeof value === "boolean") {
        return value ? "true" : "false";
    }
    return match(value, "type", {
        builtin_function: (fn) => getOpaqueUniqueKey(fn),
        function: (fn) => getOpaqueUniqueKey(fn),
        struct: (obj) => getOpaqueUniqueKey(obj),
        object: (obj) =>
            `[${obj.struct ? getOpaqueUniqueKey(obj.struct) : "gen"},${Object.entries(
                obj.fields,
            )
                .map(([name, value]) => `${name}:${getValueUniqueKey(value)}`)
                .join(",")}]`,
        list: (list) => `[${list.values.map(getValueUniqueKey).join(",")}]`,
        dict: (dict) =>
            `[${[...dict.values.entries()].map(([k, v]) => `${k}:${getValueUniqueKey(v[1])}`).join(",")}]`,
        reference: () => {
            throw new Error("cannot use reference as dict key");
        },
    });
}

export const getRefValue = (ref: Reference) =>
    resolveRef({ ref, transform: noop, context: null });
export const getUniqueRefValue = (ref: Reference, context: Context) =>
    resolveRef({ ref, transform: makeObjectUnique, context });

export const calculateStringTemplate = (
    parts: string[],
    values: RuntimeValue[],
): RuntimeValue => {
    let str = parts[0];

    for (let i = 0; i < values.length; ++i) {
        const value = values[i];

        assert(
            typeof value === "string" || typeof value === "number",
            "can only embed strings/numbers as string template parameters",
        );

        str += `${value}`;
        str += parts[i + 1];
    }

    return str;
};

export class EvaluationError extends Error {
    constructor(
        public range: Range,
        message: string,
    ) {
        super(message);
    }
}

export function assertEval(
    cond: boolean,
    range: Range,
    message: string,
): asserts cond {
    if (!cond) throw new EvaluationError(range, message);
}

function evaluateBlock(
    statements: FunctionStatement[],
    scope: Scope,
    context: Context,
): OptionalExpEvalResult {
    let result: OptionalExpEvalResult = { value: null };
    for (const statement of statements) {
        const value = evaluateStatement(statement, scope, context);
        result = { value };
    }
    return result;
}

/**
 * Check if two runtime values are equal with value semantics.
 */
function areEqual(left: RuntimeValue, right: RuntimeValue): RuntimeValue {
    if (left === right) return true;
    if (!isObject(left) || !isObject(right)) return false;

    if (left.type === "object") {
        if (right.type !== "object") return false;
        if (left.struct !== right.struct) return false;
        const leftKeys = Object.keys(left.fields);
        const rightKeys = Object.keys(right.fields);
        if (leftKeys.length !== rightKeys.length) return false;
        for (const key of leftKeys) {
            if (!areEqual(left.fields[key], right.fields[key])) return false;
        }
        return true;
    }

    if (left.type === "list") {
        if (right.type !== "list") return false;
        if (left.values.length !== right.values.length) return false;
        for (let i = 0; i < left.values.length; ++i) {
            if (!areEqual(left.values[i], right.values[i])) return false;
        }
        return true;
    }

    if (left.type === "dict") {
        if (right.type !== "dict") return false;
        if (left.values.size !== right.values.size) return false;
        for (const [key, value] of left.values.entries()) {
            const rightVal = right.values.get(key);
            if (rightVal === undefined) return false;
            if (!areEqual(value[1], rightVal[1])) return false;
        }
        return true;
    }
    return false;
}
