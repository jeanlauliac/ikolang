import { assert, includes } from "../utils";
import { Expression, parseExpression } from "./expressions";
import { isOperator, parseToken, State } from "./tokens";

export type VariableDef = {
    name: string;
    initialValue: Expression;
    mode: "let" | "slot";
};

export const tryParseVariableDef = (
    state: State,
): [VariableDef | undefined, State] => {
    let [token, fstate] = parseToken(state);

    if (token.type !== "keyword") {
        return [undefined, state];
    }

    const mode = token.value;
    if (!includes(["let", "slot"] as const, mode)) {
        return [undefined, state];
    }

    state = fstate;

    // defines variable, read name first
    [token, state] = parseToken(state);
    assert(token.type === "identifier", "expected an identifier after 'let'");

    const name = token.value;

    // Then we expect assigment
    [token, state] = parseToken(state);
    assert(isOperator(token, "="), "Expected '=' operator");

    let initialValue;
    [initialValue, state] = parseExpression(state);

    return [{ name, initialValue, mode }, state];
};
