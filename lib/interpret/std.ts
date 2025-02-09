import chalk, { Chalk } from "chalk";
import { assert, FormatOptions, match } from "../utils";
import {
    Context,
    getRefValue,
    getUniqueRefValue,
    ListMapping,
    ListMappings as ListMappings,
    ListMappingsMap,
    SlotContext,
    SlotContextBox,
} from "./evaluate-expression";
import { invokeFunction, invokeRootMutFunction } from "./invoke-function";
import { RenderedTree, updateDom } from "./render-dom";
import { RuntimeValue } from "./runtime-value";
import { isObject } from "./utils";

function mutFn(
    invoke: (
        args: RuntimeValue[],
        context: Context & { type: "mut" },
    ) => RuntimeValue | null,
): RuntimeValue {
    return {
        isMut: true,
        type: "builtin_function",
        invoke(args, context) {
            assert(context.type === "mut", "not a mut context");
            return invoke(args, context);
        },
    };
}

function pureFn(
    invoke: (args: RuntimeValue[], context: Context) => RuntimeValue,
): RuntimeValue {
    return { isMut: false, type: "builtin_function", invoke };
}

export function getStdModule() {
    let nowTimer: NodeJS.Timeout | null = null;
    const EMPTY_MAP = new Map();

    return {
        Element: {
            type: "struct",
            staticFields: {},
        },
        Event: {
            type: "struct",
            staticFields: {},
        },
        List: {
            // FIXME: user should not be able to construct lists as `std.List {}` directly
            type: "struct",
            staticFields: {
                push: mutFn((args, context) => {
                    const [listRef, value] = args;
                    assert(
                        isObject(listRef) && listRef.type === "reference",
                        "list must be an object reference",
                    );

                    const list = getUniqueRefValue(listRef.target, context);
                    assert(
                        isObject(list) && list.type === "list",
                        "not a list",
                    );

                    updateListMutations(context, list, (x) => x);
                    list.values.push(value);
                    return null;
                }),

                splice: mutFn((args, context) => {
                    const [listRef, cutIndex, cutCount] = args;
                    assert(
                        isObject(listRef) && listRef.type === "reference",
                        "list must be an object reference",
                    );

                    const list = getUniqueRefValue(listRef.target, context);
                    assert(
                        isObject(list) && list.type === "list",
                        "not a list",
                    );
                    assert(
                        typeof cutIndex === "number",
                        "index must be an integer",
                    );
                    assert(
                        typeof cutCount === "number",
                        "count must be an integer",
                    );

                    updateListMutations(context, list, (ranges) =>
                        splitListMappings(ranges, cutIndex, cutCount),
                    );
                    list.values.splice(cutIndex, cutCount);
                    return null;
                }),

                map: pureFn((args, context) => {
                    const [list, callback] = args;
                    assert(
                        typeof list === "object" &&
                            list !== null &&
                            list.type === "list",
                        "list must be an object",
                    );

                    // FIXME: make completely separate path for reactive context
                    let listContext: (SlotContext & { type: "list" }) | null =
                        null;
                    if (context.type === "reactive") {
                        if (
                            context.slotContext.value !== null &&
                            context.slotContext.value.type === "list"
                        ) {
                            // Restore the previous list context.
                            listContext = context.slotContext.value;
                        } else {
                            // We have never seen this list being mapped here
                            // before: initialize a new list context.
                            listContext = { type: "list", subContexts: [] };
                            context.slotContext.value = listContext;
                        }

                        // The list may have changed since last time we've seen
                        // it. For example if there is a new element we need to
                        // insert it.
                        const mappings = context.listMappings.get(list) ?? [
                            {
                                startIndex: 0,
                                // If mapping is missing, we assume list was not
                                // changed, map all items 1:1.
                                endIndex: listContext.subContexts.length,
                                originalIndex: 0,
                            },
                        ];

                        const newContexts: SlotContextBox[] = [];
                        let lastIndex = 0;
                        for (const range of mappings) {
                            while (range.startIndex > lastIndex) {
                                // There are elements before the current range
                                newContexts.push({ value: null });
                                ++lastIndex;
                            }

                            let i = 0;
                            while (lastIndex < range.endIndex) {
                                // Elements in the current range
                                newContexts.push(
                                    listContext.subContexts[
                                        range.originalIndex + i
                                    ],
                                );
                                ++lastIndex;
                                ++i;
                            }
                        }

                        while (lastIndex < list.values.length) {
                            newContexts.push({ value: null });
                            ++lastIndex;
                        }

                        // At this point, newContext length should be equal to
                        // the length of the new list.
                        listContext.subContexts = newContexts;
                    }

                    // TOOD: if refCount is zero, we could modify the list in place
                    const newValues = list.values.map((value, index) => {
                        const innerContext: Context = (() => {
                            if (context.type !== "reactive") return context;
                            assert(
                                listContext !== null,
                                "list context missing",
                            );

                            return {
                                type: "reactive",
                                globals: context.globals,
                                listMappings: context.listMappings,
                                slotContext: listContext.subContexts[index],
                            };
                        })();

                        const newValue = invokeFunction(
                            callback,
                            [value, index],
                            innerContext,
                        );
                        assert(newValue !== null, "did not return a value");
                        return newValue;
                    });
                    const newList = {
                        type: "list",
                        values: newValues,
                        refCount: 0,
                    } as const satisfies RuntimeValue;

                    // FIXME: remove this ugly check, use better mechanism
                    if ("listMappings" in context) {
                        // When mapping, the mutations of the new list are the same.
                        const muts = context.listMappings.get(list);
                        // If undefined, there was no mutations of this one list. (We still need
                        // to map because the mapper function may use other scope variables.)
                        if (muts) {
                            context.listMappings.set(newList, muts);
                        }
                    }

                    return newList;
                }),

                size: pureFn((args) => {
                    const list = args[0];
                    assert(
                        typeof list === "object" &&
                            list !== null &&
                            list.type === "list",
                        "list must be an object",
                    );
                    return list.values.length;
                }),
            },
        },

        now: pureFn((args, context) => {
            const { globals } = context;
            if (nowTimer === null) {
                nowTimer = setInterval(() => {
                    if (globals.refreshers.length === 0) {
                        clearInterval(nowTimer!);
                        nowTimer = null;
                    }
                    globals.refreshers.forEach((refresher) =>
                        refresher({
                            type: "mut",
                            listMappings: EMPTY_MAP,
                            globals,
                        }),
                    );
                }, 1);
            }
            return Date.now();
        }),

        print: mutFn((args, context) => {
            const value = args[0];
            assert(typeof value === "string", "can only print strings");
            context.globals.api.print(value);

            return null;
        }),

        inspect: pureFn((args, context) => {
            const value = args[0];
            return inspect(value, 0);
        }),

        structOf: pureFn((args, context) => {
            const value = args[0];
            assert(isObject(value), "value must be an object");
            const struct = structOf(value, context);
            assert(struct !== null, "value is not a struct");
            return struct;
        }),

        schedule: mutFn((args, context) => {
            const { globals } = context;

            const delay = args[0];
            const callback = args[1];
            assert(typeof delay === "number", "delay must be an integer");
            assert(
                typeof callback === "object" &&
                    callback !== null &&
                    callback.type === "function",
                "callback must be a function",
            );

            // FIXME: Use `requestAnimationFrame`, come on!
            const timeout = setTimeout(() => {
                globals.pendingTimeouts.delete(timeout);
                invokeRootMutFunction(callback, [], globals);
            }, delay);

            globals.pendingTimeouts.add(timeout);

            // TODO: return a function to cancel the timeout
            return null;
        }),

        bindTTY: mutFn((args, context) => {
            const { globals } = context;

            const renderer = args[0];
            const slotContext: SlotContextBox = { value: null };

            function refresh(context: Context & { type: "mut" }) {
                const newText = invokeFunction(renderer, [], {
                    type: "reactive",
                    slotContext,
                    listMappings: context.listMappings,
                    globals: context.globals,
                });
                assert(
                    typeof newText === "string",
                    "return needs to be string",
                );
                globals.api.print(newText);
            }

            // refresher will be invoked when the currently running mut function completes, so no need
            // do run it right away.
            globals.refreshers.push(refresh);

            // TODO: should return a function to cancel the binding
            return null;
        }),

        bindNode: mutFn((args, context) => {
            const { globals } = context;

            const renderer = args[0];
            const slotContext: SlotContextBox = { value: null };

            const rootNode = globals.api.document.getElementById(
                "temporary_target_render_zone",
            )!;
            assert(
                rootNode.children.length === 0,
                "bound root node must have no children",
            );
            globals.boundDomElements.push(rootNode);
            let renderedTree: RenderedTree | null = null;

            globals.refreshers.push((context) => {
                // TODO: unify/deduplicate with bindTTY
                const rootEl = invokeFunction(renderer, [], {
                    type: "reactive",
                    slotContext,
                    listMappings: context.listMappings,
                    globals,
                });
                assert(rootEl !== null, "function must return a value");
                ({ renderedTree } = updateDom({
                    globals,
                    parentNode: rootNode,
                    precedingNode: null,
                    value: rootEl,
                    prevRender: renderedTree,
                    listMappings: context.listMappings,
                }));
            });

            // TODO: should return a function to cancel the binding
            return null;
        }),
    } satisfies Record<string, RuntimeValue>;
}

