<template>
<div>
    <b-card style="border-radius:0;" class="pb-5">
        <div slot="header">Generar Reportes</div>
        <b-form @submit="onSubmit">
            <b-row>
                <b-col xs="12" sm="6" md="3">
                    <b-form-group label="Fecha Inicio (*):" label-for="txtFecha" label-class="labels">
                        <date-picker readonly="readonly" v-model="form.fecha_inicio" :config="options"></date-picker>
                        <div class="text-danger text-center" v-if="errors.fecha_inicio">{{errors.fecha_inicio}}</div>
                    </b-form-group>
                </b-col>
                <b-col xs="12" sm="6" md="3">
                    <b-form-group label="Fecha Fin (*):" label-for="txtFecha" label-class="labels">
                        <date-picker readonly="readonly" v-model="form.fecha_fin" :config="options"></date-picker>
                        <div class="text-danger text-center" v-if="errors.fecha_fin">{{errors.fecha_fin}}</div>
                    </b-form-group>
                </b-col>
                <b-col xs="12" sm="6" md="3">
                    <b-form-group label="Tipo de Venta (*):" label-for="cmbTipoVenta" label-class="labels">
                        <b-form-select id="cmbTipoVenta" v-model="form.tipo_ventas_id">
                            <!-- These options will appear after the ones from 'options' prop -->
                            <option value="">Todas</option>
                            <option value="1">Afiliación</option>
                            <option value="2">Renovación</option>
                        </b-form-select>
                    </b-form-group>
                </b-col>
                <b-col xs="12" sm="6" md="3">
                    <div class="text-right">
                        <b-button style="width:100%;" squared type="submit" variant="primary" class="mt-4">
                            <i class="fa fa-refresh mr-2" aria-hidden="true"></i>
                            <span>Actualizar</span>
                        </b-button>
                    </div>
                </b-col>
            </b-row>
            <b-row>
                <b-col xs="12" sm="6" md="3">
                    <b-form-group label="Polizas (*):" label-for="cmbPolizas" label-class="labels">
                        <b-form-select id="cmbPolizas" v-model="form.tipo_polizas_id">
                            <!-- These options will appear after the ones from 'options' prop -->
                            <option value="">Todas</option>
                            <option v-for="poliza in polizas" v-bind:key="poliza.id" :value="poliza.id">{{poliza.tipo}}</option>
                        </b-form-select>
                    </b-form-group>
                </b-col>
                <b-col xs="12" sm="6" md="3">
                    <b-form-group label="Pagos (*):" label-for="cmbPagos" label-class="labels">
                        <b-form-select id="cmbPagos" v-model="form.pagos_estado">
                            <option value="">Todos</option>
                            <option value="1">Capturados</option>
                            <option value="0">Cancelados</option>
                        </b-form-select>
                    </b-form-group>
                </b-col>
                <b-col xs="12" sm="6" md="3">
                    <b-form-group label="Ruta (*):" label-for="cmbRutas" label-class="labels">
                        <b-form-select id="cmbRutas" v-model="form.rutas_id">
                            <option value="">Todas</option>
                            <option v-for="ruta in rutas" v-bind:key="ruta.id" :value="ruta.id">{{ruta.ruta}}</option>
                        </b-form-select>
                    </b-form-group>
                </b-col>
                <b-col xs="12" sm="6" md="3">
                    <b-form-group label="Cobrador (*):" label-for="cmbCobrador" label-class="labels">
                        <b-form-select id="cmbCobrador" v-model="form.cobrador_id">
                            <!-- These options will appear after the ones from 'options' prop -->
                            <option value="">Todos</option>
                            <option v-for="cobrador in cobradores" v-bind:key="cobrador.id" :value="cobrador.id">{{cobrador.name}}</option>
                        </b-form-select>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col xs="12">
                    <div>
                        <b-tabs content-class="mt-3" justified>
                            <b-tab title="Información Específica" active>
                                <b-embed type="iframe" aspect="16by9" :src="this.pdf_url_especifico" allowfullscreen></b-embed>
                            </b-tab>
                            <b-tab title="Gráficas">
                                <b-embed type="iframe" aspect="16by9" :src="this.pdf_url_especifico" allowfullscreen></b-embed>
                            </b-tab>
                        </b-tabs>
                    </div>
                </b-col>
            </b-row>
        </b-form>
    </b-card>
</div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            options: {
                format: 'YYYY-MM-DD',
                locale: 'es',
                useCurrent: true,
                showClear: true,
                showClose: true,
                ignoreReadonly: true
            },
            pdf_url_especifico: '',
            polizas: [],
            pagos: [],
            rutas: [],
            cobradores: [],
            form: {
                fecha_inicio: '',
                fecha_fin: '',
                tipo_polizas_id: '',
                tipo_ventas_id: '',
                pagos_estado: '',
                rutas_id: '',
                cobrador_id: ''
            },
            errors: {
                fecha_inicio: '',
                fecha_fin: ''
            }
        }
    },
    methods: {
        getTiposPoliza() {
            //traigo los tipos de poliza
            axios.get(this.$hostname + 'tipos_polizas')
                .then(resp => {
                    this.polizas = resp.data.data
                })
                .catch(error => {
                    console.log(error)
                })
        },
        getRutasCobros() {
            //traigo las rutas de cobro disponibles
            axios.get(this.$hostname + 'rutas/get_rutas_disponibles')
                .then(resp => {
                    this.rutas = resp.data.data
                })
                .catch(error => {
                    console.log(error)
                })
        },
        getVendedores() {
            axios.get(this.$hostname + 'usuarios/vendedores')
                .then(resp => {
                    this.cobradores = resp.data.data
                })
                .catch(error => {
                    console.log(error)
                })
        },
        onSubmit(evt) {
            evt.preventDefault()
            try {
                if (this.form.fecha_inicio) {
                    this.$store.dispatch('loading');
                    axios({
                        url: 'http://localhost:8000/ventas/reporte_especifico_pagos?fecha_inicio=' + this.form.fecha_inicio + '&fecha_fin=' + this.form.fecha_fin + '&tipo_polizas_id=' + this.form.tipo_polizas_id + '&pagos_estado=' + this.form.pagos_estado + '&rutas_id=' + this.form.rutas_id + '&cobrador_id=' + this.form.cobrador_id + '&tipo_ventas_id=' + this.form.tipo_ventas_id,
                        method: 'GET',
                        responseType: 'blob',
                    }).then((response) => {
                        var fileURL = window.URL.createObjectURL(new Blob([response.data], {
                            type: 'application/pdf'
                        }));
                        var fileLink = document.createElement('a');
                        this.pdf_url_especifico = fileURL;
                        fileLink.href = fileURL;
                        fileLink.setAttribute('download', 'file.pdf');
                        document.body.appendChild(fileLink);
                        this.$store.dispatch('success');
                        //fileLink.click();
                    }).catch(error => {
                        this.$toasted.show("Ha ocurrido un error en el servidor por favor reintente", {
                            iconPack: 'fontawesome',
                            type: 'error',
                            theme: 'toasted-primary',
                            icon: 'close',
                            duration: 4000,
                            position: 'top-center',
                            closeOnSwipe: true,
                            keepOnHover: true
                        });
                        this.$store.dispatch('error');
                    })
                }

            } catch (error) {
                this.$store.dispatch('error')
            }
        },
    },
    created() {
        this.getTiposPoliza();
        this.getVendedores();
        this.getRutasCobros()
        this.$store.dispatch('success')
    },
}
</script>

<style>

</style>
