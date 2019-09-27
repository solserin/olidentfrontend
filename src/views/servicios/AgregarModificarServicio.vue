<template>
<div>
    <b-modal @hidden="limpiar_formulario" @close="limpiar_formulario" id="modalNuevo" size="lg" :title="$parent.modificar ? 'Modificar Servicio':'Nuevo Servicio'" no-close-on-backdrop hide-footer>
        <b-form @submit="onSubmit" @reset="onReset">
            <b-col md="12">
                <b-form-group label-cols-lg="3" label="Servicio:" label-for="txtServicio" label-class="labels" description="Indique el nombre del servicio.">
                    <b-form-input required id="txtServicio" v-model="form.servicio"></b-form-input>
                    <div class="text-danger text-center" v-if="errors.servicio">{{errors.servicio}}</div>
                </b-form-group>
            </b-col>
            <b-col md="12">
                <b-form-group label-cols-lg="3" label="Descripción:" label-for="txtDescripcion" label-class="labels" description="Ingrese una descripción para este servicio.">
                    <b-form-input id="txtDescripcion" v-model="form.descripcion" type="text"></b-form-input>
                    <div class="text-danger text-center" v-if="errors.descripcion">{{errors.descripcion}}</div>
                </b-form-group>
            </b-col>

            <b-col md="12">
                <b-form-group label-cols-lg="3" label="Tipo de precio:" label-for="cmbTipoPrecio" label-class="labels" description="Seleccione como se aplica el precio del servicio.">
                    <b-form-select v-model="form.tipo_precio_id" id="cmbTipoPrecio">
                        <!-- This slot appears above the options from 'options' prop -->
                        <template v-slot:first>
                            <option :value="null" disabled>-- Seleccione 1 tipo de Precio--</option>
                        </template>
                        <!-- These options will appear after the ones from 'options' prop -->
                        <option v-for="tipo in tipo_precios" v-bind:key="tipo.id" :value="tipo.id">{{tipo.tipo}}</option>
                    </b-form-select>
                    <div class="text-danger text-center" v-if="errors.tipo_precio_id">{{errors.tipo_precio_id}}</div>
                </b-form-group>
            </b-col>

            <b-col md="12">
                <b-form-group label-cols-lg="3" label="Precio Normal:" label-for="txtPrecio" label-class="labels" description="Ingrese el precio del servicio al público.">
                    <b-form-input required id="txtPrecio" v-model="form.precio_normal" type="text"></b-form-input>
                    <div class="text-danger text-center" v-if="errors.precio_normal">{{errors.precio_normal}}</div>
                </b-form-group>
            </b-col>

            <b-col md="12">
                <b-form-group label-cols-lg="3" label="Descuento con póliza:" label-for="cmbDescuento" label-class="labels" description="Indique el porcentaje de descuento con póliza.">
                    <b-form-select v-model="form.descuento_poliza" id="cmbDescuento">
                        <!-- This slot appears above the options from 'options' prop -->
                        <template v-slot:first>
                            <option :value="null" disabled>-- Selecciona el descuento si aplica--</option>
                        </template>
                        <!-- These options will appear after the ones from 'options' prop -->
                        <option value="0">No aplica</option>
                        <option value="25">25 %</option>
                        <option value="35">35 %</option>
                        <option value="50">50 %</option>
                        <option value="75">75 %</option>
                        <option value="100">Gratis</option>
                    </b-form-select>
                    <div class="text-danger text-center" v-if="errors.rol">{{errors.rol}}</div>
                </b-form-group>
            </b-col>
            <b-col md="12">
                <b-form-group label-cols-lg="3" label="Tipo de servicio:" label-for="cmbTipo" label-class="labels" description="Seleccione una categoría para el servicio.">
                    <b-form-select v-model="form.tipo_id" id="cmbTipo">
                        <!-- This slot appears above the options from 'options' prop -->
                        <template v-slot:first>
                            <option :value="null" disabled>-- Selecione 1 Estado--</option>
                        </template>
                        <!-- These options will appear after the ones from 'options' prop -->
                        <option v-for="tipo in tipo_servicios" v-bind:key="tipo.id" :value="tipo.id">{{tipo.tipo}}</option>

                    </b-form-select>
                    <div class="text-danger text-center" v-if="errors.rol_id">{{errors.rol_id}}</div>
                </b-form-group>
            </b-col>
            <b-col xs="12" sm="12" md="8" offset-md="2" class="mb-4 ml-auto">
                <div>
                    <div class="mt-5">
                        <b-button squared type="reset" variant="danger" ref="btnReset" class="mr-2"><i class="fa fa-times" aria-hidden="true"></i> Limpiar</b-button>
                        <b-button squared type="submit" variant="primary" class="ml-2"><i class="fa fa-floppy-o" aria-hidden="true"></i> Guardar</b-button>
                    </div>
                </div>
            </b-col>
        </b-form>
    </b-modal>