function updateListMutations(
    context: Context & { listMappings: ListMappingsMap },
    list: RuntimeValue & object & { type: "list" },
    transform: (mut: ListMappings) => ListMappings,
) {
    let muts = context.listMappings.get(list);
    if (!muts) {
        muts = [
            { startIndex: 0, endIndex: list.values.length, originalIndex: 0 },
        ];
    }
    context.listMappings.set(list, transform(muts));
}

export function splitListMappings(
    ranges: ListMappings,
    cutIndex: number,
    cutCount: number,
) {
    const newMuts: ListMapping[] = [];

    for (const range of ranges) {
        if (cutIndex >= range.endIndex) {
            // Splice is after this range, so it's unaffected
            newMuts.push(range);
        } else if (cutIndex > range.startIndex) {
            // Splice starts within this range (but not at the very start)
            newMuts.push({
                startIndex: range.startIndex,
                endIndex: cutIndex,
                originalIndex: range.originalIndex,
            });

            if (cutIndex + cutCount < range.endIndex) {
                // If the cut is entirely within this range, we add the
                // remaining part.
                newMuts.push({
                    startIndex: cutIndex,
                    endIndex: range.endIndex - cutCount,
                    originalIndex: range.originalIndex + cutIndex + cutCount,
                });
            }
        } else if (cutIndex + cutCount > range.startIndex) {
            if (cutIndex + cutCount < range.endIndex) {
                // Splice starts before this range and ends within it
                newMuts.push({
                    startIndex: cutIndex,
                    endIndex: range.endIndex - cutCount,
                    originalIndex:
                        range.originalIndex +
                        (cutIndex + cutCount - range.startIndex),
                });
            }
            // Otherwise the entire range is cut out
            // else {}
        } else {
            // Splice is entirely before this range, we need to shift
            // the range.
            newMuts.push({
                startIndex: range.startIndex - cutCount,
                endIndex: range.endIndex - cutCount,
                originalIndex: range.originalIndex,
            });
        }
    }

    return newMuts;
}

