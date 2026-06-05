import * as Blockly from 'blockly/core';
import { javascriptGenerator } from 'blockly/javascript';
import myCharer from 'renderer/models/charcmd';
import { wrapStr } from 'renderer/utils/DataTool';

// Define a custom module in JSON format
let blockname="b_char_action"
// Student name with mapping
const jsondesc = {
    "type": `${blockname}`,
    "message0": "Character nickname %1 action %2",
    "args0": [
      {
        "type": "input_value",
        "name": "val1",
        "check": "String"
      },
      {
        "type": "field_dropdown",
        "name": "drop1",
        "options": [
            ["close up","close"],
            ["move back","back"],
            // ["nod","nod"],
            // ["small jump","jump"],
            // ["double jump","jump2"],
            // ["small tremble","sshake"],
            // ["big tremble","bshake"]
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
    const nickname = javascriptGenerator.valueToCode(block, 'val1', javascriptGenerator.ORDER_ATOMIC);
    const action = block.getFieldValue('drop1');
    if(action==="close"||action==="back"){
        return `stagelist.push(\`${myCharer.movein(wrapStr(nickname),action)}\`);`
    }else if(action==="nod"){
      return `stagelist.push(\`${myCharer.nod(wrapStr(nickname))}\`);`
    }else if(action==="jump"){
      return `stagelist.push(\`${myCharer.jump(wrapStr(nickname))}\`);`
    }else if(action==="jump2"){
      return `stagelist.push(\`${myCharer.jump2(wrapStr(nickname))}\`);`
    }else if(action==="sshake"){
      return `stagelist.push(\`${myCharer.sshake(wrapStr(nickname))}\`);`
    }else if(action==="bshake"){
      return `stagelist.push(\`${myCharer.bshake(wrapStr(nickname))}\`);`
    }
}

