import {
    assertSyntax,
    consumeChars,
    getLocation,
    Identifier,
    isKeyword,
    isOperator,
    Location,
    Operator,
    parseToken,
    Range,
    State,
    StringToken,
    Token,
} from "./tokens";
import { tryParseVariableDef, VariableDef } from "./variable-def";

export type FunctionExpression = Readonly<{
    isMut: boolean;
    parameters: string[];
    statements: FunctionStatement[];
}>;

const unaryOperators = ["++", "--", "&", "^", "!", "-"] as const;
type UnaryOperator = (typeof unaryOperators)[number];

const isUnaryOperator = (() => {
    const unaryOperatorsSet = new Set<string>(unaryOperators);
    return (op: string): op is UnaryOperator => {
        return unaryOperatorsSet.has(op);
    };
})();

const binaryOperators = [
    "=",
    "==",
    "!=",
    "<=",
    ">=",
    ">",
    "<",
    "&&",
    "||",
    "+",
    "-",
    "*",
    "/",
] as const;
type BinaryOperator = (typeof binaryOperators)[number];

const isBinaryOperator = (() => {
    const binaryOperatorsSet = new Set<string>(binaryOperators);
    return (op: string): op is BinaryOperator => {
        return binaryOperatorsSet.has(op);
    };
})();

export type Expression = Readonly<
    | StringToken
    | { type: "integer"; value: number }
    | {
          type: "unary_operation";
          target: Expression;
          operation: UnaryOperator;
      }
    | ({
          // A function literal. Ex. `(x){ x + 1 }`
          type: "function";
      } & FunctionExpression)
    | {
          // Reference to a variable. Ex. just `foo` is reference to a variable
          // of that name.
          type: "identifier";
          name: string;
      }
    | {
          // Function call. Ex. `io.print("test")` where `io.print` is the
          // target and with one argument.
          type: "function_call";
          target: Expression;

          // TODO: support named arguments, like `do_smth(34, with: "hello")`
          arguments: Expression[];
      }
    | {
          // Accessing a value inside an object or module. Ex. "io.print".
          type: "member_access";
          target: Expression;
          name: Identifier;
      }
    | {
          // Accessing a value inside a list or dictionary. Ex. "someList[0]" or
          // "someDict["key"]".
          type: "index_access";
          target: Expression;
          index: Expression;
      }
    | {
          // An embeded HTML element, ex. `<div class="test">hello, {name}</div>`
          type: "html_element";
          tagName: string;
          attributes: HtmlAttribute[];
          children: (string | Expression)[];
      }
    | {
          // Binary operation such as `foo + 36` or `foo = "blah"`.
          type: "binary_operation";
          operator: BinaryOperator;
          left: Expression;
          right: Expression;
      }
    | {
          // An object literal, ex. `{ foo: 34 }`
          type: "object";
          fields: { name: string; value: Expression }[];
      }
    | {
          // A list literal, ex. `[1, 2, 3]`
          type: "list";
          items: Expression[];
      }
    | {
          // A dictionary literal, ex. `dict [ "foo": 23, "bar": 54 ]`
          type: "dict";
          items: { key: Expression; value: Expression }[];
      }
    | {
          type: "struct";
      }
    | {
          type: "if";
          condition: Expression;
          thenBranch: FunctionStatement[];
          elseBranch?: FunctionStatement[];
      }
    | {
          type: "boolean";
          value: boolean;
      }
> &
    Range;

type HtmlAttribute = {
    name: string;
    value: Expression;
};

export const parseExpression = (
    state: State,
    minPrecedence: number = 0,
): [Expression, State] => {
    let exp;
    [exp, state] = tryParseExpression(state, minPrecedence);
    assertSyntax(state, exp !== undefined, "expected an expression");
    return [exp, state];
};

export const tryParseExpression = (
    state: State,
    minPrecedence: number,
): [Expression | undefined, State] => {
    return tryParseOpsExp(state, minPrecedence);
};

