<template>
  <AppHeaderDropdown right no-caret>
    <template slot="header">
       {{permisos[0].email}}
      <img
        src="https://scontent.fmzt2-1.fna.fbcdn.net/v/t1.0-1/p160x160/67827009_870100583374997_4703171020855443456_n.jpg?_nc_cat=107&_nc_oc=AQmG5VP0m6AYOEpYewvXnO5P8wb0L_8X2EaL4xkDqGdrHaO9yrxUkIrphSW9sUen7uA&_nc_ht=scontent.fmzt2-1.fna&oh=e103c27c1eb02a20b5de4fb9860fbe95&oe=5E052C07"
        class="img-avatar"
        :alt="permisos[0].email" />
    </template>
    <template slot="dropdown">
     <!-- <b-dropdown-header tag="div" class="text-center"><strong>Cuenta</strong></b-dropdown-header>
      <b-dropdown-item><i class="fa fa-tasks" /> Tareas
        <b-badge variant="danger">{{ itemsCount }}</b-badge>
      </b-dropdown-item>
     -->
      <b-dropdown-header
        tag="div"
        class="text-center">
        <strong>Mi cuenta de - {{permisos[0].rol}}</strong>
      </b-dropdown-header>
      <b-dropdown-item><i class="fa fa-user" /> Perfíl</b-dropdown-item>
      
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
import { HeaderDropdown as AppHeaderDropdown } from '@coreui/vue'
export default {
  name: 'DefaultHeaderDropdownAccnt',
  components: {
    AppHeaderDropdown,
  },
  data: () => {
    return { itemsCount: 42 }
  },methods: {
    modalConfirmar,
    logout(){
      this.modalConfirmar('Cerrar Sesión', 'primary').then(resp => {
                if (resp) {
                    try {
                      this.$store.dispatch('loading')
                         this.$store.dispatch("logout")
                        .then(()=>{
                          this.$store.dispatch('success')
                          this.$router.push('/pages/login');
                        })
                    } catch (error) {
                        this.$store.dispatch('error')
                    }
                }
            })

     
    }
  },
   computed: {
        // mix the getters into computed with object spread operator
        ...mapGetters([
            'permisos'
        ])
    },
}
</script>
