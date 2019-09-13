import Vue from 'vue'
import Vuex from 'vuex'

import createPersistedState from 'vuex-persistedstate'

import tokenManagement from './modules/token'
import Status from './modules/status'

//load vuex
Vue.use(Vuex)

export const store=new Vuex.Store({
    modules:{
      Status,
      tokenManagement
    },
    plugins: [createPersistedState()],
})