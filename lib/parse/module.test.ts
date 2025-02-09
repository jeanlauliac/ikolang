import { parseModule } from "./module";
import { SemanticToken } from "./tokens";
import { expect, it } from "vitest";

const code = `use std
// Test comment
pub let main = () {
    let name = "world"
    std.print("hello, {name}")
    <div>hello, {name}</div>
}
`;

it("generates correct semantic tokens", async (t) => {
    const module = parseModule(code);
    const lines = code.split("\n");

    const tokensByLineNum: SemanticToken[][] = [];
    for (const token of module.semanticTokens) {
        const lineNum = token.location.line - 1;
        if (!tokensByLineNum[lineNum]) {
            tokensByLineNum[lineNum] = [];
        }
        tokensByLineNum[lineNum].push(token);
    }

    // Generate a visual representation of the tokens so that the snapshot is somewhat easier to
    // read and we can see changes over time.
    const tokensStr = lines
        .flatMap((line, lineNum) => {
            const tokens = tokensByLineNum[lineNum] || [];
            const tokenLines = [];
            for (const token of tokens) {
                const col = token.location.column - 1;
                let i;
                const tail = "^".repeat(token.length) + token.type;
                for (i = 0; i < tokenLines.length; i++) {
                    if (tokenLines[i].length + 1 < col) {
                        tokenLines[i] +=
                            " ".repeat(col - tokenLines[i].length) + tail;
                        break;
                    }
                }
                if (i === tokenLines.length) {
                    tokenLines.push(" ".repeat(col) + tail);
                }
            }

            return ["=".repeat(79), line, ...tokenLines, ""];
        })
        .join("\n");

    expect(tokensStr).toMatchSnapshot(`semantic tokens`);
});
