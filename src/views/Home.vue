<template>
  <div>
    <header>
      <div>
        <div class="location">杭州市</div>
        <div class="seartch">
          <div>输入关键搜索</div>
        </div>
        <div class="message">
          <img src="../assets/5.png" alt="">
          <span>消息</span>
        </div>
      </div>
    </header>
    <!-- <input type="text" v-model="$store.state.count">
    <div>
      <button @click="handleAddClick(10)">增加</button>
      <button @click="handleReduceClick(10)">减少</button>
      <button @click="handleActionsAdd(10)">增加</button>
      <button @click="handleActionsReduce(10)">减少</button>
    </div> -->
    <div class="content">
      <ul class="nav-ul">
        <li v-for="(item, index) in items" :key="index">
          <a href="#">
            <div class="icon-box"></div>
            <div>{{ item }}</div>
          </a>
        </li>
      </ul>
      <ul class="tab-ul">
        <!-- <li :class="{active: currentIndex == 0}" @click="setCurrentIndex(0)">今日订单</li>
        <li :class="{active: currentIndex == 1}" @click="setCurrentIndex(1)">今日供应</li>
        <li :class="{active: currentIndex == 2}" @click="setCurrentIndex(2)">就近公司</li> -->
        <li
          v-for="(tab, index) in tabs"
          @click="setCurrentIndex(index)"
          :key="index"
          :class="{active: currentIndex == index}">
          {{ tab }}
        </li>
      </ul>
    </div>
    <div class="tab-box">
      <div id="scroll-0" v-show="currentIndex == 0">
        <div v-if="showTextTop" class="loading">加载中...</div>
        <ul>
          <OrdersInfo v-for="(list, index) in lists" :info="list" :key="index" v-on:click.native="onFocus"></OrdersInfo>
        </ul>
        <div v-if="showTextBottom" class="loading">{{ text }}</div>
      </div>
      <div id="scroll-1" v-show="currentIndex == 1">
        <div v-if="todayTop" class="loading">加载中...</div>
        <ul>
          <li class="info-list" v-for="(list, index) in todayLists" :key="index">
            <div class="type-order" v-if="list.type == 1">
              <div class="img-box">
                <img :src="list.supply && list.supply.img[0] ? list.supply.img[0] : imgUrl" alt="">
                <span></span>
              </div>
              <div class="info-detail">
                <div class="order-info">
                  <div class="info-type">{{ list.supply && list.supply.type ? typeList[list.supply.type-1] : '' }}</div>
                  <div class="info-detail">{{ list.supply && list.supply.title }}</div>
                </div>
                <div class="order-center">
                  <div>
                    <span class="name">供应地点:</span>
                    <span class="val">{{ list.supply && list.supply.location }}</span>
                  </div>
                  <div>
                    <span class="name">发布时间:</span>
                    <span class="val">{{ list.supply && list.supply.createdAt }}</span>
                  </div>
                </div>
                <div class="order-bottom">
                  <img src="../assets/map.png" alt="">
                  <span class="distance">{{ list.supply && list.supply.distance }}km</span>
                </div>
              </div>
            </div>
            <div class="type-other" v-else>
              <a :href="list.adv && list.adv.redirectUrl ? list.adv.redirectUrl : '#'">
                <img :src="list.adv && list.adv.imgUrl ? list.adv.imgUrl : ''" alt="">
              </a>
            </div>
          </li>
        </ul>
        <div v-if="todayBottom" class="loading">{{ textToday }}</div>
      </div>
      <div v-show="currentIndex == 2">2</div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import { post } from '../tool/http.js'
import OrdersInfo from '../components/OrdersInfo.vue'
import Footer from '../components/Footer.vue'

