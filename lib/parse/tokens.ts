import { Expression, parseExpression } from "./expressions";

// All keywords. Order doesn't matter, we build a set out of it for quick
// identification.
export const keywords = [
    "pub",
    "let",
    "slot",
    "if",
    "else",
    "mut",
    "use",
    "struct",
    "dict",
    "set",
    "true",
    "false",
] as const;
export type Keyword = (typeof keywords)[number];
const keywordsSet = new Set<string>(keywords);

// All operators in the language. Must be ordered from highest to lowest
// priority, so for example "/>" comes before either "/" or ">"
const operators = [
    "==",
    "++",
    "--",
    "/>",
    "<=",
    ">=",
    "==",
    "!=",
    "&&",
    "||",
    "=",
    "(",
    ")",
    "{",
    "}",
    "[",
    "]",
    ",",
    ".",
    ">",
    "<",
    ";",
    ":",
    "/",
    "*",
    "+",
    "-",
    "&",
    "^",
    "!",
] as const;
export type Operator = (typeof operators)[number];

export const semanticTokenTypes = [
    "keyword",
    "string",
    "number",
    "variable",
    "comment",
    "operator",
    "htmlTag",
] as const;
export type SemanticTokenType = (typeof semanticTokenTypes)[number];
export type SemanticToken = {
    location: Location;
    length: number;
    type: SemanticTokenType;
};

/**
 * The state of the parser. This is a snapshot of the current state
 * including the remaining code to parse and the current location in
 * the original code.
 */
export type State = Readonly<{
    /**
     * The remaining code to parse. We progressively slice the code as we go rather than keeping
     * track of an index in the original code. This allows us to use regexes such as /^[a-z]/ to
     * match the beginning of the currently parsed code.
     */
    code: string;
    /**
     * List all the "semantic tokens" encountered so far, for syntax highlighting purposes. This is
     * separate from the tokens returned to the parser because for simplicity we do not include
     * comments, newlines, etc. in the Abtract Syntax Tree. So to highlight them correctly we track
     * of these separately.
     */
    semanticTokens: SemanticToken[];
}> &
    Location;

/**
 * A range in the source code, useful for errors and highlighting when you want to tell the user
 * exactly where something went wrong.
 */
export type Range = Readonly<{ start: Location; end: Location }>;

/**
 * A location in the source code. Each value is 1-based.
 * TODO: switch to 0-based because 1-based is annoying for a number of reasons, and compat with
 * other tools.
 */
export type Location = Readonly<{ line: number; column: number }>;

// String token is special as it's also a concatenation expression to some
// extent. So it also appears in the Expression type.
export type StringToken = Readonly<{
    type: "string";
    parts: string[];
    expressions: Expression[];
}>;

/**
 * Simple token that can be found in code, basic building block of the parser. It's not _all_ that
 * can be found in code however. For example, HMTL tags content are being parsed with special logic.
 */
export type Token = Readonly<
    | { type: "end" | "newline" }
    | { type: "identifier"; value: string }
    | { type: "keyword"; value: Keyword }
    | { type: "operator"; value: Operator }
    | { type: "integer"; value: number }
    | { type: "htmlTagStart" }
    | StringToken
> &
    Range;

export type Identifier = Token & { type: "identifier" };

/**
 * Because the parse is a recursive descent parser and we sometimes need to backtrack, we cache the
 * result of parsing a token for a given state. This is a WeakMap so that things get cleaned up
 * as soon as a state is no longer reachable.
 */
const cache = new WeakMap<State, Partial<Record<Placement, [Token, State]>>>();

type Placement = "htmlTag" | "primitiveExp" | "default";

export const parseToken = (
    state: State,
    placement: Placement = "default",
): [Token, State] => {
    // Because state is immutable, we can cache tokens if we've seen the same
    // state before. This is because the parsing logic can have branching
    // logic where different subroutines ask for the same token.
    let cached = cache.get(state);
    if (cached && cached[placement]) return cached[placement];

    const result = parseTokenDirectly(state, placement);
    if (!cached) cached = {};
    cached[placement] = result;
    cache.set(state, cached);
    return result;
};

/**
 * Main "tokenizer" function. We leverage regexes heavily which might be a
 * little wasteful, but that can be optimized later if needed. We keep the
 * parser simple and easy to understand.
 */
