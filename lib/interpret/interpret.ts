import { parseModule } from "../parse/module";
import { assert, match } from "../utils";
import { resolveModule } from "../resolve";
import { ExternalApi, Globals, Scope } from "./runtime-value";
import { evalUseStatement, invokeRootMutFunction } from "./invoke-function";
import {
    assertEval,
    evaluateExpression,
    incrObjectRefCount,
} from "./evaluate-expression";
import { getStdModule } from "./std";

export const interpret = (
    code: string,
    abortSignal: AbortSignal,
    api: ExternalApi,
): Promise<void> =>
    new Promise((resolve, reject) => {
        const terminateProgram = (cause?: unknown) => {
            for (const timeout of globals.pendingTimeouts) {
                clearTimeout(timeout);
            }
            globals.pendingTimeouts.clear();

            if (!api.disableWaitOnBindings) {
                for (const el of globals.boundDomElements) {
                    for (const child of el.children) el.removeChild(child);
                }
                globals.boundDomElements = [];
            }
            if (cause !== undefined) reject(cause);
            else resolve();
        };

        const moduleTree = parseModule(code);
        const module = resolveModule(moduleTree);

        const globals = createGlobals(api, terminateProgram);

        abortSignal.onabort = () => {
            terminateProgram(new Error("program aborted"));
            return;
        };

        const scope: Scope = { names: {} };

        for (const [name, def] of module.definitions) {
            match(def, "type", {
                use: (def) => {
                    evalUseStatement(def, scope, globals);
                },

                variable_def: (def) => {
                    const { value } = evaluateExpression(
                        def.initialValue,
                        scope,
                        {
                            // Can't have any side effect in initial value of
                            // top-level variable definitions.
                            type: "pure",
                            globals,
                        },
                    );
                    scope.names[name] = {
                        type: "literal",
                        value: incrObjectRefCount(value),
                    };
                },
            });
        }

        const mainFn = scope.names["main"];
        assert(mainFn !== undefined, "could not find entry point 'main'");
        assert(mainFn.type === "literal", "main is a literal");

        invokeRootMutFunction(mainFn.value, [], globals);
    });

export function createGlobals(
    api: ExternalApi,
    terminateProgram: () => void,
): Globals {
    return {
        pendingTimeouts: new Set(),
        boundDomElements: [],
        api,
        refreshers: [],
        terminateProgram,
        std: getStdModule(),
    };
}
