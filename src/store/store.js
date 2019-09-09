import Vue from 'vue'
import Vuex from 'vuex'

import tokenManagement from './modules/token'

//load vuex
Vue.use(Vuex)

export const store=new Vuex.Store({
    modules:{
      tokenManagement
    }
})