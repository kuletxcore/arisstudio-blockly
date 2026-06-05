import * as Blockly from 'blockly/core';
import { javascriptGenerator } from 'blockly/javascript';
import myTexter from 'renderer/models/textcmd';
import { wrapStr } from 'renderer/utils/DataTool';

// Define a custom module in JSON format
let blockname="b_text_side"
// Student name with mapping
const jsondesc = {
    "type": `${blockname}`,
    "message0": "%1 text box content %2 %3",
    "args0": [
        {
        "type": "field_dropdown",
        "name": "drop1",
        "options": [
            ["Middle","middle"],
            ["bottom","bottom"],
        ]
        },
      {
        "type": "input_value",
        "name": "val1",
        "check": "String"
      },
      {
        "type": "field_dropdown",
        "name": "drop2",
        "options": [
            ["with breakpoint","break"],
            ["without breakpoint","continue"],
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
    const content = javascriptGenerator.valueToCode(block, 'val1', javascriptGenerator.ORDER_ATOMIC);

    const position = block.getFieldValue('drop1');
    const action = block.getFieldValue('drop2');


    return `stagelist.push(\`${myTexter.sidetext(wrapStr(content),position,action==="continue"?true:false)}\`);`
}

