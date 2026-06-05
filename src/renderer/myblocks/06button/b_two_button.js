import * as Blockly from 'blockly/core';
import { javascriptGenerator } from 'blockly/javascript';
import { generateTime } from 'renderer/utils/timestamp';

// Define a custom module in JSON format
let blockname="b_two_button"
// Student name with mapping
const jsondesc = {
    "type": `${blockname}`,
    "message0": "%1 first button, text:[ %2 ] Run %3 second button, text:[ %4 ] Run %5",
    "args0": [
        {
            "type": "field_dropdown",
            "name": "drop1",
            "options": [
                ["show button","0"],
                ["auto-select button1","1"],
                ["auto-select button2","2"],
            ]
          },
        {
        "type": "input_value",
        "name": "val1",
        "check": "String"
        },
        {
        "type": "input_statement",
        "name": "sta1"
        },
        {
        "type": "input_value",
        "name": "val2",
        "check": "String"
        },
        {
        "type": "input_statement",
        "name": "sta2"
        },
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": 20,
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
    const value_val1 = javascriptGenerator.valueToCode(block, 'val1', javascriptGenerator.ORDER_ATOMIC);
    const value_val2 = javascriptGenerator.valueToCode(block, 'val2', javascriptGenerator.ORDER_ATOMIC);
    if(value_val1.length==0||value_val2.length==0){
      // If this string input contains no Variabless, ignore this code block
      return ``
    }
    const statements_sta1=javascriptGenerator.statementToCode(block,'sta1');
    const statements_sta2=javascriptGenerator.statementToCode(block,'sta2');
    const dropdown_drop1 = block.getFieldValue('drop1');
    const wordS=dropdown_drop1!=="0"?'':'';
    const selnum=wordS?''+dropdown_drop1:'';


    const timestamp=generateTime();

    return `
function buttonfunc${timestamp}(){
const funcincnum=incnum;
incnum+=1;

stagelist.push(\`select${wordS}${selnum} \${${value_val1}} \${'${timestamp+"caseA"}'+funcincnum} \${${value_val2}} \${'${timestamp+"caseB"}'+funcincnum}\`);

stagelist.push(\`target \${'${timestamp+"caseA"}'+funcincnum}\`)
${statements_sta1.trim()}
stagelist.push(\`jump \${'${timestamp+"IfFinal"}'+funcincnum}\`)

stagelist.push(\`target \${'${timestamp+"caseB"}'+funcincnum}\`)
${statements_sta2.trim()}
stagelist.push(\`jump \${'${timestamp+"IfFinal"}'+funcincnum}\`)

stagelist.push(\`target \${'${timestamp+"IfFinal"}'+funcincnum}\`)
}

buttonfunc${timestamp}()
`
}

