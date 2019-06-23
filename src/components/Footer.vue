<template>
  <footer>
    <div class="nav-box">
      <a href="#/home">
        <img src="../assets/4.png" alt="">
        <div>首页</div>
      </a>
      <a href="#/map">
        <img src="../assets/4.png" alt="">
        <div>指南</div>
      </a>
      <a href="#/advert">
        <img src="../assets/4.png" alt="">
        <div>广告圈</div>
      </a>
      <a href="#/orders">
        <img src="../assets/4.png" alt="">
        <div>订单</div>
      </a>
      <a href="#/info">
        <img src="../assets/4.png" alt="">
        <div>我的</div>
      </a>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'footerlink'
}
</script>

<style>
  footer {
    position: absolute;
    bottom: 0;
    width: 100%;
  }
  .nav-box {
    display: flex;
    display: -webkit-flex;
    align-items: center;
    border-top: 2px solid #ccc;/*no*/
    height: 130px;
    background-color: #fff;
  }
  .nav-box a {
    flex-grow: 1;
    text-align: center;
    font-size: 24px;/*px*/
    color: #888;
    text-decoration: none;
  }
  .nav-box img {
    width: 50px;
    height: 50px;
  }
</style>
