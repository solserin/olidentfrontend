<template>
    <div>
        roles
        {{datos}}
        <div>
            {{user_id}}
        </div>
         <div>
            {{user_email}}
        </div>
        <div>
            {{menu}}
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    created(){
        this.$store.dispatch("fillPerfil")
    },
   computed: {
    // mix the getters into computed with object spread operator
    ...mapGetters([
      'datos',
      'user_id',
      'user_email',
      'menu'
    ])
  }
}
</script>