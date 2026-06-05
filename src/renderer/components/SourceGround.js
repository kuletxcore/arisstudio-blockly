import React, { useEffect, useState } from 'react'
import {Tabs, Input,Button, Upload} from 'antd'

import BcgTab from './tabmenu/BcgTab'
import BgmTab from './tabmenu/BgmTab'
import CoverTab from './tabmenu/CoverTab'
import SoundTab from './tabmenu/SoundTab'
import SETab from './tabmenu/SETab'
import SprTab from './tabmenu/SprTab'
import HelpTab from './tabmenu/HelpTab'
import {Howler} from 'howler'

const {Search} = Input


const itemstyle={height:document.body.clientHeight*0.75+"px",overflow:'auto'}

/**
 * Implementation note.
 * bgm,bcg,cover,sound,spr
 */
const buildItems=(itemlistmap)=>{
  return [
    {
      key: 'bgm',
      label: `BGM`,
      children: <BgmTab style={itemstyle} bgmlist={itemlistmap.bgm} />,
    },
    {
      key: 'bcg',
      label: `Background`,
      children: <BcgTab style={itemstyle} bcglist={itemlistmap.bcg} />,
    },
    {
      key: 'cover',
      label: `Cover`,
      children: <CoverTab style={itemstyle} coverlist={itemlistmap.cover}/>,
    },
    {
      key: 'sound',
      label: `Sound`,
      children: <SoundTab style={itemstyle} soundlist={itemlistmap.sound}/>,
    },
    {
      key: 'sedesc',
      label: `Sound Effects`,
      children: <SETab style={itemstyle} soundlist={itemlistmap.sound} />,
    },
    {
      key: 'spr',
      label: `Character`,
      children: <SprTab style={itemstyle} sprlist={itemlistmap.spr}/>,
    },
    {
      key: 'help',
      label: `Help`,
      children: <HelpTab style={itemstyle} />,
    },
  ]
}

function SourceGround(props) {

  // console.log(props.sourcemap)
  const loadData=props.loadData

  const [items,setItems] = useState(buildItems({
    "bgm":props.sourcemap.get('bgm'),
    "bcg":props.sourcemap.get("bcg"),
    "cover":props.sourcemap.get("cover"),
    "sound":props.sourcemap.get("sound"),
    "spr":props.sourcemap.get("spr")
  }))

  useEffect(()=>{
    setItems(buildItems({
      "bgm":props.sourcemap.get('bgm'),
      "bcg":props.sourcemap.get("bcg"),
      "cover":props.sourcemap.get("cover"),
      "sound":props.sourcemap.get("sound"),
      "spr":props.sourcemap.get("spr")
    }))
  },[props.sourcemap])

  const onSearch=(word)=>{
    setItems(buildItems({
      "bgm":[],
      "bcg":[],
      "cover":[],
      "sound":[],
      "spr":[],
    }))

    const searchword=word.toLowerCase()
    // console.log(searchword)
    let postlist=[[],[],[],[],[]]// Search Results
    const prelist=[props.sourcemap.get('bgm'),props.sourcemap.get('bcg'),props.sourcemap.get('cover'),props.sourcemap.get('sound'),props.sourcemap.get('spr')]
    if(word.length!==0){
      // Search
      for(let listind in prelist){
        const list=prelist[listind]
        for(let eachfile of list){
          if(eachfile.name.toLowerCase().indexOf(searchword)!==-1){
            postlist[listind].push(eachfile)
          }
        }
      }
    }else{
      postlist=prelist
    }
    setTimeout(()=>{
      setItems(buildItems({
        "bgm":postlist[0],
        "bcg":postlist[1],
        "cover":postlist[2],
        "sound":postlist[3],
        "spr":postlist[4],
      }))
    },500)

  }

  return (
    <div id="sourceground">
      <Search placeholder="Search keyword (case-insensitive)" allowClear onSearch={onSearch} style={{ width: 300 }} />
      <Button className="loadprojectbutton"><input type="file" multiple="" webkitdirectory="" name="file" accept='*' className="projectfile" onChange={loadData}></input>Select Data Folder</Button>
      <Tabs defaultActiveKey='bgm' animated={false} 
      destroyInactiveTabPane={false}
      items={items} onChange={()=>{Howler.stop()}}/>
    </div>
  )
}

export default SourceGround
