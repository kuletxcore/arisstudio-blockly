import * as Blockly from 'blockly/core';
import { javascriptGenerator } from 'blockly/javascript';
import myLoader from 'renderer/models/loadcmd'
import { wrapStr } from 'renderer/utils/DataTool';
// Define a custom module in JSON format
let blockname="b_load_sound"
// Student name with mapping
const jsondesc = {
    "type": `${blockname}`,
    "message0": "Load %1 sound nickname %2 Filename %3",
    "args0": [
        {
            "type": "field_dropdown",
            "name": "drop1",
            "options": [
                ["background","bgm"],
                ["Sound","sfx"]
            ]
        },
        {
            "type": "input_value",
            "name": "val1",
            "check": "String"
        },
        {
            "type": "input_value",
            "name": "val2",
            "check": "String"
        }
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": 230,
    "tooltip": "Sound files must be placed in /data/audio/sfx.\nBGM files must be placed in /data/audio/bgm.\nSound effects play once by default; BGM loops by default.",
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
    const type = block.getFieldValue('drop1');
    const nickname = javascriptGenerator.valueToCode(block, 'val1', javascriptGenerator.ORDER_ATOMIC);
    const filename = javascriptGenerator.valueToCode(block, 'val2', javascriptGenerator.ORDER_ATOMIC);
    

    return `stagelist.push(\`${myLoader.load(type,wrapStr(nickname),wrapStr(filename))}\`);`
}

