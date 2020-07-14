import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import CalenderView from  '../views/CalenderView.vue'

//도연
// import SignupView from '../views/accounts/SignupView.vue'
// import LoginView from '../views/accounts/LoginView.vue'
import SignupView from '../views/accounts/SignupView.vue'
import LoginView from '../views/accounts/LoginView.vue'
import UserProfileUpdate from '../views/accounts/UserProfileUpdate.vue'
import ClubCreate from '../views/clubs/ClubCreate.vue'
import ClubUpdate from '../views/clubs/ClubUpdate.vue'
import PerformanceCreate from '../views/performances/PerformanceCreate.vue'
import PerformanceUpdate from '../views/performances/PerformanceUpdate.vue'

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
  {
    path: '/signup',
    name: 'Signupview',
    component: SignupView
  },
  {
    path: '/login',
    name: 'Loginview',
    component: LoginView
  },
  {
    path: '/profileupdate/:ID',
    name: 'UserProfileUpdate',
    component: UserProfileUpdate,
  },
  {
    path: '/clubcreate',
    name: 'ClubCreate',
    component: ClubCreate
  },
  {
    path: '/clubupdate/:ID',
    name: 'ClubUpdate',
    component: ClubUpdate
  },
  {
    path: '/performancecreate',
    name: 'PerformanceCreate',
    component: PerformanceCreate
  },
  {
    path: '/performanceupdate/:ID',
    name: 'PerformanceUpdate',
    component: PerformanceUpdate
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router