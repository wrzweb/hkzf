import React, { Component } from 'react'
import { Flex, WingBlank, WhiteSpace,Toast } from 'antd-mobile'

import { Link } from 'react-router-dom'

import NavBarHeader from '../../components/NavBarHeader'
import {API}from '../../utils/api.js'
import styles from './index.module.css'

// 验证规则：
const REG_UNAME = /^[a-zA-Z_\d]{5,8}$/
const REG_PWD = /^[a-zA-Z_\d]{5,12}$/

class Login extends Component {
  state={
    username:'test1',
    password:'123456'
  }
  // 登录提交
  onSubmit=async e=>{
    console.log(this.props);
    e.preventDefault()
    const{username,password}=this.state
    if(username.trim().length<5||username.trim().length>8){
      return Toast.info('用户名长度为5-8位')
    }
    if(!REG_UNAME.test(username)){
      return Toast.info('用户名不能包含特殊字符')
    }
    if(password.trim().length<5||password.trim().length>12){
      return Toast.info('密码长度为5-12位')
    }
    if(!REG_PWD.test(password)){
      return Toast.info('密码不能包含特殊字符')
    }
    const{data:res}=await API.post('/user/login',{
      username,password
    })
    window.localStorage.setItem('hkzf_token',res.body.token)
    
    if(this.props.location.state){
      
      
      return this.props.history.push(this.props.location.state.toUrl)
    }
    this.props.history.go(-1)
    
  }
  onChange=(e)=>{
   this.setState({
     [e.target.name]:e.target.value
   })
   
  }
  render() {
    return (
      <div className={styles.root}>
        {/* 顶部导航 */}
        <NavBarHeader className={styles.navHeader}>账号登录</NavBarHeader>
        <WhiteSpace size="xl" />

        {/* 登录表单 */}
        <WingBlank>
          <form onSubmit={this.onSubmit}>
            <div className={styles.formItem}>
              <input
                className={styles.input}
                name="username"
                placeholder="请输入账号"
                value={this.state.username}
                onChange={this.onChange}
              />
            </div>
            {/* 长度为5到8位，只能出现数字、字母、下划线 */}
            {/* <div className={styles.error}>账号为必填项</div> */}
            <div className={styles.formItem}>
              <input
                className={styles.input}
                name="password"
                type="password"
                placeholder="请输入密码"
                value={this.state.password}
                onChange={this.onChange}
              />
            </div>
            {/* 长度为5到12位，只能出现数字、字母、下划线 */}
            {/* <div className={styles.error}>账号为必填项</div> */}
            <div className={styles.formSubmit}>
              <button className={styles.submit} type="submit" >
                登 录
              </button>
            </div>
          </form>
          <Flex className={styles.backHome}>
            <Flex.Item>
              <Link to="/registe">还没有账号，去注册~</Link>
            </Flex.Item>
          </Flex>
        </WingBlank>
      </div>
    )
  }
}

export default Login
