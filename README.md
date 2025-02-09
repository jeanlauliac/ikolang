<img align="right" src="./logo.svg" alt="Iko logo" width="150" />

# Iko programming language

Iko is an experimental programming language designed around the idea of
functional reactive programming, but with an approachable syntax not
unlike JavaScript and other imperative languages.

```
let main = mut () {
    print("Hello, world!");
}
```

## First principles

Functions are the basic building block of an Iko program. There are two types of
functions:

-   Imperative functions, the bread and butter of imperative languages. They can
    mutate external variables, trigger side effects and generally make things
    happen.
-   Reactive functions, which cannot have visible side effects outside of the
    function scope. They are re-evaluated whenever external state changes.

As much as possible, there's only one way to do something. The syntax avoids
syntactic sugar for the sake of it.

Each file is a module. Modules can be imported using the `use` keyword. (At the
time of writing, only the standard library can be imported.) All declarations in
a module are private by default, and can be exposed using the `pub` keyword.
This includes structure fields, which by default are private to the module (not
private to the structure itself.) Visibility is always scoped at module level.

There is no `null` or `undefined` value (though you could represent it with
an empty structure), and things are strict in general. There is no exception,
and operational errors like failing to fetch a value are explicitly handled.
Events like accessing a list out of bounds will terminate the program to
avoid unpredictable behavior.

Types are nominal, not structural. You can easily create new types, notably
unions which can include primitives and structs.

## Future works

-   IO functions like `fetch()` will return promises, which won't need to be
    awaited explicitly. Instead, the language will suspend the current function(s)
    until all promises are resolved. The result of the fetch will be available as
    a regular value, transparently. This allows triggering the maximum parallel
    work possible, including fetching multiple resources in parallel.
-   Modules will be able to be imported using the `use` keyword.
-   Test files will be built-in and named like `foo.test.idg`. They will be able
    to access private members of `foo.idg`.
