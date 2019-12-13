import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
const login = () => import('../pages/login.vue')//登录
const index = () => import('../pages/index.vue')//主页
const welcome = () => import('../pages/welcome.vue')//欢迎页
const ssManage = () => import('../pages/ssManage.vue')//超级管理员
const manage = () => import('../pages/manage.vue')//普通管理员
const jiajiao = () => import('../pages/jiajiao.vue')//家教管理
const jjBanner = () => import('../pages/jjBanner.vue')//家教banner
const jjType = () => import('../pages/jjType.vue')//家教类型
const jjTop = () => import('../pages/jjTop.vue')//家教排行
const water =()=>import('../pages/water.vue')//水站管理
const waterList =()=>import('../pages/waterList.vue')//水站管理
const waterComment =()=>import('../pages/waterComment.vue')//水站管理
const repair = ()=>import('../pages/repair.vue')//维修管理
const repairList = ()=>import('../pages/repairList.vue')//维修列表
const repairComment = ()=>import('../pages/repairComment.vue')//维修评论
const home = () => import('../pages/home.vue')//家政管理
const homeBanner = () => import('../pages/homeBanner.vue')//家政Banner
const homeManage = () => import('../pages/homeManage.vue')//员工管理
const setPass = ()=>import('../pages/setPass.vue')//修改密码
export default new Router({
  routes: [//一级路由
    {
      path:'/login',
      component:login
    },
    {
      path: '/index',
      component: index,
      children:[//二级路由
        {
          path:'welcome',//欢迎页
          component:welcome
        },
        {
          path:'ssManage',//超级管理员
          component: ssManage,
        },
        {
          path: 'manage',//普通管理员
          component: manage,
        },
        //家教
        {
          path: 'jiajiao',
          component: jiajiao,
          // 三级路由
          children:[
            {
              path:'jjBanner',//家教图片
              component: jjBanner
            },
            {
              path: 'jjTop',//家教排行
              component: jjTop
            },
            {
              path: 'jjType',//家教类型
              component: jjType
            },
            {
              path: '',//家教图片
              redirect: 'jjBanner'
            },
          ]
        },
        //水站
        {
          path: 'water',
          component: water,
          // 三级路由
          children: [
            {
              path: 'waterList',//水站列表
              component: waterList
            },
            {
              path: 'waterComment',//水站评论
              component: waterComment
            },
            {
              path: '',//水站列表
              redirect: 'waterList'
            },
          ]
        },
        //维修
        {
          path:'repair',
          component:repair,
          children:[//三级路由
            {
              path: 'repairList',//维修列表
              component: repairList
            },
            {
              path: 'repairComment',//维修评论
              component: repairComment
            },
          ]
        },
        //家政
        {
         path:'home',
         component:home,
         children:[//三极路由
           {
            path:'homeBanner',//家政banner
             component: homeBanner
           },
           {
             path: 'homeManage',//员工管理
             component: homeManage
           },
         ]
        },
        //欢迎页
        {
          path:'',
          redirect:'welcome'
        },
        //修改密码
        {
          path:'setPass',
          component:setPass
        }
      ]
    },
    {
      path: '*',
      redirect: '/login'
    },
  ]
})
