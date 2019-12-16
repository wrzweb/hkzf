import React from 'react';
import './index.scss'
const BMap=window.BMap
export default class Map extends React.Component {

  state = {

  }
  componentDidMount(){
    var map = new BMap.Map("container"); 
    var point = new BMap.Point(119.93, 31.78);
    map.centerAndZoom(point, 11);  
  }
  render () {
    return (
      <div className="map">
        <div id="container"></div> 
      </div>
    )
  }

}