import React, { Component } from 'react'

import { SearchBar } from 'antd-mobile'

import{API}  from '../../../utils/api.js'
import styles from './index.module.css'
const {value:cityId}  = JSON.parse(window.localStorage.getItem('hkzf')||"{}")

export default class Search extends Component {
  // 当前城市id

  state = {
    // 搜索框的值
    searchTxt: '',
    tipsList: []
  }

  // 渲染搜索结果列表
  renderTips = () => {
    const { tipsList } = this.state

    return tipsList.map(item => (
      <li key={item.community} className={styles.tip} onClick={()=>this.liPush(item)}>
        {item.communityName}
      </li>
    ))
  }
// 拿到输入框变化的值
onChange=val=>{
  this.setState(()=>{
    return{
      searchTxt:val
    }
  },()=>{
    const{searchTxt}=this.state
    if(searchTxt.trim().length===0){
      return
    }
   clearTimeout(this.id)
  //  把定时器挂载在this上
  setTimeout(async()=>{
  const {data:res}=await API.get('/area/community',{
    params:{
      name:searchTxt,
      id:cityId
    }
  })
  this.setState({
    tipsList:res.body
  })
  
  },800)
    
  })
}
// 列表跳转
liPush=(item)=>{
  this.props.history.push('/rent/add',{
    name:item.communityName,
    id:item.community
  })
}
  render() {
    const { history } = this.props
    const { searchTxt } = this.state

    return (
      <div className={styles.root}>
        {/* 搜索框 */}
        <SearchBar
          placeholder="请输入小区或地址"
          value={searchTxt}
          onChange={this.onChange}
          showCancelButton={true}
          onCancel={() => history.replace('/rent/add')}
        />

        {/* 搜索提示列表 */}
        <ul className={styles.tips}>{this.renderTips()}</ul>
      </div>
    )
  }
}
