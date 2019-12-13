<template>
  <div class="index">
    <div class="top">
      Hello!
      <el-button class="back" @click="back">返回</el-button>
      <el-button class="out" type="warning" @click="outLogin">退出登录</el-button>
    </div>
    <div class="con">
      <v-left></v-left>
      <v-right></v-right>
    </div>
  </div>
</template>
<script>
import vLeft from "../views/index-left";
import vRight from "../views/index-right";
import API from "../util/API";
export default {
  components: {
    vLeft,
    vRight
  },
  props: [],
  data() {
    return {};
  },
  watch: {},
  computed: {},
  methods: {
    //退出登录================================================
    outLogin() {
      this.$axios({
        url: API.exit
      }).then(res => {
        console.log(res);
        localStorage.removeItem("manageName");
        localStorage.removeItem("managePass");
        this.$router.replace("/login");
      });
    },
    //返回===================================================
    back() {
      this.$router.go(-1);
    }
  },
  created() {},
  mounted() {}
};
</script>
<style lang='stylus' rel='stylesheet/stylus' scoped>
@import '../stylus/index.styl';

.index {
  display: flex;
  flex-direction: column;

  .con {
    flex: 1;
    // height 100%
    // width 100%
    display: flex;
  }

  .top {
    height: 100px;
    text-align: center;
    font-size: 25px;
    font-weight: bold;
    color: #fff;
    line-height: 100px;
    float: left;
    background: $deep;

    .back {
      padding: 10px 30px;
      float: left;
      margin: 30px 20px;
    }

    .out {
      padding: 10px 30px;
      float: right;
      margin: 30px 20px;
    }
  }
}
</style>