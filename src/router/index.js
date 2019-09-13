import Vue from 'vue'
import Router from 'vue-router'

import {store} from '../store/store'

// Containers
const DefaultContainer = () => import('@/containers/DefaultContainer')

// Views
const Dashboard = () => import('@/views/Dashboard')

// Views - Pages
const Page404 = () => import('@/views/pages/Page404')
const Page500 = () => import('@/views/pages/Page500')
const Login = () => import('@/views/pages/Login')
const Register = () => import('@/views/pages/Register')




//Componentes para el control de usuarios
const Roles = () => import('@/views/usuarios/Roles')
const Usuarios = () => import('@/views/usuarios/Usuarios')


Vue.use(Router)

let router=new Router({
  mode: 'history', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
      name: 'Home',
      component: DefaultContainer,
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard,
          meta: { 
            requiresAuth: true
          }
        },
      ]
    },
    {
      path: '/usuarios',
      redirect: '/usuarios/',
      name: 'Usuarios',
      component: DefaultContainer,
      children: [
        {
          path: '/',
          name: 'Control de Usuarios',
          component: Usuarios,
          meta: { 
            requiresAuth: true
          }
        },
        {
          path: 'roles',
          name: 'Roles de Usuario',
          component: Roles,
          meta: { 
            requiresAuth: true
          }
        },
      ]
    },
    
    {
      path: '/pages',
      redirect: '/pages/404',
      name: 'Pages',
      component: {
        render (c) { return c('router-view') }
      },
      children: [
        {
          path: '404',
          name: 'Page404',
          component: Page404
        },
        {
          path: '500',
          name: 'Page500',
          component: Page500
        },
        {
          path: 'login',
          name: 'Login',
          component: Login
        },
        {
          path: 'register',
          name: 'Register',
          component: Register
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/pages/login') 
  } else {
    next() 
  }
})

export default router
