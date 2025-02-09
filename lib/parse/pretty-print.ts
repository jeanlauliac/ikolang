import {
    Expression,
    FunctionStatement,
    getOperatorPrecedence,
    rightAssociativeOperators,
} from "./expressions";
import { Module } from "./module";
import { VariableDef } from "./variable-def";

/**
 * Crude pretty printer for a module. It might generate long lines, etc. but it should still always
 * be valid syntax and can be parsed back.
 *
 * FIXME: use prettier as the base for a proper pretty printer which properly wraps lines, etc. (?)
 */
export function prettyPrint(module: Module): string {
    let result = "";
    for (const st of module.statements) {
        switch (st.type) {
            case "use":
                result += `use ${st.name}\n`;
                break;

            case "variable_def":
                result += `${st.isPublic ? "pub " : ""}${printVarDef(st)}`;
                break;
        }
    }
    return result;
}

export function prettyPrintExpr(expr: Expression, precedence: number): string {
    switch (expr.type) {
        case "binary_operation": {
            let prec = getOperatorPrecedence(expr.operator);
            if (rightAssociativeOperators.has(expr.operator)) ++prec;
            const inner = `${prettyPrintExpr(expr.left, prec)} ${expr.operator} ${prettyPrintExpr(expr.right, prec)}`;
            if (prec < precedence) {
                return `(${inner})`;
            }
            return inner;
        }

        case "function": {
            const prst = expr.parameters.join(", ");
            let stst = expr.statements.map((s) => prettyPrintSt(s)).join("\n");
            if (expr.statements.length === 1) {
                stst = ` ${stst} `;
            } else {
                stst = `\n${stst}\n`;
            }
            return `${expr.isMut ? "mut " : ""}(${prst}) {${stst}}`;
        }

        case "function_call": {
            const argst = expr.arguments
                .map((arg) => prettyPrintExpr(arg, 0))
                .join(", ");
            const prec = getOperatorPrecedence("(");
            return `${prettyPrintExpr(expr.target, prec)}(${argst})`;
        }

        case "html_element": {
            const attrStr = expr.attributes
                .map(
                    (attr) =>
                        ` ${attr.name}={${prettyPrintExpr(attr.value, 0)}}`,
                )
                .join("");

            if (expr.children.length === 0) {
                return `<${expr.tagName}${attrStr} />`;
            }

            let str = "";
            for (const child of expr.children) {
                if (typeof child === "string") {
                    str += child;
                } else if (child.type === "html_element") {
                    // HTML elements are always wrapped in a tag, so we don't need to wrap them in
                    // extra curly braces.
                    str += prettyPrintExpr(child, 0);
                } else {
                    str += `{${prettyPrintExpr(child, 0)}}`;
                }
            }

            return `<${expr.tagName}${attrStr}>${str}</${expr.tagName}>`;
        }

        case "integer":
            return `${expr.value}`;

        case "member_access": {
            const prec = getOperatorPrecedence(".");
            return `${prettyPrintExpr(expr.target, prec)}.${expr.name.value}`;
        }

        case "index_access": {
            const prec = getOperatorPrecedence("[");
            return `${prettyPrintExpr(expr.target, prec)}[${prettyPrintExpr(expr.index, 0)}]`;
        }

        case "object":
            return `{ ${expr.fields.map((f) => `${f.name}: ${prettyPrintExpr(f.value, 0)}`).join(", ")} }`;

        case "list":
            return `[ ${expr.items.map((v) => prettyPrintExpr(v, 0)).join(", ")} ]`;

        case "dict":
            return `dict [ ${expr.items.map((v) => `${prettyPrintExpr(v.key, 0)}: ${prettyPrintExpr(v.value, 0)}`).join(", ")} ]`;

        case "identifier":
            return expr.name;

        case "string": {
            let str = expr.parts[0];
            for (let i = 1; i < expr.parts.length; ++i) {
                str += `{${prettyPrintExpr(expr.expressions[i - 1], 0)}}`;
                // FIXME: escape special characters
                str += expr.parts[i];
            }
            return `"${str}"`;
        }

        case "unary_operation":
            const prec = getOperatorPrecedence(".");
            return `${expr.operation}${prettyPrintExpr(expr.target, prec)}`;

        case "struct":
            return `struct {}`;

        case "boolean":
            return expr.value ? "true" : "false";

        case "if": {
            const cond = prettyPrintExpr(expr.condition, 0);
            const then = expr.thenBranch
                .map((s) => prettyPrintSt(s))
                .join("\n");
            const elseBranch = expr.elseBranch
                ? ` else { ${expr.elseBranch.map((s) => prettyPrintSt(s)).join("\n")} }`
                : "";
            return `if ${cond} { ${then} }${elseBranch}`;
        }
    }
}

export function prettyPrintSt(st: FunctionStatement): string {
    switch (st.type) {
        case "expression":
            return prettyPrintExpr(st.value, 0);

        case "variable_def": {
            return printVarDef(st);
        }

        case "use": {
            return `use ${st.name}\n`;
        }
    }
}

export function printVarDef(st: VariableDef) {
    return `${st.mode} ${st.name} = ${prettyPrintExpr(st.initialValue, 0)}`;
}
