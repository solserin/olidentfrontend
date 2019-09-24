import axios from 'axios'


const state={
    status: '',
    token: localStorage.getItem('access_token') || '',
    user:[],
    host:'http://localhost:8000/',
    menu:[],
    permisos:[],
    datosEmpresa:[]
};

const getters={
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    user: state => state.user,
    menu:state=>state.menu,
    permisos:state=>state.permisos,
    datosEmpresa:state=>state.datosEmpresa,
};

const mutations={
      auth_request(state) {
        state.status = 'loading'
      },
      auth_success(state, token){
        state.status = 'success'
        state.token = token
      },
      auth_error(state) {
        state.status = 'error'
      },
      logout(state) {
        state.status = ''
        state.token = '',
        state.user=[],
        state.menu=[]
      },
      datosUsuario(state,datos){
        state.user=datos
      },
      getPerfil(state,menu){
        state.menu=menu
      },
      getUsuarioPermisos(state,permisos){
        state.permisos=permisos
      },
      getEmpresaDatos(state,datos){
        state.datosEmpresa=datos
      }
};

const actions={
    login({ commit,dispatch },data) {
        return new Promise((resolve, reject) => {
          var datos={
            client_id:1,
            client_secret:'22ct0vYUrE8NLiCyF3vUxLzgCJ18Q5g3UskgAaXc',
            grant_type:'password',
            username:data.email,
            password:data.password
          }
          commit('auth_request')
           axios({ url: state.host+'oauth/token', data: datos, method: 'POST' })
            .then(resp => {
              const token = resp.data.access_token
              localStorage.setItem('access_token', token)
              // Add the following line:
              axios.defaults.headers.common['Authorization'] = 'Bearer '+token
              axios({ url: state.host+'usuarios/user_email/'+datos.username, method: 'GET' })
              .then(resp2 => {
                dispatch('fillPerfil',resp2.data.data.id)
                dispatch('getDatosEmpresa')
                .then(()=>{
                  commit('auth_success', token)
                  resolve(resp)
                })
                commit('datosUsuario',resp2.data)
              })
            })
            .catch(err => {
              commit('auth_error')
              localStorage.removeItem('access_token')
              reject(err)
            })
        })
      },
      fillPerfil({ commit },id) {
        
           return axios.post(state.host+'usuarios/loadPerfil/'+id)
            .then(res=>{
                const data=res.data.data;
                commit('getUsuarioPermisos',res.data.data)
                //obtengo los todos los modulos pero falta agruparlos
                let modulos=[]
                let id_modulos=0
                let id_grupo=0
                let grupos=[]
                data.forEach(function(item,index){
                   if(id_modulos==0){
                       id_modulos=item['modulo_id']
                       modulos.push(
                        {
                            'id_modulo':id_modulos,
                            'index':index,
                            'name':item['name'],
                            'url':item['url'],
                            'icon':item['icon'],
                            'id_grupo':item['grupo_id'],
                        }
                      )
                   }else{
                       if(id_modulos!=item['modulo_id']){
                          id_modulos=item['modulo_id']
                          modulos.push(
                            {
                                'id_modulo':id_modulos,
                                'index':index,
                                'name':item['name'],
                                'url':item['url'],
                                'icon':item['icon'],
                                'id_grupo':item['grupo_id'],
                            }
                          )
                       }
                   }
                   if(id_grupo==0){
                       id_grupo=item['grupo_id']
                       grupos.push({'id':id_grupo,'index':index,'grupo':item['grupo'],'icon':item['grupo_icon']})
                   }else{
                       if(id_grupo!=item['grupo_id']){
                          id_grupo=item['grupo_id']
                          grupos.push({'id':id_grupo,'index':index,'grupo':item['grupo'],'icon':item['grupo_icon']})
                       }
                   }
                });

                //aqui comienzo a organizar el menu
                let menu=[]

                menu.push(
                    {
                        name: 'INICIO',
                        url: '/dashboard',
                        icon: 'icon-speedometer',
                      },
                      {
                        divider: true
                      },
                      {
                        title: true,
                        name: 'MENÚ'
                    }
                );
                let temporal=[]
                let childrens=[]
                let lasItem=1
                grupos.forEach(function(itemGrupo,index){
                    //aqui saco todos los modulos por grupo
                    lasItem=1
                    modulos.forEach(function(itemModulo,index){
                        if(itemGrupo['id']==itemModulo['id_grupo']){
                            childrens.push(
                                {
                                    'name':itemModulo['name'],
                                    'url':itemModulo['url'],
                                    'icon':itemModulo['icon']
                                }
                            );
                        }
                        if(lasItem==modulos.length){
                            //aqui se juntan los dos arrays de datos
                            temporal=
                                {
                                    'name': itemGrupo['grupo'],
                                    'url': itemModulo['url'],
                                    'icon': itemGrupo['icon'],
                                    'children':childrens
                                }
                        }
                        lasItem++
                    });
                    menu.push(temporal)
                    childrens=[]
                    temporal=[]
                });
                commit('getPerfil',menu)
              
            })
            .catch(err=>{
                console.log(err)

            })
        
      },
      getDatosEmpresa({ commit }) {
        return axios.get(state.host+'empresas/1')
         .then(res=>{
             const data=res.data.data;
             commit('getEmpresaDatos',res.data.data)
         })
         .catch(err=>{
             console.log(err)
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