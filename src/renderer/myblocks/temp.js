import * as Blockly from 'blockly/core';
import { javascriptGenerator } from 'blockly/javascript';
import { wrapStr } from 'renderer/utils/DataTool';
// Define a custom module in JSON format
let blockname="b_temp"
// Student name with mapping
const jsondesc = {
    "type": `${blockname}`,
    "message0": "Text Variables %1 dropdown %2 number %3",
    "args0": [
      {
        "type": "input_value",
        "name": "val1",
        "check": "String"
      },
      {
        "type": "field_dropdown",
        "name": "drop1",
        "options": [
            ["",""],
            ["",""],
        ]
      },
      {
        "type": "field_number",
        "name": "num1",
        "min": 0,
        "value": 1,
        "max": 1000,
        "precision": 0.1,
      },
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": 230,
    "tooltip": "",
    "helpUrl": ""
  }

// Inject the custom module
Blockly.Blocks[blockname] = {
    init: function () {
        this.jsonInit(jsondesc);
    }
}

// Add a JavaScript generator for the custom block
javascriptGenerator[blockname] = function (block) {
    const value_val1 = javascriptGenerator.valueToCode(block, 'val1', javascriptGenerator.ORDER_ATOMIC);
    const dropdown_drop1 = block.getFieldValue('drop1');
    const number_num1 = block.getFieldValue('num1');


    return `stagelist.push(\`Variables\${${value_val1}} dropdown${dropdown_drop1} number${number_num1}\`);`
}

