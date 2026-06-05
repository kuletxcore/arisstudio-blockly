import * as Blockly from 'blockly/core';
import { javascriptGenerator } from 'blockly/javascript';
import myCharer from 'renderer/models/charcmd';
import { wrapStr } from 'renderer/utils/DataTool';

// Define a custom module in JSON format
let blockname="b_char_status"
// Student name with mapping
const jsondesc = {
    "type": `${blockname}`,
    "message0": "Character nickname %1 emotion expression %2 face state %3 skin %4",
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
            ["None","None"],
            ["Action","Action"],
            ["Angry","Aggro"],
            ["Anxious","Anxiety"],
            ["Chat","Chat"],
            ["!","E"],
            ["?!","EQ"],
            ["?","Q"],
            ["Heart","Heart"],
            ["...","Idea"],
            ["Humming","Note"],
            ["Shy","Shy"],
            ["Sweat","Sweat"],
            ["Sparkle","Twinkle"],
            ["Light bulb","Bulb"],
            ["Sad","Sad"],
            ["Sigh","Sigh"],
            ["Tear","Tear"],
            ["Steam","Steam"],
        ]
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
    const nickname = javascriptGenerator.valueToCode(block, 'val1', javascriptGenerator.ORDER_ATOMIC);
    const emo = block.getFieldValue('drop1');
    const state = javascriptGenerator.valueToCode(block, 'val2', javascriptGenerator.ORDER_ATOMIC);
    const skin = javascriptGenerator.valueToCode(block, 'val3', javascriptGenerator.ORDER_ATOMIC);

    let resstr=""
    if(emo!="None"){
        resstr+=`stagelist.push(\`${myCharer.emo(wrapStr(nickname),emo)}\`);`
    }
    if(state!="''"){
        resstr+=`stagelist.push(\`${myCharer.state(wrapStr(nickname),wrapStr(state))}\`);`
    }
    if(skin!="''"){
        resstr+=`stagelist.push(\`${myCharer.skin(wrapStr(nickname),wrapStr(skin))}\`);`
    }

    return resstr
}

