<template>
<div>
    <b-row class="mb-3">
        <b-col cols="12" xs="12">
            <span class="title-crud">Roles de Usuario</span>
        </b-col>
    </b-row>
    <b-card no-header style="border-radius:0;">
        <b-row>
            <b-col xs="12" sm="12" md="5">
                <b-input-group class="mb-2 mt-3">
                    <b-form-input placeholder="Filtrar resultados" v-model="filter" v-on:keyup.enter="refresh_table"></b-form-input>
                    <b-input-group-prepend variant="primary" is-text style="cursor:pointer !important;" @click="refresh_table"><b class="text-primary"><i class="fa fa-search" aria-hidden="true"></i></b></b-input-group-prepend>
                </b-input-group>
            </b-col>
            <b-col xs="12" sm="12" md="2">
                <b-input-group class="mt-3">
                    <b-input-group-prepend is-text><b><i class="fa fa-filter" aria-hidden="true"></i></b></b-input-group-prepend>
                    <b-form-select v-model="perPage">
                        <!-- This slot appears above the options from 'options' prop -->
                        <template v-slot:first>
                            <option :value="null" disabled>-- Mostrar 10 --</option>
                        </template>
                        <!-- These options will appear after the ones from 'options' prop -->
                        <option value="10">Mostrar 10</option>
                        <option value="20">Mostrar 20</option>
                        <option value="30">Mostrar 30</option>
                        <option value="50">Mostrar 50</option>
                    </b-form-select>
                </b-input-group>
            </b-col>
            <b-col xs="12" sm="12" md="5">
                <div class="float-right  mt-3">
                    <b-button v-b-modal.modalNuevo pill class="mr-2" variant="primary"><i class="fa fa-plus" aria-hidden="true"></i> Nuevo</b-button>
                    <b-button pill  variant="outline-danger" @click="mostrarPdf"><i class="fa fa-file-pdf-o" aria-hidden="true"></i> Pdf</b-button>
                    <b-button pill variant="outline-success" hidden><i class="fa fa-file-excel-o" aria-hidden="true"></i> Excel</b-button>
                </div>
            </b-col>
        </b-row>
        <b-row>
            <b-col xs="12">
                <b-table id="table" :fixed="true" hover :foot-clone="true" :busy.sync="isBusy" :items="myProvider" :fields="fields" :current-page="currentPage" :per-page="perPage" striped show-empty :emptyText="texto" responsive primary-key="id" class="mt-5">
                    <template v-slot:table-caption>
                        Total de Resultados: <strong>{{rowsTotal}} </strong> de <strong>{{totalRows}} </strong> Registros.
                    </template>
                    <template v-slot:empty="scope">
                        <p class="text-center">{{ scope.emptyText }}</p>
                    </template>
                    <template v-slot:acciones="data">
                        <div>
                            <b-button pill variant="primary" size="sm" @click="get_datos_modificar(data.item)"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></b-button>
                            <b-button pill class="ml-4" variant="danger" size="sm" @click="eliminar(data.item)"><i class="fa fa-trash-o" aria-hidden="true"></i></b-button>
                            <b-button hidden pill size="sm" variant="secondary"><i class="fa fa-search" aria-hidden="true"></i></b-button>
                        </div>
                    </template>
                    <!-- A virtual composite column -->
                </b-table>
                <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage" first-text="<<" prev-text="<" next-text=">" last-text=">>" class="mt-3 mb-5 justify-content-center">
                </b-pagination>
            </b-col>
        </b-row>
    </b-card>
    <b-row>
        <div>
            <NuevoRol :itemsModificar="form.itemsPermisos" :rolNombre="form.rol" :id_rol="form.id_rol"></NuevoRol>
            <modalPdfs :url_pdf="url"></modalPdfs>
        </div>
    </b-row>
</div>
</template>

