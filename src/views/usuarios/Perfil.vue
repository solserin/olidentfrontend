<template>
<div class="animated fadeIn">
    <b-row>
        <b-col xs="12">
            <b-card>
                <div slot="header"><i class="fa fa-user-circle-o" aria-hidden="true"></i> Mi perfíl de usuario</div>
                <div>
                    <b-tabs content-class="mt-3">
                        <b-tab title="Perfíl de Usuario" active>

                            <div class="mt-3 mb-3">
                                <b-form @submit="onSubmit">
                                    <b-row>
                                        <b-col xs="12" sm="12" md="12" lg="4">
                                            <div class="text-center" v-if="form.imagen.length > 0">
                                                <b-card :title="user.name" :img-src="form.imagen" style="max-width: 20rem;" class="mr-auto ml-auto" img-alt="Image" img-top>
                                                    <b-card-text>
                                                        {{permisos[0].rol}}
                                                    </b-card-text>
                                                    <b-card-text class="small text-muted">Last updated 3 mins ago</b-card-text>
                                                    <div class="text-danger text-center" v-if="error.imagen">{{error.imagen}}</div>
                                                    <div class=" mt-2">

                                                        <b-form-file id="frmFile" ref="frmFile" browse-text="Abrir" placeholder="Seleccionar" squared v-model="form.imagen" @change="display" accept="image/*"></b-form-file>

                                                        <div class="text-center mt-1" v-if="form.imagen!=user.imagen">
                                                            <b-button squared type="button" variant="warning" @click="form.imagen=user.imagen"><i class="fa fa-backward" aria-hidden="true"></i> Regresar</b-button>
                                                        </div>
                                                    </div>
                                                </b-card>
                                            </div>

                                        </b-col>
                                        <b-col xs="12" sm="12" md="12" lg="8">
                                            <b-row>
                                                <b-col xs="12" md="6">
                                                    <b-form-group label="Nombre de usuario:" label-for="txtnombre" description="Nombre de la persona dueño del usuario.">
                                                        <b-form-input required v-model="form.nombre" id="txtnombre" type="text" placeholder="Ingrese su nombre por favor."></b-form-input>
                                                        <div class="text-danger text-center" v-if="error.nombre">{{error.nombre}}</div>
                                                    </b-form-group>
                                                </b-col>
                                                <b-col xs="12" md="6">
                                                    <b-form-group label="Teléfono del usuario:" label-for="txtTelefono" description="Número telefónico para contactarlo.">
                                                        <b-form-input v-model="form.telefono" id="txtTelefono" type="text" placeholder="Ingrese su número de teléfono."></b-form-input>
                                                    </b-form-group>
                                                </b-col>
                                                <b-col xs="12" md="12">
                                                    <b-alert show variant="secondary" class="text-center" style="border-radius:0;">Si desea cambiar su contraseña ingrese los siguientes datos:</b-alert>
                                                </b-col>

                                                <b-col xs="12" md="6">
                                                    <b-form-group label="Nueva contraseña :" label-for="txtPassword" description="Debe ingresar la nueva contraseña en caso de querer cambiarla.">
                                                        <b-form-input v-model="form.password" id="txtPassword" type="password" placeholder="Ingrese la nueva contraseña."></b-form-input>
                                                        <div class="text-danger text-center" v-if="error.password">{{error.password}}</div>
                                                    </b-form-group>
                                                </b-col>
                                                <b-col xs="12" md="6">
                                                    <b-form-group label="Confirmar nueva contraseña:" label-for="txtConfirmar" description="Debe repetir la nueva contraseña">
                                                        <b-form-input v-model="form.password_repetir" id="txtConfirmar" type="password" placeholder="Ingrese otra vez la nueva contraseña"></b-form-input>
                                                        <div class="text-danger text-center" v-if="error.password_repetir">{{error.password_repetir}}</div>
                                                    </b-form-group>
                                                </b-col>
                                                <b-col xs="12" md="12">
                                                    <b-alert show variant="info" class="text-center" style="border-radius:0;">Para continuar debe confirmar que es el dueño de esta cuenta:</b-alert>
                                                </b-col>
                                                <b-col xs="12" md="12">
                                                    <b-form-group label="Contraseña actual:" label-for="txtVerificar" description="Debe verificar que es el dueño de la cuenta.">
                                                        <b-form-input required v-model="form.verificar_usuario" id="txtVerificar" type="password" placeholder="Ingrese su contraseña actual"></b-form-input>
                                                        <div class="text-danger text-center" v-if="error.verificar_usuario">{{error.verificar_usuario}}</div>
                                                    </b-form-group>
                                                </b-col>
                                                <b-col xs="12" md="12">
                                                    <div class="text-center mt-5">
                                                        <b-button squared type="submit" variant="primary"><i class="fa fa-pencil-square-o" aria-hidden="true"></i> Actualizar</b-button>
                                                    </div>
                                                </b-col>
                                            </b-row>
                                        </b-col>
                                    </b-row>
                                </b-form>
                            </div>
                        </b-tab>

                    </b-tabs>
                </div>
            </b-card>
        </b-col>
    </b-row>
    <!--/.row-->
