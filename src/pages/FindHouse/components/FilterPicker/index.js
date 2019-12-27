import React, { Component } from 'react'

import { PickerView } from 'antd-mobile'

import FilterFooter from '../../../../components/FilterFooter'


export default class FilterPicker extends Component {
  state={
    changeValue:this.props.defaultVal
  }
  // 拿到选择器组件的内容
  onChange=(value=>{
    console.log(value)
    this.setState({
      changeValue:value
    })
  })
  render() {
    const{onCancel,onOk,data,cols}=this.props
    return (
      <>
        {/* 选择器组件： */}
        <PickerView data={data} value={this.state.changeValue} cols={cols} onChange={this.onChange}/>

        {/* 底部按钮 */}
        <FilterFooter onCancel={onCancel} onOk={()=>onOk(this.state.changeValue)}/>
      </>
    )
  }
}
