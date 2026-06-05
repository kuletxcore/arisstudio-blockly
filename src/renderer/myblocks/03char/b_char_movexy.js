import * as Blockly from 'blockly/core';
import { javascriptGenerator } from 'blockly/javascript';
import myCharer from 'renderer/models/charcmd';
import { wrapStr } from 'renderer/utils/DataTool';

// Define a custom module in JSON format
let blockname="b_char_movexy"
// Student name with mapping
const jsondesc = {
    "type": `${blockname}`,
    "message0": "Character nickname %1 move to x-axis: %2 y-axis: %3, duration %4 seconds",
    "args0": [
      {
        "type": "input_value",
        "name": "val1",
        "check": "String"
      },
      {
        "type": "field_number",
        "name": "num1",
        "min": -1000,
        "value": 0,
        "max": 1000,
        "precision": 0.1,
      },
      {
        "type": "field_number",
        "name": "num2",
        "min": -1000,
        "value": 0,
        "max": 1000,
        "precision": 0.1,
      },
      {
        "type": "field_number",
        "name": "num3",
        "min": 0,
        "value": 0,
        "max": 100,
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
    const nickname = javascriptGenerator.valueToCode(block, 'val1', javascriptGenerator.ORDER_ATOMIC);
    const axis = block.getFieldValue('drop1');
    const xx = block.getFieldValue('num1');
    const yy = block.getFieldValue('num2');
    const spendtime = block.getFieldValue('num3');


    return `stagelist.push(\`${myCharer.movexy(wrapStr(nickname),xx,yy,spendtime)}\`);`
}

