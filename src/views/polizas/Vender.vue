<template>
<div>
    <!--<b-card style="border-radius:0;">
        <div slot="header"><i class="fa fa-folder-open-o" aria-hidden="true"></i> Formulario de Venta</div>
    </b-card>-->
    <b-row>
        <b-col xs="12">
            <div class="text-center mb-5">
                <i class="fa fa-credit-card icono" aria-hidden="true"></i>
                <div class="mt-2">
                    <h5>Formulario de Venta</h5>
                    <p class="mt-3">
                        Debe ingresar la información del siguiente formulario. En este apartado podrá registrar las nuevas ventas generadas identificandolas por un número de póliza <strong>único</strong>.
                    </p>
                </div>
            </div>
        </b-col>
    </b-row>
    <b-row>
        <b-col xs="12" lg="9">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium ducimus aut obcaecati natus aliquid labore, quisquam qui vitae vero sunt molestiae dolor itaque in consectetur, aperiam ipsam repudiandae! Suscipit, quos.
        </b-col>
        <b-col xs="12" lg="3">
            <div>
                <b-card-group>
                    <b-card >
                        <template v-slot:header>
                            <h6 class="mb-0 text-center">Titular</h6>
                        </template>
                        <b-card-text>
                             <b-img center rounded="0" src="https://picsum.photos/125/125/?image=58" alt="Left image"></b-img>
                        </b-card-text>
                    </b-card>
                </b-card-group>
            </div>
        </b-col>
    </b-row>
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

<style scoped>
.icono {
    color: #20a8d8;
    font-size: 3em;
}
</style>
