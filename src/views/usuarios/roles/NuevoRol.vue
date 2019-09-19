<template>
<div>
    <b-modal id="modalNuevo" size="xl" title="Nuevo Rol de Usuario" header-bg-variant="light" ok-variant="success" no-close-on-backdrop hide-footer>
        <b-form @submit="onSubmit" @reset="onReset">
            <b-col md="6" offset-md="3">
                <b-form-group label="Nivel de Administrador:" label-for="txtRol" label-class="ok" description="Debe indicar el nombre para identificar el nuevo ROL de usuarios.">
                    <b-form-input id="txtRol" v-model="form.rol" required></b-form-input>
                    <div class="text-danger text-center" v-if="errors.rol">{{errors.rol}}</div>
                </b-form-group>
            </b-col>
            <b-col xs="12">
                <div>
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">Módulos</th>
                                <th scope="col" v-for="permiso in fieldsPermisos" v-bind:key="permiso.id">
                                    <b-form-checkbox :id="permiso.id.toString()" v-on:change="selectAll(permiso.permiso)" class="selectores">{{permiso.permiso}}</b-form-checkbox>
                                </th>
                            </tr>
                        </thead>
                        <tbody id="selected">
                            <tr v-for="modulo in  modulos" v-bind:key="modulo.id">
                                <th scope="row">{{modulo.name}}</th>
                                <td v-for="permiso in  fieldsPermisos" v-bind:key="permiso.id">
                                    <b-form-checkbox name="permisos[]" :class="permiso.permiso" v-model="form.itemsPermisos" :value="modulo.id+','+permiso.id"></b-form-checkbox>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="text-danger text-center" v-if="errors.items">{{errors.items}}</div>
                    <div class="float-right mt-5">
                        <b-button type="reset" variant="danger" ref="btnReset"><i class="fa fa-times" aria-hidden="true"></i> Limpiar</b-button>
                        <b-button type="submit" variant="primary" class="ml-2"><i class="fa fa-floppy-o" aria-hidden="true"></i> Guardar</b-button>
                    </div>
                </div>
            </b-col>
        </b-form>
    </b-modal>

</div>
</template>

<script>
import axios from 'axios'
import {showMsgBoxTwo} from '../../../assets/Funciones/Funciones.js' //funcion de modal de confirm
export default {
    data() {
        return {
            fieldsPermisos: [],
            modulos: [],
            form: {
                //permisos
                itemsPermisos: [],
                rol: ''
            },
            errors: {
                rol: '',
                items: ''
            }
        }
    },
    methods: {
        //funcion importada de modals de confirms
        showMsgBoxTwo,
        getDatosNuevoRol() {
            //traigo los permisos
            axios.get('http://localhost:8000/permisos')
                .then(resp => {
                    this.fieldsPermisos = resp.data.data
                })
                .catch(error => {
                    console.log(error)
                })
            //traigo los modulos
            axios.get('http://localhost:8000/modulos')
                .then(resp => {
                    this.modulos = resp.data.data
                })
                .catch(error => {
                    console.log(error)
                })
        },
        selectAll: function (n) {
            //obtengo el tamaño del array de elementos a activar o desactivar
            var total = document.getElementsByClassName(n).length;
            var id_activar_todos = 1; //con este checo cual checkbox esta haciendo el cambio
            if (n == "Agregar") {
                id_activar_todos = 2;
            } else if (n == "Modificar") {
                id_activar_todos = 3;
            } else if (n == "Eliminar") {
                id_activar_todos = 4;
            }

            for (let index = 0; index < total; index++) {
                if (document.getElementById(id_activar_todos).checked) {
                    document.getElementsByClassName(n)[index].getElementsByTagName('input')[0].checked = true;
                } else {
                    document.getElementsByClassName(n)[index].getElementsByTagName('input')[0].checked = false;
                }
            }
            this.form.itemsPermisos = []
            //rehago el array de seleccionados
            var total_seleccionados = document.getElementById('selected').getElementsByTagName('input').length;
            for (let index = 0; index < total_seleccionados; index++) {
                if (document.getElementById('selected').getElementsByTagName('input')[index].checked) {
                    this.form.itemsPermisos.push(document.getElementById('selected').getElementsByTagName('input')[index].value);
                }
            }
        },
        onSubmit(evt) {
            evt.preventDefault()
            this.showMsgBoxTwo('¿Desea guardar los datos?','success').then(resp => {
                if (resp) {
                    this.reset_errores();
                    try {
                        this.$store.dispatch('loading');
                        axios.post('http://localhost:8000/roles', this.form)
                            .then(resp => {
                                this.limpiar_formulario();
                                this.$bvModal.hide('modalNuevo');
                                this.$store.dispatch('success')
                                this.$toasted.show("El nuevo rol se guardó con éxito", {
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
                                    if (error.response.data.error['rol']) {
                                        this.errors.rol = error.response.data.error.rol[0]
                                    }
                                    if (error.response.data.error['itemsPermisos']) {
                                        this.errors.items = error.response.data.error.itemsPermisos[0]
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
        onReset(evt) {
            evt.preventDefault()
            // Reset our form values
            this.showMsgBoxTwo().then(resp => {
                if (resp) {
                    this.limpiar_formulario();
                }
            })
        },
        //funcion para quitar los errores de validacion
        reset_errores() {
            this.errors.rol = ''
            this.errors.items = ''
        },
        //funcion para limpiar el formulario completo
        limpiar_formulario() {
            this.form.itemsPermisos = []
            //resetewo los selectores
            let total = document.getElementsByClassName('selectores').length;
            for (let index = 0; index < total; index++) {
                document.getElementsByClassName('selectores')[index].getElementsByTagName('input')[0].checked = false;
            }
            this.form.rol = '';
            this.reset_errores();
        }
    },
    created() {
        this.getDatosNuevoRol()
    },
}
</script>

<style lang="css">
.ok {
    font-weight: bold;
}

input[type=text] {
    border-radius: 0px !important;
}
</style>
