<template>
<div>
    <b-card style="border-radius:0;" class="pb-5">
        <div slot="header">Generar Reportes</div>
        <b-form @submit="onSubmit">
            <b-row>
                <b-col xs="12" sm="6" md="4">
                    <b-form-group label="Fecha Inicio Pago (*):" label-for="txtFecha" label-class="labels">
                        <date-picker readonly="readonly" v-model="form.fecha_inicio" :config="options"></date-picker>
                        <div class="text-danger text-center" v-if="errors.fecha_inicio">{{errors.fecha_inicio}}</div>
                    </b-form-group>
                </b-col>
                <b-col xs="12" sm="6" md="4">
                    <b-form-group label="Fecha Fin Pago (*):" label-for="txtFecha" label-class="labels">
                        <date-picker readonly="readonly" v-model="form.fecha_fin" :config="options"></date-picker>
                        <div class="text-danger text-center" v-if="errors.fecha_fin">{{errors.fecha_fin}}</div>
                    </b-form-group>
                </b-col>
                <b-col xs="12" sm="6" md="4">
                    <div class="text-right">
                        <b-button style="width:100%;" squared type="submit" variant="primary" class="mt-4">
                            <i class="fa fa-refresh mr-2" aria-hidden="true"></i>
                            <span>Actualizar</span>
                        </b-button>
                    </div>
                </b-col>
            </b-row>
            <b-row>
                <b-col xs="12" sm="6" md="4">
                    <b-form-group label="Fecha Captura (*):" label-for="txtFecha" label-class="labels">
                        <date-picker readonly="readonly" v-model="form.fecha_captura" :config="options"></date-picker>
                    </b-form-group>
                </b-col>
                <b-col xs="12" sm="6" md="4">
                    <b-form-group label="Capturado Por Usuario (*):" label-for="cmbCobrador" label-class="labels">
                        <b-form-select id="cmbCobrador" v-model="form.capturo_id">
                            <!-- These options will appear after the ones from 'options' prop -->
                            <option value="">Todos</option>
                            <option v-for="cobrador in cobradores" v-bind:key="cobrador.id" :value="cobrador.id">{{cobrador.name}}</option>
                        </b-form-select>
                    </b-form-group>
                </b-col>
                <b-col xs="12" sm="6" md="4">
                    <b-form-group label="Tipo de Venta (*):" label-for="cmbTipoVenta" label-class="labels">
                        <b-form-select id="cmbTipoVenta" v-model="form.tipo_ventas_id">
                            <!-- These options will appear after the ones from 'options' prop -->
                            <option value="">Todas</option>
                            <option value="1">Afiliación</option>
                            <option value="2">Renovación</option>
                        </b-form-select>
                    </b-form-group>
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
            <!--<b-row hidden>
                <b-col xs="12" sm="12" md="6">
                    <b-form-group label="Nombre del Reporte:" label-for="txtAbono" label-class="labels">
                        <b-form-input required maxlength="4" v-model="form.abono" type="text" id="txtAbono"></b-form-input>
                    </b-form-group>
                </b-col>
                <b-col xs="12" sm="12" md="6">
                    <b-form-group label="Ordenar Reporte (*):" label-for="cmbCobrador" label-class="labels">
                        <b-form-select id="cmbCobrador" v-model="form.cobrador_id">
                            <option value="">Todos</option>
                            <option v-for="cobrador in cobradores" v-bind:key="cobrador.id" :value="cobrador.id">{{cobrador.name}}</option>
                        </b-form-select>
                    </b-form-group>
                </b-col>
            </b-row>-->
            <b-row>
                <b-col xs="12">
                    <div>
                        <b-tabs content-class="mt-3" justified>
                            <b-tab title="Información Específica" active>
                                <!--<b-embed type="iframe" aspect="16by9" :src="this.pdf_url_especifico" allowfullscreen></b-embed>-->
                                <div class="table-responsive-md">

                                    <div class="float-right mb-3" v-if="this.datos_result.length>0">
                                        <b-button squared variant="primary" @click="descargarPdfLista()"><i class="fa fa-file-pdf-o" aria-hidden="true"></i> <strong> PDF</strong></b-button>
                                    </div>

                                    <table class="table" v-for="(cobrador,index) in cobradores_id" v-bind:key="cobrador.id" v-bind:index="index">
                                        <thead>
                                            <tr style="background-color:#17a2b8; color:#fff;">
                                                <th scope="col">COBRADOR: {{cobrador.nombre}}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th scope="row">
                                                    <table class="table table-striped" style="font-weight:normal;">
                                                        <thead>
                                                            <tr>
                                                                <th scope="col"># Pago</th>
                                                                <th scope="col">Póliza</th>
                                                                <th scope="col">Fecha Abono</th>
                                                                <th scope="col">Titular</th>
                                                                <th scope="col">Capturista</th>
                                                                <th scope="col">Ruta</th>
                                                                <th scope="col"># Venta</th>
                                                                <th scope="col">T. Venta</th>
                                                                <th scope="col">T. Póliza</th>
                                                                <th scope="col">Cantidad</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr :class="[abono.status?'':'eliminado']" v-for="(abono) in datos_result" v-bind:key="abono.id">
                                                                <th v-if="cobrador.id==abono.id_cobrador" scope="row"><span>{{abono.num_poliza}}</span></th>
                                                                <th v-if="cobrador.id==abono.id_cobrador" scope="row"><span>{{abono.id}}</span></th>
                                                                <td v-if="cobrador.id==abono.id_cobrador"><span>{{abono.fecha_abono}}</span></td>
                                                                <td v-if="cobrador.id==abono.id_cobrador"><span>{{abono.nombre}}</span></td>
                                                                <td v-if="cobrador.id==abono.id_cobrador"><span>{{abono.capturista}}</span></td>
                                                                <td v-if="cobrador.id==abono.id_cobrador"><span>{{abono.ruta}}</span></td>
                                                                <td v-if="cobrador.id==abono.id_cobrador"><span>{{abono.ventaId}}</span></td>
                                                                <td v-if="cobrador.id==abono.id_cobrador"><span>{{abono.tipoVenta}}</span></td>
                                                                <td v-if="cobrador.id==abono.id_cobrador"><span>{{abono.tipoPoliza}}</span></td>
                                                                <td v-if="cobrador.id==abono.id_cobrador"><span>$ {{ abono.cantidad | numFormat('0,000.00')}}</span></td>
                                                            </tr>
                                                            <tr style="border-bottom:3px solid #007bff; color:#007bff;">
                                                                <td colspan="10" align="right"><strong>ABONOS COBRADOR POR: {{cobrador.nombre}}</strong></td>
                                                            </tr>
                                                            <tr>
                                                                <td colspan="10">
                                                                    <table class="table">
                                                                        <tbody>
                                                                            <tr style="background-color:#fff; color:#000; font-weight:600;">
                                                                                <td width="90%" align="right">
                                                                                    Abonos Cobrados:
                                                                                </td>
                                                                                <td width="10%" align="right" style="background-color:#e9ecef; color:#007bff;">
                                                                                    $ {{cobrador.cobrado | numFormat('0,000.00')}}
                                                                                </td>
                                                                            </tr>
                                                                            <tr style="background-color:#fff; color:#000; font-weight:600;">
                                                                                <td width="90%" align="right">
                                                                                    Abonos Cancelados:
                                                                                </td>
                                                                                <td width="10%" align="right" style="background-color:#e9ecef; color:#dc3545;">
                                                                                    $ {{cobrador.cancelado | numFormat('0,000.00')}}
                                                                                </td>
                                                                            </tr>
                                                                            <tr style="background-color:#fff; color:#000; font-weight:600;">
                                                                                <td width="90%" align="right">
                                                                                    Total Cobrado:
                                                                                </td>
                                                                                <td width="10%" align="right" style="background-color:#e9ecef; color:#28a745;">
                                                                                    $ {{cobrador.total | numFormat('0,000.00')}}
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </td>
                                                            </tr>

                                                        </tbody>
                                                    </table>
                                                </th>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div class="table-responsive-md">
                                        <table class="table">
                                            <tbody>
                                                <tr style="background-color:#007bff; border-bottom:3px solid #007bff; color:#fff;">
                                                    <td colspan="2" align="right"><strong>TOTAL DE INGRESOS POR COBRANZA:</strong></td>
                                                </tr>
                                                <tr style="background-color:#fff; color:#000; font-weight:600; font-size:16px;">
                                                    <td width="90%" align="right">
                                                        Abonos Cobrados:
                                                    </td>
                                                    <td width="10%" align="right" style="background-color:#e9ecef; color:#007bff;">
                                                        $ {{this.cobrado | numFormat('0,000.00')}}
                                                    </td>
                                                </tr>
                                                <tr style="background-color:#fff; color:#000; font-weight:600; font-size:16px;">
                                                    <td width="90%" align="right">
                                                        Abonos Cancelados:
                                                    </td>
                                                    <td width="10%" align="right" style="background-color:#e9ecef; color:#dc3545;">
                                                        $ {{this.cancelado | numFormat('0,000.00')}}
                                                    </td>
                                                </tr>
                                                <tr style="background-color:#fff; color:#000; font-weight:600; font-size:16px;">
                                                    <td width="90%" align="right">
                                                        Total Cobrado:
                                                    </td>
                                                    <td width="10%" align="right" style="background-color:#e9ecef; color:#28a745;">
                                                        $ {{this.total | numFormat('0,000.00')}}
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                </div>
                            </b-tab>
                            <b-tab title="Gráficas">
                                <Graficas :datos="datos_result" :cobradores="cobradores_id" :datos_busqueda="form" :cobrado="cobrado" :cancelado="cancelado" :total="total"></Graficas>
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
import Graficas from '../reportes/GraficasPagos'
export default {
    components: {
        Graficas
    },
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
            //con estos datos ordeno el resultado por cobrador
            cobradores_id: [],
            datos_result: [],
            cobrado: 0,
            cancelado: 0,
            total: 0,
            //fin de ordenar datos
            pdf_url_especifico: '',
            polizas: [],
            pagos: [],
            rutas: [],
            cobradores: [],
            form: {
                fecha_captura: '',
                capturo_id: '',
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
        descargarPdfLista() {
            //traigo los tipos de poliza
            window.open("http://localhost:8000/ventas/reporte_especifico_pagos?fecha_inicio=" + this.form.fecha_inicio + "&fecha_fin=" + this.form.fecha_fin + "&imprimir=yes");
        },
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
                if (this.form.fecha_inicio && this.form.fecha_fin) {
                    this.$store.dispatch('loading');
                    let url_query = "";
                    if (this.form.fecha_captura) {
                        url_query = this.$hostname + 'ventas/reporte_especifico_pagos?fecha_inicio=' + this.form.fecha_inicio + '&fecha_fin=' + this.form.fecha_fin + '&tipo_polizas_id=' + this.form.tipo_polizas_id + '&pagos_estado=' + this.form.pagos_estado + '&rutas_id=' + this.form.rutas_id + '&cobrador_id=' + this.form.cobrador_id + '&tipo_ventas_id=' + this.form.tipo_ventas_id + '&capturo_id=' + this.form.capturo_id + '&fecha_captura=' + this.form.fecha_captura
                    } else {
                        url_query = this.$hostname + 'ventas/reporte_especifico_pagos?fecha_inicio=' + this.form.fecha_inicio + '&fecha_fin=' + this.form.fecha_fin + '&tipo_polizas_id=' + this.form.tipo_polizas_id + '&pagos_estado=' + this.form.pagos_estado + '&rutas_id=' + this.form.rutas_id + '&cobrador_id=' + this.form.cobrador_id + '&tipo_ventas_id=' + this.form.tipo_ventas_id + '&capturo_id=' + this.form.capturo_id
                    }
                    axios.get(url_query).
                    then((response) => {
                        //reseteo los totales
                        this.cobrado = 0
                        this.cancelado = 0
                        this.total = 0
                        //fin de reseteo
                        this.cobradores_id = []
                        this.$store.dispatch('success');
                        this.datos_result = response.data

                        let index_cobrador = 0;
                        if (response.data.length) {
                            this.cobradores_id.push({
                                nombre: response.data[0].name,
                                id: response.data[0].id_cobrador,
                                cobrado: 0,
                                cancelado: 0,
                                total: 0
                            });
                        }

                        for (let index = 0; index < response.data.length; index++) {
                            if (index == 0) {
                                //si solo es un row dejo el total al primer arreglo
                                this.cobradores_id[index_cobrador].cobrado = response.data[index].cantidad
                                if (response.data[index].status == 0) {
                                    this.cobradores_id[index_cobrador].cancelado = response.data[index].cantidad
                                }
                                this.cobradores_id[index_cobrador].total = this.cobradores_id[index_cobrador].cobrado - this.cobradores_id[index_cobrador].cancelado
                            } else {
                                if (this.cobradores_id[index_cobrador].id == response.data[index].id_cobrador) {
                                    this.cobradores_id[index_cobrador].cobrado += response.data[index].cantidad
                                    if (response.data[index].status == 0) {
                                        this.cobradores_id[index_cobrador].cancelado += response.data[index].cantidad
                                    }
                                    this.cobradores_id[index_cobrador].total = this.cobradores_id[index_cobrador].cobrado - this.cobradores_id[index_cobrador].cancelado
                                }
                                //sino es solo un row, se debe sumar todo row
                            }
                            if (response.data[index + 1]) {
                                if (response.data[index + 1].id_cobrador != response.data[index].id_cobrador) {
                                    index_cobrador++ //aumento el index del cobrador
                                    this.cobradores_id.push({
                                        nombre: response.data[index + 1].name,
                                        id: response.data[index + 1].id_cobrador,
                                        cobrado: 0,
                                        cancelado: 0,
                                        total: 0
                                    });
                                }
                            }

                        }
                        //haciendo la suma total
                        for (let index = 0; index < this.cobradores_id.length; index++) {
                            this.cobrado += this.cobradores_id[index].cobrado
                            this.cancelado += this.cobradores_id[index].cancelado
                            this.total += this.cobradores_id[index].total
                        }

                        /*var fileURL = window.URL.createObjectURL(new Blob([response.data], {
                            type: 'application/pdf'
                        }));
                        var fileLink = document.createElement('a');
                        this.pdf_url_especifico = fileURL;
                        fileLink.href = fileURL;
                        fileLink.setAttribute('download', 'file.pdf');
                        document.body.appendChild(fileLink);
                        //fileLink.click();
                        */
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
                } else {
                    this.$toasted.show("Seleccione una fecha Incio y una fecha Fin", {
                        iconPack: 'fontawesome',
                        type: 'error',
                        theme: 'toasted-primary',
                        icon: 'close',
                        duration: 4000,
                        position: 'top-center',
                        closeOnSwipe: true,
                        keepOnHover: true
                    });
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
    }
}
</script>

<style>

</style>
