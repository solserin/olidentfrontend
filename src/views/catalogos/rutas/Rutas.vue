<template>
<div>

    <b-card style="border-radius:0;">
        <div slot="header"><i class="fa fa-money" aria-hidden="true"></i> Rutas de cobro</div>
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
                    <b-button v-b-modal.modalNuevo pill class="mr-2" variant="primary" v-if="permisos_por_modulo.agregar"><i class="fa fa-plus" aria-hidden="true"></i> Nuevo</b-button>
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
                            <b-button v-if="permisos_por_modulo.modificar" pill variant="primary" size="sm" @click="get_datos_modificar(data.item)"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></b-button>
                            <b-button v-if="permisos_por_modulo.eliminar" pill class="ml-4" variant="danger" size="sm" @click="eliminar(data.item)"><i class="fa fa-trash-o" aria-hidden="true"></i></b-button>
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
            <NuevoRuta  :datosModificar="form.datos" :id_ruta="form.id_ruta"></NuevoRuta>
        </div>
    </b-row>
</div>
</template>

<script>
import NuevoRuta from '../rutas/AgregarModificar'

import {
    modalConfirmar
} from '../../../assets/Funciones/Funciones' //funcion de modal de confirm

import axios from 'axios'
import {
    mapGetters
} from 'vuex'
export default {
    components: {
        NuevoRuta
    },
    data() {
        return {
            cargar: true,
            url: '',
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
                    key: "ruta",
                    label: 'Ruta',
                    class: 'text-center'
                },
                {
                    key: "descripcion",
                    label: 'Descripción',
                    class: 'text-center'
                },
                {
                    key: 'cobrador.name',
                    label: 'Cobrador',
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
                datos: [],
                id_ruta: 0
            },
            //permisos del usuario
            permisos_por_modulo: {
                agregar: false,
                consultar: false,
                modificar: false,
                eliminar: false
            }
        }
    },
    methods: {
        modalConfirmar,
        myProvider(ctx) {
            if (this.cargar) {
                this.$store.dispatch('loading');
                this.isBusy = true;
                let url_api = this.$hostname + 'rutas/?page=' + ctx.currentPage + '&per_page=' + ctx.perPage
                if (this.filter) {
                    //si se esta usando el filtro
                    url_api = this.$hostname + 'rutas/?page=' + ctx.currentPage + '&per_page=' + ctx.perPage + '&filter=' + this.filter
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
            }
        },
        refresh_table() {
            this.cargar=true;
            this.$root.$emit('bv::refresh::table', 'table')
        },
        get_datos_modificar(item) {
            this.modificar = true;
            this.form.datos = []
            this.form.id_ruta = 0
            try {
                 this.$store.dispatch('loading');
                let datos = axios.get(this.$hostname + 'rutas/' + item.id)
                    .then(resp => {
                        this.$store.dispatch('success')
                        this.form.id_ruta = item.id
                        this.form.datos.push(resp.data.data);
                        this.$bvModal.show('modalNuevo')
                    })
                    .catch(error => {
                        this.$store.dispatch('error')
                    })
            } catch (error) {
                console.log(error)
            }
        },
        eliminar(item) {
            this.modalConfirmar('Eliminar esta ruta', 'danger').then(resp => {
                if (resp) {
                    //si la respuesta es SI
                    this.$store.dispatch('loading');
                    try {
                        let datos = axios.delete(this.$hostname + 'rutas/' + item.id)
                            .then(resp => {
                                if (resp.data == item.id) {
                                    //exito
                                    this.$store.dispatch('success')
                                    //se elimino todo bien
                                    this.$toasted.show("La ruta: " + item.ruta + " ha sido dado de baja", {
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
                                    this.$toasted.show("Error al eliminar, esta ruta tiene polizas asociadas.", {
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
        mostrarPdf() {
            this.url = this.$hostname + 'roles_reporte'
        },
        //checa si tiene permisos para ver esa parte del sistema

    },
    computed: {
        // mix the getters into computed with object spread operator
        ...mapGetters([
            'permisos'
        ])
    },
    created() {
        this.permisos_por_modulo.consultar = this.$permiso(2, 1);
        this.permisos_por_modulo.agregar = this.$permiso(2, 2);
        this.permisos_por_modulo.modificar = this.$permiso(2, 3);
        this.permisos_por_modulo.eliminar = this.$permiso(2, 4);
    },
}
</script>

<style lang="css">

</style>
