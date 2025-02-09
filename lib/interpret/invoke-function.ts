import { FunctionStatement, UseStatement } from "../parse/expressions";
import { assert, match } from "../utils";
import {
    assertEval,
    Context,
    decrObjectRefCount,
    evaluateExpression,
    evaluateExpressionOptional,
    incrObjectRefCount,
} from "./evaluate-expression";
import { Globals, RuntimeValue, Scope, ValueRef } from "./runtime-value";

export const invokeRootMutFunction = (
    fn: RuntimeValue,
    args: RuntimeValue[],
    globals: Globals,
): void => {
    executeRootMutCallback(globals, (context) => {
        invokeFunction(fn, args, context);
    });
};

export function executeRootMutCallback(
    globals: Globals,
    callback: (context: Context) => void,
) {
    try {
        const context: Context = {
            type: "mut",
            listMappings: new Map(),
            globals,
        };
        callback(context);

        // Refresh all bound functions.
        // TODO: only functions that depend on modified `slot` values should be re-run.
        globals.refreshers.forEach((refresher) => refresher(context));

        // If there is no scheduled code, we're done
        if (
            globals.pendingTimeouts.size === 0 &&
            (globals.boundDomElements.length == 0 ||
                globals.api.disableWaitOnBindings)
        ) {
            globals.terminateProgram();
        }
    } catch (error) {
        // Stop execution of any further code.
        globals.terminateProgram(error);
        return;
    }
}

const CANNOT_CALL_MUT = "cannot call a mutative function from a pure function";

/**
 * Returns `null` if the function did not return a value.
 */
export const invokeFunction = (
    fn: RuntimeValue,
    args: RuntimeValue[],
    context: Context,
): RuntimeValue | null => {
    assert(typeof fn === "object" && fn !== null, "require object");
    if (fn.type === "builtin_function") {
        assert(!(fn.isMut && context.type !== "mut"), CANNOT_CALL_MUT);
        return fn.invoke(args, context);
    }

    assert(fn.type === "function", "cannot invoke non-function");

    if (fn.definition.isMut) {
        assert(context.type === "mut", CANNOT_CALL_MUT);
    }

    if (
        context.type === "reactive" &&
        (context.slotContext.value === null ||
            context.slotContext.value.type !== "function")
    ) {
        context.slotContext.value = {
            type: "function",
            slots: new Map(),
            subContexts: new Map(),
        };
    }

    const { statements } = fn.definition;
    let scope: Scope = { names: {}, parent: fn.scope };

    const { parameters } = fn.definition;
    assert(args.length >= parameters.length, "function call argument mismatch");
    for (let i = 0; i < parameters.length; ++i) {
        scope.names[parameters[i]] = { type: "let", value: args[i] };
    }

    let lastValue: RuntimeValue | null = null;
    for (const statement of statements) {
        lastValue = evaluateStatement(statement, scope, context);
    }
    for (const name of Object.keys(scope.names)) {
        const item = scope.names[name];
        if (item.type === "let") {
            decrObjectRefCount(item.value);
        }
    }
    return lastValue;
};

export function evaluateStatement(
    st: FunctionStatement,
    scope: Scope,
    context: Context,
): RuntimeValue | null {
    return match(st, "type", {
        expression: (st) => {
            const result = evaluateExpressionOptional(st.value, scope, context);
            return result !== null ? result.value : null;
        },

        variable_def: (st) => {
            if (st.name in scope.names)
                throw new Error(`duplicate definition for: ${st.name}`);

            function getInitialValue() {
                return incrObjectRefCount(
                    evaluateExpression(st.initialValue, scope, context).value,
                );
            }

            scope.names[st.name] = ((): ValueRef => {
                if (st.mode === "slot" && context.type === "reactive") {
                    // When a function is run for the second time or more we attempt to restore
                    // the value of the slot to the value it had at the end of the previous run.
                    assert(
                        context.slotContext.value?.type === "function",
                        "required slot context",
                    );
                    let ref = context.slotContext.value.slots.get(st);
                    if (ref === undefined) {
                        ref = { value: getInitialValue() };
                        context.slotContext.value.slots.set(st, ref);
                    }

                    return { type: "slot", ref };
                }

                // Otherwise evaluate the initial value.
                return { type: "let", value: getInitialValue() };
            })();

            return null;
        },

        use: (st) => {
            evalUseStatement(st, scope, context.globals);
            return null;
        },
    });
}

export function evalUseStatement(
    def: UseStatement,
    scope: Scope,
    globals: Globals,
) {
    assertEval(
        // Only module supported today, but of course we'd need to browse the
        // local directory, support external packages, etc. TBD.
        def.name.value === "std",
        def.name,
        "unknown module: " + def.name.value,
    );
    scope.names[def.name.value] = {
        // Prevents modifications of the module. This means `std` will always
        // mean the same thing when you read it in the code.
        type: "literal",
        value: {
            // Rather than re-creating the module object, it should probably be
            // shared between all modules that use it. We can still have
            // refCount be 1 always since this is considered a literal. One can
            // still make a copy of it and modify it, which which trigger
            // copy-on-write.
            refCount: 1,
            type: "object",
            // FIXME: `std` should be static fields instead of fields.
            struct: { type: "struct", staticFields: {} },
            fields: globals.std,
        },
    };
}
