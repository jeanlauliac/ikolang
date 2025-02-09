import { interpret } from "../interpret/interpret";
import jsdom from "jsdom";
import { formatError } from "../interpret/utils";
import { expect } from "vitest";

export function testcase(
    code: string,
    expectedOutput: string,
    expectedDom?: string,
) {
    return async () => {
        const dom = new jsdom.JSDOM(
            '<!DOCTYPE html><div id="temporary_target_render_zone"></div>',
        );
        const { document } = dom.window;

        let result = "";
        let print = (message: string) => (result += `${message}\n`);
        const ab = new AbortController();
        try {
            await interpret(code, ab.signal, {
                document,
                print,
                disableWaitOnBindings: true,
            });
        } catch (error) {
            console.error(formatError(code, error));
            throw error;
        }

        expect(result).toEqual(expectedOutput);
        if (expectedDom !== undefined) {
            expect(
                document.getElementById("temporary_target_render_zone")
                    ?.innerHTML,
            ).toEqual(expectedDom);
        }
    };
}
