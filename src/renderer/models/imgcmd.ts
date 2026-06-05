class myImage{
    /**
     * Fade In
     * @param nameId asset nickname
     */
    show=(nameId)=>{
        return `${nameId} show`
    }

    /**
     * Fade Out
     * @param nameId asset nickname
     */
    hide=(nameId)=>{
        return `${nameId} show`
    }

    /**
     * appear immediately
     * @param nameId asset nickname
     */
    appear=(nameId)=>{
        return `${nameId} appear`
    }

    /**
     * disappear immediately
     * @param nameId asset nickname
     */
    disappear=(nameId)=>{
        return `${nameId} disappear`
    }

    /**
     * @param action showFade In/hideFade Out/appearappear immediately/disappeardisappear immediately
     */
    display=(nameId, action)=>{
        return `${nameId} ${action}`
    }

    /**
     * opacitychange
     * @param nameId asset nickname
     * @param alpha 0~1 opacity
     * @param time fade duration
     */
    fade=(nameId, alpha:number, time:number=0)=>{
        return `${nameId} fade ${alpha} ${time}`
    }

    /**
     * Set individual x/y/z coordinates
     * @param nameId asset nickname
     * @param axis x/y/z
     * @param value value
     */
    setaxis=(nameId, axis, value:number)=>{
        return `${nameId} ${axis} ${value}`
    }

    /**
     * Set x/y coordinates
     * @param nameId asset nickname
     * @param x coordinate
     * @param y coordinate
     */
    position=(nameId, x:number, y:number)=>{
        return `${nameId} ${x} ${y}`
    }

    /**
     * Move along x or y only
     * @param nameId asset nickname
     * @param axis xm/ym
     * @param value value
     * @param time time
     */
    moveaxis=(nameId, axis, value:number, time:number=0.5)=>{
        return `${nameId} ${axis} ${value} ${time}`
    }

    /**
     * Move on the x/y plane
     * @param nameId asset nickname
     * @param x value
     * @param y value
     * @param time time
     */
    moveposition=(nameId, x:number, y:number, time:number=0.5)=>{
        return `${nameId} pm ${x} ${y} ${time}`
    }

    /**
     * x/y axisshake
     * @param nameId nickname
     * @param axis xs/ys
     * @param strength shakestrength
     * @param time time
     * @param vibrato shakefrequency
     */
    shakeaxis=(nameId, axis, strength:number, time:number=0.5, vibrato:number=6)=>{
        return `${nameId} ${axis} ${strength} ${time} ${vibrato}`
    }

    /**
     * Random shake
     * @param nameId nickname
     * @param strength shakestrength
     * @param time time
     * @param vibrato shakefrequency
     */
    shakerandom=(nameId, strength, time:number=0.5, vibrato:number=6)=>{
        return `${nameId} shake ${strength} ${time} ${vibrato}`
    }


    /**
     * Scale on x and y axes together
     * @param nameId nickname
     * @param value value
     * @param time time
     */
    scale=(nameId, value:number, time:number=0)=>{
        return `${nameId} scale ${value} ${time}`
    }

}

const myImager=new myImage()
export default myImager
