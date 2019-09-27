<template>
<div>
    <b-card style="border-radius:0;">
        <div slot="header"><i class="fa fa-shopping-basket" aria-hidden="true"></i> Servicios</div>
        <b-tabs content-class="mt-3">
            <b-tab title="Servicios" active>
                <ListaServicios></ListaServicios>
            </b-tab>
            <b-tab title="Tipo de Servicio">
              <Listatipos></Listatipos>
            </b-tab>
        </b-tabs>
    </b-card>
</div>
</template>

<script>
import ListaServicios from '../servicios/ListaServicios'
import Listatipos from '../servicios/tipos/ListaTipos'

import axios from 'axios'
import {
    mapGetters
} from 'vuex'
export default {
    components: {
        ListaServicios,
        Listatipos
    },
    data() {
        return {}
    },
    methods: {

    },
    computed: {
        // mix the getters into computed with object spread operator
        ...mapGetters([
            'permisos'
        ]),
    }
}
</script>

<style lang="css">

</style>
