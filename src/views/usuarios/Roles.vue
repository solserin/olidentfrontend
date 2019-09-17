<template>
<div>
    <b-row class="mb-3">
        <b-col cols="12" xs="12">
            <span class="title-crud">Roles de Usuario</span>
        </b-col>
    </b-row>
    <b-card no-header style="border-radius:0;">
        <b-row>
            <b-col xs="12" sm="12" md="5">
                <b-input-group class="mb-2 mt-3">
                    <b-input-group-prepend is-text><b><i class="fa fa-search" aria-hidden="true"></i></b></b-input-group-prepend>
                    <b-form-input placeholder="Filtrar resultados"></b-form-input>
                </b-input-group>
            </b-col>
            <b-col xs="12" sm="12" md="2">
                <b-input-group class="mt-3">
                    <b-input-group-prepend is-text><b><i class="fa fa-filter" aria-hidden="true"></i></b></b-input-group-prepend>
                    <b-form-select v-model="perPage">
                        <!-- This slot appears above the options from 'options' prop -->
                        <template v-slot:first>
                            <option :value="null" disabled>-- Mostrar 10 --</option>
                        </template>
                        <!-- These options will appear after the ones from 'options' prop -->
                        <option value="10">Mostrar 10</option>
                        <option value="20">Mostrar 20</option>
                        <option value="30">Mostrar 30</option>
                        <option value="50">Mostrar 50</option>
                    </b-form-select>
                </b-input-group>
            </b-col>
            <b-col xs="12" sm="12" md="5">
                <div class="float-right  mt-3">
                    <b-button v-b-modal.modal-xl pill class="mr-2" variant="primary"><i class="fa fa-plus" aria-hidden="true"></i> Nuevo</b-button>
                    <b-button pill class="mr-2" variant="outline-danger"><i class="fa fa-file-pdf-o" aria-hidden="true"></i> Pdf</b-button>
                    <b-button pill variant="outline-success"><i class="fa fa-file-excel-o" aria-hidden="true"></i> Excel</b-button>
                </div>
            </b-col>
        </b-row>

        <b-row>
            <b-col xs="12">
                <b-table id="table" :fixed="true" :hover="true" :foot-clone="true" :busy.sync="isBusy" :items="myProvider" :fields="fields" :current-page="currentPage" :per-page="perPage" striped show-empty :emptyText="texto" responsive primary-key="id" class="mt-5">
                    <template v-slot:empty="scope">
                        <h4 class="text-center">{{ scope.emptyText }}</h4>
                    </template>
                </b-table>
                Total de Resultados: <strong>{{rowsTotal}} </strong> de <strong>{{totalRows}} </strong> Registros.
                <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage" first-text="<<" prev-text="<" next-text=">" last-text=">>" class="mt-3 mb-5 justify-content-center">
                </b-pagination>
            </b-col>
        </b-row>
    </b-card>
    <b-row>
        <div>
            <b-modal id="modal-xl" size="xl" title="Nuevo Rol de Usuario" header-bg-variant="light">
                <b-col md="6" offset-md="3">
                    <b-form-group label-cols-md="4" label="Nivel de Administrador:" label-align-sm="right" label-for="nested-street" label-class="ok">
                        <b-form-input id="nested-street"></b-form-input>
                    </b-form-group>
                </b-col>
                <b-col xs="12">
                    <div>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">Módulos</th>
                                    <th scope="col" v-for="permiso in fieldsPermisos" v-bind:key="permiso.id">
                                        <input type="checkbox" :id="permiso.id" v-on:change="selectAll(permiso.permiso)">{{permiso.permiso}}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="modulo in modulos" v-bind:key="modulo.id">
                                    <th scope="row">{{modulo.name}}</th>
                                    <td v-for="permiso in fieldsPermisos" v-bind:key="permiso.id">
                                        <input type="checkbox" name="permisos[]" :class="permiso.permiso" v-model="itemsPermisos" :value="modulo.id+'_'+permiso.id">
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        {{itemsPermisos}}
                    </div>
                </b-col>
            </b-modal>
        </div>
    </b-row>
</div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            selected: null,
            texto: 'No se ha extraido información de la base de datos',
            items: [],
            fields: [{
                    key: "id",
                    label: 'Clave'
                },
                {
                    key: "rol",
                    label: 'Rol',
                    class: 'text-center'
                },
                {
                    key: 'usuarios_count',
                    label: 'Total de Usuarios',
                    class: 'text-center'
                },
                {
                    key: 'ok',
                    label: 'Acciones',
                },
            ],
            isBusy: false,
            totalRows: 0,
            currentPage: 1,
            perPage: 10,
            filter: null,
            rowsTotal: 0,
            //permisos
            fieldsPermisos: [],
            itemsPermisos: [],
            modulos: [],
            //checkboxes
            selectAllAgregar: false
        }
    },
    methods: {
        myProvider(ctx) {

            this.$store.dispatch('loading');
            this.isBusy = true;
            let promise =
                axios.get('http://localhost:8000/usuarios?page=' + ctx.currentPage + '&per_page=' + ctx.perPage)
            return promise
                .then(resp => {
                    var items = resp.data.data.data;
                    this.items = resp.data.data;
                    this.currentPage = resp.data.data.current_page;
                    this.totalRows = resp.data.data.total;
                    this.rowsTotal = resp.data.data.data.length;
                    this.isBusy = false;
                    this.$store.dispatch('success')
                    return items;
                })
                .catch(error => {
                    this.isBusy = false;
                    this.$store.dispatch('error')
                    return [];
                })

        },
        getDatosNuevoRol() {
            //traigo los permisos
            axios.get('http://localhost:8000/permisos')
                .then(resp => {
                    this.fieldsPermisos = resp.data.data
                })
                .catch(error => {
                    console.log(resp)
                })

            //traigo los modulos
            axios.get('http://localhost:8000/modulos')
                .then(resp => {
                    this.modulos = resp.data.data
                })
                .catch(error => {
                    console.log(resp)
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
                    document.getElementsByClassName(n)[index].checked = true;
                    this.itemsPermisos.push(document.getElementsByClassName(n)[index].value);
                } else {
                    document.getElementsByClassName(n)[index].checked = false;
                    this.itemsPermisos.push(document.getElementsByClassName(n)[index].value);
                }
                
            }
        }
    },
    created() {
        this.getDatosNuevoRol()
    },

}
</script>

<style lang="css">
.title-crud {
    font-size: 16px;
    font-weight: bold;
}

.ok {
    font-weight: bold;
}

input[type=text] {
    border-radius: 0px !important;
}
</style>
