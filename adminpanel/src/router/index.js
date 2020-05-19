import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import NewsList from '@/components/NewsList'
import NewsItem from '@/components/NewsItem'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: HelloWorld
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/news',
      name: 'News',
      component: NewsList
    },
    {path: '/news/view/:id', component: NewsItem, meta: {scrollToTop: true}},
    {path: '/news/pg/:id', component: NewsList, props: {title: 'Новости'}, meta: {scrollToTop: true}}
  ]
})
