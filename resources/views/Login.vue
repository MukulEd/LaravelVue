<template>
    <div class="flex" v-if="!isAuthenticated">
        <div
            class="
                mx-auto
                bg-white
                w-1/2
                min-w-96
                shadow-lg
                rounded-lg
                bg-purple-100
                p-5
            "
        >
            <form class="form" @submit="loginUser">
                <div class="p-2">
                    <h1
                        class="
                            text-4xl text-center
                            font-bold
                            mb-10
                            text-purple-400
                            uppercase
                        "
                    >
                        Sign In
                    </h1>
                    <p class="lead">
                        <i class="fas fa-user mb-3"></i> Sign Into Your Account
                    </p>
                    <AuthForm
                        :formData="formData"
                        @form-input="
                            (formDataChild) => {
                                formData = formDataChild;
                            }
                        "
                    />
                    <FormSubmitButton />
                    <p class="mt-3">
                        Don't have an account?
                        <router-link class="text-blue-400" to="/register"
                            >Sign Up</router-link
                        >
                    </p>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import AuthForm from "../js/components/AuthForm.vue";
import FormSubmitButton from "../js/components/FormSubmitButton.vue";
import { mapActions, mapGetters } from "vuex";
export default {
    name: "Login",
    components: { AuthForm, FormSubmitButton },
    data() {
        return {
            formData: {
                email: "",
                password: "",
            },
        };
    },
    methods: {
        ...mapActions(["loginRequest"]),
        loginUser(e) {
            e.preventDefault();
            //actions
            this.loginRequest(this.formData)
                .then(() => this.$router.push("/"))
                .catch(() => console.log("login failed"));
        },
    },
    computed: mapGetters(["isAuthenticated"]),
    created() {
        if (this.isAuthenticated) this.$router.push("/");
    },
};
</script>
