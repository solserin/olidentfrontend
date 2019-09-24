<template>
<div>
    <b-modal @hidden="limpiar_formulario" @close="limpiar_formulario" id="modalNuevo" size="lg" :title="$parent.modificar ? 'Modificar Usuario':'Nuevo Usuario'" no-close-on-backdrop hide-footer>
        <b-form @submit="onSubmit" @reset="onReset">
            <b-col md="12">
                <b-form-group label-cols-lg="3" label="Nombre Completo:" label-for="txtNombre" label-class="labels" description="Indique el nombre de la persona dueño del usuario.">
                    <b-form-input id="txtNombre" v-model="form.nombre" required></b-form-input>
                    <div class="text-danger text-center" v-if="errors.nombre">{{errors.nombre}}</div>
                </b-form-group>
            </b-col>
            <b-col md="12">
                <b-form-group label-cols-lg="3" label="Email de Usuario:" label-for="txtUsuario" label-class="labels" description="Ingrese el nombre de usuario.">
                    <b-form-input id="txtUsuario" v-model="form.usuario" type="email" required></b-form-input>
                    <div class="text-danger text-center" v-if="errors.usuario">{{errors.usuario}}</div>
                </b-form-group>
            </b-col>
            <b-col md="12">
                <b-form-group label-cols-lg="3" label="Rol de Usuario:" label-for="cmbRol" label-class="labels" description="Seleccione un Rol para este usuario.">
                    <b-form-select v-model="form.rol_id" id="cmbRol">
                        <!-- This slot appears above the options from 'options' prop -->
                        <template v-slot:first>
                            <option :value="null" disabled>-- Seleccione 1 Rol--</option>
                        </template>
                        <!-- These options will appear after the ones from 'options' prop -->
                        <option v-for="rol in roles" v-bind:key="rol.id" :value="rol.id">{{rol.rol}}</option>
                    </b-form-select>
                    <div class="text-danger text-center" v-if="errors.rol">{{errors.rol}}</div>
                </b-form-group>
            </b-col>
            <b-col md="12">
                <b-form-group label-cols-lg="3" label="Estado:" label-for="cmbEstado" label-class="labels" description="Seleccione el estado inicial para el usuario.">
                    <b-form-select v-model="form.estado" id="cmbEstado">
                        <!-- This slot appears above the options from 'options' prop -->
                        <template v-slot:first>
                            <option :value="null" disabled>-- Selecione 1 Estado--</option>
                        </template>
                        <!-- These options will appear after the ones from 'options' prop -->
                        <option value="1">Activo</option>
                        <option value="0">Inactivo</option>

                    </b-form-select>
                    <div class="text-danger text-center" v-if="errors.rol_id">{{errors.rol_id}}</div>
                </b-form-group>
            </b-col>
            <b-col md="12">
                <b-form-group label-cols-lg="3" label="Teléfono:" label-for="txtTelefono" label-class="labels" description="Ingrese un número de teléfono.">
                    <b-form-input id="txtTelefono" v-model="form.telefono" type="text"></b-form-input>
                    <div class="text-danger text-center" v-if="errors.telefono">{{errors.telefono}}</div>
                </b-form-group>
            </b-col>
            <b-col md="12" v-if="!$parent.modificar">
                <b-form-group label-cols-lg="3" label="Contraseña:" label-for="txtPassword" label-class="labels" description="Ingrese la contraseña.">
                    <b-form-input id="txtPassword" v-model="form.password" type="password" required></b-form-input>
                    <div class="text-danger text-center" v-if="errors.password">{{errors.password}}</div>
                </b-form-group>
            </b-col>
            <b-col md="12" v-if="!$parent.modificar">
                <b-form-group label-cols-lg="3" label="Confirmar Contraseña:" label-for="txtPassword_repetir" label-class="labels" description="Confirme la contraseña.">
                    <b-form-input id="txtPassword_repetir" v-model="form.password_repetir" type="password" required></b-form-input>
                    <div class="text-danger text-center" v-if="errors.password_repetir">{{errors.password_repetir}}</div>
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
        id_usuario: {
            type: Number
        }
    },
    watch: {
        datosModificar: function () {
            if (this.datosModificar.length > 0) {
                this.form.nombre = this.datosModificar[0].name
                this.form.usuario = this.datosModificar[0].email
                this.form.rol_id = this.datosModificar[0].roles_id
                this.form.estado = this.datosModificar[0].status
                this.form.telefono = this.datosModificar[0].telefono
            }

        },
        id_usuario: function () {
            this.form.usuario_id = this.id_usuario
        }
    },
    data() {
        return {
            roles: [],
            form: {
                nombre: '',
                usuario: '',
                rol_id: 1,
                estado: 1,
                telefono: '',
                password: '',
                password_repetir: '',
                usuario_id: 0,
            },
            errors: {
                nombre: '',
                usuario: '',
                rol_id: '',
                estado: '',
                telefono: '',
                password: '',
                password_repetir: ''
            },

        }
    },
    methods: {
        //funcion importada de modals de confirms
        modalConfirmar,
        getRoles() {
            //traigo los permisos
            axios.get(this.$hostname + 'roles/get_roles')
                .then(resp => {
                    this.roles = resp.data.data
                })
                .catch(error => {
                    console.log(error)
                })
        },
        onSubmit(evt) {
            evt.preventDefault()
            this.modalConfirmar('Guardar información del usuario', 'success').then(resp => {
                if (resp) {
                    this.reset_errores();
                    try {
                        this.$store.dispatch('loading');
                        if (!this.$parent.modificar) {
                            //aqui va el codigo para guardar un nuevo rol
                            axios.post(this.$hostname + 'usuarios', this.form)
                                .then(resp => {
                                    this.limpiar_formulario();
                                    this.$bvModal.hide('modalNuevo');
                                    this.$store.dispatch('success')
                                    this.$toasted.show("El nuevo usuario se guardó correctamente", {
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
                                        if (error.response.data.error['nombre']) {
                                            this.errors.nombre = error.response.data.error['nombre'][0]
                                        }
                                        if (error.response.data.error['usuario']) {
                                            this.errors.usuario = error.response.data.error['usuario'][0]
                                        }
                                        if (error.response.data.error['rol_id']) {
                                            this.errors.rol_id = error.response.data.error['rol_id'][0]
                                        }
                                        if (error.response.data.error['estado']) {
                                            this.errors.estado = error.response.data.error['estado'][0]
                                        }
                                        if (error.response.data.error['password']) {
                                            this.errors.password = error.response.data.error['password'][0]
                                        }
                                        if (error.response.data.error['password_repetir']) {
                                            this.errors.password_repetir = error.response.data.error['password_repetir'][0]
                                        }

                                    }
                                    this.$store.dispatch('error')
                                })
                        } else {
                            //aqui va el codigo de modificar
                            axios.put(this.$hostname + 'usuarios/' + this.form.usuario_id,
                                    this.form)
                                .then(resp => {
                                    this.limpiar_formulario();
                                    this.$bvModal.hide('modalNuevo');
                                    this.$store.dispatch('success')
                                    this.$toasted.show("El usuario se actualizó con éxito", {
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
                                        if (error.response.data.error['nombre']) {
                                            this.errors.nombre = error.response.data.error['nombre'][0]
                                        }
                                        if (error.response.data.error['usuario']) {
                                            this.errors.usuario = error.response.data.error['usuario'][0]
                                        }
                                        if (error.response.data.error['rol_id']) {
                                            this.errors.rol_id = error.response.data.error['rol_id'][0]
                                        }
                                        if (error.response.data.error['estado']) {
                                            this.errors.estado = error.response.data.error['estado'][0]
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
            this.errors.nombre = ''
            this.errors.usuario = ''
            this.errors.rol_id = ''
            this.errors.estado = ''
            this.errors.telefono = ''
            this.errors.password = ''
            this.errors.password_repetir = ''
        },
        //funcion para limpiar el formulario completo
        limpiar_formulario() {
            this.$parent.modificar = false;
            this.form.nombre = ''
            this.form.usuario = ''
            this.form.rol_id = 1
            this.form.estado = 1
            this.form.telefono = ''
            this.form.password = ''
            this.form.password_repetir = ''
            this.reset_errores();
        },
    },
    created() {
        //obtengo los roles que existen para crear un usuario
        this.getRoles()
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
