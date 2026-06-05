import * as Blockly from 'blockly/core';
import { javascriptGenerator } from 'blockly/javascript';
import myTexter from 'renderer/models/textcmd';
import { wrapStr } from 'renderer/utils/DataTool';

// Define a custom module in JSON format
let blockname="b_text_banner"
// Student name with mapping
const jsondesc = {
    "type": `${blockname}`,
    "message0": "Banner title %1 subtitle %2 caption %3",
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
    const main = javascriptGenerator.valueToCode(block, 'val1', javascriptGenerator.ORDER_ATOMIC);
    const second = javascriptGenerator.valueToCode(block, 'val2', javascriptGenerator.ORDER_ATOMIC);
    const third = javascriptGenerator.valueToCode(block, 'val3', javascriptGenerator.ORDER_ATOMIC);

    if(third!="''"){
      return `stagelist.push(\`${myTexter.banner3(wrapStr(main),wrapStr(second),wrapStr(third))}\`);`
    }
    if(second!="''"){
      return `stagelist.push(\`${myTexter.banner2(wrapStr(main),wrapStr(second))}\`);`
    }
    return `stagelist.push(\`${myTexter.banner(wrapStr(main))}\`);`
}

