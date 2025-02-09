import fs from "fs";
import path from "path";
import { interpret } from "./lib/interpret/interpret";
import { ParsingError } from "./lib/parse/tokens";
import { REPL } from "./lib/interpret/repl";
import readline from "node:readline";
import { inspect } from "./lib/interpret/std";
import { formatError } from "./lib/interpret/utils";
import { EarlyEndError } from "./lib/parse/expressions";
import packageJson from "./package.json";

const main = () => {
    const projectPath = process.argv[2];
    if (projectPath === undefined) {
        console.log(`Welcome to ${packageJson.name} v${packageJson.version}`);
        const repl = new REPL();

        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
            terminal: true,
        });

        rl.setPrompt("> ");
        rl.prompt();

        const maxWidth = Math.min(80, process.stdout.columns);
        const formatOpts = { enableColor: true, maxWidth };

        let multilineInput = "";
        rl.on("line", (input) => {
            multilineInput += input;
            let value = null;

            try {
                value = repl.run(multilineInput);

                if (value !== null) {
                    console.log(inspect(value, 0, formatOpts));
                }
            } catch (error) {
                if (error instanceof EarlyEndError) {
                    multilineInput += "\n";
                    // Get potential next line of code.
                    rl.setPrompt("| ");
                    rl.prompt();
                    return;
                }

                console.error(formatError(input, error, formatOpts));
            }
            multilineInput = "";
            rl.setPrompt("> ");

            rl.prompt();
        }).on("close", () => {
            console.log();
        });

        return;
    }

    const filePath = path.join(projectPath, "main.idg");
    const code = fs.readFileSync(filePath, "utf-8");
    try {
        const ab = new AbortController();
        interpret(code, ab.signal, {
            print: console.log,
            document: undefined as any,
        });
    } catch (error) {
        if (error instanceof ParsingError) {
            const { state } = error;
            console.error(
                `error: ${filePath}(${state.line}:${state.column}): ${error.message}`,
            );
            process.exitCode = 2;
        } else {
            throw error;
        }
    }
};

main();
