<template>
    <div class="md:flex">
        <ul class="list-none flex-1 md:text-left text-center">
            <li
                class="
                    p-1
                    mr-2
                    inline
                    text-gray-500
                    hover:text-teal-500
                    font-bold
                    text-lg
                "
            >
                <router-link to="/">Home</router-link>
            </li>
            <li
                v-if="isAuthenticated"
                class="
                    p-1
                    inline
                    text-gray-500
                    hover:text-teal-500
                    font-bold
                    text-lg
                "
            >
                <router-link to="/tasks">Tasks</router-link>
            </li>
        </ul>
        <ul class="list-none flex-1 md:text-right text-center">
            <li
                v-if="!isAuthenticated"
                class="
                    p-1
                    mr-2
                    inline
                    text-gray-500
                    hover:text-teal-500
                    font-bold
                    text-lg
                "
            >
                <router-link to="/login">Login</router-link>
            </li>
            <li
                v-if="isAuthenticated"
                class="
                    p-1
                    inline
                    text-gray-500
                    hover:text-teal-500
                    font-bold
                    text-lg
                "
            >
                Logout
            </li>

            <li
                v-if="!isAuthenticated"
                class="
                    p-1
                    inline
                    text-gray-500
                    hover:text-teal-500
                    font-bold
                    text-lg
                "
            >
                <router-link to="/register"> Register</router-link>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    name: "Navbar",
    computed: mapGetters(["isAuthenticated"]),
};
</script>
