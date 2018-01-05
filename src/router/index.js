import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import Forget from '../components/forget'

Vue.use(Router)
Vue.use(Forget)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/forget',
      name: 'forget',
      component: Forget
    }
  ]
})