</div>
</template>

<script>
import axios from 'axios'
import {
    modalConfirmar
} from '../../assets/Funciones/Funciones.js' //funcion de modal de confirm
export default {
    name: 'ChildComponent',
    props: {
        datosModificar: {
            type: Array
        },
        id_servicio: {
            type: Number
        }
    },
    watch: {
        datosModificar: function () {
            if (this.datosModificar.length > 0) {
                this.getTiposServicio();
                this.form.servicio = this.datosModificar[0].servicio
                this.form.descripcion = this.datosModificar[0].descripcion
                this.form.precio_normal = this.datosModificar[0].precio_normal
                this.form.descuento_poliza = this.datosModificar[0].descuento_poliza
                this.form.tipo_precio_id = this.datosModificar[0].tipo_precio_id
                this.form.tipo_id = this.datosModificar[0].tipo_id
                this.form.id_servicio = this.datosModificar[0].id_servicio
            }
        },
        id_servicio: function () {
            this.form.id_servicio = this.id_servicio
        }
    },
    data() {
        return {
            tipo_precios: [],
            tipo_servicios: [],
            form: {
                servicio: '',
                descripcion: '',
                precio_normal: '',
                descuento_poliza: 0,
                tipo_precio_id: 1,
                tipo_id: 1,
                id_servicio: 0,
            },
            errors: {
                servicio: '',
                descripcion: '',
                precio_normal: '',
                descuento_poliza: '',
                tipo_precio_id: '',
                tipo_id: '',
            },
        }
    },
    methods: {
        //funcion importada de modals de confirms
        modalConfirmar,
        getTiposPrecio() {
            //traigo los permisos
            this.$store.dispatch('loading')
            axios.get(this.$hostname + 'tipo_precios')
                .then(resp => {
                    this.tipo_precios = resp.data.data
                    this.$store.dispatch('success')
                })
                .catch(error => {
                    this.$store.dispatch('error')
                    console.log(error)
                })
        },
        getTiposServicio() {
            //traigo los permisos
            this.$store.dispatch('loading')
            axios.get(this.$hostname + 'tipos_servicios/get_tipos')
                .then(resp => {
                    this.$store.dispatch('success')
                    this.tipo_servicios = resp.data.data
                })
                .catch(error => {
                    this.$store.dispatch('error')
                    console.log(error)
                })
        },
        onSubmit(evt) {
            evt.preventDefault()
            this.modalConfirmar('Guardar información del servicio', 'success').then(resp => {
                if (resp) {
                    this.reset_errores();
                    try {
                        this.$store.dispatch('loading');
                        if (!this.$parent.modificar) {
                            //aqui va el codigo para guardar un nuevo rol
                            axios.post(this.$hostname + 'servicios', this.form)
                                .then(resp => {
                                    this.limpiar_formulario();
                                    this.$bvModal.hide('modalNuevo');
                                    this.$store.dispatch('success')
                                    this.$toasted.show("El nuevo servicio se guardó correctamente", {
                                        iconPack: 'fontawesome',
                                        type: 'success',
                                        theme: 'toasted-primary',
                                        icon: 'check',
                                        duration: 4000,
                                        position: 'top-center',
                                        closeOnSwipe: true,
                                        keepOnHover: true
                                    });
                                    this.$root.$emit('bv::refresh::table', 'table')
                                })
                                .catch(error => {
                                    if (error.response.data['code'] == 422) {
                                        //error de validacion de datos
                                        if (error.response.data.error['servicio']) {
                                            this.errors.servicio = error.response.data.error['servicio'][0]
                                        }

                                        if (error.response.data.error['descripcion']) {
                                            this.errors.descripcion = error.response.data.error['descripcion'][0]
                                        }

                                        if (error.response.data.error['precio_normal']) {
                                            this.errors.precio_normal = error.response.data.error['precio_normal'][0]
                                        }
                                        if (error.response.data.error['precio_normal']) {
                                            this.errors.precio_normal = error.response.data.error['precio_normal'][0]
                                        }
                                        if (error.response.data.error['descuento_poliza']) {
                                            this.errors.descuento_poliza = error.response.data.error['descuento_poliza'][0]
                                        }
                                        if (error.response.data.error['tipo_precio_id']) {
                                            this.errors.tipo_precio_id = error.response.data.error['tipo_precio_id'][0]
                                        }
                                        if (error.response.data.error['tipo_id']) {
                                            this.errors.tipo_id = error.response.data.error['tipo_id'][0]
                                        }

                                    }
                                    this.$store.dispatch('error')
                                })
                        } else {
                            //aqui va el codigo de modificar
                            axios.put(this.$hostname + 'servicios/' + this.form.id_servicio,
                                    this.form)
                                .then(resp => {
                                    this.limpiar_formulario();
                                    this.$bvModal.hide('modalNuevo');
                                    this.$store.dispatch('success')
                                    this.$toasted.show("El servicio se actualizó con éxito", {
                                        iconPack: 'fontawesome',
                                        type: 'success',
                                        theme: 'toasted-primary',
                                        icon: 'check',
                                        duration: 4000,
                                        position: 'top-center',
                                        closeOnSwipe: true,
                                        keepOnHover: true
                                    });
                                    //actualizo la tabla
                                    this.$root.$emit('bv::refresh::table', 'table')
                                })
                                .catch(error => {
                                    if (error.response.data['code'] == 422) {
                                        //error de validacion de datos
                                        if (error.response.data.error['servicio']) {
                                            this.errors.servicio = error.response.data.error['servicio'][0]
                                        }
                                        if (error.response.data.error['descripcion']) {
                                            this.errors.descripcion = error.response.data.error['descripcion'][0]
                                        }

                                        if (error.response.data.error['precio_normal']) {
                                            this.errors.precio_normal = error.response.data.error['precio_normal'][0]
                                        }
                                        if (error.response.data.error['precio_normal']) {
                                            this.errors.precio_normal = error.response.data.error['precio_normal'][0]
                                        }
                                        if (error.response.data.error['descuento_poliza']) {
                                            this.errors.descuento_poliza = error.response.data.error['descuento_poliza'][0]
                                        }
                                        if (error.response.data.error['tipo_precio_id']) {
                                            this.errors.tipo_precio_id = error.response.data.error['tipo_precio_id'][0]
                                        }
                                        if (error.response.data.error['tipo_id']) {
                                            this.errors.tipo_id = error.response.data.error['tipo_id'][0]
                                        }

                                    }
                                    this.$store.dispatch('error')
                                })
                        }
                    } catch (error) {
                        this.$store.dispatch('error')
                    }
                }
            })
        },
        onReset(evt) {
            evt.preventDefault()
            // Reset our form values
            this.modalConfirmar().then(resp => {
                if (resp) {
                    this.limpiar_formulario();
                }
            })
        },
        //funcion para quitar los errores de validacion
        reset_errores() {
            this.errors.servicio = ''
            this.errors.descripcion = ''
            this.errors.precio_normal = ''
            this.errors.descuento_poliza = ''
            this.errors.tipo_precio_id = ''
            this.errors.tipo_id = ''
        },
        //funcion para limpiar el formulario completo
        limpiar_formulario() {
            this.$parent.modificar = false;
            this.form.servicio = ''
            this.form.descripcion = ''
            this.form.precio_normal = ''
            this.form.descuento_poliza = 0
            this.form.tipo_precio_id = 1
            this.form.tipo_id = 1
            this.reset_errores();
        },
    },
    created() {
        //obtengo los roles que existen para crear un usuario
        this.getTiposPrecio()
        this.getTiposServicio()
    },
}
</script>

<style lang="css">
#modalNuevo .modal-header {
    background-color: #5c6873 !important;
    border-radius: 0px !important;
    color: #fff !important;
}

#modalNuevo .close {
    color: #fff;
}
</style>
