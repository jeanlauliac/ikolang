export function assert(value: boolean, message: string): asserts value {
    if (!value) throw new Error(`error: ${message}`);
}

/**
 * Execute one of the given function depending on the "key" value of an object.
 * @param obj The object to match on, for example something like `{ type: 'smth', value: string }`
 * @param key The key field to match on, for example `type` in the above object.
 * @param clauses An object associating each possible value of the key field to a function to
 * execute. For example in the above example we might have `{ smth: () => {} }`
 * @returns The value returned by the executed clause.
 */
export function match<Key extends string, T extends { [K in Key]: string }, R>(
    obj: T,
    key: Key,
    clauses: { [K in T[Key]]: (value: T & { [M in Key]: K }) => R },
) {
    const value = obj[key];
    const clause = clauses[value];
    if (clause) {
        return clause(obj as any);
    }
    throw new Error(`No match for key: ${value}`);
}

export function includes<T extends readonly any[]>(
    arr: T,
    item: unknown,
): item is T[number] {
    return arr.includes(item);
}

export function mapObject<T extends object, U extends object>(
    obj: T,
    mapper: (keyValue: [string, unknown]) => [keyof U, U[keyof U]],
): U {
    const result: Partial<U> = {};
    for (const entry of Object.entries(obj)) {
        const [nkey, nvalue] = mapper(entry);
        result[nkey] = nvalue;
    }
    return result as U;
}

export function wordWrap(message: string, maxLineLen: number = 100) {
    if (maxLineLen === Infinity) {
        return message;
    }

    const words = message.split(" ");
    let result = words[0];
    let lineLen = result.length;
    for (let i = 1; i < words.length; ++i) {
        const newWord = words[i];
        if (lineLen + newWord.length + 1 >= maxLineLen) {
            result += `\n${newWord}`;
            lineLen = newWord.length;
        } else {
            result += ` ${newWord}`;
            lineLen += newWord.length + 1;
        }
    }
    return result;
}

export type FormatOptions = { enableColor: boolean; maxWidth: number };
