class myLoad{
    /**
     * Load spr character
     * @param type spr:Default,sprc:Communication
     * @param nameId asset nickname
     * @param sprName asset filename
     */
    loadspr=(type: string, nameId: string, sprName: string)=>{
        return `load ${type} ${nameId} ${sprName}`
    }

    /**
     * Load custom spr character
     * @param type spr:Default,sprc:Communication
     * @param nameId Character nickname
     * @param scale Scale
     * @param idle idle status
     * @param sprName asset filename with extension
     * @param imageList image list
     */
    loaddefspr=(type: string, nameId: string, scale: number, idle: string, sprName: string, imageList: string)=>{
        return `load ${type} ${nameId} ${scale} ${idle} ${sprName} ${imageList}`
    }

    /**
     * Load png character
     */



    /**
     * Load foreground/midground/background Image
     * @param type fg foreground / mg midground / bg background / sfx sound / bgm BGM
     * @param nameId asset nickname
     * @param fileName filename with extension
     */
    load=(type: string, nameId: string, fileName: string)=>{
        return `load ${type} ${nameId} ${fileName}`
    }
}

const myLoader=new myLoad()
export default myLoader
