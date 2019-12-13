import React from 'react';
import { Route} from 'react-router-dom'
// 导入组件
import News from '../News'
import HomeIndex from '../HomeIndex'
import Me from '../Me'
import FindHouse from '../FindHouse'
// 导入tabbar
import { TabBar } from 'antd-mobile';
// 导入home.css
import './home.scss'
const tabItems = [
  {
    title: '首页',
    icon: 'icon-ind',
    path: '/home'
  },
  {
    title: '找房',
    icon: 'icon-findHouse',
    path: '/home/list'
  },
  {
    title: '资讯',
    icon: 'icon-infom',
    path: '/home/news'
  },
  {
    title: '我的',
    icon: 'icon-my',
    path: '/home/me'
  }
]
export default class Home extends React.Component {
  state = {
    // tabbar高亮
    selectedTab: this.props.location.pathname,
   
  }
  renderTabItems(){
    // 把这个方法return出去
    return tabItems.map(item=>{
      // return 内容
     return <TabBar.Item
          icon={<i className={`iconfont ${item.icon}`} ></i>}
          selectedIcon={
            <i className={`iconfont ${item.icon}`}></i>
          }
          title={item.title}
          key={item.title}
          
          selected={this.state.selectedTab === item.path}
          onPress={() => {
            this.setState({
              selectedTab: item.path,
            })
            this.props.history.push(item.path)

          }}
         
        >
         
        </TabBar.Item>
    })
  }
   // 更新数据
   componentDidUpdate(oldProps){
     console.log(oldProps.location);
     
    if(oldProps.location.pathname!==this.props.history.location.pathname){
      this.setState({
        selectedTab:this.props.history.location.pathname
      })
    }
    
   }
  render() {
    return ( 
      
      <div  className="home">
        <Route path="/home/news" component={News}></Route>
        <Route path="/home" exact component={HomeIndex}></Route>
        <Route path="/home/list" component={FindHouse}></Route>
        <Route path="/home/me" component={Me}></Route>
        {/* tabbar页面 */}
      
          <TabBar
            tintColor="#21b97a"
            barTintColor="white"
            noRenderContent={true}
          >
           {this.renderTabItems()}
          
          </TabBar>
        </div>
      
    )
  }

}
