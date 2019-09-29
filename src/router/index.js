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
const Roles = () => import('@/views/usuarios/roles/Roles')
const Usuarios = () => import('@/views/usuarios/Usuarios')
const Perfil = () => import('@/views/usuarios/Perfil')

//Componentes para el control de la empresa
const Empresa = () => import('@/views/empresa/Empresa')

//catalogos
//Componentes para el control de servicios de la empresa
const Servicios = () => import('@/views/servicios/Servicios')
//catalogo de vendedores
const Vendedores = () => import('@/views/catalogos/vendedores/Grupos')
//fin catalogos


//Componentes para el control de servicios de las polizas
const Polizas = () => import('@/views/polizas/Polizas')
const Vender = () => import('@/views/polizas/Vender')


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
      path: '/perfil',
      redirect: '/perfil/',
      name: 'Perfil',
      component: DefaultContainer,
      children: [
        {
          path: '/perfil',
          name: 'PerfilUsuario',
          component: Perfil,
          meta: { 
            requiresAuth: true
          }
        },
      ]
    },
    //usuarios
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
        }
      ]
    },

    //empresa
    {
      path: '/empresa',
      redirect: '/empresa',
      name: 'Empresa',
      component: DefaultContainer,
      children: [
        {
          path: '/',
          name: 'Datos de la empresa',
          component: Empresa,
          meta: { 
            requiresAuth: true
          }
        }
      ]
    },
     //servicios
     {
      path: '/catalogos/',
      redirect: '/',
      name: 'Catalogos',
      component: DefaultContainer,
      children: [
        {
          path: 'servicios',
          name: 'Servicios de la clinica',
          component: Servicios,
          meta: { 
            requiresAuth: true
          }
        },
        {
          path: 'vendedores',
          name: 'Vendedores de polizas',
          component: Vendedores,
          meta: { 
            requiresAuth: true
          }
        }
      ]
    },

    //polizas
    {
      path: '/polizas/',
      redirect: '/polizas',
      name: 'Polizas',
      component: DefaultContainer,
      children: [
        {
          path: '/',
          name: 'Control de pólizas',
          component: Polizas,
          meta: { 
            requiresAuth: true
          }
        },
        {
          path: 'vender',
          name: 'Vender pólizas',
          component: Vender,
          meta: { 
            requiresAuth: true
          }
        }
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
      if(to.fullPath!="/dashboard" && to.fullPath!="/perfil"){
         //verifico que tenga permiso para entrar a ese modulo
        tiene_permiso_modulo=0;
        store.getters.permisos.forEach(element => {
          if(to.path==element.url){
            tiene_permiso_modulo=tiene_permiso_modulo+1;
          }
        });
        //hasta aqui verifico que tenga acceso a las rutas estaticas

        //aqui comienzo a validad las rutas de polizas
        //fin de validacion de rutas de polizas


        //estas rutas son para rutas sin necesidad de crear un modulo aparte
        //validacion para rutas de polizas vender (permiso agregar en polizas)
        if(to.path=='/polizas/vender'){
          store.getters.permisos.forEach(element => {
            //checo si tiene permiso al modulo y al permiso
            if(element.modulo_id==5 && element.permiso_id==2){
              tiene_permiso_modulo=1;
              return;
            }
          });
        }

        if(to.params.id){
          tiene_permiso_modulo=1;
        }
        //fin de validacion de ruta para vender

        //aqui dependiendo de las rutas de arribadecido si puede proseguir o nor
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
