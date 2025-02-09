import { expect, it } from "vitest";
import { parseToken } from "./tokens";

const test = (name: string, code: string) => {
    it(name, () => {
        const [exp, state] = parseToken({
            code,
            column: 1,
            line: 1,
            semanticTokens: [],
        });

        expect(
            state.code,
            "all code should have been consumed until the whitespace",
        ).toBe(" bar");
        expect(exp).toMatchSnapshot(name);
    });
};

// Simple tokens
test("identifier", "foo bar");
test("keyword", "mut bar");
test("operator", "/> bar");
test("string", '"hello, world" bar');
test("number", "1234 bar");

// White space
test("trailing whitespace", "    \n bar");

// Comments
test("single-line comment", "// hello, world\n bar");
test(
    "single-line comment, multiple lines",
    " // hello, world\n      // indented second line\n bar",
);
