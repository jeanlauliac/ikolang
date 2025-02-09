import { parseStatement } from "../parse/expressions";
import { assertSyntax, parseToken } from "../parse/tokens";
import { ListMappingsMap } from "./evaluate-expression";
import { createGlobals } from "./interpret";
import { evaluateStatement } from "./invoke-function";
import { Globals, RuntimeValue, Scope } from "./runtime-value";
import jsdom from "jsdom";

export class REPL {
    scope: Scope = { names: {} };
    globals: Globals;

    constructor() {
        const dom = new jsdom.JSDOM(
            '<!DOCTYPE html><div id="temporary_target_render_zone"></div>',
        );
        const { document } = dom.window;

        this.globals = createGlobals(
            {
                document,
                print(msg) {
                    console.log(msg);
                },
            },
            () => {
                // FIXME: not actually called in case of REPL, cleanup API
            },
        );
    }

    run(code: string, listMappings?: ListMappingsMap): RuntimeValue | null {
        const [statement, state] = parseStatement({
            code,
            line: 1,
            column: 1,
            semanticTokens: [],
        });
        const [token, _] = parseToken(state);
        assertSyntax(state, token.type === "end", "unexpected character");

        return evaluateStatement(statement, this.scope, {
            type: "mut",
            globals: this.globals,
            listMappings: listMappings ?? new Map(),
        });
    }
}
