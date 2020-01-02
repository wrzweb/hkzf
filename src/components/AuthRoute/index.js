import React from 'react'
import {Route,Redirect} from 'react-router-dom'
import {isAuth} from '../../utils/isAuth.js'
const AuthRoure=(props)=>{
    const{component:Component,path,...other}=props
    return<Route {...other} path={path} render={(props)=>{
        
        if(isAuth()){
            // 把props展开，传递history
            return <Component {...props}></Component>
        }
      return  <Redirect to={{
          pathname:'/login',
          state:{
              toUrl:props.location.pathname
          }
      }}>
      </Redirect>
    }}></Route>
}
export default AuthRoure