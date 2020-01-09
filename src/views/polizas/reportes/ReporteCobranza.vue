<template>
  <div>
    <b-card style="border-radius:0;" class="pb-5">
      <div slot="header">Generar Reportes</div>
      <b-form @submit="onSubmit">
        <b-row>
          <b-col xs="12" sm="6" md="3">
            <b-form-group label="Fecha Inicio Pago (*):" label-for="txtFecha" label-class="labels">
              <date-picker readonly="readonly" v-model="form.fecha_inicio" :config="options"></date-picker>
              <div
                class="text-danger text-center"
                v-if="errors.fecha_inicio"
              >{{errors.fecha_inicio}}</div>
            </b-form-group>
          </b-col>
          <b-col xs="12" sm="6" md="3">
            <b-form-group label="Fecha Fin Pago (*):" label-for="txtFecha" label-class="labels">
              <date-picker readonly="readonly" v-model="form.fecha_fin" :config="options"></date-picker>
              <div class="text-danger text-center" v-if="errors.fecha_fin">{{errors.fecha_fin}}</div>
            </b-form-group>
          </b-col>
          <b-col xs="12" sm="6" md="3">
            <b-form-group label="Ruta (*):" label-for="cmbRutas" label-class="labels">
              <b-form-select id="cmbRutas" v-model="form.rutas_id">
                <option value>Selecciones 1 Ruta</option>
                <option v-for="ruta in rutas" v-bind:key="ruta.id" :value="ruta.id">{{ruta.ruta}}</option>
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
          <b-col xs="12">
            <div>
              <b-tabs content-class="mt-3" justified>
                <b-tab title="Reporte de Cobranza por fechas" active>
                  <!--<b-embed type="iframe" aspect="16by9" :src="this.pdf_url_especifico" allowfullscreen></b-embed>-->
                  <div class="table-responsive-md">
                    <div class="float-right mb-3" v-if="this.datos_result.length>0">
                      <b-button squared variant="primary" @click="descargarPdfLista()">
                        <i class="fa fa-file-pdf-o" aria-hidden="true"></i>
                        <strong>PDF</strong>
                      </b-button>
                    </div>

                    <table class="table table-striped" style="font-weight:normal;">
                      <thead>
                        <tr>
                          <th scope="col">Póliza</th>
                          <th scope="col">Fecha</th>
                          <th scope="col">Titular</th>
                          <th scope="col">Ruta</th>
                          <th scope="col">Importe</th>
                          <th scope="col">Abono</th>
                          <th scope="col">Saldo</th>
                          <th scope="col">Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(abono) in datos_result" v-bind:key="abono.aid">
                          <th scope="row">
                            <span>{{abono.polizas_id}}</span>
                          </th>
                          <td>
                            <span>{{abono.fecha_abono}}</span>
                          </td>
                          <td>
                            <span>{{abono.nombre}}</span>
                          </td>
                          <td>
                            <span>{{abono.ruta}}</span>
                          </td>
                          <td>
                            <span>$ {{ abono.importe | numFormat('0,000.00')}}</span>
                          </td>
                          <td>
                            <span>$ {{ abono.cantidad | numFormat('0,000.00')}}</span>
                          </td>
                          <td>
                            <span>$ {{ abono.saldo | numFormat('0,000.00')}}</span>
                          </td>
                          <td>
                            <b-button
                              class="mr-2"
                              squared
                              size="sm"
                              variant="secondary"
                              @click="mostrarTarjeta(abono.idVenta)"
                            >
                              <i class="fa fa-file-pdf-o" aria-hidden="true"></i> Pdf
                            </b-button>
                            <b-button
                              class="mr-2"
                              squared
                              size="sm"
                              variant="success"
                              @click="verPagos(abono.idVenta)"
                            >
                              <i class="fa fa-dollar" aria-hidden="true"></i> Pagos
                            </b-button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </b-tab>
                <b-tab title="Ruta Completa">

                    <b-row>
                      <b-col xs="12" sm="12" md="3">
                        <b-input-group class="mt-3" hidden>
                          <b-input-group-prepend is-text>
                            <b>
                              <i class="fa fa-filter" aria-hidden="true"></i>
                            </b>
                          </b-input-group-prepend>
                          <b-form-select v-model="perPage" >
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
                      <b-col xs="12" sm="12" md="9">
                         <div class="float-right" v-if="this.datos_result.length>0">
                          <b-button squared variant="primary" @click="descargarPdfLista()">
                            <i class="fa fa-file-pdf-o" aria-hidden="true"></i>
                            <strong>PDF</strong>
                          </b-button>
                        </div>


                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col xs="12">
                        <b-table
                          id="table"
                          stacked="lg"
                          responsive
                          :fixed="true"
                          hover
                          :foot-clone="true"
                          :busy.sync="isBusy"
                          :items="myProvider"
                          :fields="fields"
                          :current-page="currentPage"
                          :per-page="perPage"
                          striped
                          show-empty
                          :emptyText="texto"
                          primary-key="id"
                          class="mt-5"
                        >
                          <template v-slot:table-caption>
                            Total de Resultados:
                            <strong>{{rowsTotal}}</strong> de
                            <strong>{{totalRows}}</strong> Registros.
                          </template>
                          <template v-slot:empty="scope">
                            <p class="text-center">{{ scope.emptyText }}</p>
                          </template>
                          <template v-slot:num_poliza="data">
                            <p class="text-center">{{ data.item.num_poliza }}</p>
                          </template>
                          <template v-slot:titular="data">
                            <p class="text-center">{{ data.item.ventas[0].nombre }}</p>
                          </template>
                          <template v-slot:fecha_venta="data">
                            <p class="text-center">{{ data.item.ventas[0].fecha_venta }}</p>
                          </template>
                          <template v-slot:precio="data">
                            <p
                              class="text-center"
                            >$ {{ data.item.ventas[0].total | numFormat('0,000.00')}}</p>
                          </template>
                          <template v-slot:abonado="data">
                            <p
                              class="text-center"
                            >$ {{ data.item.ventas[0].abonado | numFormat('0,000.00')}}</p>
                          </template>
                          <template v-slot:saldo="data">
                            <p
                              class="text-center"
                            >$ {{ data.item.ventas[0].restante | numFormat('0,000.00')}}</p>
                          </template>
                          <template v-slot:acciones="data">
                            <b-button
                              class="mr-2"
                              squared
                              size="sm"
                              variant="success"
                              @click="verPagos(data.item.ventas[0].id)"
                            >
                              <i class="fa fa-dollar" aria-hidden="true"></i> Pagos
                            </b-button>
                          </template>

                          <!-- A virtual composite column -->
                        </b-table>
                        <b-pagination
                          v-model="currentPage"
                          :total-rows="totalRows"
                          :per-page="perPage"
                          first-text="<<"
                          prev-text="<"
                          next-text=">"
                          last-text=">>"
                          class="mt-3 mb-5 justify-content-center"
                        ></b-pagination>
                      </b-col>
                    </b-row>

                </b-tab>
              </b-tabs>
            </div>
          </b-col>
        </b-row>
      </b-form>
    </b-card>
    <b-row>
      <div>
        <modalPdfs :url_pdf="url"></modalPdfs>
      </div>
    </b-row>
  </div>
