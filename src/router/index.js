import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import CalendarView from  '@/views/calendar/CalendarView.vue'

//도연

import UserProfileUpdateView from '@/views/accounts/UserProfileUpdateView.vue'
import ClubIndexView from '@/views/clubs/ClubIndexView.vue'
import ClubCreateView from '@/views/clubs/ClubCreateView.vue'
import ClubUpdateView from '@/views/clubs/ClubUpdateView.vue'
import PerformanceCreateView from '@/views/performances/PerformanceCreateView.vue'
import PerformanceUpdateView from '@/views/performances/PerformanceUpdateView.vue'
import ArticleCreateView from '@/views/community/ArticleCreateView.vue'
import ArticleUpdateView from '@/views/community/ArticleUpdateView.vue'
import PageNotFoundView from '@/views/PageNotFoundView.vue'

//수미
import ClubDetailView from "@/views/clubs/ClubDetailView.vue";
import UserDetailView from "@/views/users/UserDetailView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: '/calendar',
    name: 'CalendarView',
    component: CalendarView
  },
  {
    path: '/profileupdate/:ID',
    name: 'UserProfileUpdateView',
    component: UserProfileUpdateView,
  },
  {
    path: "/clubindex",
    name: "ClubIndexView",
    component: ClubIndexView,
  },
  {
    path: "/clubcreate",
    name: "ClubCreateView",
    component: ClubCreateView,
  },
  {
    path: "/clubupdate/:ID",
    name: "ClubUpdateView",
    component: ClubUpdateView,
  },
  {
    path: "/clubs/:clubId/performancecreate",
    name: "PerformanceCreateView",
    component: PerformanceCreateView,
  },
  {
    path: "/performanceupdate/:ID",
    name: "PerformanceUpdateView",
    component: PerformanceUpdateView,
  },
  {
    path: "/clubs/:clubId",
    name: "ClubDetailView",
    component: ClubDetailView,
  },
  {
    path: "/clubs/:clubId/article",
    name: "ArticleCreateView",
    component: ArticleCreateView,
  },
  {

    path: '/article/:articleId',
    name: 'ArticleUpdateView',
    component: ArticleUpdateView
  },
  {
    path: "/users/:userId",
    name: "UserDetailView",
    component: UserDetailView,

  },
  {
    path: '*',
    name: 'PageNotFoundView',
    component: PageNotFoundView
  },
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