// From least to most important. For example in "foo + glo.bar" the "." takes precedence such that
// it's interpreted as "foo + (glo.bar)". This includes both unary and binary operators.
const operatorPrecedence = [
    ["="],
    ["||"],
    ["&&"],
    ["==", "!=", "<=", ">=", ">", "<"],
    ["+", "-"],
    ["*", "/"],
    ["++", "--"],
    ["!"], // TODO: unary operator +/- should be here?
    ["&"],
    ["."],
    ["(", "["],
    ["^"],
] as const satisfies Operator[][];

type OperatorWithPrecedence = (typeof operatorPrecedence)[number][number];

const precedencePerOperator = (() => {
    const res = new Map<string, number>();
    // Create a map from operator to precedence level. The levels are arbitrary numbers.
    for (const [i, ops] of operatorPrecedence.entries()) {
        for (const op of ops) {
            res.set(op, i);
        }
    }
    return res;
})();

export const getOperatorPrecedence = (op: OperatorWithPrecedence): number =>
    precedencePerOperator.get(op)!;

export const rightAssociativeOperators = new Set(["="]);

/**
 * Parse an expression that may contain operators. This is a recursive descent parser that
 * applies the operator precedence rules.
 */
const tryParseOpsExp = (
    /**
     * Current parsing state.
     */
    state: State,
    /**
     * This is the minimum precedence level that we are willing to parse. When parsing a standalone
     * expression, this should be 0. When parsing for example "10 * 4 " in the expression "10 * 4 +
     * 3", this will be some positive number like 3, and we won't parse the "+" operator that may
     * have precedence 1.
     */
    minPrecedence: number,
): [Expression | undefined, State] => {
    let nexp: Expression | undefined;

    [nexp, state] = tryParsePrimitiveExpression(state);
    if (nexp === undefined) return [undefined, state];
    let exp = nexp;

    process: while (true) {
        let [token, forwardState] = parseToken(state);

        if (token.type !== "operator") break;

        const op = token.value;
        const prec = precedencePerOperator.get(op);
        if (prec === undefined || prec < minPrecedence) {
            // This happens for ex. when we encouter the "+" in the expression `34 * 10 + 64`
            break;
        }

        if (isBinaryOperator(op)) {
            // Binary operation such as `foo + 36` or `foo = "blah"`.

            let right;
            const innerPrec = rightAssociativeOperators.has(op)
                ? prec
                : prec + 1;
            [right, state] = tryParseOpsExp(forwardState, innerPrec);
            assertSyntax(
                state,
                right !== undefined,
                `After a binary operator like '${op}', an expression is required. For example ` +
                    "you might write `value + 1`.",
            );

            exp = {
                type: "binary_operation",
                operator: op,
                left: exp,
                right,
                start: exp.start,
                end: getLocation(state),
            };
            continue;
        }

        switch (op) {
            case ".": {
                // Member access: `something.foo.bar`

                let end = token.end;

                state = forwardState;
                [token, forwardState] = parseToken(state);
                assertSyntax(
                    state,
                    token.type === "identifier",
                    'After the "." operator, an identifier (such as a variable name) is expected. ' +
                        "For example you might write `std.print` or `someObject.field`.",
                );
                state = forwardState;

                const name = token;
                end = token.end;

                // FIXME: I think that can be deleted
                [token, forwardState] = parseToken(state);

                exp = {
                    type: "member_access",
                    target: exp,
                    name,
                    start: exp.start,
                    end,
                };
                break;
            }

            case "[": {
                // Index or key access: `someList[0]`, `someDict["key"]`

                let index;
                [index, state] = parseExpression(forwardState);
                assertSyntax(
                    state,
                    index !== undefined,
                    "After the opening bracket '[', an expression is expected. For example " +
                        'you might write `someList[0]` or `someDict["key"]`.',
                );

                [token, state] = parseToken(state);
                assertSyntax(
                    state,
                    isOperator(token, "]"),
                    "After the key or index, the closing bracket ']' is expected. For example " +
                        'you might write `someList[0]` or `someDict["key"]`.',
                );

                exp = {
                    type: "index_access",
                    target: exp,
                    index,
                    start: exp.start,
                    end: token.end,
                };
                break;
            }

            case "(": {
                // Function call `foo()` or `bar(blah, 23)`

                let args;
                [args, state] = parseEnumeration(
                    forwardState,
                    (token) => isOperator(token, ")"),
                    (token) =>
                        isOperator(token, ",") || token.type === "newline",
                    parseExpression,
                );

                exp = {
                    type: "function_call",
                    target: exp,
                    arguments: args,
                    start: exp.start,
                    end: getLocation(state),
                };
                break;
            }

            default: {
                // Nothing that we recognize, so that must be starting something
                // else, like the rest of a statement or an outer expression.
                break process;
            }
        }
    }

    return [exp, state];
};

