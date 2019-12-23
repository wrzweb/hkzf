import React, { Component } from 'react'
import {API} from '../../../../utils/api.js'
import FilterTitle from '../FilterTitle'
import FilterPicker from '../FilterPicker'
import FilterMore from '../FilterMore'

import styles from './index.module.css'
export default class Filter extends Component {
  state = {
    seletedTitleStatus: {
      area: false,
      mode: false,
      price: true,
      move: false
    },
    openType: '',
    cityData:{}
  }
  // 选项高亮
  changeSeletedTitleStatus = (type => {
    console.log(type)
    this.setState({
      seletedTitleStatus: {
        ...this.state.seletedTitleStatus,
        // 更改area等数据为true
        [type]: true
      },
      openType: type
    })
  })
  // 取消遮罩方法
  onCancel=(()=>{
    this.setState({
      openType:''
    })
  })
  // 点击确定
   onOk=(()=>{
    this.setState({
      openType:''
    })
  })
  // 抽离FilterPicker组件
  readerFilterPicker=(()=>{
    const {openType } = this.state
    if(openType === 'area' || openType === 'mode' || openType === 'price'){
      return <FilterPicker onCancel={this.onCancel} onOk={this.onOk}/>
    }
    return null
  })
   // 抽离前三个菜单的遮罩层
   readerMask=(()=>{
    const {openType } = this.state
    if(openType === 'area' || openType === 'mode' || openType === 'price'){
      return  <div className={styles.mask} onClick={this.onCancel} />
    }
    return null
  })
  // 请求城市房屋信息
  cityHouse=(async()=>{
    const id=JSON.parse(localStorage.getItem('hkzf')).value
    const {data:res}=await API.get('/houses/condition?id='+id)
    this.setState({
      cityData:res.body
    })
  })
  componentDidMount(){
    this.cityHouse()
  }
  render() {
    const { seletedTitleStatus} = this.state
    return (
      <div className={styles.root}>
        {/* 前三个菜单的遮罩层 */}
        {this.readerMask()}

        <div className={styles.content}>
          {/* 标题栏 */}
          {/* onclick是属性 */}
          <FilterTitle seletedTitleStatus={seletedTitleStatus} onclick={this.changeSeletedTitleStatus} />

          {/* 前三个菜单对应的内容： */}
          {this.readerFilterPicker()}

          {/* <FilterPicker /> */}

          {/* 最后一个菜单对应的内容： */}
          {/* <FilterMore /> */}
        </div>
      </div>
    )
  }
}
