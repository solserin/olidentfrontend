// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'core-js/es6/promise'
import 'core-js/es6/string'
import 'core-js/es7/array'

import Vue from 'vue'

import {store} from '../src/store/store'
// import cssVars from 'css-vars-ponyfill'
import BootstrapVue from 'bootstrap-vue'


import App from './App'
import router from './router'

import axios from 'axios'
import VueAxios from 'vue-axios'


Vue.use(VueAxios, axios)

// register the plugin on vue
import Toasted from 'vue-toasted';
Vue.use(Toasted)

const token = 'Bearer '+localStorage.getItem('access_token')
if (token) {
  axios.defaults.headers.common['Authorization'] = token
}
const $ = require('jquery')
// Lo declaramos globalmente
window.$ = $
import datePicker from 'vue-bootstrap-datetimepicker';
import 'pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css';
Vue.use(datePicker);


import numeral from 'numeral';
import numFormat from 'vue-filter-number-format';

Vue.filter('numFormat', numFormat(numeral));
// todo
// cssVars()

Vue.use(BootstrapVue)

Vue.prototype.$hostname = 'http://localhost:8000/'
Vue.prototype.$hostname_frontend = 'http://localhost:8080/'

//Vue.prototype.$hostname = 'https://www.api.olident.com.mx/'
//Vue.prototype.$hostname_frontend = 'https://www.sistema.olident.com.mx/'

const plugin = {
  install (Vue,options) {
    //verirfica si el usuario tiene permiso de hacer alguna accion en el sistema y si no tiene para no mostrarle la opcion
      Vue.prototype.$permiso=function (id_modulo,id_permiso) {
        var tiene_permiso=false;
        store.getters.permisos.forEach(element => {
          if(element.modulo_id==id_modulo && element.permiso_id==id_permiso){
            tiene_permiso=true;
          }
        });
        //verifica si tiene el permiso para ver cierta parte del modulo y si no retorna falso
        return tiene_permiso;
    }
  }
}
Vue.use(plugin)

//verifico que antes de mandar una peticion se revise el token exista
axios.interceptors.request.use(function (config) {
  if(config.url!=Vue.prototype.$hostname+'oauth/token'){
    store.dispatch('actualizarLoginEstado');
    //console.log(config.url)
    //console.log(store.getters.isLoggedIn)
    if(!store.getters.isLoggedIn){
      router.push('/')
    }
  }
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});


//aqui reviso que en caso de recibir un error de tipo 401 me mande al login
axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  if (401 === error.response.status) {
    store.dispatch('logout');
    router.push('/')
  } else {
      return Promise.reject(error);
  }
});

/* eslint-disable no-new */
new Vue({
  store:store,
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  }
})