const tryParsePrimitiveExpression = (
    state: State,
): [Expression | undefined, State] => {
    let token, forwardState;
    [token, forwardState] = parseToken(state, "primitiveExp");
    if (token.type === "string") {
        // String is both a token and an expression all by itself.
        return [token, forwardState];
    }

    if (token.type === "integer") {
        return [token, forwardState];
    }

    if (token.type === "identifier") {
        // Reference to a variable
        const name = token.value;

        return [
            { type: "identifier", name, start: token.start, end: token.end },
            forwardState,
        ];
    }

    if (isKeyword(token, "dict")) {
        const start = token.start;
        state = forwardState;
        [token, forwardState] = parseToken(state);
        assertSyntax(
            state,
            isOperator(token, "["),
            "After the `dict` keyword, an opening bracket '[' is expected to define the dictionary.",
        );
        state = forwardState;

        let items;
        [items, state] = parseEnumeration(
            state,
            (token) => isOperator(token, "]"),
            (token) => token.type === "newline" || isOperator(token, ","),
            (state) => {
                let key;
                [key, state] = parseExpression(state);

                [token, forwardState] = parseToken(state);
                assertSyntax(
                    state,
                    isOperator(token, ":"),
                    "After the key, the operator ':' is expected to separate the key and its value. " +
                        'For example, you might write ``key": 34` or `"key": "hello"`.',
                );
                state = forwardState;

                let value;
                [value, state] = parseExpression(state);
                return [{ key, value }, state] as const;
            },
        );

        return [{ type: "dict", items, start, end: getLocation(state) }, state];
    }

    if (isKeyword(token, "struct")) {
        const start = token.start;
        state = forwardState;
        [token, forwardState] = parseToken(state);
        assertSyntax(
            state,
            isOperator(token, "{"),
            "After the `struct` keyword, an opening bracket '{' is expected to define the struct.",
        );
        state = forwardState;

        [token, forwardState] = parseToken(state);
        assertSyntax(
            state,
            isOperator(token, "}"),
            "A closing bracket '}' is expected to finish the struct declaration.",
        );

        return [
            {
                type: "struct",
                start,
                end: token.end,
            },
            forwardState,
        ];
    }

    if (token.type === "operator" && isUnaryOperator(token.value)) {
        // Unary operators
        const prec = getOperatorPrecedence(token.value);

        let exp;
        [exp, state] = parseExpression(forwardState, prec);
        return [
            {
                type: "unary_operation",
                target: exp,
                operation: token.value,
                start: token.start,
                end: exp.end,
            },
            state,
        ];
    }

    const isMut = isKeyword(token, "mut");
    if (isMut || isOperator(token, "(")) {
        // Function declaration or expression grouping

        const start = token.start;
        state = forwardState;

        if (isMut) {
            [token, forwardState] = parseToken(state);
            assertSyntax(
                state,
                isOperator(token, "("),
                "After the `mut` keyword, a function declaration is expected. For example " +
                    "`mut (x) { std.print(x) }`",
            );
            state = forwardState;
        }

        let parameterOrExprs;
        [parameterOrExprs, state] = parseEnumeration(
            state,
            (token) => isOperator(token, ")"),
            (token) => token.type === "newline" || isOperator(token, ","),
            (state) => {
                let expr;
                [expr, forwardState] = parseExpression(state);
                return [{ expr, state }, forwardState];
            },
        );

        [token, forwardState] = parseToken(state);
        if (!isOperator(token, "{")) {
            // Expression group
            assertSyntax(
                state,
                !isMut && parameterOrExprs.length === 1,
                "After parentheses which contain zero or more than one clause, an opening " +
                    "bracket '{' is required to define the funtion body. Tuples are not supported. " +
                    "A function is also required after the `mut` keyword.",
            );

            return [parameterOrExprs[0].expr, state];
        }

        // Otherwise it's a function declaration
        const parameters = parameterOrExprs.map((param) => {
            assertSyntax(
                param.state,
                param.expr.type === "identifier",
                "In a function parameter list, valid parameter names are expected. But, this looks " +
                    "like an expression. This is considered a function parameter because curly brackets are used.",
            );
            return param.expr.name;
        });

        let statements;
        [statements, state] = parseBlock(forwardState);

        return [
            {
                type: "function",
                isMut,
                parameters,
                statements,
                start,
                end: getLocation(state),
            },
            state,
        ];
    }

    if (isOperator(token, "{")) {
        // Struct or struct type

        const start = token.start;
        state = forwardState;

        let fields;
        [fields, state] = parseEnumeration(
            state,
            (token) => isOperator(token, "}"),
            (token) => token.type === "newline" || isOperator(token, ","),
            (state) => {
                let token;
                [token, forwardState] = parseToken(state);

                assertSyntax(
                    state,
                    token.type === "identifier",
                    "An object field must start with a name, as a single identifier, " +
                        'but this looks like an expression. For example, you might write `{ hello: "world" }`.',
                );
                state = forwardState;
                const name = token.value;

                [token, forwardState] = parseToken(state);
                assertSyntax(
                    state,
                    isOperator(token, ":"),
                    "After the field name, the operator ':' is expected to separate the field name and its value. " +
                        `For example, you might write \`${name}: 34\` or \`${name}: "hello"\`.`,
                );
                state = forwardState;

                let value;
                [value, state] = parseExpression(state);

                return [{ name, value }, state];
            },
        );

        return [
            { type: "object", fields, start, end: getLocation(state) },
            state,
        ];
    }

    if (isOperator(token, "[")) {
        // List literal

        const start = token.start;
        state = forwardState;

        let items;
        [items, state] = parseEnumeration(
            state,
            (token) => isOperator(token, "]"),
            (token) => token.type === "newline" || isOperator(token, ","),
            parseExpression,
        );

        return [{ type: "list", items, start, end: getLocation(state) }, state];
    }

    if (token.type === "htmlTagStart") {
        // HTML Tag, ex. `<div>hello, world</div>`
        return parseHtmlTag(token.start, forwardState);
    }

    if (isKeyword(token, "if")) {
        const start = token.start;
        state = forwardState;

        let condition;
        [condition, state] = parseExpression(state);

        [token, forwardState] = parseToken(state);
        assertSyntax(
            state,
            isOperator(token, "{"),
            "After the if condition, an opening brace '{' is expected",
        );

        let thenBranch;
        [thenBranch, state] = parseBlock(forwardState);

        [token, forwardState] = parseToken(state);
        if (isKeyword(token, "else")) {
            state = forwardState;
            [token, forwardState] = parseToken(state);
            assertSyntax(
                state,
                isOperator(token, "{"),
                "After 'else', an opening brace '{' is expected",
            );

            let elseBranch;
            [elseBranch, state] = parseBlock(forwardState);

            return [
                {
                    type: "if",
                    condition,
                    thenBranch,
                    elseBranch,
                    start,
                    end: getLocation(state),
                },
                state,
            ];
        }

        return [
            {
                type: "if",
                condition,
                thenBranch,
                start,
                end: getLocation(state),
            },
            state,
        ];
    }

    if (isKeyword(token, "true") || isKeyword(token, "false")) {
        return [
            {
                type: "boolean",
                value: token.value === "true",
                start: token.start,
                end: token.end,
            },
            forwardState,
        ];
    }

    return [undefined, state];
};

