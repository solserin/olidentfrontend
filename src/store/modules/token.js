import axios from 'axios'



const state={
    status: '',
    token: localStorage.getItem('access_token') || '',
    user: {}
};

const getters={
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
};

const mutations={
      auth_request(state) {
        state.status = 'loading'
      },
      auth_success(state, token, user){
        state.status = 'success'
        state.token = token
        state.user = user
      },
      auth_error(state) {
        state.status = 'error'
      },
      logout(state) {
        state.status = ''
        state.token = ''
      }
};

const actions={
    login({ commit },data) {
        return new Promise((resolve, reject) => {
          var datos={
            client_id:1,
            client_secret:'4r6xNH7MYlNRf1YFstb6oFsI87uuY2nlcBA6K1Ft',
            grant_type:'password',
            username:data.email,
            password:data.password
          }
          commit('auth_request')
           axios({ url: 'http://localhost:8000/oauth/token', data: datos, method: 'POST' })
            .then(resp => {
              const token = resp.data.access_token
              const user = resp
              
              //console.log(resp.data)
              localStorage.setItem('access_token', token)
              // Add the following line:
              axios.defaults.headers.common['Authorization'] = 'Bearer '+token
              commit('auth_success', token, user)
              resolve(resp)
            })
            .catch(err => {
              commit('auth_error')
              localStorage.removeItem('access_token')
              reject(err)
            })
        })
      },
      logout({ commit }) {
        return new Promise((resolve, reject) => {
          commit('auth_request')
          localStorage.removeItem('access_token')
          delete axios.defaults.headers.common['Authorization']
          commit('logout')
          
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