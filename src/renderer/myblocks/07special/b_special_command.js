import * as Blockly from 'blockly/core';
import { javascriptGenerator } from 'blockly/javascript';
import mySpecialer from 'renderer/models/specialcmd';
import { wrapStr } from 'renderer/utils/DataTool';
// Define a custom module in JSON format
let blockname="b_special_command"
// Student name with mapping
const jsondesc = {
    "type": `${blockname}`,
    "message0": "Comment %1",
    "args0": [
        {
            "type": "input_value",
            "name": "val1",
            "check": "String"
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
    const zhushi = javascriptGenerator.valueToCode(block, 'val1', javascriptGenerator.ORDER_ATOMIC);




    return `stagelist.push(\`${mySpecialer.spec(wrapStr(zhushi))}\`);`
}

