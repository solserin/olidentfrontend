import axios from 'axios'

const state={
    menu:[]
};

const getters={
    menu:state=>state.menu
};

const mutations={
    getPerfil(state,menu){
        state.menu=menu
    }
};

const actions={
    fillPerfil({ commit }) {
        return new Promise((resolve, reject) => {
            axios.post("http://localhost:8000/usuarios/loadPerfil/1")
            .then(res=>{
                const data=res.data.data;
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
                       grupos.push({'id':id_grupo,'index':index,'grupo':item['grupo']})
                   }else{
                       if(id_grupo!=item['grupo_id']){
                          id_grupo=item['grupo_id']
                          grupos.push({'id':id_grupo,'index':index,'grupo':item['grupo']})
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
                                    'icon': itemModulo['icon'],
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