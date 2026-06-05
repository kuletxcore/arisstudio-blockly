import React from 'react'
import { Divider } from 'antd';


export default function HelpTab(props) {

    return (
        <div style={props.style}>
        <h1>FAQ</h1>
        <Divider />

        <h2>After importing assets, the AS console says "key does not exist in the dictionary"</h2>
        Asset nicknames should not contain spaces. English nicknames are recommended. Also check that the import name and usage name match.<br/>
        Character assets do not need filename extensions; other imported assets need filename extensions.<br/><br/>
        Incorrect example: <code>LoadCharacter nickname"<code  style={{color:'red'}}>Hi fu mi</code>" Character object Hifumi Normal state</code><br />
        Correct example: <code>LoadCharacter nickname"<code style={{color:'green'}}>rifumei</code>" Character object Hifumi Normal state</code><br />

        <Divider />

        <h2>Dragging the Blockly workspace is slow</h2>
        Large workspaces can be slow for unknown reasons. Use the mouse wheel to scroll vertically and Shift + mouse wheel to scroll horizontally to reduce rendering work.

        <Divider />

        <h2>Some blocks are unclear</h2>
        Drag a block into the workspace and hover over it to see the tooltip, or <a href="https://space.bilibili.com/7331920?spm_id_from=333.1007.0.0" target="_blank">watch the visual tutorial</a>, read the <a href="https://as.t14.me/docs/as-commands/load-commands" target="_blank">ArisStudio documentation</a>, or ask in the group: 647177204.

        <Divider />
        
        <h2>Face variant preview position is incorrect</h2>
        Try switching between detect-face and fixed-position modes. If that still fails, disable face variants and use the character animation control in normal mode or preview it in ArisStudio.

        <Divider />

        <h2>Visual asset preview or ArisStudio asset loading failed</h2>
        Follow the <a href="https://as.t14.me/docs/as-commands/load-commands">documentation</a> to place files in the correct location. The action spr folder is for in-game spr character assets.
        


        
        </div>)
}
