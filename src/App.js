import React from 'react';
import {BrowserRouter as Router,Route,Redirect}from 'react-router-dom'
import Home from './pages/Home'
import CityList from './pages/CityList'
function App() {
  return (
    <Router>
    <div className="App">
      {/* 默认路由规则  路由重定向*/}
      <Route path="/" render={()=><Redirect to="/home" />}></Route>
        {/* 路由占位符  路由规则*/}
        <Route path="/Home" component={Home}></Route>
        <Route path="/CityList" component={CityList}></Route>
      
    </div>
    </Router>
  )
}

export default App;
