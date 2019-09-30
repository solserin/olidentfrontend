<template>
<div>
    <!--<b-card style="border-radius:0;">
        <div slot="header"><i class="fa fa-folder-open-o" aria-hidden="true"></i> Formulario de Venta</div>
    </b-card>-->
    <b-form>
        <b-card style="border-radius:0; " class="quitar-padding">
            <b-row style="margin:0px !important;">
                <b-col xs="12" lg="9" class="sin-padding">
                    <div class=" pt-4 pl-4 pr-4">
                        <b-tabs content-class="mt-4" justified class="tabs-ventas">
                            <b-tab active>
                                <template v-slot:title>
                                    <i class="fa fa-paperclip" aria-hidden="true"></i>
                                    01 póliza
                                </template>
                                <h5 class="nombre-tab pb-4">Información de la Póliza</h5>
                                <b-row>
                                    <b-col xs="12" md="6">
                                        <b-form-group label="Núm. Póliza:" label-for="txtNumPoliza" label-class="labels">
                                            <b-form-input type="text" id="txtNumPoliza"></b-form-input>
                                        </b-form-group>
                                    </b-col>
                                    <b-col xs="12" md="6">
                                        <b-form-group label="Fecha Afiliación:" label-for="txtNombre" label-class="labels">
                                            <b-form-input type="text" id="txtNombre" required></b-form-input>
                                        </b-form-group>
                                    </b-col>
                                    <b-col xs="12" md="6">
                                        <b-form-group label="Tipo de Póliza:" label-for="cmbEstado" label-class="labels">
                                            <b-form-select id="cmbEstado">
                                                <!-- This slot appears above the options from 'options' prop -->
                                                <template v-slot:first>
                                                    <option :value="null" disabled>-- Selecione 1 Estado--</option>
                                                </template>
                                                <!-- These options will appear after the ones from 'options' prop -->
                                                <option value="1">Activo</option>
                                                <option value="0">Inactivo</option>

                                            </b-form-select>
                                        </b-form-group>
                                    </b-col>
                                    <b-col xs="12" md="6">
                                        <b-form-group label="Asignar a ruta de cobro:" label-for="cmbEstado" label-class="labels">
                                            <b-form-select id="cmbEstado">
                                                <!-- This slot appears above the options from 'options' prop -->
                                                <template v-slot:first>
                                                    <option :value="null" disabled>-- Selecione 1 Estado--</option>
                                                </template>
                                                <!-- These options will appear after the ones from 'options' prop -->
                                                <option value="1">Activo</option>
                                                <option value="0">Inactivo</option>

                                            </b-form-select>
                                        </b-form-group>
                                    </b-col>
                                    <b-col xs="12" md="6">
                                        <b-form-group label="Vendido por:" label-for="cmbEstado" label-class="labels">
                                            <b-form-select id="cmbEstado">
                                                <!-- This slot appears above the options from 'options' prop -->
                                                <template v-slot:first>
                                                    <option :value="null" disabled>-- Selecione 1 Estado--</option>
                                                </template>
                                                <!-- These options will appear after the ones from 'options' prop -->
                                                <option value="1">Activo</option>
                                                <option value="0">Inactivo</option>

                                            </b-form-select>
                                        </b-form-group>
                                    </b-col>

                                    <b-col xs="12" md="6">
                                        <b-form-group label="Abono Inicial:" label-for="txtNombre" label-class="labels">
                                            <b-form-input id="txtNombre" required></b-form-input>
                                        </b-form-group>
                                    </b-col>
                                </b-row>
                                <b-row>
                                    <b-col xs="12" sm="12" md="12" class="mb-3">
                                        <div>
                                            <div class="mt-4">
                                                <b-button squared type="submit" class="bg-continuar" style="float:right;">Continuar con el titular</b-button>
                                            </div>
                                        </div>
                                    </b-col>
                                </b-row>
                            </b-tab>
                            <b-tab>
                                <template v-slot:title>
                                    <i class="fa fa-address-card-o" aria-hidden="true"></i>
                                    02 Titular
                                </template>
                                <h5 class="nombre-tab pb-4">Información del Titular</h5>
                                <b-row>
                                    <b-col xs="12" md="12">
                                        <b-form-group label="Nombre Completo:" label-for="txtNombre" label-class="labels">
                                            <b-form-input id="txtNombre" required></b-form-input>
                                        </b-form-group>
                                    </b-col>
                                    <b-col xs="12" md="6">
                                        <b-form-group label="Colonia:" label-for="txtNombre" label-class="labels">
                                            <b-form-input id="txtNombre" required></b-form-input>
                                        </b-form-group>
                                    </b-col>
                                    <b-col xs="12" md="6">
                                        <b-form-group label="Calle:" label-for="txtNombre" label-class="labels">
                                            <b-form-input id="txtNombre" required></b-form-input>
                                        </b-form-group>
                                    </b-col>
                                    <b-col xs="12" md="4">
                                        <b-form-group label="Email:" label-for="txtNombre" label-class="labels">
                                            <b-form-input type="email" id="txtNombre" required></b-form-input>
                                        </b-form-group>
                                    </b-col>
                                    <b-col xs="12" md="4">
                                        <b-form-group label="Teléfono:" label-for="txtNombre" label-class="labels">
                                            <b-form-input id="txtNombre" required></b-form-input>
                                        </b-form-group>
                                    </b-col>
                                    <b-col xs="12" md="4">
                                        <b-form-group label="Ocupación:" label-for="txtNombre" label-class="labels">
                                            <b-form-input id="txtNombre" required></b-form-input>
                                        </b-form-group>
                                    </b-col>
                                    <b-col xs="12" md="3">
                                        <b-form-group label="Numero:" label-for="txtNombre" label-class="labels">
                                            <b-form-input id="txtNombre" required></b-form-input>
                                        </b-form-group>
                                    </b-col>
                                    <b-col xs="12" md="3">
                                        <b-form-group label="C.P:" label-for="txtNombre" label-class="labels">
                                            <b-form-input id="txtNombre" required></b-form-input>
                                        </b-form-group>
                                    </b-col>
                                    <b-col xs="12" md="6">
                                        <b-form-group label="Comunidad:" label-for="txtNombre" label-class="labels">
                                            <b-form-input id="txtNombre" required></b-form-input>
                                        </b-form-group>
                                    </b-col>

                                </b-row>
                                <b-row>
                                    <b-col xs="12" sm="12" md="12" class="mb-3">
                                        <div>
                                            <div class="mt-4">
                                                <b-link href="#foo" class="link-back"><i class="fa fa-long-arrow-left" aria-hidden="true"></i>
                                                    Regresar</b-link>
                                                <b-button squared type="submit" class="bg-continuar" style="float:right;">Continuar con el titular</b-button>
                                            </div>
                                        </div>
                                    </b-col>
                                </b-row>
                            </b-tab>
                            <b-tab>
                                <template v-slot:title>
                                    <i class="fa fa-users" aria-hidden="true"></i>
                                    03 Beneficiarios
                                </template>
                                <h5 class="nombre-tab pb-4">Informacion de los Beneficiarios</h5>
                                <table class="table">
                                    <caption>Lista de beneficiarios</caption>
                                    <thead>
                                        <tr>
                                            <th scope="col" width="5%">#</th>
                                            <th scope="col" width="75%">Nombre Completo</th>
                                            <th scope="col" width="20%">Edad</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row">1</th>
                                            <td>
                                                <b-form-input id="txtNombre" required></b-form-input>
                                            </td>
                                            <td>
                                                <b-form-input id="txtNombre" required></b-form-input>
                                            </td>
                                        </tr>
                                         <tr>
                                            <th scope="row">1</th>
                                            <td>
                                                <b-form-input id="txtNombre" required></b-form-input>
                                            </td>
                                            <td>
                                                <b-form-input id="txtNombre" required></b-form-input>
                                            </td>
                                        </tr>
                                         <tr>
                                            <th scope="row">1</th>
                                            <td>
                                                <b-form-input id="txtNombre" required></b-form-input>
                                            </td>
                                            <td>
                                                <b-form-input id="txtNombre" required></b-form-input>
                                            </td>
                                        </tr>
                                         <tr>
                                            <th scope="row">1</th>
                                            <td>
                                                <b-form-input id="txtNombre" required></b-form-input>
                                            </td>
                                            <td>
                                                <b-form-input id="txtNombre" required></b-form-input>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </b-tab>
                        </b-tabs>
                    </div>
                </b-col>
                <b-col xs="12" lg="3" class="sin-padding">
                    <div class="info-venta pt-4 pl-4 pr-4">
                        h
                    </div>
                </b-col>
            </b-row>
        </b-card>
    </b-form>
</div>
</template>
<script>
export default {
    data() {
        return {

        }
    },
}
</script>

<style>
.info-venta {
    background-color: #f8fafb !important;
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
</style>
