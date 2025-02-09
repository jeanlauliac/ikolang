import { assert } from "../utils";
import {
    getRefValue,
    ListMappingsMap,
    setRefValue,
} from "./evaluate-expression";
import {
    executeRootMutCallback,
    invokeRootMutFunction,
} from "./invoke-function";
import { Globals, Reference, RuntimeValue } from "./runtime-value";
import { isRef } from "./utils";

export function updateDom(args: {
    globals: Globals;
    parentNode: HTMLElement;
    precedingNode: Node | null;
    value: RuntimeValue;
    prevRender: RenderedTree | null;
    listMappings: ListMappingsMap;
}): { renderedTree: RenderedTree; lastNode: Node | null } {
    const { globals, parentNode, value, prevRender } = args;

    // Helper function to unmount a rendered tree.
    function unmount(prevRender: RenderedTree) {
        if (prevRender.type === "list") {
            for (const item of prevRender.items) {
                unmount(item);
            }
        } else {
            args.parentNode.removeChild(prevRender.element);
        }
    }

    function replaceWith(el: Node) {
        if (prevRender) {
            unmount(prevRender);
        }
        parentNode.insertBefore(el, args.precedingNode?.nextSibling ?? null);
    }

    if (typeof value === "string" || typeof value === "number") {
        const text = `${value}`;
        let el: Text;
        if (prevRender && prevRender.type === "text") {
            // Already rendered a text node on previous run, just update the value.
            el = prevRender.element as Text;
            if (prevRender.text !== text) {
                el.nodeValue = text;
            }
        } else {
            // No previous render, create a new text node and add it to the parent node.
            el = globals.api.document.createTextNode(text);
            replaceWith(el);
        }

        return {
            lastNode: el,
            renderedTree: { type: "text", text, element: el },
        };
    }

    assert(typeof value === "object" && value !== null, "require object");

    if (value.type === "list") {
        // We render a list of contiguous elements, which may be text, elements, or other lists.

        const items = value.values;

        if (prevRender && prevRender.type !== "list") {
            // We need to replace whichever was rendered before by the list element
            parentNode.removeChild(prevRender.element);
        }

        const prevItems = prevRender?.type === "list" ? prevRender.items : [];
        const newRenderedTrees: RenderedTree[] = [];
        let precedingNode = args.precedingNode;

        const mappings = args.listMappings.get(value) ?? [
            // FIXME: shouldn't the default mapping be an empty array actually?
            // Or at least endIndex should use prevItems.length instead?
            { startIndex: 0, endIndex: items.length, originalIndex: 0 },
        ];
        let k = -1;

        function moveToNextRange(originalEndIndex: number) {
            ++k;
            const newRange = mappings.length > k ? mappings[k] : null;

            // Unmount any elements that were removed from the list.
            const nextIndex = newRange
                ? newRange.originalIndex
                : prevItems.length;
            for (let j = originalEndIndex; j < nextIndex; j++) {
                unmount(prevItems[j]);
            }
            return newRange;
        }
        let range = moveToNextRange(0);

        let i = 0;
        for (; i < items.length; i++) {
            if (range && i >= range.endIndex) {
                // Progress to the next mapped range, which will either contain `i` or be located
                // beyond it (in which case it means this is a new item in the list).
                const originalEndIndex =
                    range.originalIndex + range.endIndex - range.startIndex;
                range = moveToNextRange(originalEndIndex);
            }
            const originalIndex =
                range && i >= range.startIndex
                    ? range.originalIndex + i - range.startIndex
                    : null;

            const { renderedTree, lastNode } = updateDom({
                globals,
                parentNode,
                precedingNode,
                value: items[i],
                prevRender:
                    originalIndex !== null ? prevItems[originalIndex] : null,
                listMappings: args.listMappings,
            });
            precedingNode = lastNode;
            newRenderedTrees.push(renderedTree);
        }
        if (range) {
            moveToNextRange(
                range.originalIndex + range.endIndex - range.startIndex,
            );
        }

        return {
            renderedTree: {
                type: "list",
                items: newRenderedTrees,
            },
            lastNode: precedingNode,
        };
    }

    // TODO: to support conditional rendering of elements, we'll need to support a `null` value
    // (void?) here, or "falsy" values.
    assert(
        value.type === "object",
        `can only bind html nodes, got ${value.type}`,
    );

    assert(value.struct === globals.std.Element, "must be an std.Element");

    const { tagName, children, attributes } = value.fields;
    assert(typeof tagName === "string", "tagName must be a string");

    let el: HTMLElement;
    let prevNode: (RenderedTree & { type: "element" }) | null = null;
    if (
        prevRender &&
        prevRender.type === "element" &&
        prevRender.tagName === tagName
    ) {
        // Already rendered an element on previous run, just update the attributes.
        el = prevRender.element as HTMLElement;
        prevNode = prevRender;
    } else {
        // No previous render, create a new element and add it to the parent node.
        el = globals.api.document.createElement(tagName);
        replaceWith(el);
    }

    assert(
        attributes !== null &&
            typeof attributes === "object" &&
            attributes.type === "dict",
        "needs dict attrs",
    );

    // FIXME: bruteforce approach, remove all previous event listeners and re-add them below.
    // This is not efficient, but it's simple and works for now.
    for (const [name, handler] of prevNode?.events ?? []) {
        el.removeEventListener(name, handler);
    }

    const eventMap = new Map<string, (ev: Event) => void>();
    const attributeMap = new Map<string, string>();
    let valueListener = prevNode?.valueListener ?? null;

    // We don't touch attributes that may have been set on previous render, but are not present in
    // the new render, except event listeners. In practice it's unlikely to happen because the
    // syntax naturally lend to a static list of attributes, but it's possible if `Element {}`
    // objects are created manually.
    for (const [name, attr] of attributes.values.values()) {
        assert(typeof name === "string", "attr name must be string");
        if (name.startsWith("on")) {
            assert(
                typeof attr === "object" &&
                    attr !== null &&
                    attr.type === "function",
                "attr must be function",
            );
            const evName = name.slice(2);
            function handler(ev: Event) {
                invokeRootMutFunction(
                    attr,
                    [
                        // TODO: pass around event object
                        {
                            type: "object",
                            struct: globals.std.Event as RuntimeValue & {
                                type: "struct";
                            },
                            refCount: 0,
                            fields: {
                                value: (el as any).value,
                            },
                        },
                    ],
                    globals,
                );
            }

            // TODO: use single event listeners on `document` just like React does, to optimize
            // the amount of listeners.
            el.addEventListener(evName, handler);
            eventMap.set(evName, handler);

            continue;
        }

        let val;
        if (typeof attr === "string") {
            attributeMap.set(name, attr);
            // Since we can't apply the value back to the ref, can only be read-only.
            (el as HTMLInputElement).readOnly = true;

            val = attr;
            valueListener = null;
        } else {
            // FIXME: eventually needs to be more sophisticated than this.
            // This was a good way to demo the concept of ref binding.
            assert(isRef(attr), "base attr must be string");
            // FIXME: we should only accept "slot" references, not "let"
            // references. This is because we know "let" refs will not be
            // reactive and so cause bugs.
            val = getRefValue(attr.target);
            assert(typeof val === "string", "attr must be string");
            attributeMap.set(name, val);
            if (!valueListener) {
                (el as HTMLInputElement).readOnly = false;
                valueListener = { ref: attr.target };

                // FIXME: in the unlikely event the 'value' is not a ref anymore
                // we should cleanup the listener.
                el.addEventListener("input", (ev) => {
                    executeRootMutCallback(globals, (context) => {
                        if (!valueListener) return;
                        setRefValue(
                            valueListener.ref,
                            (el as HTMLInputElement).value,
                            context,
                        );
                    });
                });
            }
        }

        if (prevNode && prevNode.attributes.get(name) === val) {
            // No need to update if string value is the same.
            continue;
        }
        setElementAttribute(el, name, val);
    }

    const renderedChildren = updateDom({
        globals,
        parentNode: el,
        precedingNode: null,
        value: children,
        prevRender: prevNode?.children ?? null,
        listMappings: args.listMappings,
    });

    return {
        lastNode: el,
        renderedTree: {
            type: "element",
            tagName: tagName,
            attributes: attributeMap,
            events: eventMap,
            element: el,
            children: renderedChildren.renderedTree,
            valueListener,
        },
    };
}

export const setElementAttribute = (
    element: HTMLElement,
    name: string,
    value: string,
) => {
    switch (name) {
        case "value":
            assert(
                "value" in element,
                "need input component to set value attr",
            );
            if (element.value !== value) element.value = value;
            break;

        default:
            throw new Error(`unknown attribute: ${JSON.stringify(name)}`);
    }
};

export type RenderedTree = Readonly<
    | {
          type: "text";
          text: string;
          /** The rendered element. */
          element: Node;
      }
    | {
          type: "element";
          tagName: string;
          events: Map<string, (ev: Event) => void>;
          attributes: Map<string, string>;
          children: RenderedTree;
          valueListener: { ref: Reference } | null;
          /** The rendered element. */
          element: Node;
      }
    | {
          type: "list";
          items: RenderedTree[];
      }
>;
