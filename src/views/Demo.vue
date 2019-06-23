<template>
  <div class="hello">
    <div>
      <button id="firstBtn" @click="testClick()" ref="aa">{{testMsg}}</button>
    </div>
    <Footer></Footer>
  </div>
</template>
 
<script>
import Footer from '../components/Footer.vue'

export default {
  name: 'HelloWorld',
  data () {
    return {
      testMsg:"原始值",
    }
  },
  components: {
    Footer
  },
  methods:{
    testClick:function(){
      let that=this;
      that.testMsg="修改后的值";
      // console.log(that.$refs.aa.innerText);   //that.$refs.aa获取指定DOM，输出：原始值
      that.$nextTick(function(){
        console.log(that.$refs.aa.innerText);  //输出：修改后的值
      });
    }
  }
}
</script>