function parseTokenDirectly(
    state: State,
    placement: Placement,
): [Token, State] {
    let hadNewlines = false;
    let match;

    let start = getLocation(state);
    while (true) {
        match = /^( *\/\/.*?)($|\n)/.exec(state.code);
        if (match) {
            // single line comment, discard until its end
            state = consumeChars(state, match[1].length, "comment");
        }

        match = /^ *\n+/.exec(state.code);
        if (match) {
            // newlines, we aggregate them together and emit a single token.
            // This simplifies the parsing upstream.
            state = consumeChars(state, match[0].length);
            hadNewlines = true;
            continue;
        }
        break;
    }

    // newline takes priority over end of file, which will be emitted next time around
    if (hadNewlines) {
        return [{ type: "newline", start, end: getLocation(state) }, state];
    }

    // discard any heading whitespace
    state = consumeWhitespace(state);
    start = getLocation(state);

    if (state.code === "") {
        // end of file
        return [{ type: "end", start, end: start }, state];
    }

    match = /^[a-zA-Z_][a-zA-Z0-9_]*/.exec(state.code);
    if (match) {
        const value = match[0];
        const isKeyword = keywordsSet.has(value);
        state = consumeChars(
            state,
            match[0].length,
            isKeyword
                ? "keyword"
                : placement === "htmlTag"
                  ? "htmlTag"
                  : undefined,
        );
        const end = getLocation(state);

        if (isKeyword) {
            return [
                { type: "keyword", value: value as Keyword, start, end },
                state,
            ];
        }
        return [{ type: "identifier", value, start, end }, state];
    }

    match = /^[0-9]+/.exec(state.code);
    if (match) {
        const value = parseInt(match[0], 10);
        assertSyntax(
            state,
            value >= Number.MIN_SAFE_INTEGER &&
                value <= Number.MAX_SAFE_INTEGER,
            "This integer literal is too large (positive or negative) to be safely represented in memory.",
        );
        state = consumeChars(state, match[0].length, "number");

        const end = getLocation(state);
        return [{ type: "integer", value, start, end }, state];
    }

    const op = operators.find((op) => state.code.startsWith(op));
    if (op !== undefined) {
        const semanticType =
            placement === "primitiveExp" && op === "<"
                ? "htmlTag"
                : // FIXME: get rid of htmlTag placement, this should be a custom
                  // parser inside HTML tags.
                  placement === "htmlTag"
                  ? "htmlTag"
                  : "operator";

        state = consumeChars(state, op.length, semanticType);
        const end = getLocation(state);
        if (placement === "primitiveExp" && op === "<") {
            return [{ type: "htmlTagStart", start, end }, state];
        }
        return [{ type: "operator", value: op, start, end }, state];
    }

    if (state.code[0] === '"') {
        let i = 1;
        let parts = [];
        let expressions = [];

        let currentPart = "";
        while (i < state.code.length) {
            // TODO: we should support escaping sequences with backslashes

            if (state.code[i] === "{") {
                parts.push(currentPart);
                currentPart = "";

                state = consumeChars(state, i, "string");
                state = consumeChars(state, 1, "operator");
                let exp;
                [exp, state] = parseExpression(state);
                expressions.push(exp);

                assertSyntax(
                    state,
                    state.code[0] === "}",
                    "After an expression inside a string, a closing curly brace '}' is expected " +
                        "before the remainder of the string.",
                );
                state = consumeChars(state, 1, "operator");
                i = 0;
                continue;
            }

            if (state.code[i] === '"') break;
            currentPart += state.code[i];
            ++i;
        }

        parts.push(currentPart);

        assertSyntax(
            state,
            i !== state.code.length,
            `This string does not seem to have a closing quote.`,
        );
        state = consumeChars(state, i + 1, "string");
        const end = getLocation(state);
        return [{ type: "string", parts, expressions, start, end }, state];
    }

    assertSyntax(
        state,
        false,
        `Unexpected character '${state.code[0]}'. It could be you meant ` +
            "to use a different operator, or that this character is not supported as part of an identifier.",
    );
}

export class ParsingError extends Error {
    constructor(
        public state: State,
        message: string,
    ) {
        super(message);
    }
}

export function assertSyntax(
    state: State,
    predicate: boolean,
    message: string,
): asserts predicate {
    if (!predicate) {
        throw new ParsingError(consumeWhitespace(state), message);
    }
}

export const consumeChars = (
    state: Readonly<State>,
    count: number,
    semanticType?: SemanticTokenType,
): State => {
    if (count === 0) return state;
    let line = state.line;
    let column = state.column;
    for (let i = 0; i < count; ++i) {
        if (state.code[i] === "\n") {
            line += 1;
            column = 1;
        } else {
            column += 1;
        }
    }

    const code = state.code.slice(count);
    const newState = {
        code,
        line,
        column,
        semanticTokens: state.semanticTokens,
    };
    if (!semanticType) return newState;

    if (newState.semanticTokens.length > 0) {
        const lastToken = state.semanticTokens[state.semanticTokens.length - 1];

        if (
            semanticType === lastToken.type &&
            state.line === lastToken.location.line &&
            state.column === lastToken.location.column + lastToken.length
        ) {
            // Merge tokens if they are on the same line and adjacent
            return {
                ...newState,
                semanticTokens: state.semanticTokens.slice(0, -1).concat({
                    location: lastToken.location,
                    length: lastToken.length + count,
                    type: semanticType,
                }),
            };
        }
    }

    // Otherwise, just add the token
    return {
        ...newState,
        semanticTokens: [
            ...state.semanticTokens,
            { length: count, location: state, type: semanticType },
        ],
    };
};

export function isKeyword(
    token: Token,
    value: Keyword,
): token is Token & { type: "keyword"; value: Keyword } {
    return token.type === "keyword" && token.value === value;
}

export const isOperator = (token: Token, value: Operator) => {
    return token.type === "operator" && token.value === value;
};

export const getLocation = (state: State): Location => {
    return { line: state.line, column: state.column };
};

export const consumeWhitespace = (state: State): State => {
    const space = /^ */.exec(state.code)!;
    return consumeChars(state, space[0].length);
};
