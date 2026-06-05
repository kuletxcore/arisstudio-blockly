# Development Notes

## Parameter usage

Blockly variable blocks output the variable name.

For example, if a Blockly variable is named `param1` and contains the string `hello`, and the value input that consumes that variable is named `val1`, use the input value directly when composing generated script text in a define-code block.

The generated JavaScript is similar to:

```js
const value_val1 = javascriptGenerator.valueToCode(block, 'val1', javascriptGenerator.ORDER_ATOMIC);
return `strlist.push(\`load ${value_val1}\`)`;
```

The resulting generated code stores `load hello` in `strlist`.

## Timestamps

`window.numinbigfunc = 0` is reset before each code-generation pass.

`utils/timestamp` reads and increments `window.numinbigfunc` each time `generateTime` is called. Block generators can call `generateTime` to create unique IDs for button jumps and branch structures.

Inside `codetool`, the Blockly-composed JavaScript also maintains an internal timestamp named `incnum`. Button blocks create functions that combine this timestamp with jump targets, so reused Blockly functions do not always jump back to the first button ending.

## Generated JavaScript

- Mainline stages use `stagelist` IDs from 1 through 200. `resmap` stores each stage ID and generated text, while `errorset` stores conflicting IDs.
- Button `if` blocks use timestamps as IDs to avoid collisions.
- Branch blocks require branch IDs. `caseset` records defined branch-jump blocks, and `caseerrorset` records duplicate branch IDs for user feedback.
- Branch container blocks use the same storage layout as mainline blocks, but they live after the mainline range. Branch IDs use 201 through 300.

### Button design

A button is wrapped in a function named with the outer timestamp. Inside the function, the internal timestamp is copied, incremented, and used to name jump targets. The function is then called immediately to append text into the current mainline stage.

Example for outer timestamp `42` and internal timestamp `5`:

- Branch A target: `42caseA5`; branch A ends with `jump 42IfFinal5`.
- Branch B target: `42caseB5`; branch B ends with `jump 42IfFinal5`.
- The final target is `42IfFinal5`.

### Legacy branch design

The older branch implementation simulated multiple calls by copying strings from `resmap`. It created separate script sections with different prefixes and suffixes so a branch jump block could be reused.

This design was removed in version 2.2.2h because button reuse was fixed differently and the branch implementation conflicted with function blocks. The blocks may still be loaded from older Blockly projects, but they are hidden from the toolbox.

## Version compatibility

When importing a Blockly project, the app can fail if a saved block ID has a parameter format that no longer matches the currently registered block definition.

If parameter indexes still line up and the new block has fewer parameters, unknown saved parameters are removed. If the new block has more parameters, the added parameters are left empty.

If a numeric range changes, saved numeric values are clamped to the nearest valid value instead of throwing an error.
