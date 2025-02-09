import chalk from "chalk";
import { ParsingError } from "../parse/tokens";
import { formatParsingError } from "../parse/utils";
import { FormatOptions, wordWrap } from "../utils";
import { EvaluationError } from "./evaluate-expression";
import { RuntimeValue } from "./runtime-value";

export function formatEvaluationError(
    code: string,
    error: EvaluationError,
    opts?: FormatOptions,
): string {
    const lines = code.split("\n");
    const len = error.range.end.column - error.range.start.column;
    const prefix = opts?.enableColor ? chalk.red("error") : "error";
    return [
        lines[error.range.start.line - 1],
        " ".repeat(error.range.start.column - 1) + "^".repeat(len),
        wordWrap(
            `${prefix}(${error.range.start.line}:${error.range.start.column}): ${error.message}`,
            opts?.maxWidth,
        ),
    ].join("\n");
}

export function formatError(
    code: string,
    error: unknown,
    opts?: FormatOptions,
): string {
    if (error instanceof ParsingError) {
        return formatParsingError(code, error, opts);
    }
    if (error instanceof EvaluationError) {
        return formatEvaluationError(code, error, opts);
    }
    if (error instanceof Error && error.stack) {
        return error.stack;
    }
    return `${error}`;
}

export function isObject(value: RuntimeValue): value is RuntimeValue & object {
    return typeof value === "object" && value !== null;
}

export function isRef(
    value: RuntimeValue,
): value is RuntimeValue & object & { type: "reference" } {
    return isObject(value) && value.type === "reference";
}
