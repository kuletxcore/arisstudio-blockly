import React,{useEffect, useRef, useState} from 'react'
import { Pagination, Button,Typography,message } from 'antd'
import {
  CustomerServiceOutlined
} from '@ant-design/icons';
import { getBase64 } from 'renderer/utils/imagetool'
import {Howl,Howler} from 'howler'
import copy from "copy-to-clipboard"


const {Text}=Typography


/**
 * props.inputlist
 * props.style
 */
export default function VoiceTab(props) {
  const pagesize=49
  const [page,setPage]=useState(1)
  let musicplayer;

  const playmusic=(file)=>{
    getBase64(file).then((url)=>{
      musicplayer?.stop()
      Howler.stop()
      musicplayer=new Howl({src:url})
      musicplayer.play()
    })
  }

  useEffect(()=>{
    musicplayer?.stop()
  },[])
  
  const musicplay=()=>{
    Howler.stop()
    musicplayer?.play()
  }

  const musicpause=()=>{
    Howler.stop()
    musicplayer?.pause()
  }

  const musicback=()=>{
    if(musicplayer){
      musicplayer.seek(Math.max(musicplayer.seek()-10,0))
    }
  }

  const musicfront=()=>{
    if(musicplayer){
      musicplayer.seek(Math.min(musicplayer.seek()+10,musicplayer.duration()))
    }
  }

  return (
    // Appending after props.style overrides props.style
    <div style={props.style}>
      <Pagination simple current={page} onChange={(page)=>{setPage(page)}} pageSize={pagesize} total={Math.max(props.inputlist.length,1)} style={{textAlign:'center'}}/>
      <Button onClick={musicplay}>Play</Button><Button onClick={musicpause}>Pause</Button><Button onClick={musicback}>Back 10s</Button><Button onClick={musicfront}>Forward 10s</Button>

      <div>
        <div style={{textAlign:'center'}}>
          {props.inputlist.slice((page-1)*pagesize,page*pagesize).map((eachfile)=>{
            return <span style={{display:'inline-block',width:'140px',height:'60px',border:'1px solid gray',overflow:'hidden'}}>
              <div>
                <Text keyboard 
              ellipsis={{'rows':1}}
              onClick={()=>{
                  copy(eachfile.name)
                  message.destroy()
                  message.success("Copied")
                }}>{eachfile.name}</Text>
              </div>
              <CustomerServiceOutlined style={{cursor:'pointer',fontSize:'30px'}}  onClick={()=>{playmusic(eachfile)}}/>
              
              </span>
          })}
        </div>
      </div>
    </div>
  )
}
