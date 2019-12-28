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
      price: false,
      more: false
    },
    defaultVal:{
      area: ['area', 'null'],
      mode: ['null'],
      price: ['null'],
      more: []

    },
    openType: '',
    cityData:{}
  }
  // 选项高亮
  changeSeletedTitleStatus = (type => {
    const {seletedTitleStatus,defaultVal}=this.state
    const newObj={...seletedTitleStatus}
    for(var k in newObj){
      console.log(newObj[k])
      if(k===type){
        newObj[k]=true
      }else if(k==='area'&&defaultVal.area[1]!=='null'){
        newObj['area']=true
      }else if(k==='mode'&&defaultVal.mode[0]!=='null'){
        newObj['mode']=true
      }else if(k==='price'&&defaultVal.price[0]!=='null'){
        newObj['price']=true
        // more判断不是一个空数组
      }else if(k==='more'&&defaultVal.more.length!==0){
        newObj['more']=true
    } else{
      newObj[k]=false
    }
    console.log(newObj)
    this.setState({
      seletedTitleStatus: newObj,
      openType: type
    })
  }
  })
  // 取消遮罩方法
  onCancel=(()=>{
    this.setState({
      openType:''
    })
  })
  // 点击确定
   onOk=(value=>{
     console.log(value)
    const {openType,defaultVal}=this.state
    // 新建一份修改后的数据数据
    const newDefaultVal={
      ...defaultVal,
      [openType]:value
    }
    const{area,mode,price,more}=newDefaultVal
    const filters={}
    console.log(area,mode,price,more);
    // 准备area的数据
    // filters[area[0]]是filters[area]或者是filters[subway]
    filters[area[0]]='null'
  console.log(area[0]);
    if(area.length===3){
      filters[area[0]]=area[2]==='null'?area[1]:area[2]
    }
    // 准备mode的数据
    filters.rentType=[mode[0]]
     // 准备price的数据
     filters.price=[price[0]]
 // 准备more的数据 数据有好多个用,分隔
 filters.more=more.join(',')
// 给findhouse传递数据
this.props.handel(filters)

    
    this.setState({
      defaultVal:{
        ...defaultVal,
        [openType]:value
      },
     
      openType:''
    })
  })
  // 抽离FilterPicker组件
  readerFilterPicker=(()=>{
    const {openType,cityData:{area,subway,rentType,price},defaultVal} = this.state
    
    var data=[]
    var cols=3
    if(openType==='area'){
      data=[area,subway]
      cols=3
    }else if(openType==='mode'){
      data=rentType
      cols=1
    }else {
      data=price
      cols=1
    }
    var val =defaultVal[openType]
    console.log(val)
    if(openType === 'area' || openType === 'mode' || openType === 'price'){
      return <FilterPicker key={openType} onCancel={this.onCancel} onOk={this.onOk} data={data} cols={cols} defaultVal={val}/>
    }
    return null
  })
  // 抽离more组件
  readerMore=(()=>{
    const{defaultVal:{more}}=this.state
    const{cityData:{characteristic,floor,oriented,roomType},openType}=this.state
    if(openType!=='more')return null
    const data={
      characteristic,floor,oriented,roomType
    }
    return  <FilterMore data={data} onOk={this.onOk} more={more} onCancel={this.onCancel}/>
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
    console.log(res);
    
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

         

          {/* 最后一个菜单对应的内容： */}
         {this.readerMore()}
        </div>
      </div>
    )
  }
}