</template>

<script>
import axios from "axios";
import Graficas from "../reportes/GraficasPagos";
import modalPdfs from "../../pdf";
export default {
  components: {
    modalPdfs
  },
  data() {
    return {
      fields: [
        {
          key: "num_poliza",
          label: "Póliza",
          thClass: "text-primary",
          class: "text-center"
        },
        {
          key: "titular",
          label: "Titular",
          class: "text-center"
        },
        {
          key: "fecha_venta",
          label: "Fecha Venta",
          class: "text-center"
        },
        {
          key: "ruta",
          label: "Ruta",
          class: "text-center"
        },
        {
          key: "precio",
          label: "Precio",
          class: "text-center"
        },
        {
          key: "abonado",
          label: "Abonado",
          class: "text-center"
        },
        {
          key: "saldo",
          label: "Saldo",
          class: "text-center"
        },
        {
          key: "acciones",
          label: "Acciones",
          class: "text-center"
        }
      ],
      texto: "No se ha extraido información de la base de datos",
      cargar: false,
      options: {
        format: "YYYY-MM-DD",
        locale: "es",
        useCurrent: true,
        showClear: true,
        showClose: true,
        ignoreReadonly: true
      },
      url: "",
      //con estos datos ordeno el resultado por cobrador
      datos_result: [],
      ruta_result: [],
      cobrado: 0,
      cancelado: 0,
      total: 0,
      //fin de ordenar datos
      pdf_url_especifico: "",
      polizas: [],
      pagos: [],
      rutas: [],
      cobradores: [],
      form: {
        fecha_inicio: "",
        fecha_fin: "",
        rutas_id: ""
      },
      errors: {
        fecha_inicio: "",
        fecha_fin: ""
      },
      isBusy: false,
      totalRows: 0,
      currentPage: 1,
      perPage: 300,
      parametro_busqueda: 0,
      filter: null,
      rowsTotal: 0
    };
  },
  methods: {
    descargarPdfLista() {
      //traigo los tipos de poliza
      window.open(
        this.$hostname +
          "ventas/reporte_cobranza?fecha_inicio=" +
          this.form.fecha_inicio +
          "&fecha_fin=" +
          this.form.fecha_fin +
          "&rutas_id=" +
          this.form.rutas_id +
          "&imprimir=yes"
      );
    },
    getRutasCobros() {
      //traigo las rutas de cobro disponibles
      axios
        .get(this.$hostname + "rutas/get_rutas_disponibles")
        .then(resp => {
          this.rutas = resp.data.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    onSubmit(evt) {
      evt.preventDefault();
      try {
        if (
          this.form.fecha_inicio &&
          this.form.fecha_fin &&
          this.form.rutas_id
        ) {
          this.$store.dispatch("loading");
          let url_query = "";

          url_query =
            this.$hostname +
            "ventas/reporte_cobranza?fecha_inicio=" +
            this.form.fecha_inicio +
            "&fecha_fin=" +
            this.form.fecha_fin +
            "&rutas_id=" +
            this.form.rutas_id;

          axios
            .get(url_query)
            .then(response => {
              //aqui mando traer toda la ruta que se selecciono
              this.refresh_table();
              this.$store.dispatch("success");
              this.datos_result = response.data;
            })
            .catch(error => {
              this.$toasted.show(
                "Ha ocurrido un error en el servidor por favor reintente",
                {
                  iconPack: "fontawesome",
                  type: "error",
                  theme: "toasted-primary",
                  icon: "close",
                  duration: 4000,
                  position: "top-center",
                  closeOnSwipe: true,
                  keepOnHover: true
                }
              );
              this.$store.dispatch("error");
            });
        } else {
          this.$toasted.show(
            "Seleccione una fecha Incio, una fecha Fin y una ruta por favor.",
            {
              iconPack: "fontawesome",
              type: "error",
              theme: "toasted-primary",
              icon: "close",
              duration: 4000,
              position: "top-center",
              closeOnSwipe: true,
              keepOnHover: true
            }
          );
        }
      } catch (error) {
        this.$store.dispatch("error");
      }
    },
    mostrarTarjeta(id_venta) {
      this.url =
        this.$hostname + "polizas/tarjeta_cobranza?venta_id=" + id_venta;
    },
    verPagos(venta) {
      window.open(
        this.$hostname_frontend + "cobranza/pagar/" + venta,
        "_blank"
      );
    },
    myProvider(ctx) {
      if (this.cargar) {
        this.$store.dispatch("loading");
        this.isBusy = true;
        //aqui valido cual es el parametro de busqueda
        let url_api =
          this.$hostname +
          "ventas/ruta_completa?page=" +
          ctx.currentPage +
          "&per_page=" +
          ctx.perPage +
          "&rutas_id=" +
          this.form.rutas_id;

        let promise = axios.get(url_api);
        console.log(url_api);
        return promise
          .then(resp => {
            var items = resp.data.data.data;
            this.items = resp.data;
            this.currentPage = resp.data.data.current_page;
            this.totalRows = resp.data.data.total;
            this.rowsTotal = resp.data.data.data.length;
            this.isBusy = false;
            this.$store.dispatch("success");
            return items;
          })
          .catch(error => {
            console.log(error);
            this.isBusy = false;
            this.$store.dispatch("error");
            return [];
          });
      }
    },
    refresh_table() {
      this.cargar = true;
      this.$root.$emit("bv::refresh::table", "table");
    }
  },
  created() {
    this.getRutasCobros();
    this.$store.dispatch("success");
  }
};
</script>

<style>
</style>