<script>
import NuevoRol from './roles/NuevoRol'
import modalPdfs from './roles/pdf'
import {
    modalConfirmar
} from '../../assets/Funciones/Funciones.js' //funcion de modal de confirm
import axios from 'axios'
import {
    mapGetters
} from 'vuex'
export default {
    components: {
        NuevoRol,
        modalPdfs
    },
    data() {
        return {
            url:'',
            //datos compartidos del componente NuevoRol
            selected: null,
            texto: 'No se ha extraido información de la base de datos',
            items: [],
            fields: [{
                    key: "id",
                    label: 'Clave',
                    thClass: 'text-primary',
                    class: 'text-center'
                },
                {
                    key: "rol",
                    label: 'Rol',
                    class: 'text-center'
                },
                {
                    key: 'usuarios_count',
                    label: 'Total de Usuarios',
                    class: 'text-center'
                },
                {
                    key: 'acciones',
                    label: 'Acciones',
                    class: 'text-center'
                },
            ],
            isBusy: false,
            totalRows: 0,
            currentPage: 1,
            perPage: 10,
            filter: null,
            rowsTotal: 0,
            //variable que verifica si se esta modificacondo
            modificar: false,
            form: {
                //permisos
                itemsPermisos: [],
                rol: '',
                id_rol: 0
            },
        }
    },
    methods: {
        modalConfirmar,
        myProvider(ctx) {
            this.$store.dispatch('loading');
            this.isBusy = true;
            let url_api = 'http://localhost:8000/roles?page=' + ctx.currentPage + '&per_page=' + ctx.perPage
            if (this.filter) {
                //si se esta usando el filtro
                url_api = 'http://localhost:8000/roles?page=' + ctx.currentPage + '&per_page=' + ctx.perPage + '&filter=' + this.filter
            }
            let promise = axios.get(url_api)
            return promise
                .then(resp => {
                    var items = resp.data.data.data;
                    this.items = resp.data.data;
                    this.currentPage = resp.data.data.current_page;
                    this.totalRows = resp.data.data.total;
                    this.rowsTotal = resp.data.data.data.length;
                    this.isBusy = false;
                    this.$store.dispatch('success')
                    return items;
                })
                .catch(error => {
                    console.log(error)
                    this.isBusy = false;
                    this.$store.dispatch('error')
                    return [];
                })
        },
        refresh_table() {
            this.$root.$emit('bv::refresh::table', 'table')
        },
        get_datos_modificar(item) {
            this.modificar = true;
            this.$store.dispatch('loading');
            this.form.itemsPermisos = []
            this.form.rol = ''
            this.form.id_rol = 0
            try {
                let datos = axios.get('http://localhost:8000/roles/' + item.id)
                    .then(resp => {
                        resp.data.data.forEach(element => {
                            this.form.itemsPermisos.push(element.modulos_id + ',' + element.permisos_id);
                        });
                        this.form.id_rol = item.id
                        this.form.rol = item.rol
                        this.$store.dispatch('success')
                        this.$bvModal.show('modalNuevo')
                    })
                    .catch(error => {
                        console.log(error)
                        this.$store.dispatch('error')
                    })
            } catch (error) {
                console.log(error)
            }
        },
        eliminar(item) {
            this.modalConfirmar('Eliminar este rol', 'danger').then(resp => {
                if (resp) {
                    //si la respuesta es SI
                    this.$store.dispatch('loading');
                    try {
                        let datos = axios.delete('http://localhost:8000/roles/' + item.id)
                            .then(resp => {
                                if (resp.data == item.id) {
                                    //exito
                                    this.$store.dispatch('success')
                                    //se elimino todo bien
                                    this.$toasted.show("El rol: " + item.rol + " ha sido dado de baja", {
                                        iconPack: 'fontawesome',
                                        type: 'success',
                                        theme: 'toasted-primary',
                                        icon: 'check',
                                        duration: 5000,
                                        position: 'top-right',
                                        closeOnSwipe: true,
                                        keepOnHover: true
                                    });
                                    this.$root.$emit('bv::refresh::table', 'table')
                                } else {
                                    //debe regresar -1 si tiene usuarios asociados
                                    //hubo algun error
                                    this.$store.dispatch('error')
                                    this.$toasted.show("Error al eliminar, este rol tiene usuarios asociados.", {
                                        iconPack: 'fontawesome',
                                        type: 'error',
                                        theme: 'toasted-primary',
                                        icon: 'close',
                                        duration: 5000,
                                        position: 'top-right',
                                        closeOnSwipe: true,
                                        keepOnHover: true
                                    });
                                }

                            })
                            .catch(error => {
                                console.log(error)
                                this.$store.dispatch('error')
                            })
                    } catch (error) {
                        console.log(error)
                    }
                }
            });
        },
        mostrarPdf(){
            this.url='http://localhost:8000/roles_reporte'
        }
    },
    computed: {
        // mix the getters into computed with object spread operator
        ...mapGetters([
            'permisos'
        ])
    }

}
</script>

<style lang="css">
.title-crud {
    font-size: 16px;
    font-weight: bold;
}

#table tr:hover {
    background-color: #d2edf7 !important;
}


#confirmar .modal-dialog .modal-header{
    background-color: #ffffff !important;
    border-radius: 0px !important;
    color:#5f5f5f;
    border:none !important;
}

#confirmar .modal-dialog .modal-header h5{
    position:absolute;
    padding-top:90px;
    min-width:100% !important;
    margin-left:27%;
    font-size:24px;
}


#confirmar .modal-dialog .modal-footer{
    border-radius: 0px !important;
    border:none !important;
}
#confirmar .modal-dialog .close{
     color:#5f5f5f;
}

#confirmar .modal-dialog .modal-body{
     font-size:18px;
     border:none !important;
     text-align:center;
     margin-top:80px;
     color:#5f5f5f !important;
}

#confirmar .modal-dialog .modal-header::before{
    font-family: "Font Awesome 5 Free"; font-weight: 400; content: "\f059";
    font-size:80px;
    position:absolute !important;
    margin-left:39% !important;
    margin-top:-5%;
}

#confirmar .modal-dialog .modal-footer button{
     margin-top:5px;
     border-radius: 0px !important;
     font-weight:bold;
     padding:10px 40px 10px 40px;
     margin-right:auto !important;
     margin-left:auto !important;
}

</style>