export default {
  name: 'home',
  data() {
    return {
      items: ['闲置讯息', '购买保障', '企业入驻', '采集商城', '弹窗设置'],
      tabs: ['今日订单', '今日供应', '就近公司'],
      currentIndex: 0,
      page: 1,
      pageToday: 1,
      uid: '',
      token: '',
      lists: [],
      todayLists: [],
      typeList: ['今日有空', '我有物料', '我有设备', '我有服务'],
      showTextBottom: false,
      showTextTop: false,
      todayBottom: false,
      todayTop: false,
      hasResponse: false,
      todayResponse: false,
      text: '加载中...',
      textToday: '加载中...'
    }
  },
  components: {
    OrdersInfo,
    Footer
  },
  computed: {
    imgUrl: function () {
      return require("../assets/noImg.png")
    }
  },
  methods: {
    handleAddClick(n){
      this.$store.commit('mutationsAddCount',n);
    },
    handleReduceClick(n){
      this.$store.commit('mutationsReduceCount',n);
    },
    handleActionsAdd(n){
      this.$store.dispatch('actionsAddCount',n)
    },
    handleActionsReduce(n){
      this.$store.dispatch('actionsReduceCount',n)
    },
    setCurrentIndex(index) {
      this.currentIndex = index
    },
    getListAll() {
      if (this.page === 1) {
        this.lists = []
      }
      post('/api/v4/newOrder/mainList', {
        uid: this.uid,
        token: this.token,
        lon: '119.999325',
        lat: '30.287987',
        page: this.page,
        size: '8',
        type: '0'
      }).then(response => {
        // console.log(response)
        if (!response.data.list.length) {
          this.text = '没有更多数据...'
          return
        }
        this.lists = this.lists.concat(response.data.list)
        this.showTextBottom = false
        this.hasResponse = false
        // console.log(this.lists);
      }).catch(err => {
        console.log(err)
      })
    },
    getListToday() {
      if (this.pageToday === 1) {
        this.todayLists = []
      }
      post('/api/v4/supply/mainList', {
        uid: this.uid,
        token: this.token,
        lon: '119.999325',
        lat: '30.287987',
        page: this.pageToday,
        size: '8'
      }).then(response => {
        // console.log(response)
        // this.todayLists = response.data.list
        if (!response.data.list.length) {
          this.textToday = '没有更多数据...'
          return
        }
        this.todayLists = this.todayLists.concat(response.data.list)
        this.todayBottom = false
        this.todayResponse = false
        // console.log(this.todayLists);
      }).catch(err => {
        console.log(err)
      })
    },
    scrollToTop() {
      let el = document.querySelector('#scroll-0');
			const scrollTop = el.scrollTop;
      const scrollHeight = el.scrollHeight;
			if ((el.offsetHeight + scrollTop) - scrollHeight >= -1) {//如果置底
        // 需要执行的代码
        // console.log(true)
        this.showTextBottom = true
        if (this.hasResponse) return
        this.page++
        this.hasResponse = true
        this.getListAll()
			}
    },
    scrollToTopToday() {
      let el = document.querySelector('#scroll-1');
			const scrollTop = el.scrollTop;
      const scrollHeight = el.scrollHeight;
			if ((el.offsetHeight + scrollTop) - scrollHeight >= -1) {//如果置底
        // 需要执行的代码
        // console.log(true)
        this.todayBottom = true
        if (this.todayResponse) return
        this.pageToday++
        this.todayResponse = true
        this.getListToday()
			}
    },
    onFocus(event) {
      alert('监听到子组件原生点击事件')
      this.$router.push({path: '/demo'})
    }
  },
  created: function () {
    let userInfo = JSON.parse(localStorage.getItem('userInfo'))
    console.log(userInfo)
    if (userInfo === null) {
      this.$router.push({path: '/'})
      return
    }
    let uid = userInfo.uid
    let token = userInfo.token
    this.uid = uid
    this.token = token
    
    this.getListAll()
    this.getListToday()
  },
  mounted: function () {
    document.querySelector('#scroll-0').addEventListener("scroll", this.scrollToTop);
    document.querySelector('#scroll-1').addEventListener("scroll", this.scrollToTopToday);
  },
  distoryed: function() {
	  document.querySelector('#scroll-0').removeEventListener("scroll", this.scrollToTop);
	  document.querySelector('#scroll-1').removeEventListener("scroll", this.scrollToTopToday);
	}
}
</script>

