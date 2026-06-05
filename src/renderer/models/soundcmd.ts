class Mysound{

    /**
     * Play/Pause
     * @param nameId sound name
     * @param type "play"/"pause"/"stop"
     */
    play=(nameId:string,type:string)=>{
        return `${nameId} ${type}`
    }

    /**
     * VolumeSettings
     */
    volume=(nameId:string,value:number)=>{
        return `${nameId} volume ${value}`
    }

    /**
     * Volume fade
     */
    fade=(nameId:string,value:number,time:number)=>{
        return `${nameId} fade ${value} ${time}`
    }

    /**
     * Loop/once
     * @param type "loop"/"once"
     */
    loop=(nameId:string,type:string)=>{
        return `${nameId} ${type}`
    }

}
const mySounder=new Mysound();
export default mySounder;
