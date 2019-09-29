<template>
<div>
    <b-modal @hidden="limpiar_formulario" @close="limpiar_formulario" id="modalNuevo" size="lg" :title="$parent.modificar ? 'Modificar Ruta':'Nueva Ruta'" no-close-on-backdrop hide-footer>
        <b-form @submit="onSubmit" @reset="onReset">
            <b-col md="12">
                <b-form-group label-cols-lg="3" label="Ruta:" label-for="txtRuta" label-class="labels" description="Ingrese el nombre de la ruta.">
                    <b-form-input required id="txtRuta" v-model="form.ruta" type="text"></b-form-input>
                    <div class="text-danger text-center" v-if="errors.ruta">{{errors.ruta}}</div>
                </b-form-group>
            </b-col>
            <b-col md="12">
                <b-form-group label-cols-lg="3" label="Descripción:" label-for="txtDescripcion" label-class="labels" description="Descripción de la ruta.">
                    <b-form-input required id="txtDescripcion" v-model="form.descripcion" type="text"></b-form-input>
                    <div class="text-danger text-center" v-if="errors.descripcion">{{errors.descripcion}}</div>
                </b-form-group>
            </b-col>
            <b-col md="12">
                <b-form-group label-cols-lg="3" label="Cobrador de la ruta:" label-for="cmbCobrador" label-class="labels" description="Seleccione al cobrador de esta ruta.">
                    <b-form-select v-model="form.cobrador_id" id="cmbCobrador">
                        <!-- This slot appears above the options from 'options' prop -->
                        <template v-slot:first>
                            <option :value="null" disabled>-- Seleccione 1 Cobrador--</option>
                        </template>
                        <!-- These options will appear after the ones from 'options' prop -->
                        <option value="">Seleccione 1 Cobrador</option>
                        <option v-for="cobrador in cobradores" v-bind:key="cobrador.id" :value="cobrador.id">{{cobrador.name}}</option>
                    </b-form-select>
                    <div class="text-danger text-center" v-if="errors.cobrador_id">{{errors.cobrador_id}}</div>
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
} from '../../../assets/Funciones/Funciones' //funcion de modal de confirm
export default {
    name: 'ChildComponent',
    props: {
        datosModificar: {
            type: Array
        },
        id_ruta: {
            type: Number
        }
    },
    watch: {
        datosModificar: function () {
            if (this.datosModificar.length > 0) {
                this.getCobradores();
                this.form.ruta = this.datosModificar[0].ruta
                this.form.descripcion = this.datosModificar[0].descripcion
                this.form.cobrador_id = this.datosModificar[0].cobrador_id
                this.form.id_ruta = this.datosModificar[0].id_ruta
            }
        },
        id_ruta: function () {
            this.form.id_ruta = this.id_ruta
        }
    },
    data() {
        return {
            cobradores: [],
            form: {
                ruta: '',
                descripcion: '',
                cobrador_id: '',
                id_ruta:''
            },
            errors: {
                ruta: '',
                descripcion: '',
                cobrador_id: '',
            },
        }
    },
    methods: {
        //funcion importada de modals de confirms
        modalConfirmar,
        onSubmit(evt) {
            evt.preventDefault()
            this.modalConfirmar('Guardar información', 'success').then(resp => {
                if (resp) {
                    this.reset_errores();
                    try {
                        this.$store.dispatch('loading');
                        if (!this.$parent.modificar) {
                            //aqui va el codigo para guardar un nuevo rol
                            axios.post(this.$hostname + 'rutas', this.form)
                                .then(resp => {
                                    console.log(resp)
                                    this.limpiar_formulario();
                                    this.$bvModal.hide('modalNuevo');
                                    this.$store.dispatch('success')
                                    this.$toasted.show("La nueva ruta se guardó con éxito", {
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
                                        if (error.response.data.error['ruta']) {
                                            this.errors.ruta = error.response.data.error.ruta[0]
                                        }
                                        if (error.response.data.error['descripcion']) {
                                            this.errors.descripcion = error.response.data.error.descripcion[0]
                                        }
                                        if (error.response.data.error['cobrador_id']) {
                                            this.errors.cobrador_id = error.response.data.error.cobrador_id[0]
                                        }
                                    }
                                    this.$store.dispatch('error')
                                })
                        } else {
                            //aqui va el codigo de modificar
                            axios.put(this.$hostname + 'rutas/' + this.form.id_ruta,
                                    this.form)
                                .then(resp => {
                                    this.limpiar_formulario();
                                    this.$bvModal.hide('modalNuevo');
                                    this.$store.dispatch('success')
                                    this.$toasted.show("La ruta se actualizó con éxito", {
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
                                        if (error.response.data.error['ruta']) {
                                            this.errors.ruta = error.response.data.error.ruta[0]
                                        }
                                        if (error.response.data.error['descripcion']) {
                                            this.errors.descripcion = error.response.data.error.descripcion[0]
                                        }
                                        if (error.response.data.error['cobrador_id']) {
                                            this.errors.cobrador_id = error.response.data.error.cobrador_id[0]
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
            this.errors.ruta = ''
            this.errors.descripcion = ''
            this.errors.cobrador_id = ''
        },
        //funcion para limpiar el formulario completo
        limpiar_formulario() {
            this.$parent.modificar = false;
            this.errors.ruta = ''
            this.errors.descripcion = ''
            this.errors.cobrador_id = ''
            this.reset_errores();
        },

        getCobradores() {
            //traigo los permisos
            axios.get(this.$hostname + 'rutas/get_cobradores')
                .then(resp => {
                    this.cobradores = resp.data.data
                })
                .catch(error => {
                    this.$store.dispatch('error')
                    console.log(error)
                })
        },
    },
    created() {
        this.getCobradores();
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
