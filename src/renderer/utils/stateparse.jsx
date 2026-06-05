class Character{
    nickname=""
    sourcename=""
    show=false
    facestate=""
    emo=""
    light=1
    x=0
    y=0
    close=false
    level=0
    down=false

    constructor(nickname,sourcename=""){
        this.nickname=nickname
        this.sourcename=sourcename
    }

    setshow(){
        this.show=true
    }

    sethide(){
        this.show=false
    }

    setlight(num){
        this.light=num
    }

    setstate(id){
        this.facestate=id
    }

    setemo(id){
        this.emo=id
    }

    setdown(){
        this.down=true
    }

    setup(){
        this.down=false
    }

    setx(x){
        this.x=x
    }

    sety(y){
        this.y=y
    }

    setclose(){
        this.close=true
    }

    setback(){
        this.close=false
    }

    setlevel(level){
        this.level=level
    }
}

function darkAll(charset){
    // Implementation note.
    for(let each in charset){
        charset[each].setlight(0.5)
    }
}

function parseChar(rawtext,endpoint=-1){

    const lines=rawtext.split("\n")
    // Implementation note.
    const targets={}
    for(let i=0;i<lines.length;i++){
        // Implementation note.
        lines[i]=lines[i].trim()
        // Implementation note.
        if(lines[i].startsWith("target")){
            targets[""+lines[i].split(" ")[1]]=i
        }
    }
    // console.log(targets)
    // Implementation note.
    const debugp=endpoint
    // Implementation note.
    let nowp=0
    // Implementation note.
    let isend=false
    // Implementation note.
    let res={}
    // Implementation note.
    let linetxt=""
    // Implementation note.
    let runticks=0
    // Implementation note.
    let tempfunc=()=>{}
    while(!isend){
        // Implementation note.
        runticks+=1
        if(runticks>2000){
            res=null
            isend=true
            // Implementation note.
            throw "Infinite loop or script is too long"
            break
        }
        // Implementation note.
        if(nowp>=lines.length){
            isend=true
            // Implementation note.
            break
        }
        // Implementation note.
        if(lines[nowp].length==0){
            nowp+=1
            continue
        }
        // Implementation note.
        linetxt=lines[nowp].split(" ")
        // commandJump
        if(linetxt.length>=1 && linetxt[0]==="jump"){
            const jumptarget=linetxt[1]
            if(jumptarget in targets){
                // Jump
                nowp=targets[jumptarget]
                // Implementation note.
                continue
            }else{
                // Implementation note.
                // Implementation note.
            }
        }
        // Implementation note.
        if(linetxt.length>=1 && linetxt[0]!=="load" && linetxt[0]!=="jump" && linetxt[0]!=="target"){
            tempfunc()
            tempfunc=()=>{}
        }
        // CharacterLoad
        if(linetxt.length>=1 && linetxt[0]==="load" && ["spr","sprC","custom","customC","char","charC"].includes(linetxt[1])){
            res[linetxt[2]]=new Character(linetxt[2])
        }
        // Implementation note.
        if(linetxt.length>=1 && Object.keys(res).includes(linetxt[0])){
            const thischar=res[linetxt[0]]
            if(["show","showD"].includes(linetxt[1])){
                thischar.setshow()
                if(linetxt[1]==="show"){
                    thischar.setlight(1)
                }
            }else if(["hide","hideD"].includes(linetxt[1])){
                thischar.sethide()
                if(linetxt[1]==="hide"){
                    thischar.setlight(0)
                }
            }else if(["hl","highlight"].includes(linetxt[1])){
                thischar.setlight(linetxt[2]-0)
            }else if(["state"].includes(linetxt[1])){
                thischar.setstate(linetxt[2])
            }else if(["emo"].includes(linetxt[1])){
                thischar.setemo(linetxt[2])
                tempfunc=()=>{
                    thischar.setemo("")
                }
            }else if(["down"].includes(linetxt[1])){
                thischar.setdown()
            }else if(["up","empty"].includes(linetxt[1])){
                thischar.setup()
            }else if(["x","moveX","move"].includes(linetxt[1])){
                thischar.setx(linetxt[2]-0)
            }else if(["y","moveY"].includes(linetxt[1])){
                thischar.sety(linetxt[2]-0)
            }else if(["close"].includes(linetxt[1])){
                thischar.setclose()
            }else if(["back"].includes(linetxt[1])){
                thischar.setback()
            }else if(["z"].includes(linetxt[1])){
                thischar.setlevel(linetxt[2]-0)
            }
        }
        // Implementation note.
        if(linetxt.length>=2 && linetxt[0]==="th" && Object.keys(res).includes(linetxt[1])){
            darkAll(res)
            res[linetxt[1]].setlight(1)
        }
        // Implementation note.
        if(nowp===debugp){
            isend=true
            break
        }
        // Implementation note.
        nowp+=1
    }
    return res
}

/**
 * Implementation note.
 * Implementation note.
 */
export function identifytxt(txt,debugline=-1){
    try {
        return {success:true,res:parseChar(txt,debugline)}
    } catch (error) {
        return {success:false,res:error}
    }
}
