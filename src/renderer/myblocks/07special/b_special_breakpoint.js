import * as Blockly from 'blockly/core';
import { javascriptGenerator } from 'blockly/javascript';
import mySpecialer from 'renderer/models/specialcmd';
import { wrapStr } from 'renderer/utils/DataTool';
// Define a custom module in JSON format
let blockname="b_special_breakpoint"
// Student name with mapping
const jsondesc = {
    "type": `${blockname}`,
    "message0": "Wait for mouse click (breakpoint)",
    "args0": [
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



    return `stagelist.push(\`${mySpecialer.breakpoint()}\`);`
}

