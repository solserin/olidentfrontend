<template>
<div>
    <b-modal @hidden="limpiar_formulario" @close="limpiar_formulario" id="modalTipos" size="lg" :title="$parent.modificar ? 'Modificar Tipo de Servicio':'Nuevo Tipo de Servicio'" no-close-on-backdrop hide-footer>
        <b-form @submit="onSubmit" @reset="onReset">
            <b-col md="12">
                <b-form-group label-cols-lg="3" label="Tipo de servicio:" label-for="txtTipo" label-class="labels" description="Indique el nombre del tipo de servicio.">
                    <b-form-input  id="txtTipo" v-model="form.tipo"></b-form-input>
                    <div class="text-danger text-center" v-if="errors.tipo">{{errors.tipo}}</div>
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
        id_tipo: {
            type: Number
        }
    },
    watch: {
        datosModificar: function () {
            if (this.datosModificar.length > 0) {
                this.form.tipo = this.datosModificar[0].tipo
                this.form.id_tipo = this.datosModificar[0].id_tipo
            }

        },
        id_tipo: function () {
            this.form.id_tipo = this.id_tipo
        }
    },
    data() {
        return {
            form: {
                tipo: '',
                id_tipo: 0,
            },
            errors: {
                tipo: '',
                id_tipo: '',
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
            this.modalConfirmar('Guardar tipo de servicio', 'success').then(resp => {
                if (resp) {
                    this.reset_errores();
                    try {
                        this.$store.dispatch('loading');
                        if (!this.$parent.modificar) {
                            //aqui va el codigo para guardar un nuevo rol
                            axios.post(this.$hostname + 'tipos_servicios', this.form)
                                .then(resp => {
                                    this.limpiar_formulario();
                                    this.$bvModal.hide('modalTipos');
                                    this.$store.dispatch('success')
                                    this.$toasted.show("El nuevo tipo servicio se guardó correctamente", {
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
                                        console.log(error.response)
                                        //error de validacion de datos
                                        if (error.response.data.error['tipo']) {
                                            this.errors.tipo = error.response.data.error['tipo'][0]
                                        }
                                    }
                                    this.$store.dispatch('error')
                                })
                        } else {
                            //aqui va el codigo de modificar
                            axios.put(this.$hostname + 'tipos_servicios/' + this.form.id_tipo,
                                    this.form)
                                .then(resp => {
                                    this.limpiar_formulario();
                                    this.$bvModal.hide('modalTipos');
                                    this.$store.dispatch('success')
                                    this.$toasted.show("El tipo de servicio se actualizó con éxito", {
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
                                        if (error.response.data.error['tipo']) {
                                            this.errors.tipo = error.response.data.error['tipo'][0]
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
            this.errors.tipo = ''
        },
        //funcion para limpiar el formulario completo
        limpiar_formulario() {
            this.$parent.modificar = false;
            this.form.tipo = ''
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
#modalTipos .modal-header {
    background-color: #5c6873 !important;
    border-radius: 0px !important;
    color: #fff !important;
}

#modalTipos .close {
    color: #fff;
}
</style>
