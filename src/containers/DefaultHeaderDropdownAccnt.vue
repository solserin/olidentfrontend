<template>
<AppHeaderDropdown right no-caret>
    <template slot="header">
        <span>{{permisos[0].email}}</span>
        <img :src="user.imagen" class="img-avatar" :alt="permisos[0].email" />
    </template>
    <template slot="dropdown">
        <!-- <b-dropdown-header tag="div" class="text-center"><strong>Cuenta</strong></b-dropdown-header>
      <b-dropdown-item><i class="fa fa-tasks" /> Tareas
        <b-badge variant="danger">{{ itemsCount }}</b-badge>
      </b-dropdown-item>
     -->
        <b-dropdown-header tag="div" class="text-center">
            <strong>Mi cuenta de - {{permisos[0].rol}}</strong>
        </b-dropdown-header>
        <b-dropdown-item @click="perfil">
           <i class="fa fa-user" /> Perfíl
        </b-dropdown-item>
        <b-dropdown-divider />
        <b-dropdown-item @click="logout"><i class="fa fa-lock" /> Cerrar Sesión</b-dropdown-item>
    </template>
</AppHeaderDropdown>
</template>
<script>
import {
    modalConfirmar
} from '../assets/Funciones/Funciones.js' //funcion de modal de confirm
import {
    mapGetters
} from 'vuex'
import {
    HeaderDropdown as AppHeaderDropdown
} from '@coreui/vue'
export default {
    name: 'DefaultHeaderDropdownAccnt',
    components: {
        AppHeaderDropdown,
    },
    data: () => {
        return {
            itemsCount: 42
        }
    },
    methods: {
        modalConfirmar,
        logout() {
            this.modalConfirmar('Cerrar Sesión', 'primary').then(resp => {
                if (resp) {
                    try {
                        this.$store.dispatch('loading')
                        this.$store.dispatch("logout")
                            .then(() => {
                                this.$store.dispatch('success')
                                this.$router.push('/pages/login');
                            })
                    } catch (error) {
                        this.$store.dispatch('error')
                    }
                }
            })
        },
        perfil(){
           this.$router.push('/perfil');
        }
    },
    computed: {
        // mix the getters into computed with object spread operator
        ...mapGetters([
            'permisos',
            'user'
        ])
    },
}
</script>
