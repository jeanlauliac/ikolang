import { parseExpression } from "./expressions";
import { prettyPrintExpr } from "./pretty-print";
import { ParsingError } from "./tokens";
import { formatParsingError } from "./utils";
import { expect, it } from "vitest";

function parseExp(code: string) {
    const [exp, state] = parseExpression({
        code,
        column: 1,
        line: 1,
        semanticTokens: [],
    });
    expect(state.code, "all code should have been consumed").toEqual("");
    return exp;
}

function testAst(code: string, itFn = it) {
    itFn(`parses: ${code}`, () => {
        const exp = parseExp(code);
        const printedCode = prettyPrintExpr(exp, 0);

        const reparsedExp = parseExp(printedCode);
        expect(removeLocations(exp)).toEqual(removeLocations(reparsedExp));
    });
}

// We don't attempt to have column/lines of the pretty printer ouptut match exactly the output.
// Maybe when the pretty printer is better we might do that.
function removeLocations(obj: object) {
    return JSON.parse(
        JSON.stringify(obj, (key, value) => {
            if (["column", "line"].includes(key)) {
                return undefined;
            }
            return value;
        }),
    );
}

const throws = (code: string) => {
    it(`throws: ${code}`, () => {
        let error: Error | undefined;
        try {
            const state = { code, column: 1, line: 1, semanticTokens: [] };
            parseExpression(state, 0);
        } catch (err) {
            error = err as Error;
        }
        expect(error).instanceOf(ParsingError, "not a parsing error");
        expect(formatParsingError(code, error as ParsingError)).toMatchSnapshot(
            `invalid code: ${code}`,
        );
    });
};

it("always collapses whitespace in HTML tags", (t) => {
    expect(
        prettyPrintExpr(parseExp("<div>\n      hello\n     </div>"), 0),
    ).toMatchSnapshot("lone string should be trimmed");
    expect(
        prettyPrintExpr(
            parseExp("<div>\n      <span>hello</span>\n     </div>"),
            0,
        ),
    ).toMatchSnapshot("lone child should be be the sole children");
    expect(
        prettyPrintExpr(
            parseExp(
                "<div>\n      hello\n    <br />    <span>, </span>  world\n     </div>",
            ),
            0,
        ),
    ).toMatchSnapshot(
        "content should be trimmed and newlines replaces by single space",
    );
    expect(
        prettyPrintExpr(parseExp("<div>\n       </div>"), 0),
    ).toMatchSnapshot("should be compacted to self-closing tag");
});

// Simple expressions
testAst("foo");
testAst("foo.bar.glo");
testAst("foo()");
testAst("foo().bar().glo");
testAst("(++5)");
throws("(23, 65)");
throws("()");

// Strings
testAst('"foo"');
testAst(`"hello, {name}"`);
testAst(`"hello, {name} and {name2}"`);
testAst(`"concatenated {name}{name2}"`);
testAst(`"count: {23}"`);
throws('"foo');
throws('"foo{bar 34');

// Numbers
testAst("432");
throws("324980934890238490238904823084023840832849");

// Booleans
testAst("true");
testAst("false");

// Binary operations
testAst("foo + 10");
testAst("foo + 10 + 20");
testAst("foo + 20 * 45");
testAst("(foo + 20) * 45");
testAst("20 * 45 + foo");
testAst("20 + foo()");
testAst("1 > 0 && 1 < 2");
throws("foobar. 34");
throws("(foobar + )");

// Function calls
testAst('foo("bar")');
testAst('foo("bar", )');
testAst('foo("bar", "glo", "biz")');
testAst("foo.bar()");

// Objects
testAst("{}");
testAst('{ foo: 23, bar: "hello" }');
throws("{ 34 }");
throws("{ foo 54 }");

// Lists
testAst("[]");
testAst("[23, 54, 98]");
testAst("someList[0]");

// Dicts and sets
testAst(`dict [ "foo": 23, "bar": 54 ]`);

// Assignment
testAst('foo = "bar"');
testAst('foo.smth = "bar"');
testAst('foo = bar = "baz"');

// Conditions
testAst('if foo { "bar" }');
testAst('if foo { "bar" } else { "baz" }');
// TODO: Add support for else if
// testAst('if foo { "bar" } else if bar { "baz" } else { "glo" }');
throws('if foo "bar"');

// Closures
testAst('(){ "foo" }');
testAst('(a, b, c){ "foo" }');
testAst('(){\n    "foo"\n}');
testAst('mut (){ "foo" }');
testAst(`(){ let foo = "blah"; "glo" }`);
testAst(`(){ slot foo = "blah" }`);
testAst(`(){ let foo = "blah"; "glo"; }`);
testAst(
    `(){
        let foo = "blah"
        "glo"
     }`,
);
throws(`(){ pub let a = "foo" }`);
throws(`mut 324`);
throws(`(bar, 34 + 65) { let a = "foo" }`);

// References
testAst("&foo.bar"); // Ref to a field of the object `foo`
testAst("^foo.bar"); // Def of `foo`, then access `bar`

// Arithmetic
testAst("++foo");
testAst("++foo + 10"); // Increment should not include the "+ 10"

// HTML
testAst("<div>hello</div>");
testAst("<div>\n      hello\n     </div>");
testAst("<div>hello\n   world</div>");
testAst("<div>hello, {world}!</div>");
testAst('<input value="hello" />');
testAst("<div>hello, <span>world!</span></div>");
testAst('<div style="font-size: 1.5rem; ">hello</div>');
testAst("<button onclick={mut (){}}>hello</button>");
throws("< >");
throws("<button ewf 3 >");
throws("<button ");
throws("<button>");
throws("<button></something>");

// Invalid code
throws(`?`);
