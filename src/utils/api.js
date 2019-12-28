// 封装定位城市的方法
import { REACT_APP_URL } from './utils.js'
import axios from 'axios'
import { TOKEN, removeToken } from './isAuth.js'
import { Toast } from 'antd-mobile'
export const current_city = () => {
  // 获取本地是否有城市
  const current = localStorage.getItem('hkzf')
  if (!current) {
    return new Promise(resolve => {
      // 获取城市信息
      const cityInfo = new window.BMap.LocalCity()
      cityInfo.get(async res => {

        const result = await axios.get(`http://localhost:8080/area/info?name=${res.name}`)
        //  设置到本地，把对象形式的数据转换为字符串
        localStorage.setItem('hkzf', JSON.stringify(result.data.body))
        resolve(result.data.body)
      })
    })

  }
  // 返回本地存储中保存的城市是一个对象
  return Promise.resolve(JSON.parse(current))
}
// 默认url,更改axios为变量名
const API = axios.create({
  baseURL: REACT_APP_URL
})

// 设置请求拦截
API.interceptors.request.use(config => {
  console.log('请求拦截', config);

  if (config.url.startsWith('/user') && config.url !== '/user/login' && !config.url !== '/user/registered') {
    // TOKEN()是Tooken值
    config.headers.authorization = TOKEN()
  }
  return config
})
// 响应拦截
API.interceptors.response.use(response => {
  console.log(response);
  // 如果响应吗为400移除token
  if (response.data.status == 400) {
    console.log(123);
    Toast.info('token过期了，请重新登录')
    // 移除tooken
    removeToken()

  }

  return response

})
export { API }