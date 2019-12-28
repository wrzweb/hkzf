import React from 'react'

import PropTypes from 'prop-types'

import { REACT_APP_URL } from '../../utils/utils.js'
import styles from './index.module.css'

const NoHouse = ({ children }) => (
  <div className={styles.root}>
    <img
      className={styles.img}
      src={REACT_APP_URL + '/img/not-found.png'}
      alt="暂无数据"
    />
    <p className={styles.msg}>{children}</p>
  </div>
)

NoHouse.propTypes = {
  children: PropTypes.node.isRequired
}

export default NoHouse
