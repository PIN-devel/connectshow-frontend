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
import ClubIndex from '../views/clubs/ClubIndex.vue'
import ClubCreate from '../views/clubs/ClubCreate.vue'
import ClubUpdate from '../views/clubs/ClubUpdate.vue'
import PerformanceCreate from '../views/performances/PerformanceCreate.vue'
import PerformanceUpdate from '../views/performances/PerformanceUpdate.vue'
import ArticleCreate from '../views/community/ArticleCreate.vue'
import ArticleUpdate from '../views/community/ArticleUpdate.vue'

//수미
import ClubDetail from '../views/clubs/ClubDetail.vue'
import UserDetail from '../views/users/UserDetail.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/calender',
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
    path: '/clubindex',
    name: 'ClubIndex',
    component: ClubIndex
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
  {
    path: '/clubs/:clubId',
    name: 'ClubDetail',
    component: ClubDetail
  },
  {
    path: '/clubs/:clubId/article',
    name: 'ArticleCreate',
    component: ArticleCreate
  },
  {
    path: '/article/:articleID',
    name: 'ArticleUpdate',
    component: ArticleUpdate
  },
  {
    path: '/users/:userId',
    name: 'UserDetail',
    component: UserDetail
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
