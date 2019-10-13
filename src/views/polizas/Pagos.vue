<template>
<div>
    <b-card style="border-radius:0;" class="pb-5">
        <div slot="header">Módulo de Cobranza</div>
        <b-row>
            <b-col xs="12" sm="6" md="4">
                <div class="opcion vender text-center mt-2 mb-2">
                    <img rounded="circle" src="../../assets/images/pagar.png" alt="Image 3">
                    <div class="nombre-opcion mt-3  text-center">
                        Control de Pagos
                    </div>
                    <div class="mt-5">
                        <b-button pill variant="outline-primary" @click="urlIr('cobranza/pagar/todas')">Seleccionar</b-button>
                    </div>
                </div>
            </b-col>
            <b-col xs="12" sm="6" md="4">
                <div class="opcion vender text-center mt-2 mb-2">
                    <img rounded="circle" src="../../assets/images/search.png" alt="Image 3">
                    <div class="nombre-opcion mt-3  text-center">
                        Consultar Carteras
                    </div>
                    <div class="mt-5">
                        <b-button pill variant="outline-primary" @click="urlIr('cobranza/consultar')">Seleccionar</b-button>
                    </div>
                </div>
            </b-col>
            <b-col xs="12" sm="6" md="4">
                <div class="opcion vender text-center mt-2 mb-2">
                    <img rounded="circle" src="../../assets/images/reportes.png" alt="Image 3">
                    <div class="nombre-opcion mt-3  text-center">
                        Reportes de Cobranza
                    </div>
                    <div class="mt-5">
                        <b-button pill variant="outline-primary" @click="urlIr('ventas/cancelar')">Seleccionar</b-button>
                    </div>
                </div>
            </b-col>
        </b-row>
    </b-card>
</div>
</template>

<script>
export default {
    methods: {
        urlIr: function (url) {
            //window.open(this.$hostname_frontend + url, "_blank");
            this.$router.push(url);
        },
    },

}
</script>

<style>

</style>
