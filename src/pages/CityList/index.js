import React from 'react';
import {NavBar,} from 'antd-mobile'
import './index.scss'
import axios from 'axios'
export default class CityList extends React.Component {

  state = {

  }
  // 页面加载时
  componentDidMount(){
    this.cityInfo()
  }
  // 获取城市列表和索引的方法
  formatCityList(list){
    const cityList={}
    // 处理城市列表
    list.forEach(item=>{
      const first=item.short.substr(0,1)
      if(cityList[first]){
        cityList[first].push(item)
      }else{
        cityList[first]=[item]
      }
    })
    // 处理索引
  const cityIndex=Object.keys(cityList).sort()
    return{
      cityList,
      cityIndex
    }
  }
// 获取城市列表数据
cityInfo=async()=>{
const{data:res}=await axios.get('http://localhost:8080/area/city?level=1')
// 调用获取城市列表和索引的方法传递请求回来的数据
const{cityList,cityIndex}=this.formatCityList(res.body)
console.log(cityList,cityIndex);
// 获取热门城市数据
const{data:hotRes}=await axios.get('http://localhost:8080/area/hot')
console.log(hotRes);
// 添加热门城市索引
cityIndex.unshift('热')
// 添加热门城市列表
cityList['hot']=hotRes.body



}
  render () {
    return (
      <div className="city_list">
        <NavBar
      mode="light"
      icon={<i className="iconfont icon-back"></i>}
      
      
    >城市选择</NavBar>
      </div>
    )
  }

}