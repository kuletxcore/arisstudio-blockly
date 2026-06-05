class Myspecial{
    /**
     * Comment
     */
    spec=(text:string)=>{
        return `//${text}`
    }
    /**
     * Breakpoint
     */
    breakpoint=()=>{
        return `==`
    }
    /**
     * Wait
     */
    wait=(time:number)=>{
        return `wait ${time}`
    }

    /**
     * Target
     */
    target=(name:string)=>{
        return `target ${name}`
    }

    /**
     * Show All Targets
     */
    showtarget=()=>{
        `targets`
    }

    /**
     * Jump
     */
    jump=(name:string)=>{
        return `jump ${name}`
    }

    /**
     * Set Autoplay Speed
     */
    autoplay=(speed:number)=>{
        return `auto ${speed}`
    }

    /**
     * Switch Script
     */
    switch=(filename:string)=>{
        return `switch ${filename}`
    }
}
const mySpecialer=new Myspecial();
export default mySpecialer;
