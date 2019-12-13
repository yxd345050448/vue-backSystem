<template>
<div class="home">
    <div class="top">
      <h1>家政管理</h1>
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
        <el-menu-item index="1" @click="toHomeBanner">
          家政Banner
        </el-menu-item>
        <el-menu-item index="2" @click="toHomeManage">
          人员管理
        </el-menu-item>
      </el-menu>
    </div>
    <div class="con">
      <router-view></router-view>
    </div>
</div>
</template>
<script>
export default {
components: {},
props: [],
data() {
return {
    activeIndex:'1'
};
},
watch: {},
computed: {},
methods: {
    toHomeBanner(){
        this.$router.push('/index/home/homeBanner')
    },
    toHomeManage(){
        this.$router.push('/index/home/homeManage')
    }
},
created() {},
mounted() {},
beforeRouteEnter(to,from,next){
    if(localStorage.getItem("isAdmin")=='1'){
      next()
    }else{
      next('/index/welcome')
      alert('你不是普通管理员')
      // this.$alert(message, title, options)
    }
  }
};
</script>
<style lang='stylus' rel='stylesheet/stylus' scoped>
@import '../stylus/index.styl'
.home
    display flex
    flex-direction column
    padding 30px
    .top
        height 100px
        text-align center
</style>