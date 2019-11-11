<template>
<div data-v-f3f3eg9 class="app flex-row align-items-center">
    <div class="container">
        <b-row class="justify-content-center">
            <b-col md="8">
                <b-card-group>
                    <b-card no-body class="p-4">
                        <b-card-body>
                            <loading v-if="authStatus ==='loading'" :active.sync="isLoading"></loading>
                            <b-form>
                                <h1>Login</h1>
                                <p class="text-muted">Ingrese sus datos de acceso</p>
                                <b-input-group class="mb-3">
                                    <b-input-group-prepend>
                                        <b-input-group-text><i class="icon-user"></i></b-input-group-text>
                                    </b-input-group-prepend>
                                    <b-form-input v-model="userEmail" type="email" required="required" class="form-control" placeholder="Username" autocomplete="username email" />
                                </b-input-group>
                                <b-input-group class="mb-4">
                                    <b-input-group-prepend>
                                        <b-input-group-text><i class="icon-lock"></i></b-input-group-text>
                                    </b-input-group-prepend>
                                    <b-form-input v-model="password" type="password" class="form-control" placeholder="Password" autocomplete="current-password" v-on:keyup.enter="login()" />
                                </b-input-group>
                                <b-row>
                                    <b-col cols="4">
                                        <b-button variant="primary" class="px-4" @click="login()">Login</b-button>
                                    </b-col>
                                    <b-col cols="8" class="text-right">
                                        <b-button variant="link" class="px-0">Olvidó su contraseña?</b-button>
                                    </b-col>
                                </b-row>
                            </b-form>
                        </b-card-body>
                    </b-card>
                    <b-card no-body class="text-primary py-5 d-md-down-none" style="width:44%">
                        <b-card-body class="text-center">
                            <div class="mt-5">
                                <img class="navbar-brand-full mt-3" src="../../assets/images/logo.png" width="250" alt="CoreUI Logo">
                            </div>
                        </b-card-body>
                    </b-card>
                </b-card-group>
            </b-col>
        </b-row>
    </div>
</div>
</template>

<script>
import Loading from 'vue-loading-overlay';
// Import stylesheet
import 'vue-loading-overlay/dist/vue-loading.css';
import {
    mapGetters
} from 'vuex'
export default {
    data() {
        return {
            password: '',
            userEmail: '',
            isLoading: true,
        }
    },
    components: {
        Loading
    },
    methods: {
        login() {
            const vm = this;
            let email = vm.userEmail;
            let password = vm.password;
            vm.$store
                .dispatch("login", {
                    email,
                    password
                })
                .then(() => {
                    this.$toasted.clear();
                    this.$router.push('/');
                })
                .catch(err => {
                    this.$toasted.show("Error de usuario y/o contraseña", {
                        iconPack: 'fontawesome',
                        type: 'error',
                        theme: 'toasted-primary',
                        icon: 'lock',
                        duration: 10000,
                        position: 'bottom-center'
                    });
                });

            /*if (vm.userEmail === vm.$root.userEmail && vm.password === vm.$root.userPassword) {
              //vm.$router.push({ name: 'Dashboard' });
            }
            else {
              vm.error = true;
              vm.result = "Acceso no autorizado";
              vm.showResult = true;
            }*/
        }
    },
    computed: {
        // mix the getters into computed with object spread operator
        ...mapGetters([
            'authStatus',
            'rol',
            'datosEmpresa'
        ])
    },
    created() {
        this.$store.dispatch('error')
    },
}
</script>

<style>
.app[data-v-f3f3eg9]{
    background: url(../../assets/images/background.jpg) no-repeat center center fixed;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
}
</style>
