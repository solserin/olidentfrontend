import Vue from 'vue'
import Router from 'vue-router'

import {store} from '../store/store'

// Containers
const DefaultContainer = () => import('@/containers/DefaultContainer')

// Views
const Dashboard = () => import('@/views/Home')

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

//catalogo de rutas
const Rutas = () => import('@/views/catalogos/rutas/Rutas')
//fin catalogos

//Componentes para el control de servicios de las polizas
const Ventas = () => import('@/views/polizas/Ventas')
const Vender = () => import('@/views/polizas/Vender')
const Editar = () => import('@/views/polizas/Editar')
const Cancelar = () => import('@/views/polizas/Cancelar')
const Consultar = () => import('@/views/polizas/Consultar')
const Renovar = () => import('@/views/polizas/Renovar')
const Pagos = () => import('@/views/polizas/Pagos')
const GuardarPagos = () => import('@/views/polizas/GuardarPagos')
const ConsultarPagos = () => import('@/views/polizas/ConsultarPagos')


//componentes para hacer los pagos

//reportes
const ReportePagos = () => import('@/views/polizas/reportes/ReporteCobranza')
const ReporteRutas = () => import('@/views/polizas/reportes/ReporteRutas')
//fin de reportes


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
        },
        {
          path: 'rutas',
          name: 'Rutas de cobro',
          component: Rutas,
          meta: {
            requiresAuth: true
          }
        }
      ]
    },

    //polizas
    {
      path: '/ventas/',
      redirect: '/ventas',
      name: 'Ventas',
      component: DefaultContainer,
      children: [
        {
          path: '/',
          name: 'Control de ventas',
          component: Ventas,
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
        },
        {
          path: 'editar',
          name: 'Actualizar pólizas',
          component: Editar,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'renovar',
          name: 'Renovar pólizas',
          component: Renovar,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'cancelar',
          name: 'Cancelar pólizas',
          component: Cancelar,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'consultar',
          name: 'Consultar pólizas',
          component: Consultar,
          meta: {
            requiresAuth: true
          }
        },
      ]
    },

    {
      path: '/cobranza/',
      redirect: '/cobranza',
      name: 'Pagos',
      component: DefaultContainer,
      children: [
        {
          path: '/',
          name: 'Control de pagos',
          component: Pagos,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'pagar/:id',
          name: 'Realizar Pagos',
          component: GuardarPagos,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'consultar',
          name: 'Consultar Pagos',
          component: ConsultarPagos,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'reportes',
          name: 'Reportes de Pagos',
          component: ReportePagos,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'rutas',
          name: 'Reportes de Rutas',
          component: ReporteRutas,
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
    },
    {
      path: '*',
      redirect: '/pages/404',
      name: 'Error not found',
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
        if(to.path=='/ventas/vender' ||  to.path=='/ventas/editar' ||  to.path=='/ventas/renovar' ||  to.path=='/ventas/cancelar' ||  to.path=='/ventas/consultar'){
          store.getters.permisos.forEach(element => {
            //checo si tiene permiso al modulo y al permiso
            if((to.path=='/ventas/vender' && element.modulo_id==7 && element.permiso_id==2)){
              //puede vender
              tiene_permiso_modulo=1;
              return;
            }
            if((to.path=='/ventas/renovar' && element.modulo_id==7 && element.permiso_id==2)){
              //puede renovar
              tiene_permiso_modulo=1;
              return;
            }

            if((to.path=='/ventas/editar' && element.modulo_id==7 && element.permiso_id==3)){
              //puede editar
              tiene_permiso_modulo=1;
              return;
            }
            if((to.path=='/ventas/cancelar' && element.modulo_id==7 && element.permiso_id==4)){
              //puede cancelar
              tiene_permiso_modulo=1;
              return;
            }
            if((to.path=='/ventas/consultar' && element.modulo_id==7 && element.permiso_id==1)){
              //puede cancelar
              tiene_permiso_modulo=1;
              return;
            }
          });
        }
        if(to.path=='/cobranza/pagar' || to.path=='/cobranza/consultar' || to.path=='/cobranza/reportes' || to.path=='/cobranza/rutas'){
          store.getters.permisos.forEach(element => {
            //checo si tiene permiso al modulo y al permiso
            if((to.path=='/cobranza/pagar' && element.modulo_id==8 && element.permiso_id==2)){
              //puede vender
              tiene_permiso_modulo=1;
              return;
            }

            if((to.path=='/cobranza/consultar' && element.modulo_id==8 && element.permiso_id==1)){
              //puede vender
              tiene_permiso_modulo=1;
              return;
            }
            //confirmamos que el usuario es administrador y puede ver estos reportes
            if((to.path=='/cobranza/reportes' && element.modulo_id==8 && element.permiso_id==1 &&store.getters.user.roles_id==1)){
              //puede vender
              tiene_permiso_modulo=1;
              return;
            }

            if((to.path=='/cobranza/rutas' && element.modulo_id==8 && element.permiso_id==1 &&store.getters.user.roles_id==1)){
              //puede vender
              tiene_permiso_modulo=1;
              return;
            }


          });
        }

        //checo que existe el paramtro de la ruta
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
