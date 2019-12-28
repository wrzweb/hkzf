import React from 'react';
import {BrowserRouter as Router,Route,Redirect}from 'react-router-dom'
import Home from './pages/Home'
import CityList from './pages/CityList'
import Map from './pages/Map'
import Login from './pages/Login'
import Rent from './pages/Rent'
import AuthRoute from './components/AuthRoute'
function App() {
  return (
    <Router>
    <div className="App">
      {/* 默认路由规则  路由重定向*/}
      <Route path="/" render={()=><Redirect to="/home" />} exact></Route>
        {/* 路由占位符  路由规则*/}
        <Route path="/home" component={Home}></Route>
        <AuthRoute path="/cityList" component={CityList}></AuthRoute>
        <AuthRoute path="/map" component={Map}></AuthRoute>
        <Route path="/login" component={Login}></Route>
        <AuthRoute path="/rent" component={Rent}></AuthRoute>
      
    </div>
    </Router>
  )
}

export default App;
