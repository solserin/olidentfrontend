<template>
<div>
    <b-card style="border-radius:0;" class="pb-5">
        <div slot="header">Módulo de Ventas</div>
        <b-row>
            <b-col xs="12" sm="6" md="2">
                <div class="opcion vender text-center mt-2 mb-2">
                    <img rounded="circle" src="../../assets/images/vender.png" alt="Image 3">
                    <div class="nombre-opcion mt-3  text-center">
                        Afiliar Póliza
                    </div>
                    <div class="mt-5">
                        <b-button pill variant="outline-primary" @click="urlIr('ventas/vender')">Seleccionar</b-button>
                    </div>
                </div>
            </b-col>
            <b-col xs="12" sm="6" md="2">
                <div class="opcion vender text-center mt-2 mb-2">
                    <img rounded="circle" src="../../assets/images/vender.png" alt="Image 3">
                    <div class="nombre-opcion mt-3  text-center">
                        Renovar pólizas
                    </div>
                    <div class="mt-5">
                        <b-button pill variant="outline-primary" @click="urlIr('ventas/renovar')">Seleccionar</b-button>
                    </div>
                </div>
            </b-col>
            <b-col xs="12" sm="6" md="2">
                <div class="opcion vender text-center mt-2 mb-2">
                    <img rounded="circle" src="../../assets/images/editar.png" alt="Image 3">
                    <div class="nombre-opcion mt-3  text-center">
                        Modificar Pólizas
                    </div>
                    <div class="mt-5">
                        <b-button pill variant="outline-primary" @click="urlIr('ventas/editar')">Seleccionar</b-button>
                    </div>
                </div>
            </b-col>
            <b-col xs="12" sm="6" md="2">
                <div class="opcion vender text-center mt-2 mb-2">
                    <img rounded="circle" src="../../assets/images/delete.png" alt="Image 3">
                    <div class="nombre-opcion mt-3  text-center">
                        Cancelar Pólizas
                    </div>
                    <div class="mt-5">
                        <b-button pill variant="outline-primary" @click="urlIr('ventas/cancelar')">Seleccionar</b-button>
                    </div>
                </div>
            </b-col>
            <b-col xs="12" sm="6" md="2">
                <div class="opcion vender text-center mt-2 mb-2">
                    <img rounded="circle" src="../../assets/images/search.png" alt="Image 3">
                    <div class="nombre-opcion mt-3  text-center">
                        Consultar Pólizas
                    </div>
                    <div class="mt-5">
                        <b-button pill variant="outline-primary" @click="urlIr('ventas/consultar')">Seleccionar</b-button>
                    </div>
                </div>
            </b-col>
            <b-col xs="12" sm="6" md="2">
                <div class="opcion vender text-center mt-2 mb-2">
                    <img rounded="circle" src="../../assets/images/reportes.png" alt="Image 3">
                    <div class="nombre-opcion mt-3  text-center">
                        Consultar Reportes
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
