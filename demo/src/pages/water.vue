<template>
  <div class="water">
    <div class="top">
      <h1>水站管理</h1>
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
        <el-menu-item index="1" @click="toWaterList">
          水站
          <!-- <router-link to="/index/jiajiao/jjBanner">家教Banner</router-link> -->
        </el-menu-item>
        <el-menu-item index="2" @click="toWaterComment">
          水站评论
          <!-- <router-link to="/index/jiajiao/jjType">家教类型</router-link> -->
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
      activeIndex: "1"//自动选中导航第一个
    };
  },
  watch: {},
  computed: {},
  methods: {
    toWaterList() {
      this.$router.push("/index/water/waterList");
    },
    toWaterComment() {
      this.$router.push("/index/water/waterComment");
    }
  },
  created() {},
  mounted() {},
  //组件守卫
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
@import '../stylus/index.styl';

.water {
  display: flex;
  flex-direction: column;
  padding: 30px;

  .top {
    height: 100px;
    text-align: center;
  }
}
</style>