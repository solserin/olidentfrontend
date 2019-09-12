import axios from 'axios'

const state={
    perfil:[],
    user_id:'',
    user_email:'',
    menu:[]
};

const getters={
    datos:state=>state.perfil,
    user_id:state=>state.user_id,
    user_email:state=>state.user_email,
    menu:state=>state.menu
};

const mutations={
    getPerfil(state,data,men){
        state.perfil=data
        state.user_id=data[0]['id']
        state.user_email=data[0]['email']
        state.menu=men
    }
};

const actions={
    fillPerfil({ commit }) {
        return new Promise((resolve, reject) => {
            axios.post('http://localhost:8000/usuarios/loadPerfil/1')
            .then(res=>{
                const data=res.data.data;
                const menu=[];
                
                let x=0;
                /*data.forEach(function(item){
                    if(x==0){
                        grupo=[
                            {
                                'name':item['grupo'],
                                'url':item['url'],
                                'icon':item['icon']
                            }
                        ]
                        menu.push(grupo)
                    }
                    x+=1;
                });*/

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
                       grupos.push({'id':id_grupo,'index':index})
                   }else{
                       if(id_grupo!=item['grupo_id']){
                          id_grupo=item['grupo_id']
                          grupos.push({'id':id_grupo,'index':index})
                       }
                   }
                });
                console.log(modulos);
                console.log(grupos);
                commit('getPerfil',data,menu)
                resolve(res)
            })
            .catch(err=>{
                console.log(err)
                reject(err)
            })
        })
      }
};

export default{
    state,
    getters,
    actions,
    mutations
};