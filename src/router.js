import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/LoginDemo.vue'
import Home from './views/Home.vue'
import MapNew from './views/Map.vue'
import Advert from './views/Advert.vue'
import Orders from './views/Orders.vue'
import Info from './views/Info.vue'
import Demo from './views/Demo.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/map',
      name: 'map',
      component: MapNew
    },
    {
      path: '/advert',
      name: 'advert',
      component: Advert
    },
    {
      path: '/orders',
      name: 'orders',
      component: Orders
    },
    {
      path: '/info',
      name: 'info',
      component: Info
    },
    {
      path: '/demo',
      name: 'demo',
      component: Demo
    }
  ]
})