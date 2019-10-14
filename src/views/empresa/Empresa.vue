<template>
<div class="animated fadeIn">
    <b-row>
        <b-col xs="12">
            <b-card>
                <div slot="header"><i class='fa fa-building-o'></i> Datos de la empresa</div>
                <div>
                    <b-tabs content-class="mt-3">
                        <b-tab title="Empresa" active>
                            <div class="mt-3 mb-3">
                                <b-form @submit="onSubmit">
                                    <b-row>
                                        <b-col xs="12" sm="12" md="12" lg="4">
                                            <div class="text-center" v-if="form.logo.length > 0">
                                                <b-card :title="form.nombre" :img-src="form.logo" style="max-width: 25rem;" class="mr-auto ml-auto pl-3 pr-3 pt-3 pb-1" img-alt="Image" img-top>
                                                    <b-card-text>
                                                        {{form.email}}
                                                    </b-card-text>
                                                    <div class="text-danger text-center" v-if="error.logo">{{error.logo}}</div>
                                                    <div class=" mt-2">
                                                        <b-form-file id="frmFile" ref="frmFile" browse-text="Abrir" placeholder="Seleccionar" squared v-model="form.logo" @change="display" accept="image/*"></b-form-file>
                                                        <div class="text-center mt-1" v-if="form.logo!=datosEmpresa.logo">
                                                            <b-button squared type="button" variant="warning" @click="form.logo=datosEmpresa.logo"><i class="fa fa-backward" aria-hidden="true"></i> Regresar</b-button>
                                                        </div>
                                                    </div>
                                                </b-card>
                                            </div>
                                        </b-col>
                                        <b-col xs="12" sm="12" md="12" lg="8">
                                            <b-row>
                                                <b-col xs="12" md="6">
                                                    <b-form-group label="Nombre de la empresa:" label-for="txtEmpresa" description="Nombre comercial de la empresa.">
                                                        <b-form-input v-model="form.nombre" id="txtEmpresa" type="text" placeholder="Ingrese el nombre de la empresa"></b-form-input>
                                                        <div class="text-danger text-center" v-if="error.nombre">{{error.nombre}}</div>
                                                    </b-form-group>
                                                </b-col>
                                                <b-col xs="12" md="6">
                                                    <b-form-group label="Nombre del representante:" label-for="txtRepresentante" description="Nombre de la persona que aparece en los documentos oficiales como representante legal.">
                                                        <b-form-input v-model="form.representante" id="txtRepresentante" type="text" placeholder="Ingrese el nombre del representante de la empresa"></b-form-input>
                                                        <div class="text-danger text-center" v-if="error.representante">{{error.representante}}</div>
                                                    </b-form-group>
                                                </b-col>
                                                <b-col xs="12" md="6">
                                                    <b-form-group label="Email de la empresa:" label-for="txtEmail" description="Correo electrónico de la empresa">
                                                        <b-form-input v-model="form.email" id="txtEmail" type="text" placeholder="Ingrese el correo de la empresa"></b-form-input>
                                                        <div class="text-danger text-center" v-if="error.email">{{error.email}}</div>
                                                    </b-form-group>
                                                </b-col>
                                                <b-col xs="12" md="6">
                                                    <b-form-group label="Teléfono de la empresa:" label-for="txtTelefono" description="Número telefónico para atención a clientes.">
                                                        <b-form-input v-model="form.telefono" id="txtTelefono" type="text" placeholder="Ingrese el teléfono de la empresa."></b-form-input>
                                                        <div class="text-danger text-center" v-if="error.telefono">{{error.telefono}}</div>
                                                    </b-form-group>
                                                </b-col>

                                                <b-col xs="12" md="6">
                                                    <b-form-group label="Calle:" label-for="txtCalle" description="Nombre de la calle.">
                                                        <b-form-input v-model="form.calle" id="txtCalle" type="text" placeholder="Calle de la empresa."></b-form-input>
                                                        <div class="text-danger text-center" v-if="error.calle">{{error.calle}}</div>
                                                    </b-form-group>
                                                </b-col>
                                                <b-col xs="12" md="6">
                                                    <b-form-group label="Colonia:" label-for="txtColonia" description="Nombre de la colonia.">
                                                        <b-form-input v-model="form.colonia" id="txtColonia" type="text" placeholder="Colonia de la empresa."></b-form-input>
                                                        <div class="text-danger text-center" v-if="error.colonia">{{error.colonia}}</div>
                                                    </b-form-group>
                                                </b-col>

                                                <b-col xs="12" md="6">
                                                    <b-form-group label="Número de domicilio:" label-for="txtNumero" description="Número de domicilio.">
                                                        <b-form-input v-model="form.numero" id="txtNumero" type="text" placeholder="Ingrese el # del domicilio"></b-form-input>
                                                        <div class="text-danger text-center" v-if="error.numero">{{error.numero}}</div>
                                                    </b-form-group>
                                                </b-col>
                                                <b-col xs="12" md="6">
                                                    <b-form-group label="Código Postal:" label-for="txtCp" description="Número del código postal.">
                                                        <b-form-input v-model="form.cp" id="txtCp" type="text" placeholder="Ingrese el código postal."></b-form-input>
                                                        <div class="text-danger text-center" v-if="error.cp">{{error.cp}}</div>
                                                    </b-form-group>
                                                </b-col>

                                                <b-col xs="12" md="6">
                                                    <b-form-group label="Ciudad:" label-for="txtCiudad" description="Ciudad donde está ubicada la empresa.">
                                                        <b-form-input v-model="form.ciudad" id="txtCiudad" type="text" placeholder="Ingrese el nombre de la ciudad."></b-form-input>
                                                        <div class="text-danger text-center" v-if="error.ciudad">{{error.ciudad}}</div>
                                                    </b-form-group>
                                                </b-col>
                                                <b-col xs="12" md="6">
                                                    <b-form-group label="Descripción de la ubicación:" label-for="txtDescripcion" description="Ingrese alguna descripcion para ubicar a la empresa">
                                                        <b-form-input v-model="form.descripcion" id="txtDescripcion" type="text" placeholder="Ingrese alguna descripción de la ubicación de la empresa."></b-form-input>
                                                        <div class="text-danger text-center" v-if="error.descripcion">{{error.descripcion}}</div>
                                                    </b-form-group>
                                                </b-col>
                                            </b-row>
                                        </b-col>
                                    </b-row>
                                    <div class="text-center mt-5" v-if="permisos_por_modulo.modificar">
                                        <b-button squared type="submit" variant="primary"><i class="fa fa-pencil-square-o" aria-hidden="true"></i> Actualizar</b-button>
                                    </div>
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
            permisos_por_modulo: {
                agregar: false,
                consultar: false,
                modificar: false,
                eliminar: false
            },
            form: {
                id: 1,
                logo: '',
                nombre: '',
                representante: '',
                email: '',
                telefono: '',
                calle: '',
                colonia: '',
                numero: '',
                cp: '',
                ciudad: '',
                descripcion: '',
                status: 1
            },
            error: {
                logo: '',
                nombre: '',
                representante: '',
                email: '',
                telefono: '',
                calle: '',
                colonia: '',
                numero: '',
                cp: '',
                ciudad: '',
                descripcion: ''
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
                    this.form.logo = e.target.result;
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
                        axios.put(this.$hostname + 'empresas/' + this.form.id,
                                this.form)
                            .then(resp => {
                                this.$store.dispatch("getDatosEmpresa")
                                    .then(resp => {
                                        this.$store.dispatch('success')
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
                                    })
                                    .catch(error => {
                                        this.$store.dispatch('error')
                                    })
                            })
                            .catch(error => {
                                if (error.response.data['code'] == 422) {
                                    //error de validacion de datos
                                    if (error.response.data.error['imagen']) {
                                        this.error.logo = error.response.data.error.logo[0]
                                    }

                                    if (error.response.data.error['nombre']) {
                                        this.error.nombre = error.response.data.error.nombre[0]
                                    }

                                    if (error.response.data.error['email']) {
                                        this.error.email = error.response.data.error.email[0]
                                    }

                                    if (error.response.data.error['representante']) {
                                        this.error.representante = error.response.data.error.representante[0]
                                    }

                                    if (error.response.data.error['telefono']) {
                                        this.error.telefono = error.response.data.error.telefono[0]
                                    }

                                    if (error.response.data.error['calle']) {
                                        this.error.calle = error.response.data.error.calle[0]
                                    }

                                    if (error.response.data.error['colonia']) {
                                        this.error.colonia = error.response.data.error.colonia[0]
                                    }

                                    if (error.response.data.error['numero']) {
                                        this.error.numero = error.response.data.error.numero[0]
                                    }

                                    if (error.response.data.error['cp']) {
                                        this.error.cp = error.response.data.error.cp[0]
                                    }

                                    if (error.response.data.error['ciudad']) {
                                        this.error.ciudad = error.response.data.error.ciudad[0]
                                    }

                                    if (error.response.data.error['descripcion']) {
                                        this.error.descripcion = error.response.data.error.descripcion[0]
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
            this.error.logo = '',
                this.error.nombre = '',
                this.error.representante = '',
                this.error.email = '',
                this.error.telefono = '',
                this.error.calle = '',
                this.error.colonia = '',
                this.error.numero = '',
                this.error.cp = '',
                this.error.ciudad = '',
                this.error.descripcion = ''
        }
    },
    computed: {
        // mix the getters into computed with object spread operator
        ...mapGetters([
            'datosEmpresa'
        ])
    },
    created() {
        //cargo datos
        this.form.logo = this.datosEmpresa.logo;
        this.form.nombre = this.datosEmpresa.nombre;
        this.form.representante = this.datosEmpresa.representante;
        this.form.email = this.datosEmpresa.email;
        this.form.telefono = this.datosEmpresa.telefono;
        this.form.calle = this.datosEmpresa.calle;
        this.form.colonia = this.datosEmpresa.colonia;
        this.form.numero = this.datosEmpresa.numero;
        this.form.cp = this.datosEmpresa.cp;
        this.form.ciudad = this.datosEmpresa.ciudad;
        this.form.descripcion = this.datosEmpresa.descripcion;
        this.$store.dispatch('error')

        //verificando permiso
        this.permisos_por_modulo.consultar = this.$permiso(1, 1);
        this.permisos_por_modulo.agregar = this.$permiso(1, 2);
        this.permisos_por_modulo.modificar = this.$permiso(1, 3);
        this.permisos_por_modulo.eliminar = this.$permiso(1, 4);
    }
}
</script>

<style>

</style>
