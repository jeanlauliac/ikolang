import { RenderedTree, updateDom } from "./render-dom";
import { Globals, RuntimeValue } from "./runtime-value";
import { getStdModule } from "./std";
import { ListMappingsMap } from "./evaluate-expression";
import { beforeEach, expect, it } from "vitest";
import { REPL } from "./repl";

let document: Document;
let parentNode: HTMLElement;
let globals: Globals;
let elementList: RuntimeValue | null = null;
let std: ReturnType<typeof getStdModule>;
let repl: REPL;

beforeEach(() => {
    repl = new REPL();
    document = repl.globals.api.document;
    parentNode = document.getElementById("temporary_target_render_zone")!;
    std = repl.globals.std as ReturnType<typeof getStdModule>;
    globals = repl.globals;
});

let lastTree: RenderedTree | null = null;
function refresh(listMappings: ListMappingsMap) {
    lastTree = updateDom({
        globals,
        parentNode,
        value: elementList!,
        prevRender: lastTree,
        listMappings,
        precedingNode: null,
    }).renderedTree;
}

// FIXME: replace this with a REPL instead of building internal RuntimeValues etc.
it("handles list deletions/additions correctly", () => {
    repl.run(
        "slot elementList = [<span>hello</span>, <span>world</span>, <span>!</span>, <span>How are you</span>]",
    );
    elementList = repl.run("elementList");

    // WHEN rendering for the first time, THEN the parent node should contain the expected HTML.
    refresh(new Map());
    expect(parentNode.innerHTML).toBe(
        "<span>hello</span><span>world</span><span>!</span><span>How are you</span>",
    );

    // GIVEN I add a markers to track the spans element.
    for (let i = 0; i < parentNode.childNodes.length; i++) {
        const spanElement = parentNode.childNodes[i] as HTMLElement;
        spanElement.setAttribute("data-index", `${i}`);
    }

    // WHEN rendering again, THEN the parent node should contain the expected HTML.
    refresh(new Map());
    expect(parentNode.innerHTML).toBe(
        '<span data-index="0">hello</span><span data-index="1">world</span><span data-index="2">!</span><span data-index="3">How are you</span>',
    );

    // WHEN I add elements, remove another, and refresh
    {
        const listMappings = new Map();
        repl.run(
            `(){
                elementList.push(" today?")
                elementList.splice(1, 1)
                elementList.push("!")
            }()`,
            listMappings,
        );
        refresh(listMappings);
    }

    // THEN it updated the nodes such that the data-index fields are kept consistent.
    expect(parentNode.innerHTML).toBe(
        '<span data-index="0">hello</span><span data-index="2">!</span><span data-index="3">How are you</span> today?!',
    );

    // WHEN I delete some another elements and refresh
    {
        const listMappings = new Map();
        repl.run(
            `(){
                elementList.splice(2, 1)
                elementList.splice(0, 1)
            }()`,
            listMappings,
        );
        refresh(listMappings);
    }

    // THEN it updated the nodes such that the data-index fields are kept consistent.
    expect(parentNode.innerHTML).toBe('<span data-index="2">!</span> today?!');

    // WHEN I delete a tail element
    {
        const listMappings = new Map();
        repl.run(
            `(){
                elementList.splice(2, 1)
            }()`,
            listMappings,
        );
        refresh(listMappings);
    }

    // THEN it updated the nodes such that the data-index fields are kept consistent.
    expect(parentNode.innerHTML).toBe('<span data-index="2">!</span> today?');

    // WHEN I delete all remaining elements and refresh
    {
        const listMappings = new Map();
        repl.run(
            `(){
                elementList.splice(0, 2)
            }()`,
            listMappings,
        );
        refresh(listMappings);
    }
    // THEN there are no more nodes
    expect(parentNode.innerHTML).toBe("");
});

it("handles list updates with no mappings correctly", () => {
    repl.run(
        "slot elementList = [<span>hello</span>, <span>world</span>, <span>!</span>, <span>How are you</span>]",
    );
    elementList = repl.run("elementList");

    // WHEN rendering for the first time, THEN the parent node should contain the expected HTML.
    refresh(new Map());
    expect(parentNode.innerHTML).toBe(
        "<span>hello</span><span>world</span><span>!</span><span>How are you</span>",
    );

    // GIVEN I add a markers to track the spans element.
    for (let i = 0; i < parentNode.childNodes.length; i++) {
        const spanElement = parentNode.childNodes[i] as HTMLElement;
        spanElement.setAttribute("data-index", `${i}`);
    }

    // WHEN I add elements, remove another, and refresh
    {
        repl.run(
            `(){
                elementList.push(" today?")
                elementList.splice(1, 2)
            }()`,
        );

        // Not passing the mappings
        refresh(new Map());
    }

    // THEN it recreated nodes as necessary without keeping the data-index attributes.
    expect(parentNode.innerHTML).toBe(
        '<span data-index="0">hello</span><span data-index="1">How are you</span> today?',
    );
});
