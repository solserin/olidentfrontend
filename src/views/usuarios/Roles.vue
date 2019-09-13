<template>
<b-row>
    <b-col cols="12" lg="12">
        <b-card no-header>
            <template slot="header">
                    <strong>Roles de usuario.</strong>
            </template>
            <b-row>
                <b-table striped hover :items="items"></b-table>
           </b-row>
        </b-card>
    </b-col>
</b-row>
</template>
<script>
  export default {
    data() {
      return {
        items: [
          { age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
          { age: 21, first_name: 'Larsen', last_name: 'Shaw' },
          { age: 89, first_name: 'Geneva', last_name: 'Wilson' },
          { age: 38, first_name: 'Jami', last_name: 'Carney' }
        ]
      }
    }
  }
</script>