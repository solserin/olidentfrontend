<template>
  <AppHeaderDropdown right no-caret>
    <template slot="header">
      <img
        src="https://scontent.fmzt2-1.fna.fbcdn.net/v/t1.0-1/p160x160/67827009_870100583374997_4703171020855443456_n.jpg?_nc_cat=107&_nc_oc=AQmG5VP0m6AYOEpYewvXnO5P8wb0L_8X2EaL4xkDqGdrHaO9yrxUkIrphSW9sUen7uA&_nc_ht=scontent.fmzt2-1.fna&oh=e103c27c1eb02a20b5de4fb9860fbe95&oe=5E052C07"
        class="img-avatar"
        alt="admin@bootstrapmaster.com" />
    </template>\
    <template slot="dropdown">
     <!-- <b-dropdown-header tag="div" class="text-center"><strong>Cuenta</strong></b-dropdown-header>
      <b-dropdown-item><i class="fa fa-tasks" /> Tareas
        <b-badge variant="danger">{{ itemsCount }}</b-badge>
      </b-dropdown-item>
     -->
      <b-dropdown-header
        tag="div"
        class="text-center">
        <strong>Configuración</strong>
      </b-dropdown-header>
      <b-dropdown-item><i class="fa fa-user" /> Perfíl</b-dropdown-item>
      
      <b-dropdown-divider />
      <b-dropdown-item @click="logout"><i class="fa fa-lock" /> Cerrar Sesión</b-dropdown-item>
    </template>
  </AppHeaderDropdown>
</template>

<script>
import { HeaderDropdown as AppHeaderDropdown } from '@coreui/vue'
export default {
  name: 'DefaultHeaderDropdownAccnt',
  components: {
    AppHeaderDropdown
  },
  data: () => {
    return { itemsCount: 42 }
  },methods: {
    logout(){
      this.$store.dispatch("logout")
      .then(()=>{
        this.$router.push('/pages/login');
      })
    }
  },
}
</script>
