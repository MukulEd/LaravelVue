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
            <form class="form" @submit="registerUser">
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
                        Sign Up
                    </h1>
                    <p class="lead">
                        <i class="fas fa-user mb-3"></i> Register New Account
                    </p>
                    <AuthForm
                        :addPasswordComfirmation="addPasswordComfirmation"
                        :formData="formData"
                        @form-input="
                            (formDataChild) => {
                                formData = formDataChild;
                            }
                        "
                    />
                    <FormSubmitButton />
                    <p class="mt-3">
                        Already have an account?
                        <router-link class="text-blue-400" to="/login"
                            >Sign In</router-link
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
    name: "Register",
    components: { AuthForm, FormSubmitButton },
    props: {
        isAuthenticated: Boolean,
    },
    data() {
        return {
            addPasswordComfirmation: true,
            formData: {
                name: "",
                email: "",
                password: "",
                password_confirmation: "",
            },
        };
    },
    methods: {
        ...mapActions(["registerRequest", "setAlert"]),
        registerUser(e) {
            e.preventDefault();
            if (this.formData.password !== this.formData.password_confirmation)
                this.setAlert({
                    msg: "Confirm Password must be same as Password",
                    type: "danger",
                });
            else
                this.registerRequest(this.formData)
                    .then(() => this.$router.push("/login"))
                    .catch(() => console.log("Failed"));
        },
    },
    computed: mapGetters(["isAuthenticated"]),
    created() {
        if (this.isAuthenticated) this.$router.push("/");
    },
};
</script>
