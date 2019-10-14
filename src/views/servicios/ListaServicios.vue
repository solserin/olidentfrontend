<template>
<div>
    <div class="mt-3 mb-3">
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
                    <b-button  pill variant="outline-danger" @click="mostrarPdf" v-if="permisos_por_modulo.consultar"><i class="fa fa-file-pdf-o" aria-hidden="true"></i> Pdf</b-button>
                </div>
            </b-col>
        </b-row>
        <b-row>
            <b-col xs="12">
                <b-table id="table" stacked="lg" responsive hover :foot-clone="true" :busy.sync="isBusy" :items="myProvider" :fields="fields" :current-page="currentPage" :per-page="perPage" striped show-empty :emptyText="texto" primary-key="id" class="mt-5">
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
                        </div>
                    </template>
                    <template v-slot:precio_normal="data">
                        <div>
                            <div v-if="data.item.tipo_precio_id=='1'">
                                ${{ data.item.precio_normal | numFormat('0,000.00')}}
                            </div>
                            <div v-if="data.item.tipo_precio_id=='2'">
                                CITA PREVIA
                            </div>
                        </div>
                    </template>
                    <template v-slot:descuento_poliza="data">
                        <div v-if="data.item.descuento_poliza!='100'">
                            <div v-if="data.item.tipo_precio_id=='1'">
                                $ {{precio_poliza(data.item.precio_normal,data.item.descuento_poliza) | numFormat('0,000.00')}}
                            </div>
                            <div v-if="data.item.tipo_precio_id=='2'">
                                CITA PREVIA - {{data.item.descuento_poliza}} %
                            </div>
                        </div>
                        <div v-else>
                            <strong>Gratis</strong>
                        </div>
                    </template>
                    <!-- A virtual composite column -->
                </b-table>
                <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage" first-text="<<" prev-text="<" next-text=">" last-text=">>" class="mt-3 mb-5 justify-content-center">
                </b-pagination>
            </b-col>
        </b-row>
        <b-row>
        </b-row>
        <b-row>
            <div>
                <AgregarModificar :datosModificar="form.datosModificar" :id_servicio="form.id_servicio"></AgregarModificar>
                <modalPdfs :url_pdf="url"></modalPdfs>
            </div>
        </b-row>
    </div>
</div>
</template>

<script>
import ListaServicios from '../servicios/ListaServicios'
import AgregarModificar from '../servicios/AgregarModificarServicio'
import modalPdfs from '../pdf'
import {
    modalConfirmar
} from '../../assets/Funciones/Funciones' //funcion de modal de confirm

import axios from 'axios'
import {
    mapGetters
} from 'vuex'
export default {
    components: {
        AgregarModificar,
        modalPdfs,
        ListaServicios
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
                    key: "servicio",
                    label: 'Servicio',
                    class: 'text-center'
                },
                {
                    key: 'precio_normal',
                    label: 'Precio Normal',
                    class: 'text-center'
                },
                {
                    key: 'descuento_poliza',
                    label: 'Precio con Póliza',
                    class: 'text-center'
                },
                {
                    key: 'tipo.tipo',
                    label: 'Tipo',
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
                datosModificar: [],
                id_servicio: 0
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
                let url_api = this.$hostname + 'servicios?page=' + ctx.currentPage + '&per_page=' + ctx.perPage
                if (this.filter) {
                    //si se esta usando el filtro
                    url_api = this.$hostname + 'servicios?page=' + ctx.currentPage + '&per_page=' + ctx.perPage + '&filter=' + this.filter
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
                        this.isBusy = false;
                        this.$store.dispatch('error')
                        return [];
                    })
            }
        },
        refresh_table() {
            this.cargar = true;
            this.$root.$emit('bv::refresh::table', 'table')
        },
        get_datos_modificar(item) {
            this.modificar = true;
            this.$store.dispatch('loading');
            this.form.datosModificar = []
            this.form.id_servicio = 0
            try {
                let datos = axios.get(this.$hostname + 'servicios/' + item.id)
                    .then(resp => {
                        this.form.datosModificar.push(resp.data.data)
                        this.form.id_servicio = item.id
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
            this.modalConfirmar('Eliminar este servicio', 'danger').then(resp => {
                if (resp) {
                    //si la respuesta es SI
                    this.$store.dispatch('loading');
                    try {
                        let datos = axios.delete(this.$hostname + 'servicios/' + item.id)
                            .then(resp => {
                                if (resp.data == item.id) {
                                    //exito
                                    this.$store.dispatch('success')
                                    //se elimino todo bien
                                    this.$toasted.show("El servicio: " + item.servicio + " ha sido dado de baja", {
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
                                    this.$toasted.show("Error al eliminar, por favor reintente.", {
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
                                this.$store.dispatch('error')
                            })
                    } catch (error) {
                        console.log(error)
                    }
                }
            });
        },
        mostrarPdf() {
            this.url = this.$hostname + 'servicios/servicios_reporte'
        },
        //calcula el precio de poliza
        precio_poliza(precio_normal, descuento_poliza) {
            return precio_normal * ((100 - descuento_poliza) / 100);
        }
    },
    computed: {
        // mix the getters into computed with object spread operator
        ...mapGetters([
            'permisos'
        ]),
    },
    created() {
        this.permisos_por_modulo.consultar = this.$permiso(4, 1);
        this.permisos_por_modulo.agregar = this.$permiso(4, 2);
        this.permisos_por_modulo.modificar = this.$permiso(4, 3);
        this.permisos_por_modulo.eliminar = this.$permiso(4, 4);
    },
}
</script>

<style lang="css">

</style>

