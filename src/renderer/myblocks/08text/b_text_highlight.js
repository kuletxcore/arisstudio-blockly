import * as Blockly from 'blockly/core';
import { javascriptGenerator } from 'blockly/javascript';
import myTexter from 'renderer/models/textcmd';
import { wrapStr } from 'renderer/utils/DataTool';

// Define a custom module in JSON format
let blockname="b_text_highlight"
// Student name with mapping
const jsondesc = {
    "type": `${blockname}`,
    "message0": "Dialogue highlight character %1 speaker %2 club %3 content %4 %5",
    "args0": [
      {
        "type": "input_value",
        "name": "val1",
        "check": "String"
      },
      {
        "type": "input_value",
        "name": "val2",
        "check": "String"
      },
      {
        "type": "input_value",
        "name": "val3",
        "check": "String"
      },
      {
        "type": "input_value",
        "name": "val4",
        "check": "String"
      },
      {
        "type": "field_dropdown",
        "name": "drop1",
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
    const nameId=javascriptGenerator.valueToCode(block, 'val1', javascriptGenerator.ORDER_ATOMIC);
    const name = javascriptGenerator.valueToCode(block, 'val2', javascriptGenerator.ORDER_ATOMIC);
    const partment = javascriptGenerator.valueToCode(block, 'val3', javascriptGenerator.ORDER_ATOMIC);
    const content = javascriptGenerator.valueToCode(block, 'val4', javascriptGenerator.ORDER_ATOMIC);

    const action = block.getFieldValue('drop1');

    return `stagelist.push(\`${myTexter.texthighlight(wrapStr(nameId),wrapStr(name),wrapStr(partment),wrapStr(content),action==="continue"?true:false)}\`);`
}

