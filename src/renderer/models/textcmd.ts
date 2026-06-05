class Mytext{
    /**
     * Hide Text
     */
    hidetext=()=>{
        return `text hide`
    }

    /**
     * Set typewriter effect interval
     */
    textinterval=(time:number)=>{
        return `text interval ${time}`
    }

    /**
     * Hide all text boxes
     */
    hidealltext=()=>{
        return `text hide`
    }

    /**
     * set text content
     * @param iscontinue whether continuous; true means no breakpoint, false means with breakpoint
     */
    text=(name:string,group:string,text:string,iscontinue:boolean)=>{
        if(iscontinue){
            return `tc '${name}' '${group}' '${text}'`
        }else{
            return `t '${name}' '${group}' '${text}'`
        }
        
    }

    /**
     * set text content and highlight the specified character
     * @param iscontinue whether continuous; true means no breakpoint, false means with breakpoint
     */
    texthighlight=(nameId:string,name:string,group:string,text:string,iscontinue:boolean)=>{
        if(iscontinue){
            return `thc ${nameId} '${name}' '${group}' '${text}'`
        }else{
            return `th ${nameId} '${name}' '${group}' '${text}'`
        }
        
    }

    /**
     * text box set text content
     * @param position middle:screen center bottom:bottom
     * @param iscontinue whether continuous; true means no breakpoint, false means with breakpoint
     * 
     */
     sidetext=(text:string,position:string,iscontinue:boolean)=>{
        if(position==="middle"){
            if(iscontinue){
                return `mtc '${text}'`
            }else{
                return `mt '${text}'`
            }
        }else{
            if(iscontinue){
                return `btc '${text}'`
            }else{
                return `bt '${text}'`
            }
        }
        
    }

    /**
     * subtitle
     */
    label=(text:string)=>{
        return `label '${text}'`
    }

    /**
     * one-line banner
     */
    banner=(textmain:string)=>{
        return `banner '${textmain}'`
    }

    /**
     * two-line banner
     */
    banner2=(textmain:string,textside:string)=>{
        return `banner '${textside}' '${textmain}'`
    }

    /**
     * three-line banner
     */
    banner3=(textmain:string,textside:string,textside2:string)=>{
        return `banner '${textside}' '${textside2}' '${textmain}'`
    }
}
const myTexter=new Mytext();
export default myTexter;
