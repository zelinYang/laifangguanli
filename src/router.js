import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/',  redirect: '/login' },
    { path: '/login',    component: () => import('./views/Login.vue') },
    { path: '/index',                    component: () => import('./views/home/index.vue') },
    { path: '/audit/list',       component: () => import('./views/customer/list.vue') },
    { path: '/weiz/list',       component: () => import('./views/wezhang/list.vue') },
    { path: '/customer/vip-list',   component: () => import('./views/customer/vipcard/vip-list.vue') },
    { path: '/visit/list',          component: () => import('./views/order/list.vue') },
    { path: '/visitCart/list',          component: () => import('./views/goods/list.vue') },
    { path: '/table/list',        component: () => import('./views/home/counter/home.vue') },
    { path: '/home/system/setup',   component: () => import('./views/shebeigl/list.vue') },
    { path: '/home/system/passwd',  component: () => import('./views/home/system/passwd.vue') },
    { path: '/home/system/myinfo',  component: () => import('./views/home/system/myinfo.vue') },
  ]
})
