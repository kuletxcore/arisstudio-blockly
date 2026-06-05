import React, { useContext, useState, useEffect,useRef } from 'react';

import {useLocalStorage} from '../hooks/useLocal'
import "./PlayGround.css"
import {Modal,message,Button, Row, Col} from 'antd'
import {
    BlockOutlined,
    SettingFilled
  } from '@ant-design/icons';
// Implementation note.
import Blockly from 'blockly/core';
import {javascriptGenerator} from 'blockly/javascript';
import 'blockly/blocks';
import DarkTheme from '@blockly/theme-dark'
import NormalTheme from '@blockly/theme-modern';
// Implementation note.
import {generatefinalCodes} from '../utils/codetool'
import {saveTxt,uploadTxt} from '../utils/IOdata';
import { gethash } from 'renderer/utils/hashtool';
import version from "../config/version"
// Implementation note.
import locale from 'blockly/msg/zh-hans';
import SourceGround from './SourceGround';
import {Howler} from 'howler'
// Implementation note.
import { GlobalContext } from 'renderer/config/globalContext';
// Implementation note.
import SettingPage from './SettingPage';
// Implementation note.
import {Backpack} from '@blockly/workspace-backpack';

Blockly.setLocale(locale);

const defaultproject={"blocks":{"languageVersion":0,"blocks":[{"type":"b_stage","id":"DFv.H4^h)CD_*%9b?0[m","x":-5,"y":0,"fields":{"num1":1},"inputs":{"sta1":{"block":{"type":"b_load","id":"OwHIduLJQ10}zSNKgrhm","inputs":{"sta1":{"block":{"type":"b_student","id":"iK{ow+5JIf7z:.{A{U5w","fields":{"drop1":"aru_spr","drop2":"spr"},"inputs":{"val1":{"shadow":{"type":"text","id":"A$u+MGYu(pEcK@oGm|Cq","fields":{"TEXT":"aru"}}}}}}}}}}},{"type":"b_stage","id":"U4Kj.z[L[=qeDjKt?XLV","x":-6,"y":130,"fields":{"num1":2},"inputs":{"sta1":{"block":{"type":"b_stu_display","id":"phh;xnagEBu|FhV^.jl1","fields":{"drop1":"show"},"inputs":{"val1":{"shadow":{"type":"text","id":".cI?)UjB^5kS]lb!I7Mu","fields":{"TEXT":"aru"}}}}}}}}]}}

// Implementation note.
// calling IPC exposed from preload script
if(window.electron&&window.electron.ipcRenderer){
    window.isinWebpageMode=false
    window.electron.ipcRenderer.on('ipc-example', (arg) => {
        // eslint-disable-next-line no-console
        // console.log(arg);
        return
    });
}else{
    // console.log("thisway")
    window.isinWebpageMode=true
}


// Implementation note.
function antiShake(fun, delay) {
    window.genrun = null;
    return function (e) {
        clearTimeout(window.genrun);
        window.genrun = setTimeout(() => {
            fun.apply(this, arguments);
        }, delay)
    };
}



