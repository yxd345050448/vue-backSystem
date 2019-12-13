<template>
  <div class="left">
    <router-link to="/index/ssManage"  active-class="active" v-if="isAdmin=='0'">管理员管理</router-link>
    <router-link to="/index/manage" active-class="active" v-if="isAdmin=='1'">banner管理</router-link>
    <router-link to="/index/jiajiao" active-class="active" v-if="isAdmin=='1'">家教管理</router-link>
    <router-link to="/index/water" active-class="active" v-if="isAdmin=='1'">水站管理</router-link>
    <router-link to="/index/repair" active-class="active" v-if="isAdmin=='1'">维修管理</router-link>
    <router-link to="/index/home" active-class="active" v-if="isAdmin=='1'">家政管理</router-link>
    <router-link to="/index/setPass" active-class="active" v-if="isAdmin=='1'">修改密码</router-link>
  </div>
</template>
<script>
export default {
  components: {},
  props: [],
  data() {
    return {
      isAdmin:localStorage.getItem('isAdmin')
    };
  },
  watch: {},
  computed: {},
  methods: {},
  created() {},
  mounted() {}
};
</script>
<style lang='stylus' rel='stylesheet/stylus' scoped>
@import '../stylus/index.styl';

.left {
  background: $info;
  width: 200px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  text-align: center;

  a {
    display: block;
    font-size: 20px;
    margin: 20px 0;
  }

  .active {
    background: $primary;
  }
}
</style>