import React from 'react';
import Search from '../../components/Search/index'
import Styles from './index.module.css'
import Filter from './components/Filter/index.js'
export default class findHouse extends React.Component {
  state = {
    
    currentCity:JSON.parse(localStorage.getItem('hkzf')).label
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
        <Filter></Filter>
      </div>
    )
  }

}