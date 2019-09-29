<template>
<div>
    <b-modal @hidden="limpiar_formulario" @close="limpiar_formulario" id="modalNuevo" size="lg" :title="$parent.modificar ? 'Modificar Grupo de Vendedores':'Nuevo Grupo de Vendedores'" no-close-on-backdrop hide-footer>
        <b-form @submit="onSubmit" @reset="onReset">
            <b-col md="6" offset-md="3">
                <b-form-group label="Grupo de Vendedores:" label-for="txtGrupo" label-class="labels" description="Debe indicar el nombre del grupo de vendedores.">
                    <b-form-input id="txtGrupo" v-model="form.grupo" required></b-form-input>
                    <div class="text-danger text-center" v-if="errors.grupo">{{errors.grupo}}</div>
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
        grupoNombre: {
            type: String
        },
        id_grupo: {
            type: Number
        }
    },
    watch: {
        grupoNombre: function () {
            this.form.grupo = this.grupoNombre
        },
        id_grupo: function () {
            this.form.id_grupo = this.id_grupo
        }
    },
    data() {
        return {
            form: {
                grupo: '',
                id_grupo: 0
            },
            errors: {
                grupo: ''
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
                            axios.post(this.$hostname + 'grupos_vendedores', this.form)
                                .then(resp => {
                                    console.log(resp)
                                    this.limpiar_formulario();
                                    this.$bvModal.hide('modalNuevo');
                                    this.$store.dispatch('success')
                                    this.$toasted.show("El nuevo grupo se guardó con éxito", {
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
                                        if (error.response.data.error['grupo']) {
                                            this.errors.grupo = error.response.data.error.grupo[0]
                                        }
                                    }
                                    this.$store.dispatch('error')
                                })
                        } else {
                            //aqui va el codigo de modificar
                            axios.put(this.$hostname + 'grupos_vendedores/' + this.form.id_grupo,
                                    this.form)
                                .then(resp => {
                                    this.limpiar_formulario();
                                    this.$bvModal.hide('modalNuevo');
                                    this.$store.dispatch('success')
                                    this.$toasted.show("El grupo se actualizó con éxito", {
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
                                        if (error.response.data.error['grupo']) {
                                            this.errors.grupo = error.response.data.error.grupo[0]
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
            this.errors.grupo = ''
        },
        //funcion para limpiar el formulario completo
        limpiar_formulario() {
            this.$parent.modificar = false;
            this.form.grupo = '';
            this.reset_errores();
        },
    },
    created() {},
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
