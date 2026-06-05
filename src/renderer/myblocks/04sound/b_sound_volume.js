import * as Blockly from 'blockly/core';
import { javascriptGenerator } from 'blockly/javascript';
import mySounder from 'renderer/models/soundcmd';
import { wrapStr } from 'renderer/utils/DataTool';
// Define a custom module in JSON format
let blockname="b_sound_volume"
// Student name with mapping
const jsondesc = {
    "type": `${blockname}`,
    "message0": "Sound nickname %1 Volume fade to %2, duration %3 seconds",
    "args0": [
      {
        "type": "input_value",
        "name": "val1",
        "check": "String"
      },
      {
        "type": "field_number",
        "name": "num1",
        "min": 0,
        "value": 0,
        "max": 1,
        "precision": 0.1,
      },
      {
        "type": "field_number",
        "name": "num2",
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
    const nickname = javascriptGenerator.valueToCode(block, 'val1', javascriptGenerator.ORDER_ATOMIC);
    const vol = block.getFieldValue('num1');
    const spendtime = block.getFieldValue('num2');



    return `stagelist.push(\`${mySounder.fade(wrapStr(nickname),vol,spendtime)}\`);`
}

