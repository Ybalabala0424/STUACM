import Vue from 'vue'
import Router from 'vue-router'
import MissionsPage from '@/components/MissionsPage'
import MainPage from '@/components/MainPage'
import MindMap from '@/components/MindMap'
import Enroll from '@/components/Enroll'
import Home from '@/components/Home'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/Home'
    },
    {
      path: '/Home',
      name: 'Home',
      component: Home,
    },
    {
      path: '/Enroll',
      name: 'Enroll',
      component: Enroll,
    },
    {
      path: '/MainPage',
      name: 'MainPage',
      component: MainPage,
      children: [
        {
          path: '/',
          redirect: '/MissionsPage'
        },
        {
          path: '/MindMap',
          name: 'MindMap',
          component: MindMap
        },
        {
          path: '/MissionsPage',
          name: 'MissionsPage',
          component: MissionsPage
        }
      ]
    }
  ]
})
