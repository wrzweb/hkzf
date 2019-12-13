import React from 'react';
import { Carousel,Toast,Flex} from 'antd-mobile';
import axios from 'axios'
import './index.scss'
import nav1 from '../../assets/images/nav-1.png'
import nav2 from '../../assets/images/nav-2.png'
import nav3 from '../../assets/images/nav-3.png'
import nav4 from '../../assets/images/nav-4.png'
// nav 数据
const navs = [
  {
    id: 1,
    img: nav1,
    title: '整租',
    path: '/home/list'
  },
  {
    id: 2,
    img: nav2,
    title: '合租',
    path: '/home/list'
  },
  {
    id: 3,
    img: nav3,
    title: '地图找房',
    path: '/map'
  },
  {
    id: 4,
    img: nav4,
    title: '去出租',
    path: '/rent'
  }
]
export default class homeIndex extends React.Component {
  state = {
    swipers: [],
    isLoading:false,
    area:'',
    grounps:[]

  }
  // 获取轮播图数据
  getSwiper = async () => {
    const { data: res } = await axios.get('http://localhost:8080/home/swiper')
    console.log(res);

    if (res.status!== 200) return Toast.info('请求轮播图数据失败')
    this.setState({
      swipers: res.body,
      isLoading:true
    })
  }
  // 获取租房小组数据
  getGrounp=async()=>{
  const{data:res}=await axios.get('http://localhost:8080/home/groups',{params:{
    area:'AREA%7C88cff55c-aaa4-e2e0'
  }})
  if(res.status!==200)return Toast.info('请求租房小组数据失败')
  this.setState({
grounps:res.body
  })
  
  }
  // 页面加载时
  componentDidMount() {

    this.getSwiper()
    this.navList()
    this.getGrounp()
  }
 
  // 轮播图结构
  swiperHandel() {

    return this.state.swipers.map(val => (
      <a
        key={val.id}
        href="http://www.alipay.com"
        style={{ display: 'inline-block', width: '100%', height: 212 }}
      >
        <img
          src={`http://localhost:8080${val.imgSrc}`}
          alt=""
          style={{ width: '100%', verticalAlign: 'top' }}

        />
      </a>
    ))

  }
  // 导航图标结构
  navList(){
     return navs.map(item=>{
       return <Flex.Item onClick={()=>{this.props.history.push(item.path)}} key={item.id}>
       <img src={item.img}></img>
     <h2>{item.title}</h2>
      </Flex.Item>
     })
  }
  
  render() {
    return (
      <div className="index">
        <div className="swipers">
        {this.state.isLoading?<Carousel
          autoplay
          infinite
          autoplayInterval={1000}
        >
          {this.swiperHandel()}
        </Carousel>:''}
         </div>
        {/* 导航图标 */}
        <Flex className="nav">
          {this.navList()}
    </Flex>
   {/* 租房小组 */}
   <div className="grounp">
          <div className="title">
            <span className="left">住房小组</span>
            <span className="right">更多</span>
          </div>
   </div>
      </div>
    )
  }

}