export const parseHtmlTag = (
    start: Location,
    state: State,
): [Expression, State] => {
    let token;

    // FIXME: we need a separate HTML token parser, most likely. In HTML
    // newlines work differently, identifiers can contain dashes, etc. We
    // need to parse embedded HTML reasonnably well.
    let forwardState;
    [token, forwardState] = parseToken(state, "htmlTag");
    assertSyntax(
        state,
        token.type === "identifier",
        "After the HTML tag opening operator '<', a tag name was expected, as a simple identifier. " +
            "For example `<div>` or `<input>`.",
    );
    state = forwardState;
    const tagName = token.value;

    const attributes = [];

    [token, state] = parseToken(state, "htmlTag");
    while (true) {
        // Skip arbitrary newlines between attributes
        while (token.type === "newline") {
            [token, state] = parseToken(state);
        }

        if (token.type !== "identifier") {
            break;
        }
        const name = token.value;

        // This must be an HTML attribute, read the equal sign
        [token, forwardState] = parseToken(state);
        assertSyntax(
            state,
            isOperator(token, "="),
            `After an HTML attribute name, the equal sign '=' is expected. For example you might write ` +
                `\`${name}="value"\`.`,
        );
        state = forwardState;

        // Then the value
        [token, state] = parseToken(state);
        if (token.type === "string") {
            // Static string value
            attributes.push({ name, value: token });
        } else {
            assertSyntax(
                state,
                isOperator(token, "{"),
                "expected string or left bracket {",
            );

            let value;
            [value, state] = parseExpression(state);
            [token, state] = parseToken(state);
            assertSyntax(
                state,
                isOperator(token, "}"),
                "expected string or left bracket {",
            );

            attributes.push({ name, value });
        }

        [token, state] = parseToken(state);
    }

    if (isOperator(token, "/>")) {
        // Self-closing tag, such as `<br />`
        return [
            {
                type: "html_element",
                tagName,
                attributes,
                children: [],
                start,
                end: token.end,
            },
            state,
        ];
    }

    assertSyntax(
        state,
        isOperator(token, ">"),
        "After the attributes of an HTML tag, the closing caret '>' is expected. For example " +
            `you might write <${tagName} class="test">`,
    );

    // Ignore heading whitespace.
    let match = /^[\s]+/.exec(state.code);
    if (match) {
        state = consumeChars(state, match[0].length);
    }

    const children = [];

    while (true) {
        // Find text content followed by tag, expression, or closing tag. Strip the trailing space
        // in case of a closing tag.
        match = /^([^<>{}]*?)(?:(\s*<\/)|([<>{}]))/.exec(state.code);
        assertSyntax(
            state,
            match !== null,
            `Unclosed HTML tag. Expected closing tag \`</${tagName}>\`.`,
        );
        if (match[1].length !== 0) {
            // Text content, strip whitespace.
            children.push(match[1].replace(/\s+/g, " "));
            state = consumeChars(state, match[1].length);
        }

        if (match[2] !== undefined) {
            // Closing tag, consume whitespace then closing symbol '</'.
            state = consumeChars(state, match[2].length - 2);
            state = consumeChars(state, 2, "htmlTag");
            break;
        }

        if (match[3] === "{") {
            // Embeddeded expression.
            let exp;
            [exp, state] = parseExpression(consumeChars(state, 1));
            children.push(exp);

            assertSyntax(
                state,
                state.code[0] === "}",
                "expected closing brace",
            );
            state = consumeChars(state, 1);
            continue;
        }

        if (match[3] === "<") {
            // HTML tag
            let exp;
            [exp, state] = parseHtmlTag(
                getLocation(state),
                consumeChars(state, 1, "htmlTag"),
            );
            children.push(exp);
            continue;
        }

        assertSyntax(
            state,
            false,
            "Unexpected closing caret or brace at this position without a matching " +
                "opening tag or expression. If you meant to write a closing tag, it should look like `</div>`.",
        );
    }

    [token, forwardState] = parseToken(state, "htmlTag");
    assertSyntax(
        state,
        token.type === "identifier" && token.value === tagName,
        `The tag does not match the opening tag. It was expected to find \`</${tagName}>\`. ` +
            "If it was meant to be self-closing like for ex. `<br />`, change the opening tag.",
    );

    [token, state] = parseToken(forwardState, "htmlTag");
    assertSyntax(state, isOperator(token, ">"), "expected closing caret");

    return [
        {
            type: "html_element",
            tagName,
            attributes,
            children,
            start,
            end: token.end,
        },
        state,
    ];
};

