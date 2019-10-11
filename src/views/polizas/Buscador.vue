<template>
<div>
    <b-modal @hidden="limpiar_buscador" @close="limpiar_buscador" id="modalBuscador" size="lg" title="Buscar Póliza" no-close-on-backdrop hide-footer>
        <b-col md="12">
            <b-row>
                <b-col xs="12" sm="3" md="3">
                    <b-form-group label="Núm. Póliza (*):" label-for="txtNumBuscador" label-class="labels">
                        <b-form-input readonly maxlength="6" v-model="buscador.num_poliza" type="text" id="txtNumBuscador"></b-form-input>
                        <div class="text-danger text-center" v-if="errors.num_poliza">{{errors.num_poliza}}</div>
                    </b-form-group>
                </b-col>
                <b-col xs="12" md="9">
                    <b-form-group label="Titular" label-for="txtComunidad" label-class="labels">
                        <autocomplete ref="autocomplete" v-model="buscador.num_poliza" :source="this.$hostname+'polizas/beneficiario?filter='" results-property="data" :results-display="formattedDisplayBeneficiario" results-value="polizas_id" @clear="buscador.num_poliza='';buscador.titular=''" @nothingSelected="buscador.num_poliza=''" @selected="addDistributionGroupBeneficiario" placeholder="Buscar Titular" name="txtTitularBuscar">
                            <template v-slot:noResults>
                                <strong>Sin </strong>resultados.
                            </template>
                        </autocomplete>
                        <div class="text-danger text-center" v-if="errors.localidad_id">{{errors.localidad_id}}</div>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col xs="12" class="text-center" v-if="buscador.num_poliza">
                    <b-button class="mt-4 mb-4" squared variant="primary" @click="getVentaDatos(buscador.num_poliza)"><i class="fa fa-search" aria-hidden="true"></i> Cargar Datos</b-button>
                </b-col>
            </b-row>
        </b-col>
    </b-modal>
</div>
</template>

<script>
export default {
    data() {
        return {
            buscador: {
                num_poliza: '',
                titular: '',
                titulares: []
            },
        }
    },
    methods: {
        formattedDisplayBeneficiario(result) {
            return 'Núm. Póliza ( ' + result.polizas_id + ' ) [Titular: ' + result.nombre + ' Calle ' + result.calle + ', #' + result.numero + ', Col. ' + result.colonia + ']'
        },
        addDistributionGroupBeneficiario(group) {
            this.buscador.titular = group.display
        },
    },
}
</script>
