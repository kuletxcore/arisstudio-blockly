export function generatefinalCodes(code){
    let resultcode=`
try {
    function makecodetxt(){
        let importArea=false;
        let stagelist=[];
        const errorset=new Set();
        const resmap=new Map();
        let incnum=0;

        let met200=false;

        const case_jump_dict=new Map();

        // All stage code starts
        ${code}
        // All stage code ends
        let rescode=""
        if(errorset.size!=0){

            rescode="The following mainline or branch block IDs are duplicated: "+Array.from(errorset.values()).join(",");
            return rescode;
        }else{
            // Sort
            const sortMap = new Map([...resmap].sort((a, b) => a[0] - b[0]));
            rescode="";
            for(let thiskey of sortMap.keys()){
                if(thiskey>200 && !met200){
                    met200=true;
                    rescode+="jump wholeProjectTail\\n"
                }
                if(thiskey>200){//keyisid
                    // branch block copy
                    let thisvaluecode=sortMap.get(thiskey);
                    // If there are jump blocks that jump to this branch block
                    if(case_jump_dict.has(thiskey)){
                        for(let timestamp of case_jump_dict.get(thiskey)){
                            rescode+="target "+thiskey+timestamp+"PathStart\\n"
                            rescode+=thisvaluecode;
                            rescode+="jump "+thiskey+timestamp+"PathBack\\n"
                        }
                    }

                }else{
                    // Mainline Block
                    let thisvaluecode=sortMap.get(thiskey);
                    rescode+=thisvaluecode;
                }

            }
            if(met200){//If there is a branch
                rescode+="target wholeProjectTail\\n"
            }
            // For debugging
            window.errorset=errorset;
            window.resmap=resmap;
            window.case_jump_dict=case_jump_dict;
            // Remove extra spaces after newlines
            rescode=rescode.replace(/ *\\n */g,"\\n");
            return rescode;
        }
        
        return rescode;
        }
        // Extract txtcode in React
        txtcode=makecodetxt()
} catch (error) {
    txtcode="An error occurred while generating the script. You can report this issue："+error.message
}

`
    return resultcode
}
