import { testcase } from "./utils";
import { it } from "vitest";

it(
    "hello world",
    testcase(
        `
use std

pub let main = mut (){
    std.print("hello, world")
}
`,
        "hello, world\n",
    ),
);

it(
    "simple global constant reference",
    testcase(
        `
use std

let GREETINGS = "hello, world"

pub let main = mut (){
    std.print(GREETINGS)
}`,
        "hello, world\n",
    ),
);

it(
    "simple local variable references",
    testcase(
        `
use std

pub let main = mut (){
    let name = "world"
    std.print("hello, {name}")
}`,
        "hello, world\n",
    ),
);

it(
    "simple global+local variable references",
    testcase(
        `
use std

let GREETINGS = "hello, world"

pub let main = mut (){
    let local_var = GREETINGS
    std.print(local_var)
}`,
        "hello, world\n",
    ),
);

it(
    "simple function call",
    testcase(
        `
use std

let GREETINGS = "hello, world"

let get_greetings = (){ GREETINGS }

pub let main = mut (){
    let local_var = get_greetings()
    std.print(local_var)
}`,
        "hello, world\n",
    ),
);

it(
    "simple output binding with no reactivity",
    testcase(
        `
use std

pub let main = mut (){
    std.bindTTY(() { "hello, world" })
}
`,
        "hello, world\n",
    ),
);

it(
    "object are copied by value",
    testcase(
        `
use std

pub let main = mut (){
    let testObj = { name: "jean", age: 20 }
    testObj.name = "jane"

    // Copied by value, not by ref.
    let otherObj = testObj
    // So mutating doesn't change the original object.
    otherObj.name = "john"

    std.print(testObj.name)
    std.print(otherObj.name)
}
`,
        "jane\njohn\n",
    ),
);

it(
    "lists are copied by value",
    testcase(
        `
use std

pub let main = mut (){
    let testList = [1, 2, 3]
    let otherList = testList
    otherList.push(4)

    // Only the original elements.
    std.print(std.inspect(testList))

    // With the new element
    std.print(std.inspect(otherList))
}
`,
        "[ 1, 2, 3 ]\n[ 1, 2, 3, 4 ]\n",
    ),
);

it(
    "dicts are copied by value",
    testcase(
        `
use std

pub let main = mut (){
    let testDict = dict ["value": 10]
    let otherDict = testDict
    otherDict["style"] = "color: red"

    // Only the original elements.
    std.print(std.inspect(testDict))

    // With the new element
    std.print(std.inspect(otherDict))
}
`,
        `dict [ "value": 10 ]\ndict [ "value": 10, "style": "color: red" ]\n`,
    ),
);

it(
    "dict support any kind of keys",
    testcase(
        `
use std

pub let main = mut (){
    let testDict = dict [
        1: "numbers"
        "key": "strings"
        {foo: "bar"}: "objects"
        [1, 2, 3]: "list"
        dict[ "hello": "world" ]: "dicts"
    ]

    std.print(std.inspect(testDict))

    // Each value can be accessed by value, not object references.
    std.print(testDict[1])
    std.print(testDict["key"])
    std.print(testDict[{foo: "bar"}])
    std.print(testDict[[1, 2, 3]])
    std.print(testDict[dict[ "hello": "world" ]])
}
`,
        `dict [ 1: "numbers", "key": "strings", { foo: "bar" }: "objects", [ 1, 2, 3 ]: "list", dict [ "hello": "world" ]: "dicts" ]
numbers
strings
objects
list
dicts
`,
    ),
);

it(
    "type static functions (ex. List) can be called two ways",
    testcase(
        `
use std

pub let main = mut (){
    let testList = []
    
    // Using the static function on the type.
    std.List.push(&testList, 1)

    // Using the shorthand syntax.
    testList.push(2)

    // You can also keep the function for later, although that's a niche use case.
    let push = testList.push
    push(3)

    std.print(std.inspect(testList))
}
`,
        "[ 1, 2, 3 ]\n",
    ),
);
