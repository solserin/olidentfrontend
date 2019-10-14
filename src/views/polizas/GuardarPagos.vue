<template>
<div>
    <b-modal @hidden="limpiar_buscador" @close="limpiar_buscador" id="modalBuscador" size="lg" title="Buscar Póliza" no-close-on-backdrop hide-footer>
        <b-col md="12">
            <b-row>
                <b-col xs="12" sm="3" md="3">
                    <b-form-group label="Núm. Póliza (*):" label-for="txtNumBuscador" label-class="labels">
                        <b-form-input v-on:keyup.enter="getVentaDatos(buscador.num_poliza)" maxlength="6" v-model="buscador.num_poliza" type="text" id="txtNumBuscador"></b-form-input>
                        <div class="text-danger text-center" v-if="errors.num_poliza">{{errors.num_poliza}}</div>
                    </b-form-group>
                </b-col>
                <b-col xs="12" md="9">
                    <b-form-group label="Titular" label-for="txtComunidad" label-class="labels">
                        <autocomplete ref="autocomplete" v-model="buscador.num_poliza" :source="this.$hostname+'polizas/beneficiario?filter='" results-property="data" :results-display="formattedDisplayBeneficiario" results-value="polizas_id" @clear="buscador.num_poliza='';buscador.titular=''" @nothingSelected="buscador.num_poliza=''" @selected="addDistributionGroupBeneficiario" placeholder="Buscar Titular" name="txtTitularBuscar">
                            <template v-slot:noResults>
                                <strong>Sin </strong>resultados.
                            </template>
                        </autocomplete>
                        <div class="text-danger text-center" v-if="errors.localidad_id">{{errors.localidad_id}}</div>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col xs="12" class="text-center" v-if="buscador.num_poliza">
                    <b-button  class="mt-4 mb-4" squared variant="primary" @click="getVentaDatos(buscador.num_poliza)"><i class="fa fa-search" aria-hidden="true"></i> Cargar Datos</b-button>
                </b-col>
            </b-row>
        </b-col>
    </b-modal>
    <!--<b-card style="border-radius:0;">
        <div slot="header"><i class="fa fa-folder-open-o" aria-hidden="true"></i> Formulario de Venta</div>
    </b-card>-->
    <b-form @submit="onSubmit">
        <b-card style="border-radius:0; " class="quitar-padding">
            <b-row style="margin:0px !important;">
                <b-col xs="12" lg="9" class="sin-padding">
                    <div class="text-danger text-center" v-if="errors.usuario_registro_id">{{errors.usuario_registro_id}}</div>
                    <div class=" pl-4">
                        <h5 class=" mt-4 text-primary text-center"><i class="fa fa-cart-plus" aria-hidden="true"></i>
                            Detalles del abono a póliza</h5>
                        <p class="text-center">
                            El siguiente formulario le permite capturar <strong>abonos</strong> a cuenta de una póliza.
                        </p>
                    </div>
                    <div class=" pt-2 pl-4 pr-4">
                        <h5 class="nombre-tab pb-4 text-success" v-if="pagos.length">
                            <div v-if="pagos[0]['restante']>0">Información del pago</div>
                        </h5>
                        <b-row v-if="pagos.length">
                            <b-col xs="12" md="4" v-if="pagos[0]['restante']>0">
                                <b-form-group label="Fecha de pago (*):" label-for="txtFecha" label-class="labels">
                                    <date-picker readonly="readonly" v-model="form.fecha_abono" :config="options"></date-picker>
                                    <div class="text-danger text-center" v-if="errors.fecha_abono">{{errors.fecha_abono}}</div>
                                </b-form-group>
                            </b-col>
                            <b-col xs="12" md="4" v-if="pagos[0]['restante']>0">
                                <b-form-group label="Cobrado por (*):" label-for="cmbCobrador" label-class="labels">
                                    <b-form-select required id="cmbCobrador" v-model="form.cobrador_id">
                                        <!-- This slot appears above the options from 'options' prop -->
                                        <template v-slot:first>
                                            <option value="" disabled>-- Selecione 1 Cobrador--</option>
                                        </template>
                                        <!-- These options will appear after the ones from 'options' prop -->
                                        <option v-for="cobrador in cobradores" v-bind:key="cobrador.id" :value="cobrador">{{cobrador.name}}</option>
                                    </b-form-select>
                                    <div class="text-danger text-center" v-if="errors.vendedor_id">{{errors.vendedor_id}}</div>
                                </b-form-group>
                            </b-col>
                            <b-col xs="12" md="4" v-if="pagos[0]['restante']>0">
                                <b-form-group label="Abono (*):" label-for="txtAbono" label-class="labels">
                                    <b-form-input required maxlength="4" v-model="form.abono" type="text" id="txtAbono"></b-form-input>
                                    <div class="text-danger text-center" v-if="errors.abono">{{errors.abono}}</div>
                                </b-form-group>
                            </b-col>
                        </b-row>
                        <h5 class="nombre-tab pb-4 text-success">Abonos registrados
                            <b-button v-b-modal.modalBuscador squared size="sm" variant="secondary" style="background-color: #6c757d; float:right; color:#fff; font-size:18px;">
                                <img src="../../assets/images/consultar.png" style=" max-width: 35px !important;"> Buscar Póliza
                            </b-button>
                        </h5>
                        <div class="table-responsive mt-5" v-if="pagos.length">
                            <table class="table text-center" width="100%">
                                <caption>Lista de abonos</caption>
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Ref. Pago</th>
                                        <th scope="col">Fecha</th>
                                        <th scope="col">Cobrado por:</th>
                                        <th scope="col">Saldo anterior ($)</th>
                                        <th scope="col">Abono ($)</th>
                                        <th scope="col">Saldo restante ($)</th>
                                        <th scope="col">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr :class="[abono.status?'':'eliminado']" v-for="(abono, index) in pagos[0].abonos" v-bind:key="abono.id" v-bind:index="index">
                                        <th width="5%">{{index+1}}</th>
                                        <td>{{abono.id}}</td>
                                        <td>{{abono.fecha_abono}}</td>
                                        <td>{{abono.name.toLowerCase().charAt(0).toUpperCase() + abono.name.toLowerCase().slice(1)}}</td>
                                        <td>$ {{ saldo_anterior(index) | numFormat('0,000.00')}}</td>
                                        <td>$ {{ abono.cantidad | numFormat('0,000.00')}}</td>
                                        <td>$ {{ (saldo_anterior(index)-abono.cantidad) | numFormat('0,000.00')}}</td>
                                        <td>
                                            <b-button hidden class="mr-2" pill size="sm" variant="secondary">
                                                <i class="fa fa-file-pdf-o" aria-hidden="true"></i>
                                            </b-button>
                                            <b-button  class="mr-2" pill size="sm" variant="danger" @click="cancelar_pago(abono.id)" v-if=" permisos_por_modulo.eliminar && abono.status==1">
                                                <i class="fa fa-close" aria-hidden="true"></i>
                                            </b-button>
                                        </td>
                                    </tr>
                                    <tr v-if="pagos.length">
                                        <th width="5%"></th>
                                        <td></td>
                                        <td></td>
                                        <td><strong>Total:</strong></td>
                                        <td><strong>$ {{ pagos[0].total | numFormat('0,000.00')}}</strong></td>
                                        <td><strong>$ {{ (saldo_abonado(pagos[0].abonos.length)) | numFormat('0,000.00')}}</strong></td>
                                        <td><strong>$ {{ pagos[0].total - saldo_abonado(pagos[0].abonos.length)| numFormat('0,000.00')}}</strong></td>
                                        <td>
                                            <b-button v-if="permisos_por_modulo.consultar" @click="mostrarTarjeta" squared type="button" variant="primary" class="boton-vender">
                                                <i class="fa fa-list-alt" aria-hidden="true"></i>
                                                <strong> Tarjeta de cobro</strong>
                                            </b-button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </b-col>
                <b-col xs="12" lg="3" class="sin-padding">
                    <div class="info-venta pt-4 pl-4 pr-4">
                        <h5 class="nombre-tab pb-4 text-center"> <i class="fa fa-usd" aria-hidden="true"></i> Resumen de Pago </h5>
                        <div class="divider"></div>
                        <div class="mt-4">
                            <b-list-group flush>
                                <b-list-group-item>
                                    <strong>Núm. Póliza:</strong> <span style="float:right;" class="text-primary" v-if="pagos.length"> {{pagos[0].polizas_id}}</span>
                                </b-list-group-item>
                                <b-list-group-item>
                                    <strong>Póliza:</strong><span style="float:right;" class="text-primary" v-if="pagos.length">{{pagos[0]['tipo_poliza']['tipo']}}</span>
                                </b-list-group-item>
                                <b-list-group-item>
                                    <strong>Ruta de cobro:</strong> <span style="float:right;" class="text-primary" v-if="pagos.length"> {{pagos[0]['poliza_origen']['ruta']}}</span>
                                </b-list-group-item>
                                <b-list-group-item>
                                    <strong>Vendedor:</strong> <span style="float:right;" class="text-primary" v-if="pagos.length"> {{pagos[0]['vendedor']['name'].toLowerCase().charAt(0).toUpperCase() + pagos[0]['vendedor']['name'].toLowerCase().slice(1)}}</span>
                                </b-list-group-item>
                                <b-list-group-item v-if="pagos.length">
                                    <div v-if="pagos[0]['restante']>0">
                                        <strong>Cobrador:</strong> <span style="float:right;" class="text-primary" v-if="form.cobrador_id"> {{form.cobrador_id['name'].toLowerCase().charAt(0).toUpperCase() + form.cobrador_id['name'].toLowerCase().slice(1)}}</span>
                                    </div>

                                </b-list-group-item>
                                <b-list-group-item>
                                    <strong>Saldo restante:</strong> <span style="float:right;" class="text-success" v-if="pagos.length">
                                        <div v-if="pagos[0]['restante']==0">
                                            <h6>Pagado</h6>
                                        </div>
                                        <div v-else-if="pagos[0]['restante']<0">
                                            <h6>Saldo sobrante: $ {{ pagos[0]['restante'] | numFormat('0,000.00')}} </h6>
                                        </div>
                                        <div v-else>
                                            $ {{ pagos[0]['restante'] | numFormat('0,000.00')}}
                                        </div>
                                    </span>
                                </b-list-group-item>
                                <div v-if="pagos.length">
                                    <b-button v-if="permisos_por_modulo.agregar && pagos[0]['restante']>0" squared type="submit" variant="success" class="mt-3 boton-vender">
                                        <i class="fa fa-database mr-2" aria-hidden="true"></i>
                                        <strong>Pagar</strong>
                                    </b-button>
                                </div>
                            </b-list-group>
                        </div>
                    </div>
                </b-col>
            </b-row>
        </b-card>
    </b-form>
    <modalPdfs :url_pdf="url"></modalPdfs>
