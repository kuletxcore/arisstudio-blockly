class Myscene{

    /**
     * @param type focus/smoke/rain/snow/dust
     * @param state show/hide
     */
    scene=(type:string,state:string)=>{
        return `sc ${type} ${state}`
    }

    /**
     * Continue marker
     */

    continue=()=>{
        return `sc continue`
    }

    /**
     * End
     */
    end=(text:string)=>{
        return `sc end ${text}`
    }
    /**
     * Enable/disable scene sound
     */
}

const myScener=new Myscene();
export default myScener;
