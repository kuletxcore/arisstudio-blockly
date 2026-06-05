import * as Blockly from 'blockly/core';
import { javascriptGenerator } from 'blockly/javascript';

/**
 * Defines a stage; smaller stage numbers run earlier
 */

// Define a custom module in JSON format
const jsondesc = {
    "type": "b_case",
    "message0": "Define Code Block (unique) %1 %2",
    "args0": [
      {
        "type": "field_number",
        "name": "num1",
        "value": 201,
        "min": 201,
        "max": 300,
        "precision": 1,
      },
      {
        "type": "input_statement",
        "name": "sta1"
      }
    ],
    "colour": 290,
    "tooltip": "",
    "helpUrl": ""
  }

// Inject the custom module
Blockly.Blocks['b_case'] = {
    init: function () {
        this.jsonInit(jsondesc);
    }
}

// Add a JavaScript generator for the custom block
javascriptGenerator['b_case'] = function (block) {
    // stagenumber
    const number_val1 = block.getFieldValue('num1');
    // Ignore code to the right of the stage
    // var value_valeinput = javascriptGenerator.valueToCode(block, 'stageinput', javascriptGenerator.ORDER_ATOMIC);
    // Wrapped inner code
    const statements_steps = javascriptGenerator.statementToCode(block, 'sta1');
    return `
// branch${number_val1}code
function bcasefunc${number_val1}(){
${statements_steps.trim()}
}
if(resmap.has(${number_val1})){
    errorset.add(${number_val1});
}else{
    resmap.set(${number_val1},"\\n");
}
// branch${number_val1}code end
`
}
