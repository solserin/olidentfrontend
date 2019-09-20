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



//Componentes para el control de usuarios
const Roles = () => import('@/views/usuarios/Roles')
const Usuarios = () => import('@/views/usuarios/Usuarios')

var tiene_permiso_modulo=0;


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
          
        }
      ]
    }
  ]
})


router.beforeEach((to, from, next) => {

  //aqui los regreso al dashboard en caso de que ya este logueado
  if(to.fullPath=='/pages/login'){
    if (store.getters.isLoggedIn) {
      next('/dashboard') 
    }
  }



  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      if(to.fullPath!="/dashboard"){
         //verifico que tenga permiso para entrar a ese modulo
        tiene_permiso_modulo=0;
        store.getters.permisos.forEach(element => {
          if(to.fullPath==element.url){
            tiene_permiso_modulo=tiene_permiso_modulo+1;
          }
        });
        if(tiene_permiso_modulo>0){
          //puede entrar a la ruta
          next()
          return
        }else{
          //no puede entrar a la ruta
          next('/dashboard') 
        }
        //verifico que tenga permiso para entrar a ese modulo
      }else{
        next()
        return
      }
      next()
      return
    }
    next('/pages/login') 
  } else {
    next() 
  }
})

export default router
