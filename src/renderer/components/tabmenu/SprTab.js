import React,{useEffect, useRef, useState} from 'react'
import {Col,Divider,Pagination,Row,Switch, message } from 'antd'
import { getBase64,getText } from 'renderer/utils/imagetool'
import {spine,hullpos,animationlist} from "../../utils/spine-player"
import { useLocalStorage } from 'renderer/hooks/useLocal'
import "../../utils/spine-player.css"
import "./SprTab.css"
import copy from "copy-to-clipboard"
import { getcnnameof } from 'renderer/datamap'


var myTout

const clearSprspace=()=>{
  /**
   * Clear the spr area
   */
  while(document.querySelector("#ba-player")){
    document.querySelector("#ba-player").remove()
  }
  for(let i=0;i<9;i++){
    document.querySelector("#namechafen"+i).innerHTML=""
  }
}

export default function SprTab(props) {
  // Variant pagination
  const [page,setPage]=useState(1)
  const [chafenlistlen,setChafenlistlen]=useState(1)
  // Per-character settings, including whether to pin to top
  const [charsettings,setCharsettings]=useLocalStorage("charsettings",{})

  const sprmap=new Map() //All filenames with extensions mapped to files
  const sprnameset=new Set() //All filenames without extensions
  props.sprlist.forEach((each)=>{
    sprmap.set(each.name,each)
    sprnameset.add(each.name.split(".")[0])
  })
  const [nowname,setNowname]=useState("No selection")
  const [nowind,setNowind]=useState(-1)
  const [chafen,setChafen]=useState(false)//Whether variants are enabled
  // const [fixpos,setFixpos]=useState(false)//Whether the view is fixed
  const chafenRef=useRef(chafen)
  chafenRef.current=chafen

  // spr names on this page
  const sprnamelist=[...sprnameset.values()]
  // console.log(sprnamelist)

  // Pin-to-top button value
  const [buttonontopcheck,setButtontopcheck]=useState(false)

  // Whether the variant viewport is smart
  const [smartwin,setSmartwin]=useState(true)
  // Read the current object value
  const smartRef=useRef(smartwin)
  smartRef.current=smartwin

  useEffect(()=>{
    setButtontopcheck(charsettings[nowname]?true:false)
  },[nowname])

  const renderspr=(eachname,elementid,nameind,page=-1)=>{

    Promise.all([getBase64(sprmap.get(`${eachname}.skel`)),getText(sprmap.get(`${eachname}.atlas`)),getBase64(sprmap.get(`${eachname}.png`))]).then((reslist)=>{

      // Naming
      const skelname=`${eachname}.skel`
      const atlasname=`${eachname}.atlas`//This is a string
      const pngname=`${eachname}.png`

      // console.log("3 names:",skelname,atlasname,pngname)
      // File contents
      const rawobj={}
      rawobj[skelname]=reslist[0]
      rawobj[atlasname]=reslist[1]
      rawobj[pngname]=reslist[2]

      if(page!==-1){
        // When only changing pages, skip the first render that reads expressions

      }else{
        // Unmount previous content
        clearSprspace()

        setNowname(eachname)
        setNowind(nameind)

        new spine.SpinePlayer(elementid,{
          skelUrl:skelname,
          atlasUrl:atlasname,
          rawDataURIs:rawobj,
          premultipliedAlpha: false,
          showControls: true,
          debug:{
            hulls:chafenRef.current
          },
          backgroundColor: "#cccccc", // set the walk animation to play once
        })
      }
      
      clearTimeout(myTout)
      // If variants are enabled
      if(chafenRef.current){

        myTout=setTimeout(()=>{
          // console.log("SprTab timer")
          // First render gets face position and animation list
          let xlist=hullpos.map((each)=>{return each[0]})
          let ylist=hullpos.map((each)=>{return each[1]})
          // console.log(hullpos)
          // console.log(Math.min(...xlist),Math.max(...xlist))
          // console.log(Math.min(...ylist),Math.max(...ylist))
          // console.log(animationlist)

          const viewpad=50
          let baviewport;
          if(smartRef.current){
            baviewport={
            x:Math.min(...xlist)-viewpad,
            y:Math.min(...ylist)-viewpad,
            width: Math.max(...xlist)-Math.min(...xlist)+2*viewpad,
            height: Math.max(...ylist)-Math.min(...ylist)+2*viewpad,
          }
          }else{
            // Use a fixed view for every character
          baviewport={
            x:-140,
            y:786,
            width: 364,
            height: 364,
          }
          }
          
          

          // console.log("viewport",baviewport)
          
          
          // 

          // 
          clearSprspace()
          // Render faces in a loop
          let mypage=page
          if(mypage===-1){
            mypage=1
          }
          setPage(mypage)
          new Promise((resolve,reject)=>{
            setChafenlistlen(animationlist.length)
            animationlist.forEach((each,ind)=>{
              if(ind>=9*(mypage-1) && ind<9*mypage){
                document.querySelector("#namechafen"+ind%9).innerHTML=each.name
                new spine.SpinePlayer(elementid+"chafen"+ind%9,{
                  paused:true,
                  skelUrl:skelname,
                  atlasUrl:atlasname,
                  rawDataURIs:rawobj,
                  animation:each.name,
                  viewport: {...baviewport},// Position to face
                  premultipliedAlpha: false,
                  showControls: false,
                  backgroundColor: "#cccccc", // set the walk animation to play once
                })
              }
              
            })
          })
        },page!==-1?200:500)    
        }
      }).catch(err=>console.log(err))
  }

  return (
    <>
    <div>
    <Row justify={'center'}>
      <div style={{textAlign:'center',marginRight:'15px'}}
      onClick={()=>{
        message.destroy()
        message.success("Copied")
        copy(nowname)
      }}>{nowname}</div>

      
      Pin to top：<Switch checked={buttonontopcheck} onClick={(ck)=>{
        setButtontopcheck(ck)
        const newcharsettings={...charsettings}
        newcharsettings[nowname]=ck
        if(!ck){//If changed to false, delete the key directly
          delete newcharsettings[nowname]
        }
        setCharsettings(newcharsettings)
      }}></Switch>

      Face variants：<Switch checked={chafen} onClick={(ck)=>{
        setChafen((ck)=>{
          renderspr(nowname,"basprbox",nowind)
          return !ck
        })
        }}></Switch>

      <span style={chafen?{}:{visibility:'hidden'}}>{smartwin?"Variant face detection":"Variant fixed position"}<Switch checked={smartwin} onClick={(ck)=>{
        setSmartwin(ck)
        renderspr(nowname,"basprbox",nowind)
      }}></Switch></span>
      
    </Row>
    <Row justify={'center'}>
      <Pagination total={chafenlistlen} current={page} pageSize={9} onChange={(newpage)=>{
        renderspr(nowname,"basprbox",nowind,newpage)
        }}/>
    </Row>
    <Row>
      
      {/* Left list */}
      <Col span={6} style={props.style}>
        {Object.keys(charsettings).map((name,ind)=>{
          if(sprnamelist.includes(name)){
            return <div className="stuname" style={{backgroundColor:ind+5000===nowind?'lightblue':""}} //ind+5000Offset from the following indexes
            onClick={()=>{
              renderspr(name,"basprbox",ind+5000,-1)
            }}>{name+getcnnameof(name)}</div>
          }
          return <></>
          })}
        <Divider />
        {sprnamelist.map((name,ind)=>{return <div className="stuname" style={{backgroundColor:ind===nowind?'lightblue':""}} 
        onClick={()=>{
          renderspr(name,"basprbox",ind,-1)
        }}>{name+getcnnameof(name)}</div>})}
      </Col>
      {/* Right preview */}
      <Col span={18} style={{position:'relative'}}>
          <span id="basprbox" style={{position:'absolute',display:'inline-block',width:'100%',height:'100%'}}></span>
          {[0,0,0,0,0,0,0,0,0].map((each,ind)=>{
            return (<div 
              style={{display:chafen?'inline-block':'none',width:'200px',height:"220px"}}
            onClick={(e)=>{
              message.destroy()
              message.success("Copied")
              copy(e.target.parentNode.parentNode.parentNode.innerText)
              }}>
              <span id={"namechafen"+ind} style={{display:chafen?'inline-block':'none',width:'200px',height:'20px',zIndex:999}}></span>
              <span id={"basprboxchafen"+ind} style={{display:chafen?'inline-block':'none',width:'200px',height:'200px'}}></span>
            </div>)
          })}
        
      </Col>
      
    </Row>

    </div>
    </>
  )
}
