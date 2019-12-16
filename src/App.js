import React from 'react';
import {BrowserRouter as Router,Route,Redirect}from 'react-router-dom'
import Home from './pages/Home'
import CityList from './pages/CityList'
import Map from './pages/Map'
function App() {
  return (
    <Router>
    <div className="App">
      {/* 默认路由规则  路由重定向*/}
      <Route path="/" render={()=><Redirect to="/home" />} exact></Route>
        {/* 路由占位符  路由规则*/}
        <Route path="/Home" component={Home}></Route>
        <Route path="/CityList" component={CityList}></Route>
        <Route path="/map" component={Map}></Route>
      
    </div>
    </Router>
  )
}

export default App;
