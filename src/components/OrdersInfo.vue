<template>
  <li class="info-list">
    <div class="type-order" v-if="info.type == 1">
      <div class="img-box">
        <img :src="img" alt="">
        <span></span>
      </div>
      <div class="info-detail">
        <div class="order-info">
          <div class="info-type">{{ type }}</div>
          <div class="info-detail" v-on="$listeners">{{ info.order.task[0].name }}</div>
          <div class="info-text">{{ info.order.money }}</div>
        </div>
        <div class="order-center">
          <div>
            <span class="name">施工地址:</span>
            <span class="val">{{ info.order.location }}</span>
          </div>
          <div>
            <span class="name">开始时间:</span>
            <span class="val">{{ info.order.startedAt }}</span>
          </div>
        </div>
        <div class="order-bottom">
          <img src="../assets/map.png" alt="">
          <span class="distance">{{ info.order.distance }}km</span>
          <div class="status">{{ status }}</div>
        </div>
      </div>
    </div>
    <div class="type-other" v-else>
      <a :href="info.adv && info.adv.redirectUrl ? info.adv.redirectUrl : '#'">
        <img :src="info.adv && info.adv.imgUrl ? info.adv.imgUrl : ''" alt="">
      </a>
    </div>
  </li>
</template>

<script>
export default {
  name: 'orderInfo',
  data() {
    return {
      
    }
  },
  props: {
    info: {
      order: {
        type: Object,
        default: function(){
          return {
            img: [''],
            type: '',
            task: [{
              name: ''
            }],
            money: '',
            location: '',
            startedAt: '',
            distance: '',
            status: ''
          }
        }
      }
    }
  },
  computed: {
    img: function () {
      if (this.info.order.img[0]) {
        return this.info.order.img[0]
      } else {
        return require("../assets/noImg.png")
      }
    },
    type: function () {
      if (this.info.order.type === 1) {
        return '找师傅'
      } else if (this.info.order.type === 2) {
        return '悬赏求助'
      } else if (this.info.order.type === 3) {
        return '找物料'
      } else if (this.info.order.type === 4) {
        return '找公司'
      }
    },
    status: function () {
      if (this.info.order.status === 1) {
        return '待抢单'
      } else if (this.info.order.status === 2) {
        return '已被抢'
      } else if (this.info.order.status === 3) {
        return '已完成'
      }
    }
  }
}
</script>

<style>
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
