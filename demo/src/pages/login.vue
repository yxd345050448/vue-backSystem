<template>
  <div class="login">
    <div class="login-ipt">
      <!-- 下拉菜单 -->
      <el-select v-model="user.type" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <!-- 账号框 -->
      <el-input placeholder="请输入账号" v-model="user.name" clearable></el-input>
      <!-- 密码框 -->
      <el-input placeholder="请输入密码" v-model="user.pass" show-password></el-input>
      <!-- 登录按钮 -->
      <el-button type="success" @click="toIndex">登录</el-button>
    </div>
  </div>
</template>
<script>
import API from '../util/API'
import qs from 'qs'
export default {
  components: {},
  props: [],
  data() {
    return {
        user:{
            name:'',//账号
            pass:'',//密码
            type:''//角色
        },
      options: [
        {
          value: "0",
          label: "超级管理员"
        },
        {
          value: "1",
          label: "普通管理员"
        }
      ],
    };
  },
  watch: {},
  computed: {},
  methods: {

      toIndex(){
        console.log(this.user);
        
          this.$axios({
              url:API.login,
              method:'post',
              data:this.user
          }).then(res=>{
            console.log(res);
            if(res.data.isok){
               this.$router.push('/index');
               localStorage.setItem('manageName',this.user.name)//本地存入账号
               localStorage.setItem('managePass',this.user.pass)//本地存入密码
               localStorage.setItem('isAdmin',this.user.type)//存入角色
            }
          })
      }
  },
  created() {},
  mounted() {   
  }
};
</script>
<style lang='stylus' rel='stylesheet/stylus' scoped>
@import '../stylus/index.styl';

.login {
  width: 100vw;
  height: 100vh;
  background: #606266;
  position: relative;

  .login-ipt {
    width: 400px;
    height: 300px;
    background: #fff;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    border-radius: 10px;
    text-align: center;
    padding: 40px 0;
  }
}

.login .el-input {
  width: 80%;
  margin-top: 20px;
}

.el-button {
  display: block;
  margin: 20px auto;
  width: 20%;
}
</style>