</div>
</template>

<script>
import axios from 'axios'
import Autocomplete from 'vuejs-auto-complete'
import {
    mapGetters
} from 'vuex'
import {
    modalConfirmar
} from '../../assets/Funciones/Funciones'
import moment from 'moment'

import modalPdfs from '../pdf'
export default {
    components: {
        Autocomplete,
        modalPdfs,
    },
    data() {
        return {
             permisos_por_modulo: {
                agregar: false,
                consultar: false,
                modificar: false,
                eliminar: false
            },
            buscador: {
                num_poliza: '',
                titular: '',
                titulares: [],
            },
            abonado: 0,
            url: '',
            //datos para llenar el formulario
            options: {
                format: 'YYYY-MM-DD',
                locale: 'es',
                useCurrent: true,
                showClear: true,
                showClose: true,
                ignoreReadonly: true
            },
            abono_id: '',
            cobradores: [],
            LimpiarForm: [],
            //pagos actuales
            pagos: [],
            //datos que se van a mandar guardar
            form: {
                venta_id: '',
                usuario_registro_id: '',
                fecha_abono: '',
                cobrador_id: '',
                abono: '',
            },
            errors: {
                venta_id: '',
                usuario_registro_id: '',
                fecha_abono: '',
                cobrador_id: '',
                abono: '',
            }
        }
    },
    methods: {
        modalConfirmar,
        formato_fecha(event) {
            this.form.fecha_abono = moment(event).format('YYYY-MM-DD');
        },
        getVendedores() {
            //traigo los usuarios que pueden vender
            axios.get(this.$hostname + 'usuarios/vendedores')
                .then(resp => {
                    this.cobradores = resp.data.data
                })
                .catch(error => {
                    console.log(error)
                })
        },
        getAbonos() {
            this.$store.dispatch('loading')
            //traigo los usuarios que pueden vender
            axios.get(this.$hostname + 'ventas/estado_cuenta/' + this.form.venta_id)
                .then(resp => {
                    if (resp.data) {
                        if (resp.data.data[0].status == 1) {
                            this.pagos = resp.data.data
                            this.total = resp.data.data[0].total
                        } else {
                            //no se pueden hacer abonos porque esta cancelada
                            this.$toasted.show("Esta póliza ya fue cancelada, no se puede seguir agregando pagos.", {
                                iconPack: 'fontawesome',
                                type: 'error',
                                theme: 'toasted-primary',
                                icon: 'close',
                                duration: 6000,
                                position: 'top-right',
                                closeOnSwipe: true,
                                keepOnHover: true
                            });
                        }
                    } else {
                        this.pagos = []
                        this.total = 0
                    }
                    this.$bvModal.hide('modalBuscador');
                    this.$store.dispatch('success')
                })
                .catch(error => {
                    this.$store.dispatch('error')
                    console.log(error)
                })
        },
        onSubmit(evt) {
            evt.preventDefault()
            this.modalConfirmar('Guardar abono', 'success').then(resp => {
                if (resp) {
                    //this.reset_errores();
                    try {
                        this.$store.dispatch('loading');
                        //aqui va el codigo para guardar un nuevo rol
                        axios.post(this.$hostname + 'ventas', this.form)
                            .then(resp => {
                                //this.num_poliza = this.form.num_poliza
                                this.abono_id = resp.data
                                //this.mostrarPoliza()
                                this.limpiar_formulario();
                                this.getAbonos();
                                this.$store.dispatch('success')
                                this.$toasted.show("El pago se guardó correctamente", {
                                    iconPack: 'fontawesome',
                                    type: 'success',
                                    theme: 'toasted-primary',
                                    icon: 'check',
                                    duration: 6000,
                                    position: 'top-right',
                                    closeOnSwipe: true,
                                    keepOnHover: true
                                });
                            })
                            .catch(error => {
                                if (error.response.data['code'] == 422) {
                                    //error de validacion de datos
                                    if (error.response.data.error['usuario_registro_id']) {
                                        this.errors.usuario_registro_id = error.response.data.error['usuario_registro_id'][0]
                                    }
                                    if (error.response.data.error['cobrador_id']) {
                                        this.errors.cobrador_id = error.response.data.error['cobrador_id'][0]
                                    }
                                    if (error.response.data.error['abono']) {
                                        this.errors.abono = error.response.data.error['abono'][0]
                                    }
                                    if (error.response.data.error['fecha_abono']) {
                                        this.errors.fecha_abono = error.response.data.error['fecha_abono'][0]
                                    }
                                }
                                this.$store.dispatch('error')
                            })
                    } catch (error) {
                        this.$store.dispatch('error')
                    }
                }
            })
        },
        cancelar_pago(pago_id) {
            this.modalConfirmar('Cancelar este pago', 'danger').then(resp => {
                if (resp) {
                    this.$store.dispatch('loading')
                    try {
                        this.reset_errores()
                        //aqui va el codigo de modificar los datos
                        axios.put(this.$hostname + 'ventas/cancelar_pago/' + pago_id, {
                                'pago_id': pago_id
                            })
                            .then(resp => {
                                this.getAbonos();
                                this.$store.dispatch('success')
                                this.$toasted.show("El pago se canceló correctamente", {
                                    iconPack: 'fontawesome',
                                    type: 'success',
                                    theme: 'toasted-primary',
                                    icon: 'check',
                                    duration: 4000,
                                    position: 'top-center',
                                    closeOnSwipe: true,
                                    keepOnHover: true
                                });
                            })
                            .catch(error => {
                                if (error.response.data['code'] == 422) {
                                    this.$store.dispatch('error')
                                    this.$toasted.show("Error al eliminar, por favor reintente.", {
                                        iconPack: 'fontawesome',
                                        type: 'error',
                                        theme: 'toasted-primary',
                                        icon: 'close',
                                        duration: 4000,
                                        position: 'top-center',
                                        closeOnSwipe: true,
                                        keepOnHover: true
                                    });
                                }
                                this.$store.dispatch('error')
                            })
                    } catch (error) {
                        this.$store.dispatch('error')
                    }
                }
            })
        },
        getVentaDatos(num_poliza) {
            //traigo los usuarios que pueden vender
            this.$store.dispatch('loading')
            axios.get(this.$hostname + 'ventas/' + num_poliza)
                .then(resp => {
                    if (resp.data) {
                        if (resp.data.status == 0) {
                            this.$bvModal.hide('modalBuscador');
                            this.$toasted.show("Esta póliza ya fue cancelada, no se puede seguir agregando pagos.", {
                                iconPack: 'fontawesome',
                                type: 'error',
                                theme: 'toasted-primary',
                                icon: 'close',
                                duration: 6000,
                                position: 'top-right',
                                closeOnSwipe: true,
                                keepOnHover: true
                            });
                            this.$store.dispatch('success')
                            return 0;
                        }
                        this.form.venta_id = resp.data.id
                        this.getAbonos();
                        this.$bvModal.hide('modalBuscador');
                    } else {
                        this.$bvModal.hide('modalBuscador');
                        this.buscador.num_poliza = ''
                        this.$toasted.show("No se encontró esta póliza, reintente con otro número.", {
                            iconPack: 'fontawesome',
                            type: 'error',
                            theme: 'toasted-primary',
                            icon: 'close',
                            duration: 4000,
                            position: 'top-center',
                            closeOnSwipe: true,
                            keepOnHover: true
                        });
                    }
                    this.$store.dispatch('success')
                })
                .catch(error => {
                    console.log(error)
                    this.$store.dispatch('error')
                })
        },
        formattedDisplayBeneficiario(result) {
            return 'Núm. Póliza ( ' + result.polizas_id + ' ) [Titular: ' + result.nombre + ' Calle ' + result.calle + ', #' + result.numero + ', Col. ' + result.colonia + ']'
        },
        addDistributionGroupBeneficiario(group) {
            this.buscador.titular = group.display
        },
        limpiar_buscador() {
            this.buscador.num_poliza = ''
        },
        reset_errores() {
            this.errors.venta_id = ''
            this.errors.usuario_registro_id = ''
            this.errors.fecha_abono = ''
            this.errors.cobrador_id = ''
            this.errors.abono = ''
        },
        limpiar_formulario() {
            this.reset_errores();
            this.form.abono = ''
            this.form.fecha_abono = ''
            this.form.cobrador_id = ''
        },
        //calcula restante
        saldo_abonado(index) {
            let sum = 0;
            for (let x = 0; x < index; x++) {
                if (this.pagos[0].abonos[x].status == 1)
                    sum += this.pagos[0].abonos[x].cantidad;
            }
            return sum;
        },
        saldo_anterior(index) {
            let sum = 0;
            for (let x = 0; x < index; x++) {
                if (this.pagos[0].abonos[x].status == 1)
                    sum += this.pagos[0].abonos[x].cantidad;
            }
            return this.pagos[0].total - sum;
        },
        mostrarTarjeta() {
            this.url = this.$hostname + 'polizas/tarjeta_cobranza?venta_id=' + this.form.venta_id
        },
    },
    created() {
        this.form.usuario_registro_id = this.user.id
        if (!isNaN(this.$route.params.id)) {
            this.form.venta_id = this.$route.params.id;
            this.getAbonos();
        }
        this.getVendedores()

         this.permisos_por_modulo.consultar = this.$permiso(8, 1);
        this.permisos_por_modulo.agregar = this.$permiso(8, 2);
        this.permisos_por_modulo.modificar = this.$permiso(8, 3);
        this.permisos_por_modulo.eliminar = this.$permiso(8, 4);
    },
    computed: {
        ...mapGetters([
            'user'
        ]),
    }
}
</script>

