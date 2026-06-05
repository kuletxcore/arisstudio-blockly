import * as Blockly from 'blockly/core';
import { javascriptGenerator } from 'blockly/javascript';
import mySounder from 'renderer/models/soundcmd';
import { wrapStr } from 'renderer/utils/DataTool';
// Define a custom module in JSON format
let blockname="b_sound_loop"
// Student name with mapping
const jsondesc = {
    "type": `${blockname}`,
    "message0": "Sound nickname %1 set to %2",
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
            ["LoopPlay","loop"],
            ["Play once","once"]
        ]
      },
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": 230,
    "tooltip": "Sound effects play once by default; BGM loops by default",
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
    const type = block.getFieldValue('drop1');


    return `stagelist.push(\`${mySounder.loop(wrapStr(nickname),type)}\`);`
}

