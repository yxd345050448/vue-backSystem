<template>
  <div class="box">
    <h1>修改密码</h1>
    <div class="setPass">
      <el-input v-model="user.name" :placeholder="user.name" :disabled="true"></el-input>
      <el-input v-model="user.oldpass" placeholder="原始密码" type="password"></el-input>
      <el-input v-model="user.newpass" placeholder="新密码" type="password"></el-input>
      <el-input v-model="confirm" placeholder="确认密码" type="password"></el-input>
      <el-button type="text" @click.native.prevent="setPass">修改密码</el-button>
    </div>
  </div>
</template>
<script>
import API from "../util/API";
export default {
  components: {},
  props: [],
  data() {
    return {
      user: {
        name: "", //账号
        oldpass: "", //原始密码
        newpass: "" //新密码
      },
      confirm: "" //确认密码
    };
  },
  watch: {},
  computed: {},
  methods: {
    //修改密码=====================================
    setPass() {
      //   if (this.user.oldpass != localStorage.setItem("managePass")) {
      //     alert("原始密码输入错误");
      //     return;
      //   }
      if (this.user.newpass != this.confirm) {
        alert("两次密码不一致,请重新输入");
        return;
      }
      this.$axios({
        url: API.changePassManage,
        method: "post",
        data: this.user
      }).then(res => {
        if (res.data.isok) {
          this.$message({ message: res.data.info, type: "success" });
          this.$router.replace('/login')
        }else{
          this.$message({ message: res.data.info, type: "error" });
        }
      });
    }
  },
  created() {},
  mounted() {
    this.user.name = localStorage.getItem("manageName");
  },
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

.box {
  text-align: center;
  padding: 30px;
  position: relative;
  width: 100%;
  height: 100%;

  .setPass {
    width: 500px;
    height: 500px;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;

    .el-input {
      margin: 20px 0;
    }

    .el-button {
      padding: 10px 20px;
      background: $info;
      color: #fff;
    }
  }
}
</style>