import React from 'react';
import {Flex} from 'antd-mobile'
import {withRouter}from 'react-router-dom'
 class Search extends React.Component {

  state = {
  }

  render () {
    return (
        <Flex className="search-box">
            {/* 左侧白色区域 */}
            <Flex className="search">
              {/* 位置 */}
              <div
                className="location"
              >
                {/* 城市选择按钮 */}
  <span className="name" onClick={()=>this.props.history.push('/CityList')}>{this.props.currentCity}</span>
                <i className="iconfont icon-arrow" />
              </div>

              {/* 搜索表单 */}
              <div
                className="form"
               
              >
                <i className="iconfont icon-seach" />
                <span className="text">请输入小区或地址</span>
              </div>
            </Flex>
            {/* 右侧地图图标 */}
            <i
              className="iconfont icon-map"
              
            />
          </Flex>
    )
  }

}
export default withRouter(Search)