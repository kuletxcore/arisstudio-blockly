import * as Blockly from 'blockly/core';
import { javascriptGenerator } from 'blockly/javascript';
import myLoader from 'renderer/models/loadcmd'
import { wrapStr } from 'renderer/utils/DataTool';
import { students_datamap } from 'renderer/datamap';
// Define a custom module in JSON format
let blockname="b_load_studentselect"
// Student name with mapping
const jsondesc = {
    "type": `${blockname}`,
    "message0": "Load character nickname %1 spr name %2 %3",
    "args0": [
      {
        "type": "input_value",
        "name": "val1",
        "check": "String"
      },
      {
        "type": "field_dropdown",
        "name": "drop1",
        "options": students_datamap
      },
      {
        "type": "field_dropdown",
        "name": "drop2",
        "options": [
            ["Normal state","spr"],
            ["Communication state","sprc"],
        ]
      },
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": 230,
    "tooltip": "Spine character assets must be placed in the /data/character/spr folder",
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
    const sprname = block.getFieldValue('drop1');
    const state = block.getFieldValue('drop2');

    return `stagelist.push(\`${myLoader.loadspr(state,wrapStr(nickname),sprname)}\`);`
}

