<template>
<div>
    <b-card style="border-radius:0;">
        <h1 class="text-center text-dark">
            Módulo de ventas
        </h1>
        <b-row class="mt-5">
            <b-col xs="6" sm="4" md="4" class="pt-4 pb-4">
                <div class="opcion vender text-center" style="background-color: #28a745;" @click="urlIr('ventas/vender')">
                    <img src="../../assets/images/vender.png" alt="" style="margin-left:10px !important;">
                </div>
                <div class="nombre-opcion mt-3  text-center">
                    Vender
                </div>
            </b-col>
            <b-col xs="6" sm="4" md="4" class="pt-4 pb-4">
                <div class="opcion vender text-center" style="background-color: #007bff;" @click="urlIr('ventas/renovar')">
                    <img src="../../assets/images/renovar.png" alt="">
                </div>
                <div class="nombre-opcion mt-3  text-center">
                    Renovar
                </div>
            </b-col>
            <b-col xs="6" sm="4" md="4" class="pt-4 pb-4">
                <div class="opcion vender text-center" style="background-color: #fd7e14  ;" @click="urlIr('ventas/editar')">
                    <img src="../../assets/images/editar.png" alt="" style="margin-left:6px !important;">
                </div>
                <div class="nombre-opcion mt-3  text-center">
                    Modificar Póliza
                </div>
            </b-col>
            <b-col xs="6" sm="4" md="4" class="pt-4 pb-4">
                <div class="opcion vender text-center" style="background-color: #dc3545 ;" @click="urlIr('ventas/vender')">
                    <img src="../../assets/images/cancelar.png" alt="" style="margin-top:40px !important; margin-left:3px;">
                </div>
                <div class="nombre-opcion mt-3  text-center">
                    Cancelar Pólizas
                </div>
            </b-col>
            <b-col xs="6" sm="4" md="4" class="pt-4 pb-4">
                <div class="opcion vender text-center" style="background-color: #6c757d;" @click="urlIr('ventas/vender')">
                    <img src="../../assets/images/consultar.png" alt="" style="max-width:80px;">
                </div>
                <div class="nombre-opcion mt-3  text-center">
                    Consultar
                </div>
            </b-col>
            <b-col xs="6" sm="4" md="4" class="pt-4 pb-4">
                <div class="opcion vender text-center" style="background-color: #20c997  ;" @click="urlIr('ventas/vender')">
                    <img src="../../assets/images/reportes.png" alt="" style="max-width:80px;">
                </div>
                <div class="nombre-opcion mt-3  text-center">
                    Reportes
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
            window.open(this.$hostname_frontend + url, "_blank");
            //this.$router.push('/polizas/vender');
        },
    },

}
</script>

<style>
.opcion {
    width: 120px;
    height: 120px;
    margin-left: auto;
    margin-right: auto;
}

.opcion:hover {
    cursor: pointer;
}

.nombre-opcion {
    font-size: 18px;
    color: #000;
    font-weight: 500;
}

.opcion img {
    margin: 25px auto 0px auto;
    max-width: 115px;
}
</style>
