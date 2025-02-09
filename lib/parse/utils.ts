import chalk from "chalk";
import { FormatOptions, wordWrap } from "../utils";
import { ParsingError } from "./tokens";

export function formatParsingError(
    code: string,
    error: ParsingError,
    opts?: FormatOptions,
): string {
    const lines = code.split("\n");
    const prefix = opts?.enableColor ? chalk.red("error") : "error";
    return [
        lines[error.state.line - 1],
        " ".repeat(error.state.column - 1) + "^",
        wordWrap(
            `${prefix}(${error.state.line}:${error.state.column}): ${error.message}`,
            opts?.maxWidth,
        ),
    ].join("\n");
}
