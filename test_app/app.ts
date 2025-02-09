import { interpret } from "../lib/interpret/interpret";
import { formatError } from "../lib/interpret/utils";
import * as monaco from "monaco-editor";
import { semanticTokenTypes } from "../lib/parse/tokens";
import { parseModule } from "../lib/parse/module";

const inputEl = document.getElementById("inputContainer")! as HTMLDivElement;
const outputEl = document.getElementById("output")! as HTMLPreElement;
const buttonEl = document.getElementById("run")! as HTMLButtonElement;
const restartEl = document.getElementById("restart")! as HTMLButtonElement;
const renderEl = document.getElementById(
    "temporary_target_render_zone",
)! as HTMLButtonElement;
let abortCtrl: AbortController | undefined;

// https://github.com/microsoft/monaco-editor/blob/main/docs/integrate-esm.md#using-parcel
self.MonacoEnvironment = {
    getWorkerUrl: function (moduleId, label) {
        if (label === "json") {
            return "./json.worker.js";
        }
        if (label === "css" || label === "scss" || label === "less") {
            return "./css.worker.js";
        }
        if (label === "html" || label === "handlebars" || label === "razor") {
            return "./html.worker.js";
        }
        if (label === "typescript" || label === "javascript") {
            return "./ts.worker.js";
        }
        return "./editor.worker.js";
    },
};

const initialCode = `use std

let todoList = (){
    // There are two types of local variables: 'let' and 'slot'. Slots
    // keep state which persists across re-runs of a reactive function.
    slot name = ""
    slot tasks = []

    // "mut" allows us to define functions that can modify state. The functions
    // are not reactive and are use for one-off events like button clicks.
    let onSubmit = mut (){
        tasks.push(name)
        name = ""
    }

    let items = tasks.map((task, index) {
        let onDelete = mut (){
            // Lists automatically track what is added or removed. By removing
            // an element in this fashion, a single DOM element will be removed
            // and nothing else will be updated.
            tasks.splice(index, 1)
        }

        // Render the todo item. The last expression in a
        // block is the return value.
        todoItem(task, onDelete)
    })

    // Finally, return the complete todo list. We provide the reference to the
    // slot as value to the input, "&name". When the user types a value, the
    // slot will be kept up-to-date.
    <div>
        <input value={&name} />
        <button onclick={onSubmit}>Add</button>

        {if items.size() == 0 {
            <p>No tasks</p>
        } else {[
            <p>{items.size()} tasks</p>
            <ul>{items}</ul>
        ]}}
    </div>
}

let todoItem = (task, onDelete) {
    <li>
        {task}
        <button onclick={onDelete}>delete</button>
    </li>
}

// The main entry point, called once. Here we simply bind the render output
// to the reactive todolist function.
pub let main = mut (){
    std.bindNode(todoList)
}
`;

///*oninput={mut (ev){ name = ev.value }} */

monaco.languages.register({ id: "iko" });

// TODO: provide fast top-down tokenization at some point.
// monaco.languages.setMonarchTokensProvider("iko", {
//     tokenizer: {
//         root: [],
//     },
// });

const tokenTypeMap = new Map(
    semanticTokenTypes.map((type, index) => [type, index]),
);

// Extract tokens for syntax highlighting directly from the parser output. Means we don't have to
// provide custom-made token regexes etc. until the language is more stable.
monaco.languages.registerDocumentSemanticTokensProvider("iko", {
    getLegend() {
        return {
            tokenTypes: [...semanticTokenTypes],
            tokenModifiers: [],
        };
    },
    releaseDocumentSemanticTokens() {},
    provideDocumentSemanticTokens(model) {
        const text = model.getValue();
        const module = parseModule(text);

        let prevLine = 0;
        let prevCol = 0;

        // Based on example from:
        // https://microsoft.github.io/monaco-editor/playground.html?source=v0.52.2#example-extending-language-services-semantic-tokens-provider-example
        // Monaco expects a very compact array of values that encodes token info.
        const tokens = module.semanticTokens.flatMap((token) => {
            const line = token.location.line - 1;
            const column = token.location.column - 1;

            const data = [
                // These are deltas from the previous token. If we go to a new line, the column is
                // an absolute value instead of a delta.
                line - prevLine,
                line !== prevLine ? column : column - prevCol,
                // Length of the token on that line. Cannot be multiline.
                token.length,
                // Token type, as an index in the legend.
                tokenTypeMap.get(token.type)!,
                // Token modifiers, not used for the time being.
                0,
            ];
            prevLine = line;
            prevCol = column;

            return data;
        });

        return { data: new Uint32Array(tokens) };
    },
});

// Custom theme to add a color to HTML tags. We might be able to reuse JSX ones, not sure.
monaco.editor.defineTheme("iko-theme", {
    base: "vs",
    inherit: true,
    colors: {},
    rules: [{ token: "htmlTag", foreground: "800000" }],
});

const editor = monaco.editor.create(inputEl, {
    value: initialCode,
    language: "iko",
    theme: "iko-theme",
    "semanticHighlighting.enabled": true,
});

let shouldRestart = false;

function start() {
    buttonEl.textContent = "⏹️ Stop";
    restartEl.disabled = false;
    const code = editor.getValue();

    outputEl.innerHTML = "";
    renderEl.innerHTML = "";

    abortCtrl = new AbortController();
    interpret(code, abortCtrl.signal, {
        document,
        print: (text) =>
            outputEl.appendChild(document.createTextNode(`${text}\n`)),
    })
        .catch((error) => {
            const message = formatError(code, error);
            const span = document.createElement("span");
            span.appendChild(document.createTextNode(`${message}\n`));
            span.style.color = "red";
            outputEl.appendChild(span);
        })
        .finally(() => {
            buttonEl.textContent = "▶️ Run";
            restartEl.disabled = true;
            abortCtrl = undefined;

            if (shouldRestart) {
                shouldRestart = false;
                start();
            }
        });
}

restartEl.addEventListener("click", () => {
    if (abortCtrl !== undefined) {
        shouldRestart = true;
        abortCtrl.abort();
    } else {
        start();
    }
});

buttonEl.addEventListener("click", () => {
    if (abortCtrl !== undefined) {
        abortCtrl.abort();
        return;
    }
    start();
});
