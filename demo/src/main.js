// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

//各种包
import axios from 'axios'
Vue.prototype.$axios = axios
import qs from 'qs'
Vue.prototype.$qs = qs
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
import './assets/css/reset.css'

//响应拦截
axios.interceptors.response.use(response => {
  console.log('-------------数据来了' + response.config.url+'-------------');
  console.log(response);
  console.log('-------------就那么多了-----------');
  return response
})
//全局过滤器=======================================
import filter from './filter/index'
for(let i in filter){
  Vue.filter(i,filter[i])
}
//全局组件=========================================
import components from './components/index'
for(let i in components){
  Vue.component(i,components[i])
}

//全局守卫(登录拦截)================================
router.beforeEach((to,from,next)=>{
  //去登录界面
  if(to.path=='/login'){
    next();
    return;
  }
  //如果没有登录就去登录界面
  if(!localStorage.getItem('isAdmin')){
    next('/login');
    return;
  }
  next()
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
