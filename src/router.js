import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    //{ path: '/login',    component: () => import('./views/Login.vue') },
    { path: '/',                    component: () => import('./views/home/index.vue') },
    { path: '/customer/list',       component: () => import('./views/customer/list.vue') },
    { path: '/customer/vip-list',   component: () => import('./views/customer/vipcard/vip-list.vue') },
    { path: '/order/list',          component: () => import('./views/order/list.vue') },
    { path: '/goods/list',          component: () => import('./views/goods/list.vue') },
    { path: '/home/counter',        component: () => import('./views/home/counter/home.vue') },
    { path: '/home/system/setup',   component: () => import('./views/home/system/setup.vue') },
    { path: '/home/system/passwd',  component: () => import('./views/home/system/passwd.vue') },
    { path: '/home/system/myinfo',  component: () => import('./views/home/system/myinfo.vue') },
  ]
})
