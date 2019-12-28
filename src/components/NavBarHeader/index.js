import React from 'react'
import {NavBar} from 'antd-mobile'
import { withRouter } from 'react-router-dom'
import propTypesaa from 'prop-types'
import styles from'./index.module.css'
// const{children,history,onLeftClick}=props
 function NavBarHeader({children,history,onLeftClick}) {
     const defaultLeft=() =>history.go(-1)
     
    return (
        <NavBar
        mode="light"
        icon={<i className="iconfont icon-back"></i>}
        // 点击回退可以用上面的方法也可用传进来的方法
        onLeftClick={onLeftClick||defaultLeft}
        // 单独的样式
        className={styles.navbar}
        // 使用子节点
    >{children}</NavBar>
    )}
    NavBarHeader.propTypes={
        children:propTypesaa.string.isRequired,
        onLeftClick:propTypesaa.func
    }
    // 高阶函数
    export default withRouter(NavBarHeader)