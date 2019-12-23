import React from 'react';
import NavBar from '../../components/NavBarHeader'
// 引入css in js解决类名冲突
import styles from './index.module.css'
import axios from 'axios'
import {Link} from 'react-router-dom'
import { Toast } from 'antd-mobile'
const BMap = window.BMap

// 房源覆盖物默认样式
const labelStyle = {
  cursor: 'pointer',
  border: '0px solid rgb(255, 0, 0)',
  padding: '0px',
  whiteSpace: 'nowrap',
  fontSize: '12px',
  color: 'rgb(255, 255, 255)',
  textAlign: 'center'
}
  
export default class Map extends React.Component {
  state = {
    houseList: [],
    isShow:false

  }
  componentDidMount() {
    // 初始化地图
    this.initMap()
  
  }
  //初始化地图
  initMap=()=> {
  // 获取当前城市信息
  const {label,value} = JSON.parse(localStorage.getItem('hkzf'))
  console.log(label,value)
  // 创建一个地图实例
  var map = new BMap.Map("container"); 
  this.map=map
  // 创建地址解析器实例     
  var myGeo = new BMap.Geocoder();      
  // 将地址解析结果显示在地图上，并调整地图视野    
  myGeo.getPoint(label, point=>{      
      if (point) {      
        this.readMap(value)
          map.centerAndZoom(point, 11);      
          // 添加常用控件   
          map.addControl(new BMap.ScaleControl()); 
          map.addControl(new BMap.NavigationControl());
      }      
  }, 
  label);
  map.addEventListener('movestart',()=>{
    if(this.state.isShow){
      this.setState({
        isShow: false
      })
    }
  })
  }
  // 渲染所在区的遮盖物
  readMap=async value=> {
    // 查询房源数据
    Toast.loading('正在加载房源数据,请稍后')
    const res = await axios.get('http://localhost:8080/area/map?id=' + value)
    Toast.hide()
    // 调用地图缩放级别
    const{nextZoom,type}=this.getTypeZoom()
    res.data.body.forEach(item => {
      // 创建遮盖物
      this.createOverLay(item,nextZoom,type) 
  })
}
  // 创建遮盖物方法
  createOverLay(item, nextZoom, type) {
 const { coord: { longitude, latitude }} = item
 // 结构出经纬度
 const pointChange = new BMap.Point(longitude, latitude)
    // 判断创建哪种遮盖物
    if (type === 'circle') {
      // 创建大区镇遮盖物
      this.createCircle(item,nextZoom,pointChange)
    } else {
      // 创建小区遮盖物
      this.createRect(item,pointChange)
    }
  }
  // // 地图下次缩放级别和遮盖物类型
  getTypeZoom = () => {
    const zoom = this.map.getZoom()
    let nextZoom, type
    if (zoom === 11) {
      nextZoom = 13
      type = 'circle'
    } else if (zoom === 13) {
      nextZoom = 16
      type = 'circle'
    } else {
      type = 'rect'
    }
    return { nextZoom,type }
  }
  // 创建大区镇遮盖物
  createCircle=(item, nextZoom,pointChange)=>{
    const{value,label,count}=item
    
    // 绘制文字遮盖物
    const ops = {
      position: pointChange,
      offset: new BMap.Size(-50,-10)
    }
    const SquareOverlay = new BMap.Label('', ops)
    
  // 绘制遮盖物
    SquareOverlay.setContent(`
    <div class="${styles.bubble}">
    <p class="${styles.name}">${label}</p>
    <p>${count}</p>
    </div>
      `)
//  设置默认样式
  SquareOverlay.setStyle(labelStyle)
      // 创建唯一标识
    SquareOverlay.id = value
    // 房源覆盖物点击事件
 SquareOverlay.addEventListener('click', () => {
  this.readMap(value)
  //  创建地图调整缩放级别
  this.map.centerAndZoom(pointChange,nextZoom)
  // 清除遮盖物
  setTimeout(()=>{
    this.map.clearOverlays()
  },0)  
 })
     // 应用遮盖物
    this.map.addOverlay(SquareOverlay)

  }
  // // 创建小区遮盖物
  createRect=(item,pointChange)=>{
    const{value,label,count}=item
    // 绘制文字遮盖物
    const ops = {
      position: pointChange,
      offset: new BMap.Size(-50,-10)
    }
    const SquareOverlay = new BMap.Label('', ops)
    
  // 绘制遮盖物
    SquareOverlay.setContent(`
    <div class="${styles.rect}">
    <span class="${styles.housename}">${label}</span>
    <span class="${styles.housenum}">${count}套</span>
    <i class="${styles.arrow}"></i>
  </div>
      `)
//  设置默认样式
  SquareOverlay.setStyle(labelStyle)
      // 创建唯一标识
    SquareOverlay.id = value
    // 房源覆盖物点击事件
 SquareOverlay.addEventListener('click', () => {
 this.getXqList(value)
//  计算中心点
var box=document.querySelector('.Map_rect__R9ScX');  
 var zx = box.getBoundingClientRect()
 const x=(window.innerWidth / 2) - zx.left
 const y=(window.innerHeight - 330) / 2 - zx.top
 this.map.panBy(x,y)

  })
       // 应用遮盖物
       this.map.addOverlay(SquareOverlay)
}
 // 获取小区数据
 async getXqList(area) {
  Toast.loading('正在加载房源数据,请稍后')
   const { data: res } = await axios.get('http://localhost:8080/houses?area=' + area)
   Toast.hide()
   console.log(res);
   this.setState({
     houseList: res.body.list,
     isShow:true
   })
  }

  // 遍历房源列表结构
  mapHouseList=()=>{
    
    return this.state.houseList.map(item=>(


    
    <div
    key={item.houseCode}
          className={[
            styles.houseList, this.state.isShow?styles.show:''
          ].join(' ')}
        >
          <div className={styles.titleWrap}>
            <h1 className={styles.listTitle}>房屋列表</h1>
            <Link className={styles.titleMore} to="/home/list">
              更多房源
            </Link>
          </div>

          <div className={styles.houseItems} >
            {/* 房屋结构 */}
            
              <div className={styles.house}>
                <div className={styles.imgWrap}>
                  <img
                    className={styles.img}
                    src={`http://localhost:8080/newImg/7bk8i52h1.jpg`}
                    alt=""
                  />
                </div>
                <div className={styles.content}>
        <h3 className={styles.title}>{item.title}</h3>
        <div className={styles.desc}>{item.desc}</div>
                  <div>
                  {item.tags.map((tag,index)=>(
                    <span
                    className={[styles.tag, styles.tag1].join(' ')} key={index}>
                      {tag}
                  </span>
                  ))}
                  </div>
                  <div className={styles.price}>
                    <span className={styles.priceNum}>{item.price}</span> 元/月
                  </div>
                </div>
              </div>
          </div>
        </div>
        ))
  }
  
  render() {
    return (
      <div className={styles.map}>
        {/* {123} 在子节点中是数字类型 123是string类*/}
        <NavBar>地图找房</NavBar>

        <div id="container" className={styles.container}></div>
        {this.mapHouseList()}
       </div>
    )
  }
}