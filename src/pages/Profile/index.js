import React, { Component } from 'react'

import { Link } from 'react-router-dom'
import { Grid, Button,Modal,Toast } from 'antd-mobile'

import { REACT_APP_URL } from '../../utils/utils.js'
// 引入判断是否有toktn
import{isAuth,removeToken}  from '../../utils/isAuth'
import styles from './index.module.css'
import {API} from '../../utils/api.js'
const alert = Modal.alert
// 菜单数据
const menus = [
  { id: 1, name: '我的收藏', iconfont: 'icon-coll', to: '/favorate' },
  { id: 2, name: '我的出租', iconfont: 'icon-ind', to: '/rent' },
  { id: 3, name: '看房记录', iconfont: 'icon-record' },
  {
    id: 4,
    name: '成为房主',
    iconfont: 'icon-identity'
  },
  { id: 5, name: '个人资料', iconfont: 'icon-myinfo' },
  { id: 6, name: '联系我们', iconfont: 'icon-cust' }
]

export default class Profile extends Component {
  avatarEditor = React.createRef()

  state = {
    isAuth:isAuth(),
    userInfo: {
      nickname: '' || '游客',
      avatar: '' || REACT_APP_URL + '/img/profile/avatar.png'
    }
  }
    readerInfo=()=>{
        const { history } = this.props
        const{isAuth}=this.state
        if(isAuth){
          
         return (
            <>
            <div className={styles.auth}>
              <span onClick={this.logout}>退出</span>
            </div>
            <div className={styles.edit}>
              编辑个人资料
              <span className={styles.arrow}>
                <i className="iconfont icon-arrow" />
              </span>
            </div>
          </>
          )
        }else {
          return(
            <>
            <div className={styles.edit}>
            <Button
              type="primary"
              size="small"
              inline
              onClick={() => history.push('/login')}
            >
              去登录
            </Button>
          </div>
          </>
          )
        }
      }
      // 获取个人数据
    getUserInfo= async _=>{
      // 没有Tooken return
      if(!isAuth)return
      // 没有tooken可以发送请求只是状态码为400
      const res= await API.get('/user')
      console.log(res);
      
      if(res.data.status!==200){
        return this.setState({
          // 没有Tooken，渲染未登录页面
          isAuth:false
        })
      } 
      this.setState({
        userInfo: {
          nickname: res.data.body.nickname || Math.random().toString(36).substr(3),
          avatar: res.data.body.avatar || REACT_APP_URL + '/img/profile/avatar.png'
        }
      })
    }
      // 退出功能
      logout=()=>{
        alert('提示', '是否确定需要退出', [
          { text: '取消', onPress: () => console.log('cancel') },
          { text: '确定', onPress: async _ => {
            const{data:res}= await API.post('/user/logout',null)
            console.log(res);
            
            removeToken()
            this.setState({
              isAuth:false,
              userInfo: {
                nickname: '' || '游客',
                avatar: '' || REACT_APP_URL + '/img/profile/avatar.png'
              }
            })
            
          }}         
        ])
      
        
      }
    componentDidMount(){
      this.getUserInfo()
    }
  render() {
    const {
      userInfo: { nickname, avatar }
    } = this.state
    const { history } = this.props

    return (
      <div className={styles.root}>
        {/* 个人信息 */}
        <div className={styles.title}>
          <img
            className={styles.bg}
            src={REACT_APP_URL + '/img/profile/bg.png'}
            alt="背景图"
          />
          <div className={styles.info}>
            <div className={styles.myIcon}>
              <img className={styles.avatar} src={avatar} alt="icon" />
            </div>
            <div className={styles.user}>
              <div className={styles.name}>{nickname || '游客'}</div>
              {this.readerInfo()}
              {/* 登录后展示： */}
              {/* 未登录展示： */}
             
            </div>
          </div>
        </div>

        {/* 九宫格菜单 */}
        <Grid
          data={menus}
          columnNum={3}
          hasLine={false}
          renderItem={item =>
            item.to ? (
              <Link to={item.to}>
                <div className={styles.menuItem}>
                  <i className={`iconfont ${item.iconfont}`} />
                  <span>{item.name}</span>
                </div>
              </Link>
            ) : (
              <div className={styles.menuItem}>
                <i className={`iconfont ${item.iconfont}`} />
                <span>{item.name}</span>
              </div>
            )
          }
        />

        {/* 加入我们 */}
        <div className={styles.ad}>
          <img src={REACT_APP_URL + '/img/profile/join.png'} alt="" />
        </div>
      </div>
    )
  }
}
