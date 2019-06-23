<template>
  <div class="login-box">
    <div class="tel-box">
      <label for="tel">手机号</label>
      <input type="text" id="tel" placeholder="请输入手机号码" v-model="tel">
    </div>
    <div class="code-box">
      <label for="code">验证码</label>
      <input type="text" id="code" placeholder="请输入验证码" v-model="code">
      <button class="get-code" @click="getCode">{{ text }}</button>
    </div>
    <button class="sbmit-btn" @click="login">提交</button>
  </div>
</template>

<script>
import { post } from '../tool/http.js'

export default {
  data() {
    return {
      tel: '',
      code: '',
      countdown: 60,
      hasClick: false
    }
  },
  computed: {
    // 计算属性的 getter
    text: function () {
      // `this` 指向 vm 实例
      return this.hasClick ? this.countdown : '获取验证码'
    }
  },
  methods: {
    //验证手机号码部分
    getCode() {
      if (this.hasClick) return
      console.log(this);
      var reg=11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/
      if(!this.tel){
        alert("请输入手机号码")
      }else if(!reg.test(this.tel)){
        alert("手机格式不正确")
      }else{
        post('/api/v4/user/sendSMS', {
          phone: this.tel,
          type: 0
        }).then(response => {
          console.log(response)
          if (response.code == 20000) {
            alert('操作失败')
          } else if (response.code == 10000) {
            this.hasClick = true
            let timer = setInterval(() => {
              this.countdown--
              if (this.countdown == 0) {
                clearInterval(timer)
                this.hasClick = false
                this.countdown = 60
              }
            }, 1000)
          }
        }).catch(err => {
          console.log(err)
        })
      }
    },
    //登录
    login() {
      post('/api/v4/user/login', {
        phone: this.tel,
        vcode: this.code,
        source: 'Android',
        phoneModel: '234',
        phoneVersion: '234'
      }).then(response => {
        // console.log(response)
        let storage = window.localStorage
        storage.setItem('userInfo', JSON.stringify(response.data))
        console.log(storage.userInfo)
        this.$router.push({path: '/home'})
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style>
  .login-box {
    height: 100%;
    background-color: #fff;
  }
  .tel-box, .code-box {
    font-size: 28px;/*px*/
    color: #888;
    border: 1px solid #ccc;/*no*/
    border-left: none;
    border-right: none;
    position: relative;
    padding: 20px;
    padding-left: 124px;
  }
  .tel-box label, .code-box label {
    position: absolute;
    left: 20px;
    height: 36px;
    line-height: 36px;
  }
  .tel-box input, .code-box input {
    height: 36px;
    width: 100%;
    font-size: 28px;/*px*/
    border: none;
    outline: none;
    color: #000;
  }
  .sbmit-btn {
    width: calc(100% - 40px);
    margin: 20px;
    padding: 20px 0;
    background-color: chocolate;
    color: #fff;
    font-size: 28px;/*px*/
    border-radius: 15px;
    border: none;
    outline: none;
  }
  .get-code {
    padding: 10px 15px;
    background-color: chocolate;
    color: #fff;
    font-size: 28px;/*px*/
    border-radius: 15px;
    border: none;
    outline: none;
    position: absolute;
    white-space: nowrap;
    right: 40px;
    top: 10px;
  }
</style>
