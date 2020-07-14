import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import CalenderView from  '../views/CalenderView.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/',
    name: 'CalenderView',
    component: CalenderView 
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
