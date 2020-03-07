import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/user',
    component: () => import('../views/User.vue')
  },
  {
    path: '/ChangePassword',
    component: () => import('../views/ChangePassword.vue')
  },
  {
    path: '/subject/:id',
    component: () => import('../views/Subjected.vue')
  },
  {
    path: '/topn',
    component: () => import('../views/Topn.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
