<template>
    <Header />
    <div class="container p-5 bg-purple-50 h-screen">
        <Alert />
        <router-view />
    </div>
    <!-- <Footer /> -->
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Header from "../js/components/Header.vue";
import Footer from "../js/components/Footer.vue";
import Alert from "../js/components/Alert.vue";
import Login from "./Login.vue";
import setAxiosHeader from "../js/utils/setAxiosHeader.js";

setAxiosHeader(localStorage.token);
export default {
    name: "App",
    components: { Header, Login, Alert },
    methods: {
        ...mapActions(["authRequest"]),
    },
    created() {
        this.authRequest();
    },
};
</script>
