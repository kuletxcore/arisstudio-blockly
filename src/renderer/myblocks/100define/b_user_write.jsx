import * as Blockly from 'blockly/core';
import { javascriptGenerator } from 'blockly/javascript';

// Define a custom module in JSON format
let blockname="b_user_write"
// Student name with mapping
const jsondesc = {
    "type": `${blockname}`,
    "message0": "Script %1",
    "args0": [
      {
        "type": "field_multilinetext",
        "name": "val1",
        "text":"//can be multiple lines\n//text script",
        "spellcheck": false
      },
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": 230,
    "tooltip": "You can enter a multi-line text script here",
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
    const value_val1 = block.getFieldValue('val1')
    if(value_val1.length==0){
      // If this string input contains no Variabless, ignore this code block
      return ``
    }


    return `stagelist.push(\`${value_val1}\`);`
}