/**
 * Parse any enumeration such as `(a, b, b)` where the separator and closing
 * token can be customized. The provided state must have already consumed the
 * opening token. It supports newlines being inserted in front and after
 * separators.
 */
export const parseEnumeration = <T>(
    state: State,
    isClosing: (token: Token) => boolean,
    isSeparator: (token: Token) => boolean,
    parseItem: (state: State) => [T, State],
): [T[], State] => {
    let [token, forwardState] = parseToken(state);
    let items = [];

    if (token.type === "newline") {
        // ignore heading newlines
        state = forwardState;
        [token, forwardState] = parseToken(state);
    }

    pauseIfEnd(token);

    // Continue reading as long as we don't get the closing token.
    while (!isClosing(token)) {
        let item;
        [item, state] = parseItem(state);
        items.push(item);

        [token, forwardState] = parseToken(state);

        const isSep = isSeparator(token);
        const isValid = isSep || isClosing(token);
        if (!isValid) pauseIfEnd(token);

        assertSyntax(state, isValid, "Expected separator or closing operator.");

        if (isSep) {
            // Consume the separator.
            state = forwardState;

            // There might be a closing token after separator.
            [token, forwardState] = parseToken(forwardState);
        }
    }

    // Consume closing token
    return [items, forwardState];
};

