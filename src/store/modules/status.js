import axios from 'axios'

const state={
    status:''
};

const getters={
    status:state=>state.status,
};

const mutations={
    inicia_peticion(state) {
        state.status = 'loading'
    },
    error_peticion(state) {
        state.status = 'error'
    },
    success_peticion(state) {
        state.status = 'success'
    }
};

const actions={
    loading({ commit }) {
        return new Promise((resolve, reject) => {
          commit('inicia_peticion')
          resolve()
        })
    },
    error({ commit }) {
        return new Promise((resolve, reject) => {
          commit('error_peticion')
          resolve()
        })
    },
    success({ commit }) {
        return new Promise((resolve, reject) => {
          commit('success_peticion')
          resolve()
        })
    }
};

export default{
    state,
    getters,
    actions,
    mutations
};