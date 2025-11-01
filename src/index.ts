import { MockDataAssembler } from "./model/MockDataAssembler.js";

console.log("|=================================|")
console.log("|====== Mock JSON Generator ======|")
console.log("|=================================|")

const assembler = new MockDataAssembler()
assembler.getKeys()
assembler.getValues()

console.log(assembler.values)