<style>
  body {
    background-color: #f2f2f2;
  }
  .loading {
    font-size: 24px;
    color: #bbb;
    text-align: center;
    padding: 5px 0;
  }
  header {
    background-color: #fff;
    overflow: hidden;
  }
  .location {
    font-size: 28px;
    color: #ccc;
    position: absolute;
    left: 20px;
    top: 20px;
    height: 48px;
    line-height: 48px;
  }
  .seartch {
    /* position: relative; */
    padding: 0 80px 0 150px;
    margin: 20px 0;
  }
  .seartch > div {
    border-radius: 24px;
    height: 48px;
    line-height: 48px;
    color: #eee;
    box-shadow: 0px 2px 1px 2px #f8f8f8;
    border: 1px solid #ddd;/*no*/
    text-align: center;
  }
  .message {
    position: absolute;
    top: 20px;
    right: 20px;
  }
  .message span, .message img {
    display: block;
  }
  .message span {
    color: #ccc;
    font-size: 20px;
  }
  .message img {
    height: 30px;
    width: 30px;
  }
  .nav-ul {
    background-color: #fff;
    font-size: 28px;
    font-weight: bold;
    color: #888;
    overflow: hidden;
    padding-bottom: 20px;
  }
  .nav-ul li {
    width: 20%;
    text-align: center;
    float: left;
  }
  .icon-box {
    background: url(../assets/1.png) center center no-repeat;
    background-size: auto 100%;
    width: 80px;
    height: 80px;
    margin: 0 auto;
  }
  .tab-box {
    position: absolute;
    width: 100%;
    bottom: 130px;
    top: 283px;
    overflow: hidden;
  }
  .tab-box > div {
    height: 100%;
    overflow: auto;
    padding-top: 20px;
  }
  .tab-ul {
    background-color: #fff;
    overflow: hidden;
    border-bottom: 2px solid #f2f2f2;/*no*/
  }
  .tab-ul li {
    float: left;
    width: 33.33333333%;
    text-align: center;
    font-size: 32px;
    color: #bbb;
    padding-bottom: 15px;
    position: relative;
  }
  .tab-ul li.active:after {
    content: '';
    width: 60%;
    height: 3px;
    background-color: chocolate;
    position: absolute;
    bottom: 0;
    left: 20%;
  }
  /*组件样式，flex布局*/
  .info-list {
    margin-bottom: 20px;
  }
  .info-list:last-child {
    margin-bottom: 0;
  }
  .type-order {
    display: flex;
    display: -webkit-flex;
    padding: 30px;
    background-color: #fff;
    align-items: center;
  }
  .type-other a {
    display: flex;
    display: -webkit-flex;
  }
  .type-other img {
    flex-grow: 1;
    /* width: 100%; */
    object-fit: contain;
    height: 298px;
  }
  .img-box {
    position: relative;
  }
  .img-box img {
    height: 120px;
    width: 120px;
  }
  .img-box span {
    position: absolute;
    width: 15px;
    height: 15px;
    background-color: red;
    border-radius: 50%;
    top: 0;
    right: 0;
    transform: translate(50%, -50%);
  }
  .info-detail {
    flex-grow: 1;
  }
  .order-info {
    display: flex;
    display: -webkit-flex;
    align-items: center;
    margin-bottom: 20px;
  }
  .info-detail {
    flex-grow: 1;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    padding: 0 0 0 40px;
    color: #000;
    font-size: 32px;/*px*/
    font-weight: bold;
  }
  .info-type {
    background-color: #000;
    color: #fff;
    padding: 0 5px;
    font-size: 24px;/*px*/
  }
  .info-text {
    font-size: 28px;
    font-weight: bold;
    color: crimson;
  }
  .name {
    font-size: 22px;
    color: #ccc;
  }
  .val {
    font-size: 22px;
    color: #333;
  }
  .order-center {
    line-height: 24px;
    margin-bottom: 20px;
  }
  .order-center > div {
    margin-bottom: 10px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-weight: 400;
  }
  .order-bottom {
    display: flex;
    display: -webkit-flex;
    align-items: center;
    height: 35px;
  }
  .order-bottom img {
    margin-right: 10px;
    width: 28px;
    height: 28px;
  }
  .distance {
    color: #bbb;
    font-size: 22px;
    flex-grow: 1;
  }
  .status {
    background-color: bisque;
    color:chocolate;
    padding: 3px 5px;
    font-size: 22px;
    font-weight: 400;
  }
</style>
