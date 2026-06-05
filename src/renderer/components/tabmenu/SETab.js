import React,{useState} from 'react'
import { sounds_datamap } from "../../datamap/index.js"
import { Input,Table,Tag,Tooltip, message } from 'antd'
import { QuestionCircleOutlined } from "@ant-design/icons"
import { findneededFile } from 'renderer/utils/DataTool.jsx'
import {Howl,Howler} from 'howler'
import { getBase64 } from 'renderer/utils/imagetool'
import copy from "copy-to-clipboard"



const {Search}=Input


const turnToRes=(datamap,judge)=>{
    // Implementation note.
    const reslist=[]
        for(let sd of sounds_datamap){
            if(judge(sd)){
                for(let fn of sd.filenames){
                    reslist.push({
                        "filename":fn,
                        "desc":sd.desc
                    })
                }
            }
        }
        return reslist
}

const playmusic=(file)=>{
    getBase64(file).then((url)=>{
      Howler.stop()
      const musicplayer=new Howl({src:url})
      musicplayer.play()
    })
}

/**
 * props.soundlist
 * props.style
 */
export default function SETab(props) {
    const soundlist=props.soundlist
    const [searchresult,setSearchresult]=useState(turnToRes(sounds_datamap,()=>{return true}))

    
    const columns=[
        {
            title:"Filename",
            dataIndex:"filename",
            width:"40%",
            render:(_,{filename})=>{
                return <div onClick={()=>{
                    message.destroy()
                    message.success("Copied")
                    copy(filename)
                }}>{filename}</div>
            }
        },
        {
            title:"Description",
            dataIndex:"desc"
        },
        {
            title:"Actions",
            width:"20%",
            render:(_,record)=>{
                return (
                <>
                <Tag color="green" style={{cursor:"pointer"}} 
                onClick={()=>{
                    const thatfile=findneededFile(soundlist,record.filename)
                    if(thatfile){
                        playmusic(thatfile)
                    }else{
                        message.destroy()
                        message.error("No matching file found")
                    }
                }}
                >Play</Tag>
                </>
                )
            }
        }
    ]

    const onSearch=(e)=>{
        const reslist=turnToRes(sounds_datamap,(sd)=>{return sd.desc.includes(e)})
        setSearchresult(reslist)
    }
    return (
        <div style={props.style}>
        <div style={{textAlign:'center'}}>
            <Search placeholder="Search sound descriptions" allowClear onSearch={onSearch} style={{ width: 300,marginRight:"10px" }} />
            <Tooltip title={<div>Welcome to the Aris Studio sound list. It organizes all sounds from the current Aris Studio version so users can find needed sounds faster. Comments are based on manual listening and may differ; suggestions are welcome. Curator：<a href='https://b23.tv/wfXw8Wq' target="_blank">Chuan Maomao</a></div>}>
                <QuestionCircleOutlined style={{fontSize:20,opacity:0.5,verticalAlign:'middle'}}/>
            </Tooltip>
        </div>
            
            <Table 
            columns={columns} 
            dataSource={searchresult} 
            />
            
        </div>
    )
}