</div>
</template>

<script>
import axios from 'axios'
import {
    modalConfirmar
} from '../../assets/Funciones/Funciones.js' //funcion de modal de confirm
import {
    mapGetters
} from 'vuex'

export default {

    data: function () {
        return {
            form: {
                id: 0,
                imagen: '',
                nombre: '',
                telefono: '',
                password: '',
                password_repetir: '',
                verificar_usuario: ''
            },
            error: {
                imagen: '',
                nombre: '',
                telefono: '',
                password: '',
                password_repetir: '',
                verificar_usuario: ''
            }
        }
    },
    methods: {
        modalConfirmar,
        display: function (event) {
            // Reference to the DOM input element
            var input = event.target;
            // Ensure that you have a file before attempting to read it
            if (input.files && input.files[0]) {
                // create a new FileReader to read this image and convert to base64 format
                var reader = new FileReader();
                // Define a callback function to run, when FileReader finishes its job
                reader.onload = (e) => {
                    // Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
                    // Read image as base64 and set to imageData
                    this.form.imagen = e.target.result;
                }
                // Start the reader job - read file as a data url (base64 format)
                reader.readAsDataURL(input.files[0]);
            }
        },
        onSubmit(evt) {
            evt.preventDefault()
            this.modalConfirmar('Actualizar la información de la empresa', 'success').then(resp => {
                if (resp) {
                    this.$store.dispatch('loading')
                    try {
                        this.reset_errores()
                        //aqui va el codigo de modificar los datos
                        axios.put(this.$hostname + 'usuarios/update_perfil/' + this.form.id,
                                this.form)
                            .then(resp => {
                                this.$store.dispatch('success')
                                if (resp.data == -1) {
                                    //contraseña incorrecta
                                    this.$toasted.show("La contraseña del usuario actual es incorrecta", {
                                        iconPack: 'fontawesome',
                                        type: 'error',
                                        theme: 'toasted-primary',
                                        icon: 'close',
                                        duration: 4000,
                                        position: 'top-center',
                                        closeOnSwipe: true,
                                        keepOnHover: true
                                    });
                                } else {
                                    this.$store.dispatch('ActualizarUser', resp.data)
                                    //todo correcto
                                    this.$toasted.show("Los datos se actualizaron correctamente", {
                                        iconPack: 'fontawesome',
                                        type: 'success',
                                        theme: 'toasted-primary',
                                        icon: 'check',
                                        duration: 4000,
                                        position: 'top-center',
                                        closeOnSwipe: true,
                                        keepOnHover: true
                                    });
                                    this.form.password = '',
                                    this.form.password_repetir = '',
                                    this.form.verificar_usuario = ''
                                }
                            })
                            .catch(error => {
                                if (error.response.data['code'] == 422) {
                                    //error de validacion de datos
                                    if (error.response.data.error['imagen']) {
                                        this.error.imagen = error.response.data.error.imagen[0]
                                    }

                                    if (error.response.data.error['nombre']) {
                                        this.error.nombre = error.response.data.error.nombre[0]
                                    }

                                    if (error.response.data.error['password']) {
                                        this.error.password = error.response.data.error.password[0]
                                    }

                                    if (error.response.data.error['password_repetir']) {
                                        this.error.password_repetir = error.response.data.error.password_repetir[0]
                                    }

                                    if (error.response.data.error['verificar_usuario']) {
                                        this.error.verificar_usuario = error.response.data.error.verificar_usuario[0]
                                    }

                                    this.$store.dispatch('error')
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
            this.error.imagen = '',
                this.error.nombre = '',
                this.error.password = '',
                this.error.password_repetir = '',
                this.error.verificar_usuario = ''
        }
    },
    computed: {
        // mix the getters into computed with object spread operator
        ...mapGetters([
            'user',
            'permisos'
        ])
    },
    created() {
        //cargo datos
        this.form.id = this.user.id;
        this.form.imagen = this.user.imagen;
        this.form.nombre = this.user.name;
        this.form.telefono = this.user.telefono;
        this.$store.dispatch('error')
    }
}
</script>

<style scoped>

</style>
