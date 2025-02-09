import {
    parseToken,
    isKeyword,
    isOperator,
    State,
    assertSyntax,
    Range,
    Identifier,
    SemanticToken,
} from "./tokens";
import { assert } from "../utils";
import {
    parseEnumeration,
    tryParseUseStatement,
    UseStatement,
} from "./expressions";
import { tryParseVariableDef, VariableDef } from "./variable-def";

export type Module = Readonly<{
    statements: ModuleStatement[];
    semanticTokens: SemanticToken[];
}>;

export const parseModule = (code: string): Module => {
    let state: State = { code, column: 1, line: 1, semanticTokens: [] };
    let statements = [];

    [statements, state] = parseEnumeration(
        state,
        (token) => token.type === "end",
        (token) => token.type === "newline" || isOperator(token, ";"),
        parseModuleStatement,
    );

    return { statements, semanticTokens: state.semanticTokens };
};

export type ModuleStatement = Range &
    Readonly<
        | ({
              // A variable definition. Ex. `let pi = 3.14`.
              type: "variable_def";
              isPublic: boolean;
          } & VariableDef)
        | UseStatement
    >;

function parseModuleStatement(state: State): [ModuleStatement, State] {
    let forwardState;

    let token;
    [token, forwardState] = parseToken(state);
    const start = token.start;
    if (token.type === "newline") {
        state = forwardState;
        [token, forwardState] = parseToken(forwardState);
    }

    let useSt;
    [useSt, state] = tryParseUseStatement(state);
    if (useSt) {
        return [useSt, state];
    }

    let isPublic = false;
    if (isKeyword(token, "pub")) {
        isPublic = true;
        state = forwardState;
    }

    let varDef;
    [varDef, forwardState] = tryParseVariableDef(state);

    assertSyntax(state, varDef !== undefined, "expected a valid statement");
    return [
        {
            type: "variable_def",
            isPublic,
            ...varDef,
            start,
            // FIXME: needs to be varDef's end
            end: token.end,
        },
        forwardState,
    ];
}
