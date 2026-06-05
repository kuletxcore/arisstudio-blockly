import * as Blockly from 'blockly/core';
import { javascriptGenerator } from 'blockly/javascript';
import { generateTime } from 'renderer/utils/timestamp';

// Define a custom module in JSON format
let blockname="b_case_jump"
// Student name with mapping
const jsondesc = {
    "type": `${blockname}`,
    "message0": "Run Code Block %1",
    "args0": [
      {
        "type": "field_number",
        "name": "num1",
        "min": 201,
        "value": 201,
        "max": 300,
        "precision": 1,
      },
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": 290,
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
    const number_num1 = block.getFieldValue('num1');//id
    const timestamp=generateTime();

    return `
// Push the timestamp that uses this branch block into the case_jump_dict list for this ID
if(typeof bcasefunc${number_num1}==="undefined"){
  throw new Error("code block${number_num1}is not defined")
}else{
  bcasefunc${number_num1}();
}
`
}

