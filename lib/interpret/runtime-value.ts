import { FunctionExpression } from "../parse/expressions";
import { Range } from "../parse/tokens";
import { Context } from "./evaluate-expression";

export type Scope = {
    // FIXME: needs to be a ref
    names: {
        [name: string]: ValueRef;
    };
    parent?: Scope;
};

// `let` can be mutated, `const` cannot. `slot` is a special type that can only
// be mutated from `mut` functions and will cause re-rendering. `literal` is
// used for top-level imports and declarations that can never be mutated.
export type ValueRef =
    | {
          value: RuntimeValue;
          type: "literal" | "let";
      }
    | {
          type: "slot";
          ref: { value: RuntimeValue };
      };

export type RuntimeValue =
    | string
    | number
    | boolean
    | { type: "reference"; target: Reference }
    | {
          type: "builtin_function";
          invoke: (
              args: RuntimeValue[],
              context: Context,
          ) => RuntimeValue | null;
          // TODO: remove and instead have the function itself check the context
          isMut: boolean;
      }
    | {
          type: "function";
          // TODO: combine with builtin_function
          definition: FunctionExpression;
          scope: Scope;
      }
    | {
          type: "struct";
          staticFields: Record<string, RuntimeValue>;
      }
    // Ref-counted values
    | ((
          | {
                type: "object";
                // FIXME: if left unspecified them it's an anonymous struct.
                struct?: RuntimeValue & { type: "struct" };
                fields: { [key: string]: RuntimeValue };
            }
          | {
                type: "list";
                values: RuntimeValue[];
            }
          | {
                type: "dict";
                // Key is a stringified version of the key value.
                values: Map<string, [RuntimeValue, RuntimeValue]>;
            }
      ) & {
          /**
           * How many places refer to this object right now. This could be for
           * example a parent object, or a `let` or `slot` binding. If an object
           * has a refCount of 0, it means it's a temporary object being passed
           * around, not refered to anywhere (yet).
           *
           * For example in `let foo = { hello: 'world' };` the object literal
           * initially as a `refCount` of 0, which get incremented to 1 when
           * assigned to `foo`. If you later do `let bar = foo;`, the refCount
           * will be incremented to 2. If a field in `bar` is mutated, ex.
           * `bar.hello = 'earth';`, the object will be cloned and both
           * resulting objects will have a refCount of 1 (for `foo` and `bar`).
           */
          refCount: number;
      });

export type Reference =
    | {
          type: "memberAccess";
          target: Reference;
          name: string;
      }
    | {
          type: "indexAccess";
          target: Reference;
          index: number;
      }
    | {
          type: "keyAccess";
          target: Reference;
          keyValue: RuntimeValue;
          uniqueKey: string;
      }
    | {
          type: "slot";
          ref: { value: RuntimeValue };
      }
    | { type: "let"; value: RuntimeValue };

export type ExternalApi = {
    print: (data: string) => void;
    document: Document;
    disableWaitOnBindings?: true;
};

export type Globals = {
    pendingTimeouts: Set<NodeJS.Timeout>;
    boundDomElements: HTMLElement[];
    refreshers: ((context: Context & { type: "mut" }) => void)[];
    api: ExternalApi;
    terminateProgram: (cause?: unknown) => void;
    std: Record<string, RuntimeValue>;
};

export const resolveName = (
    scope: Scope | undefined,
    name: string,
): ValueRef | undefined => {
    let resolved: ValueRef | undefined;
    while (
        scope !== undefined &&
        (resolved = scope.names[name]) === undefined
    ) {
        scope = scope.parent;
    }
    return resolved;
};
