import * as Blockly from 'blockly/core';
import { javascriptGenerator } from 'blockly/javascript';
import mySpecialer from 'renderer/models/specialcmd';
import { wrapStr } from 'renderer/utils/DataTool';
// Define a custom module in JSON format
let blockname="b_special_wait"
// Student name with mapping
const jsondesc = {
    "type": `${blockname}`,
    "message0": "Wait %1 seconds",
    "args0": [
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
    const time = block.getFieldValue('num1');



    return `stagelist.push(\`${mySpecialer.wait(time)}\`);`
}

