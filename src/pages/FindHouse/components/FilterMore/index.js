import React, { Component } from 'react'

import FilterFooter from '../../../../components/FilterFooter'

import styles from './index.module.css'

export default class FilterMore extends Component {
  state={
    // 选中的内容
    selectedVal:this.props.more
  }
  // 点击高亮
  selectedChange=value=>{
    var newSelectedVal=[...this.state.selectedVal]
    var index=newSelectedVal.indexOf(value)

    if(index===-1){
      newSelectedVal.push(value)
    }else {
      newSelectedVal.splice(index,1)
    }
    this.setState({
      selectedVal:newSelectedVal
    })
  }
  // 渲染标签
  renderFilters(data) {
    const{selectedVal}=this.state
    console.log(selectedVal);
    
    return data.map(item=>(
    <span key={item.value} className={[styles.tag ,selectedVal.indexOf(item.value)!==-1?styles.tagActive:''].join(' ')} onClick={()=>this.selectedChange(item.value)}>{item.label}</span>
    ))
  
  }
  // 清除高亮
  onCancel=()=>{
    this.setState({
      selectedVal:[]
    })
  }
// 点击确定
onOk=()=>{
 this.props.onOk(this.state.selectedVal)
}
  render() {
    // characteristic:房屋亮点,floor:楼层,oriented:朝向，roomType:户型

    const{data:{characteristic,floor,oriented,roomType}}=this.props
    
    return (
      <div className={styles.root}>
        {/* 遮罩层 */}
        <div className={styles.mask} onClick={this.props.onCancel}/>

        {/* 条件内容 */}
        <div className={styles.tags}>
          <dl className={styles.dl}>
            <dt className={styles.dt}>户型</dt>
            <dd className={styles.dd}>{this.renderFilters(roomType)}</dd>

            <dt className={styles.dt}>朝向</dt>
            <dd className={styles.dd}>{this.renderFilters(oriented)}</dd>

            <dt className={styles.dt}>楼层</dt>
            <dd className={styles.dd}>{this.renderFilters(floor)}</dd>

            <dt className={styles.dt}>房屋亮点</dt>
            <dd className={styles.dd}>{this.renderFilters(characteristic)}</dd>
          </dl>
        </div>

        {/* 底部按钮 */}
        <FilterFooter className={styles.footer} cancelText="清除" onCancel={this.onCancel} onOk={this.onOk}/>
      </div>
    )
  }
}
