<template>
<div>
    <b-card style="border-radius:0;">
        <div slot="header"><i class="fa fa-archive" aria-hidden="true"></i> Control de Pólizas</div>
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
                    <b-button pill class="mr-2" variant="success" v-if="permisos_por_modulo.agregar" @click="urlIr()"><i class="fa fa-usd" aria-hidden="true"></i> Vender</b-button>
                </div>
            </b-col>
        </b-row>
        <b-row>
            <b-col xs="12">
                <b-table id="table" stacked="lg" responsive :fixed="true" hover :foot-clone="true" :busy.sync="isBusy" :items="myProvider" :fields="fields" :current-page="currentPage" :per-page="perPage" striped show-empty :emptyText="texto" responsive primary-key="id" class="mt-5">
                    <template v-slot:table-caption>
                        Total de Resultados: <strong>{{rowsTotal}} </strong> de <strong>{{totalRows}} </strong> Registros.
                    </template>
                    <template v-slot:empty="scope">
                        <p class="text-center">{{ scope.emptyText }}</p>
                    </template>
                    <template v-slot:beneficiarios="data">
                        <p class="text-center">{{ data.item.beneficiarios[0].nombre }}</p>
                    </template>
                    <template v-slot:estado_servicio="data">
                        <div>
                            <b-badge variant="success" v-if="data.item.estado_servicio>='1'">Activo</b-badge>
                            <b-badge variant="danger" v-if="data.item.estado_servicio=='0'">Inactivo</b-badge>
                        </div>
                    </template>
                    <template v-slot:row-details="row">
                        <b-card style="border-radius:0;">
                            <b-row>
                                <b-col xs="12">
                                    <h6 class="text-primary text-center">Ventas de esta póliza</h6>
                                    <table class="table text-center">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col" hidden>Núm. Venta</th>
                                                <th scope="col" hidden>Vendedor</th>
                                                <th scope="col">Tipo Venta</th>
                                                <th scope="col">Fecha</th>
                                                <th scope="col">Vencimiento</th>
                                                <th scope="col">Tipo Póliza</th>
                                                <th scope="col">Total</th>
                                                <th scope="col">Abonado</th>
                                                <th scope="col">restante</th>
                                                <th scope="col">Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(venta,index) in row.item.ventas" v-bind:key="venta.id" v-bind:index="index">
                                                <th scope="row">{{index+1}}</th>
                                                <td hidden>{{venta.id}}</td>
                                                <td hidden>{{venta.name.toLowerCase().charAt(0).toUpperCase() + venta.name.toLowerCase().slice(1)}}</td>
                                                <td>{{venta.tipoVenta}}</td>
                                                <td>{{venta.fecha_venta}}</td>
                                                <td>{{venta.fecha_vencimiento}}</td>
                                                <td>{{venta.tipo}}</td>
                                                <td>$ {{ venta.total | numFormat('0,000.00')}}</td>
                                                <td>$ {{ venta.abonado | numFormat('0,000.00')}}</td>
                                                <td>${{ venta.restante | numFormat('0,000.00')}}</td>
                                                <td>
                                                    <b-button class="mr-2" pill size="sm" variant="secondary" @click="mostrarPoliza(venta.id,venta.polizas_id)">
                                                        <i class="fa fa-file-pdf-o" aria-hidden="true"></i> Pdf
                                                    </b-button>
                                                    <b-button class="mr-2" pill size="sm" variant="primary" v-if="index==0" @click="editar(venta.id)">
                                                        <i class="fa fa-edit" aria-hidden="true"></i> Editar
                                                    </b-button>
                                                    <b-button class="mr-2" pill size="sm" variant="success" @click="pagos(venta.id)">
                                                        <i class="fa fa-dollar" aria-hidden="true"></i> Pagos
                                                    </b-button>
                                                    <b-button pill size="sm" variant="danger" v-if="index==0">
                                                        <i class="fa fa-trash" aria-hidden="true"></i> Cancelar
                                                    </b-button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </b-col>
                            </b-row>
                        </b-card>
                    </template>
                    <template v-slot:acciones="data">
                        <div>
                            <b-button pill size="sm" class="mr-1 mt-1 mb-1" variant="primary" @click="data.toggleDetails">
                                <i class="fa fa-caret-down" aria-hidden="true"></i> Detalles
                            </b-button>
                            <b-button pill size="sm" class="ml-1 mt-1 mb-1" variant="success" @click="renovar(data.item.num_poliza)">
                                <i class="fa fa-dollar" aria-hidden="true"></i> Renovar
                            </b-button>
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
import NuevoRol from './../usuarios/roles/NuevoRol'
import modalPdfs from '../../../src/views/pdf'
import {
    modalConfirmar
} from '../../../src/assets/Funciones/Funciones' //funcion de modal de confirm

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
            cargar: true,
            url: '',
            num_poliza: '',
            venta_id: '',
            //datos compartidos del componente NuevoRol
            selected: null,
            texto: 'No se ha extraido información de la base de datos',
            items: [],
            fields: [{
                    key: "num_poliza",
                    label: 'Póliza',
                    thClass: 'text-primary',
                    class: 'text-center'
                },
                {
                    key: "beneficiarios",
                    label: 'Titular',
                    class: 'text-center'
                },
                {
                    key: 'fecha_afiliacion',
                    label: 'Fecha de afiliación',
                    class: 'text-center'
                },
                {
                    key: 'total_ventas',
                    label: 'Total de ventas',
                    class: 'text-center'
                },
                {
                    key: 'ruta.ruta',
                    label: 'Ruta',
                    class: 'text-center'
                },
                {
                    key: 'estado_servicio',
                    label: 'Estado Actual',
                    class: 'text-center'
                },
                {
                    key: 'acciones',
                    label: 'Desgloce',
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
                let url_api = this.$hostname + 'polizas?page=' + ctx.currentPage + '&per_page=' + ctx.perPage
                //let url_api = this.$hostname + 'roles?page=' + ctx.currentPage + '&per_page=' + ctx.perPage
                if (this.filter) {
                    //si se esta usando el filtro
                    url_api = this.$hostname + 'roles?page=' + ctx.currentPage + '&per_page=' + ctx.perPage + '&filter=' + this.filter
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
            this.cargar = true;
            this.$root.$emit('bv::refresh::table', 'table')
        },
        get_datos_modificar(item) {
            this.modificar = true;
            this.$store.dispatch('loading');
            this.form.itemsPermisos = []
            this.form.rol = ''
            this.form.id_rol = 0
            try {
                let datos = axios.get(this.$hostname + 'roles/' + item.id)
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
                        let datos = axios.delete(this.$hostname + 'roles/' + item.id)
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
        mostrarPoliza(venta_id, poliza_num) {
            this.url = this.$hostname + 'polizas/nota_venta?venta_id=' + venta_id + '&poliza_id=' + poliza_num
        },
        //checa si tiene permisos para ver esa parte del sistema
        urlIr: function () {
            //window.open(this.$hostname_frontend+'polizas/vender', "_blank");
            this.$router.push('/polizas/vender');
        },
        pagos(venta) {
            window.open(this.$hostname_frontend + 'polizas/pagos/' + venta, "_blank");
            //this.$router.push('/polizas/pagos/'+venta);
        },
        editar(venta_id) {
            window.open(this.$hostname_frontend + 'polizas/editar_afiliacion/' + venta_id, "_blank");
            //this.$router.push('/polizas/pagos/'+venta);
        },
        renovar(poliza_id) {
            window.open(this.$hostname_frontend + 'polizas/renovar/' + poliza_id, "_blank");
            //this.$router.push('/polizas/pagos/'+venta);
        }
    },
    computed: {
        // mix the getters into computed with object spread operator
        ...mapGetters([
            'permisos'
        ])
    },
    created() {
        this.permisos_por_modulo.consultar = this.$permiso(5, 1);
        this.permisos_por_modulo.agregar = this.$permiso(5, 2);
        this.permisos_por_modulo.modificar = this.$permiso(5, 3);
        this.permisos_por_modulo.eliminar = this.$permiso(5, 4);
    },
}
</script>

<style lang="css">

</style>
