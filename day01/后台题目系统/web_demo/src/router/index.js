import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    redirect: '/steme',
    children: [
      {
        path: '/steme',
        name: 'steme',
        component: () => import('../components/Serme.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  let token = window.sessionStorage.getItem('token')
  if (to.path === '/login') {
    return next()
  }
  if (!(token)) {
    return next('/login')
  }
  next()
})

export default router
