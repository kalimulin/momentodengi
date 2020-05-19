import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Index'
import Page from '@/components/Page'
import About from '@/components/About'
import News from '@/components/News'
import NewsItem from '@/components/NewsItem'
import Loans from '@/components/Loans'
import CloseLoan from '@/components/CloseLoan'
import Press from '@/components/Press'
import PressItem from '@/components/PressItem'
import IamTheLaw from '@/components/IamTheLaw'
import Ad from '@/components/Ad'
import Rent from '@/components/Rent'
import Jobs from '@/components/Jobs'
import Contacts from '@/components/Contacts'
import OpenLoan from '@/components/OpenLoan'
import Documents from '@/components/Documents'

Vue.use(Router)

const scrollBehavior = function (to, from, savedPosition) {
  return {x: 0, y: 0}
}

export default new Router({
  mode: 'history',
  scrollBehavior,
  routes: [{
    path: '/',
    component: Home,
    meta: {scrollToTop: true}
  },
  {
    path: '/page',
    component: Page,
    children: [
      {path: '', component: About},
      {path: 'about', component: About, props: {title: 'О компании'}, meta: {scrollToTop: true}},
      {path: 'ad', component: Ad, meta: {scrollToTop: true}},
      {path: 'news', component: News, meta: {scrollToTop: true}},
      {path: 'news/view/:id', component: NewsItem, meta: {scrollToTop: true}},
      {path: 'news/pg/:id', component: News, props: {title: 'Новости'}, meta: {scrollToTop: true}},
      {path: 'rent', component: Rent, meta: {scrollToTop: true}},
      {path: 'ad', component: About, props: {title: 'О компании'}, meta: {scrollToTop: true}},
      {
        path: 'openloan',
        name: 'openloan',
        component: OpenLoan,
        props: {title: 'О компании'},
        meta: {scrollToTop: true}
      },
      {path: 'loans', component: Loans, meta: {scrollToTop: true}},
      {path: 'closeloan', component: CloseLoan, meta: {scrollToTop: true}},
      {path: 'press', component: Press, meta: {scrollToTop: true}},
      {path: 'press/view/:id', component: PressItem, meta: {scrollToTop: true}},
      {path: 'press/pg/:id', component: Press, meta: {scrollToTop: true}},
      {path: 'iamthelaw', component: IamTheLaw, meta: {scrollToTop: true}},
      {path: 'documents', component: Documents, props: {title: 'Документы'}, meta: {scrollToTop: true}},
      {path: 'jobs', component: Jobs, meta: {scrollToTop: true}},
      {path: 'contacts', component: Contacts, meta: {scrollToTop: true}}
    ]
  },
  {path: '/about', redirect: '/page/about'},
  {path: '/news', redirect: '/page/news'},
  {path: '/news/:id', redirect: '/page/news/view/:id'},
  {path: '/rent', redirect: '/page/rent'},
  {path: '/ad', redirect: '/page/ad'},
  {path: '/openloan', redirect: '/page/openloan'},
  {path: '/loans', redirect: '/page/loans'},
  {path: '/closeloan', redirect: '/page/closeloan'},
  {path: '/press', redirect: '/page/press'},
  {path: '/press/:id', redirect: '/page/press/view/:id'},
  {path: '/iamthelaw', redirect: '/page/iamthelaw'},
  {path: '/documents', redirect: '/page/documents'},
  {path: '/jobs', redirect: '/page/jobs'},
  {path: '/contacts', redirect: '/page/contacts'}
  ]
})
