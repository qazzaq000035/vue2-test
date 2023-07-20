import Vue from 'vue'
import VueRouter from "vue-router";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Главная',
    component: () => import('@/pages/Index'),
  },
  { path: '*', component: () => import('@/pages/404') },
];

const router = new VueRouter({
    //mode: 'history',
    routes,
    linkActiveClass: 'active',
    fallback: false,
})

export default router;