export class EarlyEndError extends Error {}

function pauseIfEnd(token: Token) {
    if (token.type === "end") {
        throw new EarlyEndError(
            "end of input in the middle of parsing, which could be completed by more lines",
        );
    }
}

export type FunctionStatement = Readonly<
    | ({
          type: "variable_def";
      } & VariableDef)
    | {
          // A standalone expression. Only useful it is has side-effects, such
          // as calling a function.
          type: "expression";
          value: Expression;
      }
    | UseStatement
>;

export function parseStatement(state: State): [FunctionStatement, State] {
    let fstate;

    let exp;
    [exp, fstate] = tryParseExpression(state, 0);
    if (exp !== undefined) {
        return [{ type: "expression", value: exp }, fstate];
    }

    let useSt;
    [useSt, fstate] = tryParseUseStatement(state);
    if (useSt !== undefined) {
        return [useSt, fstate];
    }

    let varDef;
    [varDef, fstate] = tryParseVariableDef(fstate);
    assertSyntax(
        state,
        varDef !== undefined,
        "In a function body, function statements are expected. It could be a variable declaration, " +
            "or a standalone expression.",
    );

    return [{ type: "variable_def", ...varDef }, fstate];
}

export type UseStatement = {
    // Import a module. Ex. `use std` to bring `std` in scope. It could have
    // been something like `let std = import "std"` but (1) this is a lot more
    // verbose and (2) by forcing the local to be named `std` we ensure
    // consistency across modules and codebases.
    type: "use";
    name: Identifier;
} & Range;

export function tryParseUseStatement(
    state: State,
): [UseStatement | undefined, State] {
    let token, forwardState;
    [token, forwardState] = parseToken(state);

    if (!isKeyword(token, "use")) {
        return [undefined, state];
    }
    const start = token.start;

    [token, state] = parseToken(forwardState);
    assertSyntax(
        forwardState,
        token.type === "identifier",
        "expected an identifier after 'use'",
    );

    return [{ type: "use", name: token, start, end: token.end }, state];
}

/**
 * Parse a block of statements between braces. The opening brace must have already
 * been consumed. Returns the statements and state after the closing brace.
 */
const parseBlock = (state: State): [FunctionStatement[], State] => {
    return parseEnumeration(
        state,
        (token) => isOperator(token, "}"),
        (token) => token.type === "newline" || isOperator(token, ";"),
        parseStatement,
    );
};
