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

// todo
// cssVars()

Vue.use(BootstrapVue)

Vue.prototype.$hostname = 'http://localhost:8000/'

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
