class myChar{
    /**
     * Show/hide with fade highlight
     */
    show=(nameId:string,type:string)=>{
        return `${nameId} ${type}`
    }


    /**
     * appear immediatelyappear/disappear
     */
    appear=(nameId:string,type:string)=>{
        return `${nameId} ${type}`
    }

    /**
     * @param action showFade In/hideFade Out/appearappear immediately/disappeardisappear immediately
     */
    display=(nameId:string, action:string)=>{
        return `${nameId} ${action}`
    }

    /**
     * Highlight
     */
    highlight=(nameId:string,hl,time=0)=>{
        return `${nameId} hl ${hl} ${time}`
    }

    /**
     * opacitychange
     */

    /**
     * Status
     */
    state=(nameId:string,state:string)=>{
        return `${nameId} state ${state}`
    }

    /**
     * skin
     */
    skin=(nameId:string,skin:string)=>{
        return `${nameId} skin ${skin}`
    }

    /**
     * expression
     */
    emo=(nameId:string,emo:string)=>{
        return `${nameId} emo ${emo}`
    }

    /**
     * Set character animation
     */

    /**
     * x/y position
     */
    posxy=(nameId:string,x:number,y:number)=>{
        return `${nameId} pos ${x} ${y}`
    }

    /**
     * Set individual x/y/z positions
     * @param pos "x"/"y"/"z"
     */
    pos=(nameId:string,pos:string,value:number)=>{
        return `${nameId} ${pos} ${value}`
    }

    /**
     * Move on x and y axes
     */
    movexy=(nameId:string,x:number,y:number,time:number)=>{
        return `${nameId} pm ${x} ${y} ${time}`
    }

    /**
     * Move on x/y axes
     * @param pos "xm"/"ym"
     */
    move=(nameId:string,pos:string,value:number,time:number)=>{
        return `${nameId} ${pos} ${value} ${time}`
    }

    /**
     * Fixed-axis shake
     * @param type "xs"/"ys"
     */
    shake=(nameId:string,type:string,strength:number,time:number=0.5,vibrato:number=6)=>{
        return `${nameId} ${type} ${strength} ${time} ${vibrato}`
    }

    /**
     * Random shake
     */
    shakerandom=(nameId:string,strength:number,time:number=0.5,vibrato:number=6)=>{
        return `${nameId} shake ${strength} ${time} ${vibrato}`
    }

    /**
     * Scale
     */
    scale=(nameId:string,scale:number,time:number=0)=>{
        return `${nameId} scale ${scale} ${time}`
    }

    /**
     * close up/return
     * @param type "close"/"back"
     */
    movein=(nameId:string,type:string)=>{
        return `${nameId} ${type}`
    }

    nod=(nameId:string)=>{
        return this.shake(nameId,"ys",-3,1,6)
    }

    jump=(nameId:string)=>{
        return this.shake(nameId,"ys",3,1,6)
    }

    jump2=(nameId:string)=>{
        return this.shake(nameId,"ys",3,1,6)
    }

    sshake=(nameId:string)=>{
        return this.shake(nameId,"xs",3,1,6)
    }

    bshake=(nameId:string)=>{
        return this.shake(nameId,"xs",3,1,6)
    }

}

const myCharer=new myChar();
export default myCharer;
