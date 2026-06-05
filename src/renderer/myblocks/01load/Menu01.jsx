import PlayGround, { Block, Value, Field, Shadow, Category } from '../../components/PlayGround';

import React from 'react'

export default function Menu01() {
  return (
    <Category name="Load" colour="230">
        <label text="Make sure assets are placed correctly!" web-class="myLabelStyle"></label>

        <Block type="b_load_student">
            <Value name="val1"><Shadow type="text" /></Value>
            <Value name="val2"><Shadow type="text" /></Value>
        </Block>
        <Block type="b_load_studentselect">
            <Value name="val1"><Shadow type="text" /></Value>
        </Block>
        <Block type="b_load_pic">
            <Value name="val1"><Shadow type="text" /></Value>
            <Value name="val2"><Shadow type="text" /></Value>
        </Block>
        <Block type="b_load_sound">
            <Value name="val1"><Shadow type="text" /></Value>
            <Value name="val2"><Shadow type="text" /></Value>
        </Block>
    </Category>
  )
}
