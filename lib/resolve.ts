import { match } from "./utils";
import { Module, ModuleStatement } from "./parse/module";

type ResolvedModule = { definitions: Map<string, ModuleStatement> };
export const resolveModule = (moduleTree: Module): ResolvedModule => {
    const definitions = new Map();

    for (const st of moduleTree.statements) {
        match(st, "type", {
            variable_def: ({ name }) => {
                definitions.set(name, st);
            },
            use: ({ name }) => {
                definitions.set(name, st);
            },
        });
    }
    return { definitions };
};
