<template>
    <main v-if="isAuthenticated && !loading">
        <!-- Authenticated -->
        <div class="flex flex-col">
            <div class="mx-auto">
                <Capsule />
            </div>
        </div>
    </main>

    <main v-else>
        <!-- Not Authenticated -->
        <!-- Need to Login Before Access-->
        <h1 class="text-2xl mt-5">Login to Continue</h1>
    </main>
</template>

<script>
import Capsule from "../js/components/todo/Capsule.vue";
import { mapGetters } from "vuex";
export default {
    name: "Home",
    components: { Capsule },
    computed: {
        ...mapGetters(["isAuthenticated", "loading"]),
    },
    created() {
        if (!this.isAuthenticated) this.$router.push("/login");
    },
};
</script>