// FIXME: this should indent, etc. otherwise it will quickly become unreadable.
export function inspect(
    value: RuntimeValue,
    indent: number,
    opts?: FormatOptions,
): string {
    const clr = new Chalk({ level: opts?.enableColor ? 1 : 0 });

    if (typeof value === "string") {
        return clr.green(JSON.stringify(value));
    }
    if (typeof value === "number") {
        return clr.yellow(`${value}`);
    }
    if (typeof value === "boolean") {
        return clr.magenta(`${value}`);
    }

    function formatEnumeration<T>(
        prefix: string,
        suffix: string,
        inlineSeparator: string,
        items: T[],
        mapper: (item: T, indent: number) => string,
    ) {
        const str = `${prefix} ${items.map((item) => mapper(item, indent)).join(inlineSeparator)} ${suffix}`;
        if (
            !str.includes("\n") &&
            (!opts || str.length <= opts.maxWidth - indent)
        ) {
            return str;
        }
        const innerIndent = indent + 2;
        return (
            `${prefix}\n` +
            `${items.map((item) => `${" ".repeat(innerIndent)}${mapper(item, innerIndent)}`).join("\n")}\n` +
            `${" ".repeat(indent)}${suffix}`
        );
    }

    return match(value, "type", {
        function: () => clr.cyan("<function>"),
        builtin_function: () => clr.cyan("<function>"),
        struct: (strc) =>
            formatEnumeration(
                clr.blue("struct") + " {",
                "}",
                ", ",
                Object.entries(strc.staticFields),
                ([key, value], indent) =>
                    `${key}: ${inspect(value, indent, opts)}`,
            ),

        list: (list) =>
            formatEnumeration("[", "]", ", ", list.values, (x, indent) =>
                inspect(x, indent, opts),
            ),
        dict: (dict) =>
            formatEnumeration(
                "dict [",
                "]",
                ", ",
                [...dict.values.values()],
                ([key, value], indent) =>
                    `${inspect(key, indent, opts)}: ${inspect(value, indent, opts)}`,
            ),

        object: (obj) =>
            formatEnumeration(
                "{",
                "}",
                ", ",
                Object.entries(obj.fields),
                ([key, value], indent) =>
                    `${key}: ${inspect(value, indent, opts)}`,
            ),
        reference: (ref) =>
            clr.red(`<ref> ${inspect(getRefValue(ref.target), indent, opts)}`),
    });
}

export function structOf(
    value: RuntimeValue & object,
    context: Context,
): null | (RuntimeValue & object & { type: "struct" }) {
    assert(isObject(value), "value must be an object");

    if (value.type === "list") {
        const { List } = context.globals.std;
        assert(
            typeof List === "object" && List !== null,
            "List is not an object",
        );
        assert(List.type === "struct", "List is not a struct");
        return List;
    }

    if (value.type === "object" && value.struct !== undefined) {
        assert(isObject(value.struct), "not a struct");
        return value.struct;
    }

    return null;
}