<style>
.eliminado {
    text-decoration: line-through;
    color: red;
}

.divider {
    border-bottom: 1px solid #5c6873;
}

.info-venta {
    background-color: #f8fafb !important;
    padding-bottom: 100px;
}

.quitar-padding .card-body {
    padding: 0px !important;
}

.sin-padding {
    padding: 0px !important;
}

.card {
    border: none;
}

.nav-tabs .nav-link {
    color: #5c6873;
    font-weight: 600;
    text-transform: uppercase;
    padding: 10px 0px 20px 0px;
}

.nav-tabs .nav-link.active,
.nav-tabs .nav-link:hover {
    border: none;
    font-weight: 600;
    border-bottom: 2px solid #5c6873;
}

.tab-content .tab-pane {
    padding: 1rem 0rem 1rem 0rem;
}

.tab-content {
    border: none;
}

.nombre-tab {
    font-size: 16px;
}

.form-group {
    color: #505558;
    font-size: 13px !important;
}

.link-back,
.link-back:hover {
    color: #505558;
    text-decoration: none;
}

.bg-continuar,
.bg-continuar:hover {
    padding: 8px 30px 8px 30px;
    border: none;
    background-color: #0077e2;
    color: #fff;
    font-weight: bold;
}

.autocomplete {
    border-radius: 0px !important;

}

.autocomplete img {
    vertical-align: top;
}

.autocomplete__box {
    border-radius: 0px !important;
    border: 1px solid #e4e7ea;
}

.boton-vender {
    min-width: 100%;
}
</style>
