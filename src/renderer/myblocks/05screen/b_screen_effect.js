import * as Blockly from 'blockly/core';
import { javascriptGenerator } from 'blockly/javascript';
import myScener from 'renderer/models/scenecmd';
import { wrapStr } from 'renderer/utils/DataTool';
// Define a custom module in JSON format
let blockname="b_screen_effect"
// Student name with mapping
const jsondesc = {
    "type": `${blockname}`,
    "message0": "Scene effect %1 %2",
    "args0": [
        {
            "type": "field_dropdown",
            "name": "drop1",
            "options": [
                ["Focus line","focus"],
                ["Smoke","smoke"],
                ["Rain","rain"],
                ["Snow","snow"],
                ["Dust","dust"],
            ]
        },
      {
        "type": "field_dropdown",
        "name": "drop2",
        "options": [
            ["Appear","show"],
            ["Hide","hide"],
        ]
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

    const type = block.getFieldValue('drop1');
    const status = block.getFieldValue('drop2');
    


    return `stagelist.push(\`${myScener.scene(type,status)}\`);`
}

