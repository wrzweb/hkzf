import React from 'react';
import './index.scss'
import axios from 'axios'
import NavBar from '../../components/NavBarHeader'
// 导入定位城市方法
import { current_city } from '../../utils/api.js'
// 引入长列表
import { List, AutoSizer } from 'react-virtualized';
import {Toast} from 'antd-mobile'
// 索引（A、B等）的高度
const TITLE_HEIGHT = 36
// 每个城市名称的高度
const NAME_HEIGHT = 50
// 可切换城市数组
const change_city=['北京','上海','广州','深圳']
export default class CityList extends React.Component {
constructor(props){
  super(props)

  this.state = {
    cityList: {},
    cityIndex: [],
    // 右侧列表高亮索引
    activeIndex:0
  }
  // 创建非受控组件
  this.listRef=React.createRef()

}
  // 处理城市索引不同情况
  formatCity(index) {
    if (index === '#') {
      index = '当前定位'
    } else if (index === 'hot') {
      index = '热门城市'
    } else {
      // 把城市分类的小写字母转换为大写字母
      index = index.toUpperCase()
    }
    return index
  }
  // 页面加载时
   async componentDidMount() {
    //  获取城市列表数据
    await this.cityInfo()
    // 提前计算左侧列表的数量和高度
    this.listRef.current.measureAllRows()
  }
  //城市点击
  citySes=item=>{
    console.log(item);
    
// 判断城市是否可切换
// 点击城市传过来
    if(change_city.indexOf(item.label)==-1){
      
      return Toast.info('当前城市还未入驻,敬请期待');
    }
    // 把能切换的城市保存在本地
    localStorage.setItem('hkzf',JSON.stringify(item))
    this.props.history.go(-1)
  }
  rowRenderer = ({
    key,
    index, // 集合中的行索引
    isScrolling, // 列表滚动
    isVisible, // 当前可视区域的列表可见，滚动后下面的列表从false变为true
    style, // Style object to be applied to row (to position it)
  }) => {
    const { cityIndex, cityList } = this.state
    

    return (

      <div key={key} style={style} className="city">
        <div className="title">{this.formatCity(cityIndex[index])}</div>
        {
          cityList[cityIndex[index]].map(item => {
            return (
              <div className="name" key={item.value} onClick={()=>this.citySes(item)}>{item.label}</div>
            )
          })
        }

      </div>
    )
  }

  // 获取城市列表和索引的方法
  // list= res.body
  formatCityList(list) {
    const cityList = {}
    // 处理城市列表
    list.forEach(item => {
      
      // 截取城市首字母
      const first = item.short.substr(0, 1)
      // 相同首字母的城市放一起
      if (cityList[first]) {
       
        
        cityList[first].push(item)

      } else {
        // 第一次遍历没有数据,把第一项数据直接给对象
        cityList[first] = [item]
      }
    })
   
    // 处理索引 Object.keys 返回可枚举的属性的字符串数组['#','a']
    const cityIndex = Object.keys(cityList).sort()
    return {
      cityList,
      cityIndex
    }
  }
  // 获取城市列表数据
  cityInfo = async () => {
    const { data: res } = await axios.get('http://localhost:8080/area/city?level=1')
    // 调用获取城市列表和索引的方法传递请求回来的数据
    const { cityList, cityIndex } = this.formatCityList(res.body)
    console.log(cityList, cityIndex);
    // 获取热门城市数据
    const { data: hotRes } = await axios.get('http://localhost:8080/area/hot')
    console.log(hotRes);
    // 添加热门城市索引
    cityIndex.unshift('hot')
    // 添加热门城市列表
    cityList['hot'] = hotRes.body
    const currentCity = await current_city()
    //添加#
    cityIndex.unshift('#')
    // 当前定位城市是一个对象,用[]包裹一下
    cityList['#'] = [currentCity]
    this.setState({
      cityList,
      cityIndex
    })


  }
  // 计算城市列表高度
  getRowHeight=({index})=>{
  //  {index}=0~20
    
   const{cityList,cityIndex}=this.state
  //  城市分类之间的高度+(每类城市的高度(城市名高度*城市的长度))
   return TITLE_HEIGHT+NAME_HEIGHT*cityList[cityIndex[index]].length 
    
  }
  //右侧点击
  rightClick=(index)=>{
    // 高亮图标滚动的位置
    this.listRef.current.scrollToRow(index)
    

  }
  // 渲染右侧数据
  rightData=()=>{
    return this.state.cityIndex.map((item,index)=>{
      return(
        <li className="city-index-item" key={item} onClick={()=>this.rightClick(index)}>
          {/* 右侧索引=城市列表索引添加高亮类名 否则类名为空 */}
         <span className={index===this.state.activeIndex?'index-active':''}>
           {/* 索引为hot变成热否则大写 */}
        {item==='hot'?'热':item.toUpperCase()}
        </span>
      </li>
      )
    })
  }
  // 右侧高亮区域  值类型 startIndex写在前面先打印再赋值给activeIndex
  rendRendered=({startIndex})=>{
    console.log(startIndex)
    // 判断不在当前城市类中再更改要高亮的索引
if(startIndex!==this.state.activeIndex){
  this.setState({
    activeIndex:startIndex
  })
  console.log(this.state.activeIndex);
  
}
  }
  render() {
    return (
      <div className="city_list">
        <NavBar>城市选择</NavBar>


        <AutoSizer>
          {({ height, width }) => (
            <List
            ref={this.listRef}
            // 点击行出现在页面顶部
            scrollToAlignment="start"
              height={height}
              rowCount={this.state.cityIndex.length}
              rowHeight={this.getRowHeight}
              rowRenderer={this.rowRenderer}
              onRowsRendered={this.rendRendered}
              width={width}
            />
          )}
        </AutoSizer>
        <ul className="city-index" >
       {this.rightData()}
      </ul>
      </div>
    )
  }

}
