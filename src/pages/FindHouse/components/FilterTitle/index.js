import React from 'react'

import { Flex } from 'antd-mobile'

import styles from './index.module.css'

// 条件筛选栏标题数组：
const titleList = [
  { title: '区域', type: 'area' },
  { title: '方式', type: 'mode' },
  { title: '租金', type: 'price' },
  { title: '筛选', type: 'more' }
]
function handel(status,change){
  console.log(status,change);
  
   return titleList.map(item=>(
    <Flex.Item key={item.type} onClick={()=>change(item.type)}>
    {/* 选中类名： selected */}
    {/* status[item.type]是布尔值  true就加上类名 否则为空*/}
    
    <span className={[styles.dropdown, status[item.type]?styles.selected:''].join(' ')}>
   <span>{item.title}</span>
      <i className="iconfont icon-arrow" />
    </span>
  </Flex.Item>
  ))
}
export default function FilterTitle({seletedTitleStatus,onclick}) {
  return (
    <Flex align="center" className={styles.root}>
    {handel(seletedTitleStatus,onclick)}
    </Flex>
  )

}
