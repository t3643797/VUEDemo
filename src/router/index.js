import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/radar',
    name: 'Radar',
    component: () => import(/* webpackChunkName: "about" */ '../views/Radar.vue')
  },
  {
    path: '/mutilradar',
    name: 'mutilRadar',
    component: () => import(/* webpackChunkName: "about" */ '../views/MutilRadar.vue')
  },
  {
    path: '/emoji',
    name: 'emoji',
    component: () => import(/* webpackChunkName: "about" */ '../views/emoji.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
