import React from 'react';
import Search from '../../components/Search/index'
import Styles from './index.module.css'
import Filter from './components/Filter/index.js'
import {API}from '../../utils/api.js'
import {REACT_APP_URL} from '../../utils/utils.js'
import HouseItem from '../../components/HouseItem/index.js'
// 引入长列表
import { List,WindowScroller, AutoSizer,InfiniteLoader} from 'react-virtualized';
const {value} =JSON.parse(localStorage.getItem('hkzf'))
export default class findHouse extends React.Component {
  state = {
    filters:{},
    count:0,
    filterList:[],
    currentCity:JSON.parse(localStorage.getItem('hkzf')).label

  }
// 接收房屋选择数据 filter组件中的
handel=async data=>{
this.setState(()=>{
  return{
     
      filters:data,

    
  }
},()=>{
  // 拿到选择的条件后请求符合条件的房屋数据
  this.readerFilters()
})

}
getFilters=async()=>{
  // 获取所有房屋信息
const{data:res}=await API.get('/houses',{
  params:{
    // 选择好的房屋数据
    ...this.state.filters,
    cityId:value,
    start:1,
    end:20
  }
})

this.setState({
  count:res.body.count,
  filterList:res.body.list
})


}
componentDidMount(){
  // 页面一加载也获取所有的房屋信息
  this.getFilters()
}

rowRenderer = ({
  key,
  index, // 集合中的行索引
  style, // Style object to be applied to row (to position it)
}) => {
  const{filterList}=this.state
 
  if(!filterList[index]){
    return <div key={key} style={style}>
      <p className={Styles.loading} />
    </div>
  }
  const newItem = {...filterList[index],src:REACT_APP_URL+filterList[index].houseImg}

  return (
    <div key={key} style={style} className="houseItem">
      <HouseItem {...newItem}></HouseItem>
    </div>
  )
}
// 判断列表中的每一行是否加载完成
isRowLoaded = ({ index }) => {
 
  return !!this.state.filterList[index]
}
// 加载更多的方法
loadMoreRows = ({startIndex, stopIndex}) => {
  console.log(startIndex,stopIndex)
  return new Promise( async resolve=>{
    const res = await API.get('/houses',{
      params:{
        ...this.state.filters,
        cityId:value,
        start: startIndex,
        end: stopIndex
      }
    })
    this.setState({
      count: res.data.body.count,
      filterList: [...this.state.filterList,...res.data.body.list]
    })
    resolve(res)
  })
}

  render () {
    return (
      <div className={Styles.homeList}>
        {/* 搜索栏 */}
        <div className={Styles.header}>
          <i className="iconfont icon-back" onClick={()=>this.props.history.go(-1)}></i>
         <Search currentCity={this.state.currentCity}></Search>
        </div>
        {/* tab栏 */}
        <Filter handel={this.handel}></Filter>
        <InfiniteLoader
          isRowLoaded={this.isRowLoaded}
          loadMoreRows={this.loadMoreRows}
          rowCount={this.state.count}
        >
          {
            ({onRowsRendered,registerChild})=>(
              <WindowScroller>
                {
                  ({height})=>(
                    <AutoSizer>
                      {
                        ({width})=>(
                          <List
                            onRowsRendered={onRowsRendered}
                            ref={registerChild}
                            width={width}
                            height={height}
                            rowCount={this.state.count}
                            rowHeight={120}
                            rowRenderer={this.rowRenderer}
                          />
                        )
                      }
                    </AutoSizer>
                  )
                }
              </WindowScroller>
            )
          }
        </InfiniteLoader>

      </div>
    )
  }

}