import { it } from "vitest";
import { testcase } from "./utils";

it(
    "simple output binding with single slot",
    testcase(
        `
use std

pub let main = mut () {
    slot name = "world"
    std.bindTTY(() { "hello, {name}" })
}
`,
        "hello, world\n",
    ),
);

it(
    "simple output binding with single slot, updated after a delay",
    testcase(
        `
use std

pub let main = mut () {
    slot name = "world"
    std.bindTTY(() { "hello, {name}" })
    std.schedule(0, () {
        name = "mars"
    })
}
`,
        "hello, world\nhello, mars\n",
    ),
);

it(
    "simple output binding with single inside slot",
    testcase(
        `
use std

pub let main = mut () {
    std.bindTTY(() {
        slot name = "world"
        "hello, {name}"
    })
}
`,
        "hello, world\n",
    ),
);

it(
    "html reactive output",
    testcase(
        `
use std

pub let main = mut () {
    slot counter = 1
    std.schedule(0, mut (){ ++counter })

    std.bindNode((){ <div>count: {counter}</div> })
}
    `,
        "",
        "<div>count: 2</div>",
    ),
);
