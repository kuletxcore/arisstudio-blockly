import React from 'react'
import { Button, Row, Col, Popconfirm } from 'antd'
import {
    DownloadOutlined,
    SaveOutlined,
    CodeOutlined,
    ContainerOutlined,
    SolutionOutlined,
    NotificationOutlined,
    BgColorsOutlined,
    UserOutlined,
    ProfileOutlined,
    CalendarOutlined
  } from '@ant-design/icons';
import "./SettingPage.css"


export default function SettingPage({
    version,
    loadProject,
    saveProject,
    openSourcePage,
    selectFilepath,
    downloadCode,
    getChattxt,
    getChatscript,
    changeTheme,
    darktheme,
    showtool,
    setShowtool,
    confirmclear
}) {
  return (
    <div>
        <br/>
        <Row justify={"start"} align={"middle"}>
            <span style={{marginRight:5}}>Current version：{version}</span>
            <a href='https://github.com/sanmusen214/arisstudio-blockly/releases' target='_blank'><Button>Check Updates</Button></a>
        </Row>
        <br/>
        <Row>Import/save Blockly project</Row>
        <Row justify={"space-between"}>
            <Col>
                <Button className="loadprojectButton"><input type="file" name="file" accept='*' className="projectfile" onChange={loadProject}></input><DownloadOutlined />Import Blockly project</Button>
                <Button onClick={saveProject}><SaveOutlined />Save Blockly project</Button>
            </Col>
            <Col>
                <Popconfirm
                    title="Clear Workspace"
                    description="This will clear the current workspace. Remember to save!"
                    onConfirm={confirmclear}
                    onCancel={()=>{}}
                    okText="Clear!"
                    cancelText="Cancel"
                >
                    <Button danger>Clear Workspace</Button>
                </Popconfirm>
            </Col>
        </Row>
        <br/>
        <Row>Export Script</Row>
        <Row>
            {window.wfilepath?<>Current auto export: {window.wfilepath}</>:<></>}
        </Row>
        <Row>
            {window.isinWebpageMode?<></>:<><Button className="loadprojectButton"><input type="file" name="file" accept='text/plain' className="projectfile" onChange={selectFilepath}></input><CodeOutlined />{window.wfilepath?"Reset":"Set"}Auto Export</Button></>}
            
            <Button onClick={downloadCode}><ContainerOutlined/>Export Script</Button>
        </Row>
        {/* <br/>
        <Row>AI Voice</Row>
        <Row>
            <Button onClick={getChattxt}><SolutionOutlined/>Export Voice Text</Button>
            <Button onClick={getChatscript}><NotificationOutlined/>Export Script with Voice</Button>
        </Row> */}
        <br/>
        <Row>Display Mode</Row>
        <Row>
            <Button onClick={changeTheme}><BgColorsOutlined />{darktheme?"Switch to Light Mode":"Switch to Dark Mode"}</Button>
        </Row>
        <br/>
        <Row>
            <Button onClick={()=>{
                setShowtool((tool)=>{return !tool})
            }}><CalendarOutlined />{showtool?"Hide Right Panel":"Show Right Panel"}</Button>
        </Row>
    </div>
  )
}
