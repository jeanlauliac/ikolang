import jsdom from "jsdom";
import { interpret } from "../interpret/interpret";
import { expect, it } from "vitest";

it("input element binds value attribute", async () => {
    const dom = new jsdom.JSDOM(
        '<!DOCTYPE html><div id="temporary_target_render_zone"></div>',
    );
    const { document } = dom.window;

    const code = `
        use std

        pub let main = mut (){
            slot text = "test"

            std.bindNode((){
                <div>
                    <span>hello, {text}</span>
                    <input value={&text} />
                </div>
            })
        }
    `;

    let result = "";
    let print = (message: string) => (result += `${message}\n`);
    const ab = new AbortController();
    const program = interpret(code, ab.signal, {
        document,
        print,
        disableWaitOnBindings: true,
    });

    // We can find the root
    const root = document.getElementById("temporary_target_render_zone");
    expect(root).not.toBeNull();
    expect(root!.children.length).toBe(1);

    // Div element
    const divEl = root!.children[0] as HTMLInputElement;
    expect(divEl.tagName).toBe("DIV");

    // Span element
    const spanEl = divEl.children[0]!;
    expect(spanEl.tagName).toBe("SPAN");
    expect(spanEl.textContent).toBe("hello, test");

    // Input element with value test
    const inputEl = divEl.children[1] as HTMLInputElement;
    expect(inputEl.tagName).toBe("INPUT");
    expect(inputEl.value).toBe("test");

    // Now we simulate typing some character into the input
    inputEl.value = "test2";
    inputEl.dispatchEvent(new dom.window.Event("input", { bubbles: true }));

    // The span element should have gotten updated
    expect(spanEl.textContent).toBe("hello, test2");

    // No output is expected.
    expect(result).toBe("");
});

it("inner slots", async () => {
    const dom = new jsdom.JSDOM(
        '<!DOCTYPE html><div id="temporary_target_render_zone"></div>',
    );
    const { document } = dom.window;

    const code = `
        use std

        pub let main = mut (){
            slot fields = ["test1", "test2", "test3"]

            std.bindNode((){
                <div>
                    {fields.map((field, index) {
                        fieldInput(field, mut (){
                            fields.splice(index, 1)
                        })
                    })}
                </div>
            })
        }

        let fieldInput = (name, onDelete) {
            slot text = ""

            <div>
                <span>{name}: {text}</span>
                <input value={&text} />
                <button onclick={onDelete}>Delete</button>
            </div>
        }
    `;

    let result = "";
    let print = (message: string) => (result += `${message}\n`);
    const ab = new AbortController();
    const program = interpret(code, ab.signal, {
        document,
        print,
        disableWaitOnBindings: true,
    });

    // We can find the root
    const root = document.getElementById("temporary_target_render_zone");
    expect(root).not.toBeNull();
    expect(root!.children.length).toBe(1);

    // We can find the input element for the second field
    const divEl = root!.children[0] as HTMLInputElement;
    expect(divEl.tagName).toBe("DIV");
    expect(divEl.children.length).toBe(3);

    const secondFieldDivEl = divEl.children[1] as HTMLDivElement;
    expect(secondFieldDivEl.tagName).toBe("DIV");

    // Span element for the second field
    const secondFieldSpanEl = secondFieldDivEl.children[0] as HTMLSpanElement;
    expect(secondFieldSpanEl.tagName).toBe("SPAN");
    expect(secondFieldSpanEl.textContent).toBe("test2: ");

    // Input element for the second field
    const secondFieldInputEl = secondFieldDivEl.children[1] as HTMLInputElement;
    expect(secondFieldInputEl.tagName).toBe("INPUT");
    expect(secondFieldInputEl.value).toBe("");

    // Now we simulate typing some character into the input
    secondFieldInputEl.value = "new value";
    secondFieldInputEl.dispatchEvent(
        new dom.window.Event("input", { bubbles: true }),
    );

    // The input element should have gotten updated
    expect(secondFieldSpanEl.textContent).toBe("test2: new value");

    // But first element should remain the same
    const firstFieldDivEl = divEl.children[0] as HTMLDivElement;
    const firstFieldInputEl = firstFieldDivEl.children[1] as HTMLInputElement;
    expect(firstFieldInputEl.value).toBe("");

    // Now we simulate clicking the delete button for the very first field
    const firstFieldDeleteButton = firstFieldDivEl
        .children[2] as HTMLButtonElement;
    firstFieldDeleteButton.click();

    // Now, we get the field that's in first position and it should have the test value
    const newFirstFieldDivEl = divEl.children[0] as HTMLDivElement;
    const newFirstFieldSpanEl = newFirstFieldDivEl
        .children[0] as HTMLSpanElement;
    expect(newFirstFieldSpanEl.textContent).toBe("test2: new value");

    // No output is expected.
    expect(result).toBe("");
});
