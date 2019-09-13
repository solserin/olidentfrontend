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

const host='http://localhost:8000/';
// todo
// cssVars()

Vue.use(BootstrapVue)

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
