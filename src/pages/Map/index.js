import React from 'react';
import NavBar from '../../components/NavBarHeader'
// 引入css in js解决类名冲突
import styles from './index.module.css'
import axios from 'axios'
const BMap = window.BMap
// 房源覆盖物样式
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

  }
  componentDidMount() {
    var map = new BMap.Map("container");
    // 从本地存储中获取定位城市
    const { label, value } = JSON.parse(localStorage.getItem('hkzf'))
    console.log(label, value);

    // 创建地址解析器实例     
    var myGeo = new BMap.Geocoder();
    // 将地址解析结果显示在地图上，并调整地图视野
    // point从本地存储的label解析得到  label=>point
    myGeo.getPoint(label, async function (point) {
      if (point) {
        map.centerAndZoom(point, 11);
        // 创建图形标注
        map.addOverlay(new BMap.Marker(point));
        // 地图的平移缩放控件
        map.addOverlay(new BMap.NavigationControl);
        // 此类表示比例尺控件
        map.addOverlay(new BMap.ScaleControl);
        // 获取区域信息
        const res = await axios.get('http://localhost:8080/area/map?id=' + value)

        // 遍历区域
        res.data.body.forEach(item => {
          // 结构出经纬度
          const { coord: { longitude, latitude } } = item
          // 此类表示一个地理坐标点
          const pointChange = new BMap.Point(longitude, latitude)
          // 绘制文字遮盖物
          const ops = {
            position: pointChange
          }
          const SquareOverlay = new BMap.Label('地图你真美', ops
          )
          // 绘制房源遮盖物
          SquareOverlay.setContent(`
        <div class="${styles.bubble}">
        <p class="${styles.name}">浦东</p>
        <p>99套</p>
        </div>
        `)
          // 设置样式
          SquareOverlay.setStyle(labelStyle)
          // 应用遮盖物
          map.addOverlay(SquareOverlay)
          // 房源覆盖物点击事件
          SquareOverlay.addEventListener('click', () => {
            console.log('房源遮盖物点击了');

          })
        })


      }

    },
      label)



  }

  render() {
    return (
      <div className={styles.map}>
        {/* {123} 在子节点中是数字类型 123是string类*/}
        <NavBar>地图找房</NavBar>

        <div id="container" className={styles.container}></div>
      </div>
    )
  }
}