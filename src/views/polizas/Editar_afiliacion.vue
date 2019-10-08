<template>
<div>
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
                            Detalles de la Póliza
                        </h5>
                        <p class="text-center">
                            El siguiente formulario le permite <strong>Editar</strong> los datos de una póliza.
                        </p>
                    </div>
                    <div class=" pt-2 pl-4 pr-4">
                        <h5 class="nombre-tab pb-4 text-success">Información de la Póliza</h5>
                        <b-row>
                            <b-col xs="12" md="6">
                                <b-form-group label="Núm. Póliza (*):" label-for="txtNumPoliza" label-class="labels">
                                    <b-form-input readonly required maxlength="6" v-model="form.num_poliza" type="text" id="txtNumPoliza"></b-form-input>
                                    <div class="text-danger text-center" v-if="errors.num_poliza">{{errors.num_poliza}}</div>
                                </b-form-group>
                            </b-col>
                            <b-col xs="12" md="6">
                                <b-form-group label="Fecha Afiliación (*):" label-for="txtFecha" label-class="labels">
                                    <datepicker :value="date"  @input="formato_fecha($event)" name="uniquename"  :language="es" format="dd MMMM yyyy">
                                    </datepicker>
                                    {{date}}
                                    {{form.fecha_afiliacion}}
                                    <div class="text-danger text-center" v-if="errors.fecha_afiliacion">{{errors.fecha_afiliacion}}</div>
                                </b-form-group>
                            </b-col>
                            <b-col xs="12" md="6">
                                <b-form-group label="Tipo de Póliza (*):" label-for="cmbTipoPoliza" label-class="labels">
                                    <b-form-select required id="cmbTipoPoliza" v-model="form.tipo_poliza_id">
                                        <!-- This slot appears above the options from 'options' prop -->
                                        <template v-slot:first>
                                            <option value="" disabled>-- Selecione 1 Póliza--</option>
                                        </template>
                                        <!-- These options will appear after the ones from 'options' prop -->
                                        <option v-for="tipo in tipos_poliza" v-bind:key="tipo.id" :value="tipo">{{tipo.tipo}}</option>
                                    </b-form-select>
                                    <div class="text-danger text-center" v-if="errors.tipo_poliza_id">{{errors.tipo_poliza_id}}</div>
                                </b-form-group>
                            </b-col>
                            <b-col xs="12" md="6">
                                <b-form-group label="Ruta de Cobro (*):" label-for="cmbRutas" label-class="labels">
                                    <b-form-select required id="cmbRutas" v-model="form.ruta_id">
                                        <!-- This slot appears above the options from 'options' prop -->
                                        <template v-slot:first>
                                            <option value="" disabled>-- Selecione 1 Ruta--</option>
                                        </template>
                                        <!-- These options will appear after the ones from 'options' prop -->
                                        <option v-for="ruta in rutas_cobro" v-bind:key="ruta.id" :value="ruta">{{ruta.ruta}}</option>
                                    </b-form-select>
                                    <div class="text-danger text-center" v-if="errors.ruta_id">{{errors.ruta_id}}</div>
                                </b-form-group>
                            </b-col>
                            <b-col xs="12" md="12">
                                <b-form-group label="Vendido por (*):" label-for="cmbVendedor" label-class="labels">
                                    <b-form-select required id="cmbVendedor" v-model="form.vendedor_id">
                                        <!-- This slot appears above the options from 'options' prop -->
                                        <template v-slot:first>
                                            <option value="" disabled>-- Selecione 1 Vendedor--</option>
                                        </template>
                                        <!-- These options will appear after the ones from 'options' prop -->
                                        <option v-for="vendedor in vendedores" v-bind:key="vendedor.id" :value="vendedor">{{vendedor.name}}</option>
                                    </b-form-select>
                                    <div class="text-danger text-center" v-if="errors.vendedor_id">{{errors.vendedor_id}}</div>
                                </b-form-group>
                            </b-col>

                            <!--<b-col xs="12" md="6">
                                <b-form-group label="Abono Inicial (*):" label-for="txtAbono" label-class="labels">
                                    <b-form-input required maxlength="4" v-model="form.abono" type="text" id="txtAbono"></b-form-input>
                                    <div class="text-danger text-center" v-if="errors.abono">{{errors.abono}}</div>
                                </b-form-group>
                            </b-col>-->
                        </b-row>

                        <h5 class="nombre-tab pb-4 text-success">Información del Titular</h5>
                        <b-row>
                            <b-col xs="12" md="12">
                                <b-form-group label="Nombre Completo (*):" label-for="txtNombre" label-class="labels">
                                    <b-form-input required id="txtNombre" v-model="form.titular"></b-form-input>
                                    <div class="text-danger text-center" v-if="errors.titular">{{errors.titular}}</div>
                                </b-form-group>
                            </b-col>
                            <b-col xs="12" md="6">
                                <b-form-group label="Colonia (*):" label-for="txtColonia" label-class="labels">
                                    <b-form-input required id="txtColonia" v-model="form.colonia"></b-form-input>
                                    <div class="text-danger text-center" v-if="errors.colonia">{{errors.colonia}}</div>
                                </b-form-group>
                            </b-col>
                            <b-col xs="12" md="6">
                                <b-form-group label="Calle (*):" label-for="txtCalle" label-class="labels">
                                    <b-form-input required id="txtCalle" v-model="form.calle"></b-form-input>
                                    <div class="text-danger text-center" v-if="errors.calle">{{errors.calle}}</div>
                                </b-form-group>
                            </b-col>
                            <b-col xs="12" md="3">
                                <b-form-group label="Numero (*):" label-for="txtNumero" label-class="labels">
                                    <b-form-input required id="txtNumero" v-model="form.numero"></b-form-input>
                                    <div class="text-danger text-center" v-if="errors.numero">{{errors.numero}}</div>
                                </b-form-group>
                            </b-col>
                            <b-col xs="12" md="3">
                                <b-form-group label="C.P:" label-for="txtCp" label-class="labels">
                                    <b-form-input id="txtCp" v-model="form.cp"></b-form-input>
                                    <div class="text-danger text-center" v-if="errors.cp">{{errors.cp}}</div>
                                </b-form-group>
                            </b-col>
                            <b-col xs="12" md="6">
                                <b-form-group label="Comunidad (*):" label-for="txtComunidad" label-class="labels">
                                    <autocomplete initialDisplay="Ignore este dato si no desea modificarlo." required ref="autocomplete" v-model="form.localidad_id" source="http://localhost:8000/rutas/localidad?filter=" results-property="data" :results-display="formattedDisplay" @clear="form.localidad_id='';localidad=''" @nothingSelected="form.localidad_id=''" @selected="addDistributionGroup" placeholder="Buscar Comunidad" name="txtLocalidad">
                                        <template v-slot:noResults>
                                            <strong>Sin </strong>resultados.
                                        </template>
                                    </autocomplete>
                                    <div class="text-danger text-center" v-if="errors.localidad_id">{{errors.localidad_id}}</div>
                                </b-form-group>
                            </b-col>
                            <b-col xs="12" md="3">
                                <b-form-group label="Email:" label-for="txtEmail" label-class="labels">
                                    <b-form-input type="email" id="txtEmail" v-model="form.email"></b-form-input>
                                    <div class="text-danger text-center" v-if="errors.email">{{errors.email}}</div>
                                </b-form-group>
                            </b-col>
                            <b-col xs="12" md="3">
                                <b-form-group label="Teléfono (*):" label-for="txtTelefono" label-class="labels">
                                    <b-form-input required id="txtTelefono" v-model="form.telefono"></b-form-input>
                                    <div class="text-danger text-center" v-if="errors.telefono">{{errors.telefono}}</div>
                                </b-form-group>
                            </b-col>
                            <b-col xs="12" md="3">
                                <b-form-group label="Ocupación:" label-for="txtOcupacion" label-class="labels">
                                    <b-form-input id="txtOcupacion" v-model="form.ocupacion"></b-form-input>
                                    <div class="text-danger text-center" v-if="errors.ocupacion">{{errors.ocupacion}}</div>
                                </b-form-group>
                            </b-col>
                            <b-col xs="12" md="3">
                                <b-form-group label="Edad:" label-for="txtEdad" label-class="labels">
                                    <b-form-input required id="txtEdad" v-model="form.edad"></b-form-input>
                                    <div class="text-danger text-center" v-if="errors.edad">{{errors.edad}}</div>
                                </b-form-group>
                            </b-col>
                        </b-row>
                        <h5 class="nombre-tab pb-4 text-success">Informacion de los Beneficiarios</h5>
                        <table class="table">
                            <caption>Lista de beneficiarios</caption>
                            <thead>
                                <tr>
                                    <th scope="col" width="5%">#</th>
                                    <th scope="col" width="75%">Nombre Completo</th>
                                    <th scope="col" width="20%">Edad</th>
                                </tr>
                            </thead>
                            <tbody v-if="form.tipo_poliza_id.numero_beneficiarios">
                                <tr v-for="index in parseInt(form.tipo_poliza_id.numero_beneficiarios)" v-bind:key="index">
                                    <th scope="row">{{index}}</th>
                                    <td>
                                        <b-form-input required v-model="form.beneficiarios[index-1].nombre"></b-form-input>
                                        <div class="text-danger text-center" v-if="errors.beneficiarios[index-1].nombre">{{errors.beneficiarios[index-1].nombre}}</div>
                                    </td>
                                    <td>
                                        <b-form-input required v-model="form.beneficiarios[index-1].edad"></b-form-input>
                                        <div class="text-danger text-center" v-if="errors.beneficiarios[index-1].edad">{{errors.beneficiarios[index-1].edad}}</div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </b-col>
                <b-col xs="12" lg="3" class="sin-padding">
                    <div class="info-venta pt-4 pl-4 pr-4">
                        <h5 class="nombre-tab pb-4 text-center"> <i class="fa fa-usd" aria-hidden="true"></i> Resumen de Venta </h5>
                        <div class="divider"></div>
                        <div class="mt-4">
                            <b-list-group flush>
                                <b-list-group-item>
                                    <strong>Núm. Póliza:</strong> <span style="float:right;" class="text-primary"> {{form.num_poliza}}</span>
                                </b-list-group-item>
                                <b-list-group-item>
                                    <strong>Póliza:</strong><span style="float:right;" class="text-primary">{{form.tipo_poliza_id.tipo}}</span>
                                </b-list-group-item>
                                <b-list-group-item>
                                    <strong>Ruta de cobro:</strong> <span style="float:right;" class="text-primary"> {{form.ruta_id.ruta}}</span>
                                </b-list-group-item>
                                <b-list-group-item>
                                    <strong>Vendedor:</strong> <span style="float:right;" class="text-primary"> {{form.vendedor_id.name}}</span>
                                </b-list-group-item>
                                <b-list-group-item>
                                    <strong>Costo:</strong> <span style="float:right;" class="text-primary" v-if="form.tipo_poliza_id.precio"> ${{ form.tipo_poliza_id.precio | numFormat('0,000.00')}}</span>
                                </b-list-group-item>
                                <div>
                                    <b-button squared type="submit" variant="primary" class="mt-3 boton-vender">
                                        <i class="fa fa-edit mr-2" aria-hidden="true"></i>
                                        <strong>Actualizar</strong>
                                    </b-button>
                                </div>
                                <div class="mt-5 text-center" v-if="this.num_poliza">
                                    <h4 class="pb-2">Reportes póliza: {{num_poliza}}</h4>
                                    <h6 class="pb-2 text-danger">Última póliza capturada</h6>
                                    <b-button @click="mostrarPoliza" class="mr-4" pill variant="success" size="md">
                                        <i class="fa fa-file-pdf-o" aria-hidden="true"></i> Reporte
                                    </b-button>
                                    <b-button @click="tarjetaCobranza" class="ml-4" pill variant="primary " size="md">
                                        <i class="fa fa-usd" aria-hidden="true"></i> Pagos
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
import {
    mapGetters
} from 'vuex'
import {
    modalConfirmar
} from '../../assets/Funciones/Funciones'
import Datepicker from 'vuejs-datepicker';
import moment from 'moment'
import Vue from 'vue'
import Autocomplete from 'vuejs-auto-complete'
import {
    es
} from 'vuejs-datepicker/dist/locale';
import modalPdfs from '../pdf'
export default {
    components: {
        Datepicker,
        Autocomplete,
        modalPdfs,
    },
    data() {
        return {
            date:'',
            //datos iniciales del autocomplete de localidades
            localidad_inicial: '',
            num_poliza: '',
            venta_id: '',
            url: '',
            //datos para llenar el formulario
           // date: '',
            es: es,
            tipos_poliza: [],
            vendedores: [],
            rutas_cobro: [],
            localidades: [],
            localidad: '',
            LimpiarForm: [],
            //datos que se van a mandar guardar
            form: {
                usuario_registro_id: '',
                num_poliza: '',
                fecha_afiliacion: '',
                //id del tipo de poliza
                tipo_poliza_id: '',
                //id ruta
                ruta_id: '',
                vendedor_id: '',
                abono: '',
                //titular,
                titular: '',
                colonia: '',
                calle: '',
                email: '',
                telefono: '',
                ocupacion: '',
                edad: '',
                numero: '',
                cp: '',
                localidad_id: '',
                //beneficiarios
                beneficiarios: [{
                        num: 1,
                        nombre: '',
                        edad: ''
                    },
                    {
                        num: 2,
                        nombre: '',
                        edad: ''
                    },
                    {
                        num: 3,
                        nombre: '',
                        edad: ''
                    },
                    {
                        num: 4,
                        nombre: '',
                        edad: ''
                    }
                ]
            },
            errors: {
                usuario_registro_id: '',
                num_poliza: '',
                fecha_afiliacion: '',
                //id del tipo de poliza
                tipo_poliza_id: '',
                //id ruta
                ruta_id: '',
                vendedor_id: '',
                abono: '',
                //titular,
                titular: '',
                colonia: '',
                calle: '',
                email: '',
                telefono: '',
                ocupacion: '',
                edad: '',
                numero: '',
                cp: '',
                localidad_id: '',
                //beneficiarios
                beneficiarios: [{
                        nombre: '',
                        edad: ''
                    },
                    {
                        nombre: '',
                        edad: ''
                    },
                    {
                        nombre: '',
                        edad: ''
                    },
                    {
                        nombre: '',
                        edad: ''
                    }
                ]
            }
        }
    },
    methods: {
        modalConfirmar,
        formato_fecha(event) {
            this.form.fecha_afiliacion = moment(event).format('YYYY-MM-DD');
        },
        getTiposPoliza() {
            //traigo los tipos de poliza
            axios.get(this.$hostname + 'tipos_polizas')
                .then(resp => {
                    this.tipos_poliza = resp.data.data
                })
                .catch(error => {
                    console.log(error)
                })
        },
        getRutasCobros() {
            //traigo las rutas de cobro disponibles
            axios.get(this.$hostname + 'rutas/get_rutas_disponibles')
                .then(resp => {
                    this.rutas_cobro = resp.data.data
                })
                .catch(error => {
                    console.log(error)
                })
        },
        getVendedores() {
            //traigo los usuarios que pueden vender
            axios.get(this.$hostname + 'usuarios/vendedores')
                .then(resp => {
                    this.vendedores = resp.data.data
                })
                .catch(error => {
                    console.log(error)
                })
        },
        getVentaDatos() {
            //traigo los usuarios que pueden vender
            axios.get(this.$hostname + 'ventas/' + this.$route.params.venta_id)
                .then(resp => {
                    this.form.num_poliza = resp.data.polizas_id
                    this.date= new Date(2019,10,12)
                    //this.form.fecha_afiliacion=resp.data['poliza_origen'].fecha_afiliacion
                    //console.log(this.form.tipo_poliza_id)
                    this.form.tipo_poliza_id = resp.data['tipo_poliza']
                    //id ruta
                    let ruta_opcion = {
                        "id": resp.data['poliza_origen'].id,
                        "ruta":resp.data['poliza_origen'].ruta,
                        "descripcion": resp.data['poliza_origen'].descripcion,
                        "cobrador_id": resp.data['poliza_origen'].cobrador_id,
                        "status": resp.data['poliza_origen'].status,
                    };
                    this.form.ruta_id = ruta_opcion
                    this.form.vendedor_id = resp.data['vendedor']
                    //titular y beneficiarios
                    this.form.titular = resp.data['beneficiarios'][0].nombre;
                    this.form.colonia = resp.data['beneficiarios'][0].colonia;
                    this.form.calle = resp.data['beneficiarios'][0].calle;
                    this.form.email = resp.data['beneficiarios'][0].email;
                    this.form.telefono = resp.data['beneficiarios'][0].telefono;
                    this.form.ocupacion = resp.data['beneficiarios'][0].ocupacion;
                    this.form.edad = resp.data['beneficiarios'][0].edad;
                    this.form.numero = resp.data['beneficiarios'][0].numero;
                    this.form.cp = resp.data['beneficiarios'][0].cp;
                    this.form.localidad_id = resp.data['beneficiarios'][0].localidad_id;
                    this.localidad_inicial = resp.data['beneficiarios'][0].localidad;

                    for (let index = 0; index < resp.data.num_beneficiarios; index++) {
                        this.form.beneficiarios[index].nombre = resp.data['beneficiarios'][index].nombre;
                        this.form.beneficiarios[index].edad = resp.data['beneficiarios'][index].edad;
                    }

                    //this.form.ruta_id=resp.data['poliza_origen'].rutas_id
                    //this.form.vendedor_id= resp.resp.data['vendedor'].id
                })
                .catch(error => {
                    console.log(error)
                })
        },
        formattedDisplay(result) {
            return result.municipio.nombre + ' [' + result.nombre + ']'
        },
        addDistributionGroup(group) {
            this.localidad = group.display
        },
        onSubmit(evt) {
            evt.preventDefault()
            this.modalConfirmar('Guardar venta de póliza', 'success').then(resp => {
                if (resp) {
                    this.reset_errores();
                    try {
                        this.$store.dispatch('loading');
                        //aqui va el codigo para guardar un nuevo rol
                        axios.post(this.$hostname + 'polizas', this.form)
                            .then(resp => {
                                this.num_poliza = this.form.num_poliza
                                this.venta_id = resp.data
                                this.mostrarPoliza()
                                this.limpiar_formulario();
                                this.$store.dispatch('success')
                                this.$toasted.show("La póliza se guardo correctamente", {
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
                                    if (error.response.data.error['num_poliza']) {
                                        this.errors.num_poliza = error.response.data.error['num_poliza'][0]
                                    }
                                    if (error.response.data.error['fecha_afiliacion']) {
                                        this.errors.fecha_afiliacion = error.response.data.error['fecha_afiliacion'][0]
                                    }
                                    if (error.response.data.error['tipo_poliza_id']) {
                                        this.errors.tipo_poliza_id = error.response.data.error['tipo_poliza_id'][0]
                                    }
                                    if (error.response.data.error['ruta_id']) {
                                        this.errors.ruta_id = error.response.data.error['ruta_id'][0]
                                    }
                                    if (error.response.data.error['vendedor_id']) {
                                        this.errors.vendedor_id = error.response.data.error['vendedor_id'][0]
                                    }
                                    if (error.response.data.error['titular']) {
                                        this.errors.titular = error.response.data.error['titular'][0]
                                    }
                                    if (error.response.data.error['abono']) {
                                        this.errors.abono = error.response.data.error['abono'][0]
                                    }
                                    if (error.response.data.error['colonia']) {
                                        this.errors.colonia = error.response.data.error['colonia'][0]
                                    }
                                    if (error.response.data.error['calle']) {
                                        this.errors.calle = error.response.data.error['calle'][0]
                                    }
                                    if (error.response.data.error['email']) {
                                        this.errors.email = error.response.data.error['email'][0]
                                    }
                                    if (error.response.data.error['telefono']) {
                                        this.errors.telefono = error.response.data.error['telefono'][0]
                                    }
                                    if (error.response.data.error['edad']) {
                                        this.errors.edad = error.response.data.error['edad'][0]
                                    }
                                    if (error.response.data.error['numero']) {
                                        this.errors.numero = error.response.data.error['numero'][0]
                                    }
                                    if (error.response.data.error['cp']) {
                                        this.errors.cp = error.response.data.error['cp'][0]
                                    }
                                    if (error.response.data.error['localidad_id']) {
                                        this.errors.localidad_id = error.response.data.error['localidad_id'][0]
                                    }
                                    for (let index = 0; index < 4; index++) {
                                        if (error.response.data.error['beneficiarios.' + index + '.nombre']) {
                                            this.errors.beneficiarios[index].nombre = error.response.data.error['beneficiarios.' + index + '.nombre'][0]
                                        }
                                        if (error.response.data.error['beneficiarios.' + index + '.edad']) {
                                            this.errors.beneficiarios[index].edad = error.response.data.error['beneficiarios.' + index + '.edad'][0]
                                        }
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
        reset_errores() {
            this.errors.num_poliza = ''
            this.errors.fecha_afiliacion = ''
            this.errors.tipo_poliza_id = ''
            this.errors.ruta_id = ''
            this.errors.vendedor_id = ''
            this.errors.abono = ''
            this.errors.titular = ''
            this.errors.edad = ''
            this.errors.colonia = ''
            this.errors.calle = ''
            this.errors.numero = ''
            this.errors.telefono = ''
            this.errors.localidad_id = ''
            this.errors.email = ''
            for (let index = 0; index < 4; index++) {
                this.errors.beneficiarios[index].nombre = ''
                this.errors.beneficiarios[index].edad = ''
            }
        },
        limpiar_formulario() {
            this.form.num_poliza = ''
            this.form.tipo_poliza_id = ''
            this.form.ruta_id = ''
            this.form.vendedor_id = ''
            this.form.abono = ''
            this.form.titular = ''
            this.form.colonia = ''
            this.form.calle = ''
            this.form.numero = ''
            this.form.edad = ''
            this.form.cp = ''
            this.form.email = ''
            this.form.telefono = ''
            this.form.ocupacion = ''
            this.form.email = ''
            this.reset_errores();
            for (let index = 0; index < 4; index++) {
                this.form.beneficiarios[index].nombre = ''
                this.form.beneficiarios[index].edad = ''
            }
        },
        mostrarPoliza() {
            this.url = this.$hostname + 'polizas/nota_venta?venta_id=' + this.venta_id + '&poliza_id=' + this.num_poliza
        },
        tarjetaCobranza() {
            this.url = this.$hostname + 'polizas/tarjeta_cobranza?venta_id=' + this.venta_id + '&poliza_id=' + this.num_poliza
        },
    },
    created() {
        this.form.usuario_registro_id = this.user.id
        this.$store.dispatch('success')
        this.getTiposPoliza()
        this.getRutasCobros()
        this.getVendedores()
        this.getVentaDatos()
    },
    computed: {
        restante: function () {
            return this.form.tipo_poliza_id.precio - this.form.abono;
        },
        ...mapGetters([
            'user'
        ]),
    }
}
</script>

<style>
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
