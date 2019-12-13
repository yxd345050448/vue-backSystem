<template>
  <div class="jiajiao">
    <div class="top">
      <h1>家教管理</h1>
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
        <el-menu-item index="1" @click="toBanner">家教Banner
          <!-- <router-link to="/index/jiajiao/jjBanner">家教Banner</router-link> -->
        </el-menu-item>
        <el-menu-item index="2" @click="toType">家教类型
          <!-- <router-link to="/index/jiajiao/jjType">家教类型</router-link> -->
        </el-menu-item>
        <el-menu-item index="3" @click="toTop">家教排行
          <!-- <router-link to="/index/jiajiao/jjTop">家教排行</router-link> -->
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
      activeIndex: "1"
    };
  },
  watch: {},
  computed: {},
  methods: {
    toBanner() {
      this.$router.push("/index/jiajiao/jjBanner");
    },
    toType() {
      this.$router.push("/index/jiajiao/jjType");
    },
    toTop() {
      this.$router.push("/index/jiajiao/jjTop");
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

.jiajiao {
  display: flex;
  flex-direction: column;
  padding: 30px;

  .top {
    height: 100px;
    // background: ;
    text-align: center;
  }
}
</style>