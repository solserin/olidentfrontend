<template>
<div>
    <div v-if="this.datos.length>0" class="float-right d-none d-lg-block d-xl-none d-none d-xl-block">
        <b-button squared variant="primary" @click="PrintImage"><i class="fa fa-file-pdf-o" aria-hidden="true"></i> <strong> PDF</strong></b-button>
    </div>
    <div>
        <canvas class="d-none d-lg-block d-xl-none d-none d-xl-block" id="myChart"></canvas>
    </div>
</div>
</template>

<script>
import Chart from 'chart.js';
import ChartJsPluginDataLabels from 'chartjs-plugin-datalabels'
import axios from 'axios'
var myChart = null;
export default {
    props: {
        datos_busqueda: {
            type: Object
        },
        datos: {
            type: Array
        },
        cobradores: {
            type: Array
        },
        cobrado: {
            type: Number
        },
        cancelado: {
            type: Number
        },
        total: {
            type: Number
        }
    },
    watch: {
        datos: function () {},
        cobradores: function () {
            this.datos_graficas();
        },
        datos_busqueda: function () {
            this.datos_de_la_busqueda = datos_busqueda
        }
    },
    data() {
        return {
            //datos para la grafica
            cobradores_nombres: [],
            datos_de_la_busqueda: [],
            cobradores_cobrado: [],
            cobradores_cancelado: [],
            cobradores_total: [],
            imagen: ''
        }
    },
    methods: {
        //con este metodo llenos los valores de toda la cobranza
        datos_graficas() {
            this.cobradores_nombres = []
            this.cobradores_cobrado = []
            this.cobradores_cancelado = []
            this.cobradores_total = []
            this.cobradores.forEach(element => {
                this.cobradores_nombres.push(element.nombre);
                this.cobradores_cobrado.push(element.cobrado);
                this.cobradores_cancelado.push(element.cancelado);
                this.cobradores_total.push(element.total);
            });
            this.crearGrafica();
        },
        crearGrafica() {
            var ctx = document.getElementById('myChart');
            if (myChart != null) {
                myChart.destroy();
            }
            Chart.defaults.global.defaultFontColor = 'black';
            Chart.defaults.global.defaultFontSize = 14;
            myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: this.cobradores_nombres,
                    datasets: [{
                        label: '$ Cobrado',
                        data: this.cobradores_cobrado,
                        backgroundColor: '#007bff',
                        borderColor: '#007bff ',
                        borderWidth: 1
                    }, {
                        label: '$ Cancelado',
                        data: this.cobradores_cancelado,
                        backgroundColor: '#dc3545',
                        borderColor: '#dc3545 ',
                        borderWidth: 1
                    }, {
                        label: '$ Total Efectivo',
                        data: this.cobradores_total,
                        backgroundColor: '#28a745',
                        borderColor: '#28a745',
                        borderWidth: 1
                    }]
                },
                options: {
                    plugins: {
                        datalabels: {
                            formatter: function (value, context) {
                                return '$ ' + value.toLocaleString();
                            },
                            labels: {
                                title: {
                                    font: {
                                        weight: 'bold',

                                    }
                                },
                                value: {
                                    color: 'green'
                                }
                            }
                        }
                    },
                    title: {
                        display: true,
                        text: 'COBRANZA DE TODOS LOS COBRADORES',

                    },
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true,
                                // Include a dollar sign in the ticks
                                callback: function (value, index, values) {
                                    return '$ ' + value.toLocaleString();
                                },
                                fontStyle:'bold',
                                fontSize:14
                            }
                        }]
                    }
                }
            });
        },
        PrintImage() {
            var canvas = document.getElementById("myChart");
            this.imagen = canvas.toDataURL();
            /* window.open('http://localhost:8000/polizas/reporte_grafica_cobranza?todos_los_cobradores='+(window.btoa(canvas.toDataURL())));
            console.log(canvas.toDataURL())
*/
            this.$store.dispatch('loading');
            axios({
                url: 'http://localhost:8000/polizas/reporte_grafica_cobranza',
                method: 'POST',
                data: {
                    ima: this.imagen,
                    nombres: this.cobradores_nombres,
                    datos: this.datos_busqueda,
                    cobrado: this.cobrado,
                    cancelado: this.cancelado,
                    total: this.total
                },
                responseType: 'blob',
            }).then((response) => {
                var fileURL = window.URL.createObjectURL(new Blob([response.data], {
                    type: 'application/pdf'
                }));
                var fileLink = document.createElement('a');
                this.pdf_url = fileURL;
                fileLink.href = fileURL;
                this.pdf_url = fileLink.href;
                fileLink.setAttribute('download', 'file.pdf');
                document.body.appendChild(fileLink);
                this.$store.dispatch('success');
                fileLink.click();
            }).catch(error => {
                this.resetear_pdf()
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
            //win.print();
        }
    },

}
</script>