function PlayGround(props){
    // Implementation note.
    const blocklyDiv = useRef();
    const toolbox = useRef();
    let primaryWorkspace = useRef();
    const {language,
        darktheme,
        setDarktheme}=useContext(GlobalContext)
    // console.log(language)
    
    // Implementation note.

    // Implementation note.
    let [autoturn,setAutoturn]=useState(true)
    // Implementation note.
    let [projectobj,setProjectobj]=useLocalStorage("saveproject",defaultproject)
    // Implementation note.
    let backpack
    let [backpackobj,setBackpackobj]=useLocalStorage("backpack",{})
    // Implementation note.
    let [showtool,setShowtool]=useLocalStorage("showtool",true)
    // Implementation note.
    let [resultcode,setResultcode]=useState("")
    // Implementation note.
    let [sourcepageopen,setSourcepageopen]=useState(false)
    // Implementation note.
    let [sourcemap,setSourcemap]=useState(new Map([
        ["bgm",[]],
        ["bcg",[]],
        ["cover",[]],
        ["sound",[]],
        ["spr",[]],
    ]))
    // Implementation note.
    let [settingopen,setSettingopen]=useState(false)


    // Implementation note.
    const onClickBlock=(event)=>{
        window.lastClick=""
        if(event.type==="click"&&event.blockId){
            // console.log(event)
            window.lastClick=event.blockId
        }

    }

    useEffect(()=>{
        // Implementation note.
        setTimeout(()=>{
            if(projectobj){
                try {
                    Blockly.serialization.workspaces.load(projectobj, primaryWorkspace.current);
                } catch (error) {
                    
                }
            }
            if(backpack){
                try {
                    backpack.setContents(backpackobj)
                } catch (error) {
                    
                }
            }
        },500)

    },[])

    // Implementation note.
    useEffect(() => {
        const { initialXml, children, ...rest } = props;
        if(darktheme){
            if(window.darkMode){
                window.darkMode.toggle(true)
            }
            primaryWorkspace.current = Blockly.inject(
                blocklyDiv.current,
                {
                    toolbox: toolbox.current,
                    theme:DarkTheme,
                    ...rest
                },
            );
        }else{
            primaryWorkspace.current = Blockly.inject(
                blocklyDiv.current,
                {
                    toolbox: toolbox.current,
                    ...rest
                },
            );
        }
        backpack = new Backpack(primaryWorkspace.current);
        Blockly.Msg['EMPTY_BACKPACK'] = 'Clear Backpack';
        Blockly.Msg['REMOVE_FROM_BACKPACK'] = 'Remove from Backpack';
        Blockly.Msg['COPY_TO_BACKPACK'] = 'Add to Backpack';
        Blockly.Msg['COPY_ALL_TO_BACKPACK'] = 'Add All to Backpack';
        Blockly.Msg['PASTE_ALL_FROM_BACKPACK'] = 'Paste All from Backpack';
        backpack.init()
        

        if (initialXml) {
            Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(initialXml), primaryWorkspace.current);
        }
        // Implementation note.
        primaryWorkspace.current.addChangeListener(antiShake(antiSaveFile,750));
        primaryWorkspace.current.addChangeListener(onClickBlock)

    }, [primaryWorkspace, toolbox, blocklyDiv]);
    // Implementation note.
    const loadProject=(e)=>{
        if(e.target && e.target.files){
            const file=e.target.files[0];
            // Implementation note.
            const filenamesegs=file.name.split(".")
            if(filenamesegs[filenamesegs.length-1]==="bablockly"){
                uploadTxt(file,function(str){
                    let workspaceObj=JSON.parse(str)
                    try{
                        Blockly.serialization.workspaces.load(workspaceObj, primaryWorkspace.current);
                    }catch(error){
                        setResultcode("Read error. Check the project file version and Blockly app version; different versions may be incompatible.")
                    }
                })
            }else{
                setResultcode("Read failed. The project file extension should be bablockly.")
            }
        }
        
    }
    // Implementation note.
    const saveProject=()=>{
        saveTxt(`ArisStudio_blocklyvisual_${version}.bablockly`,JSON.stringify(Blockly.serialization.workspaces.save(primaryWorkspace.current)),()=>{
            message.destroy()
            message.success("Project saved",3)
        })
    }
    /**
     * LoadDatafolder
     */
    const loadData=(eve)=>{
        // console.log(eve)
        new Promise((resolve,reject)=>{
            try {
                const mybgmlist=[] // Data/Bgm/
                const mybcglist=[] // Data/Image/Background/
                const mycoverlist=[] // Data/Image/Cover/
                const mysoundlist=[] // Data/SoundEffect/
                const mysprlist=[] // Data/Spr/
                const mytypemap={
                    "data/audio/bgm/":mybgmlist,
                    "data/image/background/":mybcglist,
                    "data/image/midground/":mycoverlist,
                    "data/image/foreground/":mycoverlist,
                    "data/audio/sfx/":mysoundlist,
                    "data/character/spr":mysprlist
                }
                for (let file of eve.target.files){
                    for(let type in mytypemap){
                        if(file.webkitRelativePath.indexOf(type)===0){
                            mytypemap[type].push(file)
                        }
                    }
                }
                const mynewsourcemap=new Map()
                mynewsourcemap.set("bgm",mybgmlist)
                mynewsourcemap.set("bcg",mybcglist)
                mynewsourcemap.set("cover",mycoverlist)
                mynewsourcemap.set("sound",mysoundlist)
                mynewsourcemap.set("spr",mysprlist)
                message.success("Total assets: "+(mybgmlist.length+mybcglist.length+mycoverlist.length+mysoundlist.length+mysprlist.length)+"",3)

                // setSourcepageopen(true)
                resolve(mynewsourcemap)
                
            } catch (error) {
                reject("Failed. Make sure the selected folder is the Data folder.")
            }
        }).then((res)=>{setSourcemap(res)})
    }
    /**
     * Implementation note.
     */
    const openSourcePage=()=>{
        let srctotal=0
        for(let key of sourcemap.keys()){
            srctotal+=sourcemap.get(key).length||0
        }
        if(srctotal===0){
            message.destroy()
            message.error("Please select the Data folder.")
            setSourcepageopen(true)
        }else{
            setSourcepageopen(true)
        }

    }

    /**
     * Implementation note.
     *  */ 
    const generateCode = () => {
        // console.log("generateScript")
        // Implementation note.
        setProjectobj(Blockly.serialization.workspaces.save(primaryWorkspace.current))
        // Implementation note.
        if(backpack){
            setBackpackobj(backpack.getContents())
        }
        
        // Implementation note.
        // Implementation note.
        // Implementation note.
        window.numinbigfunc=0;
        // playgroundgeneratecode
        let areacode = javascriptGenerator.workspaceToCode(
          primaryWorkspace.current
        );
        // Implementation note.
        const playcode=generatefinalCodes(areacode)
        window.playcode=playcode
        // Implementation note.
        // Implementation note.
        try {
            window.eval(playcode)
            setResultcode(window.txtcode)
            // console.log(identires)
        } catch (error) {
            setResultcode(`An error occurred while generating the script. You can report this issue：${error.message}`)
        }
    }
    // Implementation note.
    const selectFilepath=(e)=>{
        if(e.target&&e.target.files){
            window.wfilepath=e.target.files[0].path // Save the actual path.
            message.success("Enabled live export to:"+window.wfilepath,6)
            antiSaveFile({type:"manualdoit"})
        }else{
            message.error("Unable to get file path",3)
        }
    }

    // Implementation note.
    const antiSaveFile=(event)=>{
        const genandsave=()=>{
            return new Promise((resolve,reject)=>{
                generateCode();
                if(window.wfilepath){
                    if(window.wfilepath.length>0){
                        if(window.electron&&window.electron.ipcRenderer){
                            window.electron.ipcRenderer.sendMessage('ipc-example', [window.wfilepath, window.txtcode]);
                        }
                    }
                }
        })}
        if(event && event.type!="viewport_change"){
            genandsave()
        }
    }

    // Implementation note.
    const downloadCode=()=>{
        saveTxt(`demob.txt`,resultcode,()=>{
            message.destroy()
            message.success("Script saved",3)
        })

    }

    /**
     * Implementation note.
     */
    const getChatinfo=(resscript)=>{
        // Implementation note.
        let resscriptlist=resscript.split("\n")
        const stuspeakMap=new Map()
        const errorstuspeakSet=new Set()
        let hasloadend=false
        for(let senidx in resscriptlist){
            // Implementation note.
            let linewords=resscriptlist[senidx].trim()
            if(linewords==="load end"){
                stuspeakMap.set("hasloadend",senidx)
            }
            // Implementation note.
            // t tc
            const singlechar=`[\\u3000-\\u303f\\u4e00-\\u9fa5_a-zA-Z0-9.-~#（）|【-】· (){}+=*^&%$@!.,，。<>;:：；‘’“”、'"?\`\\d\\w\\s\\u3002\\uff1f\\uff01\\uff0c\\u3001\\uff1b\\uff1a\\u201c\\u201d\\u2018\\u2019\\uff08\\uff09\\u300a\\u300b\\u3008\\u3009\\u3010\\u3011|\\u300e\\u300f\\u300c\\u300d\\ufe43\\ufe44\\u3014\\u3015\\u2026\\u2014\\uff5e\\ufe4f\\uffe5]`
            const matchtc=linewords.match(eval(`/tc? '(${singlechar}*)' '${singlechar}*' '(${singlechar}*)'/`))
            // th
            const matchth=linewords.match(eval(`/th ${singlechar}* '(${singlechar}*)' '${singlechar}*' '(${singlechar}*)'/`))
            // console.log(linewords,matchtc,matchth)
            if(matchtc||matchth){
                let matchres
                if(matchtc){
                    matchres=matchtc
                }else if(matchth){
                    matchres=matchth
                }
                let eleval=matchres[1]+matchres[2]
                let elekey='00'+gethash(eleval)
                if(stuspeakMap.has(elekey)){
                    // Implementation note.
                    errorstuspeakSet.add(matchres[2])
                    // Implementation note.
                    stuspeakMap.get(elekey)['lines'].push(senidx)
                }else{
                    stuspeakMap.set(elekey,{'name':matchres[1],'content':matchres[2],'lines':[senidx]})
                }
                
            }
        }

        console.log(stuspeakMap,errorstuspeakSet)
        return stuspeakMap

    }
    /**
     * Implementation note.
     */
     const getChattxt=()=>{
        const chatinfomapt=getChatinfo(resultcode)
        let outtxt=""
        for(let ele of chatinfomapt){
            if(ele[0]==="hasloadend"){
                continue
            }
            outtxt+=`${ele[1].name}\n`
            outtxt+=`${ele[0]}.wav\n`
            outtxt+=`${ele[1].content}\n`
        }
        saveTxt("Dialogue text.txt",outtxt)
    }
    /**
     * Implementation note.
     */
     const flatmap=(amap)=>{
        const reslist=[]
        for(let ele of amap){
            if(ele[0]==="hasloadend"){
                continue
            }
            const hashcode=ele[0]
            const name=ele[1].name
            const content=ele[1].content
            const lines=ele[1].lines
            for(let line of lines){
                reslist.push({  
                            'hash':hashcode,
                            'name':name,
                            'content':content,
                            'line':line
                            })
            }
        }
        reslist.sort((a,b)=>a.line-b.line)
        return reslist
    }
    /**
     * Implementation note.
     * Implementation note.
     */
    const getChatscript=()=>{
        const txtcodelist=resultcode.split("\n")
        const chatinfomap=getChatinfo(resultcode)
        const flatlist=flatmap(chatinfomap)
        flatlist.reverse()
        // Implementation note.
        for(let ele of flatlist){
            const lineind=ele.line
            // Implementation note.
            txtcodelist.splice(lineind,0,`se play`)
            txtcodelist.splice(lineind,0,`se set ${ele.hash}`)
            txtcodelist.splice(lineind,0,`se set mutevoice`)

        }
        // Implementation note.
        if(!chatinfomap.has("hasloadend")){
            txtcodelist.splice(0,0,"load end")
        }
        // Implementation note.
        for(let ele of flatlist){
            const filename=`${ele.hash}.wav`
            txtcodelist.splice(0,0,`load se ${ele.hash} ${filename}`)
        }
        txtcodelist.splice(0,0,`load se mutevoice Mute.wav`)

        saveTxt("democ.txt",txtcodelist.join("\n"))
    }

    const changeTheme=()=>{
        setDarktheme((darktheme)=>{
            if(darktheme){
                primaryWorkspace.current.setTheme(NormalTheme)
                if(window.darkMode){
                    window.darkMode.toggle(false)
                }
            }else{
                primaryWorkspace.current.setTheme(DarkTheme)
                if(window.darkMode){
                    window.darkMode.toggle(true)
                }
            }
            return !darktheme
        })
        message.destroy()
        message.success("Switched interface style",3)
    }

    // Clear the current workspace
    const confirmclear=()=>{
        Blockly.serialization.workspaces.load({}, primaryWorkspace.current);
        message.destroy()
        message.warning("Workspace cleared")
    }

    return (
    <>
        <span id="toolsbox">
            <Row justify={"end"}>
                <Col>
                    <Button className="settingbut" onClick={openSourcePage}><BlockOutlined /></Button>
                </Col>
                <Col>
                    <Button className="settingbut" onClick={()=>{setSettingopen(true)}}><SettingFilled /></Button>
                </Col>
            </Row>
        </span>
        {/* Workspace */}
        <span ref={blocklyDiv} id="blocklyDiv" onKeyUp={e=>console.log(e.keyCode===83 && e.ctrlKey)} onClick={(e)=>{console.log(e)}}/>
        <div style={{ display: 'none' }} ref={toolbox}>
            {props.children}
        </div>
        {/* Generated code display box */}
        <textarea 
            value={resultcode}
            spellCheck={false}
            style={showtool?{}:{display:"none"}} 
            id="rescodebox" 
        />
        {/* Assets */}
        <div id="sourcemodal">
            <Modal width={"80%"} style={{top:'25px'}} title="Asset Browser" open={sourcepageopen}
            onOk={()=>{
            setSourcepageopen(false)
            Howler.stop()
            }}
            onCancel={()=>{
                setSourcepageopen(false)
                Howler.stop()
            }}>
                <SourceGround loadData={loadData} sourcemap={sourcemap}/>
            </Modal>
        </div>
        {/* Implementation note. */}
        <div style={{position:'absolute',bottom:10,right:2,color:'gray'}}>{version}</div>
        <div>
            <Modal width={"80%"} style={{top:'25px'}} title="Settings" open={settingopen}
            onOk={()=>{
            setSettingopen(false)
            }}
            onCancel={()=>{
                setSettingopen(false)
            }}>
                <SettingPage 
                    version={version}
                    loadProject={loadProject}
                    saveProject={saveProject}
                    openSourcePage={openSourcePage}
                    selectFilepath={selectFilepath}
                    downloadCode={downloadCode}
                    getChattxt={getChattxt}
                    getChatscript={getChatscript}
                    changeTheme={changeTheme}
                    darktheme={darktheme}
                    showtool={showtool}
                    setShowtool={setShowtool}
                    confirmclear={confirmclear}
                />
            </Modal>
        </div>

    </>);
}

export default PlayGround;

// Basic types
const Block = (p) => {
    const { children, ...props } = p;
    props.is = "blockly";
    return React.createElement("block", props, children);
};

const Category = (p) => {
    const { children, ...props } = p;
    props.is = "blockly";
    return React.createElement("category", props, children);
};

const Value = (p) => {
    const { children, ...props } = p;
    props.is = "blockly";
    return React.createElement("value", props, children);
};

const Field = (p) => {
    const { children, ...props } = p;
    props.is = "blockly";
    return React.createElement("field", props, children);
};

const Shadow = (p) => {
    const { children, ...props } = p;
    props.is = "blockly";
    return React.createElement("shadow", props, children);
};

export { Block, Category, Value, Field, Shadow }
