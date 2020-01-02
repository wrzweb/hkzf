import React,{Suspense}from 'react';
import {HashRouter as Router,Route,Redirect}from 'react-router-dom'
import AuthRoute from './components/AuthRoute'
// React.lazy(()=>import(''))路由分割
const Home=React.lazy(()=>import('./pages/Home'))
const CityList=React.lazy(()=>import('./pages/CityList'))
const Map=React.lazy(()=>import('./pages/Map'))
const Login=React.lazy(()=>import('./pages/Login'))
const Rent=React.lazy(()=>import('./pages/Rent'))
const RentAdd=React.lazy(()=>import('./pages/Rent/Add'))
const RentSearch=React.lazy(()=>import('./pages/Rent/Search'))
function App() {
  return (
    <Router>
    <div className="App">
      {/* 默认路由规则  路由重定向*/}
      <Route path="/" render={()=><Redirect to="/home" />} exact></Route>
        {/* 路由占位符  路由规则*/}
        {/* <Suspense> 加载时显示的内容*/}
  <Suspense fallback={<img src='./loading.gif'></img>}>
        <Route path="/home" component={Home}></Route>
        <AuthRoute path="/cityList" component={CityList}></AuthRoute>
        <AuthRoute path="/map" component={Map}></AuthRoute>
        <Route path="/login" component={Login}></Route>
        <AuthRoute path="/rent" component={Rent} exact></AuthRoute>
        <AuthRoute path="/rent/add" component={RentAdd}></AuthRoute>
        <AuthRoute path="/rent/search" component={RentSearch}></AuthRoute>
        </Suspense>
    </div>
    </Router>
  )
}

export default App;
