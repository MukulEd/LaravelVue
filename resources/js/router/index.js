import { createRouter, createWebHistory } from "vue-router";
import Home from "../../views/Home.vue";
import Login from "../../views/Login.vue";
import Register from "../../views/Register.vue";
import AllTaskList from "../../views/AllTaskList.vue";
import store from "../store";

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
        async beforeEnter(to, from, next) {
            try {
                let auth = store.getters.isAuthenticated;
                if (auth) next();
                else
                    next({
                        name: "Login",
                    });
            } catch (e) {
                console.log("home err", e);
                next({
                    name: "Login",
                });
            }
        },
    },
    {
        path: "/login",
        name: "Login",
        component: Login,
        async beforeEnter(to, from, next) {
            try {
                await store.dispatch("authRequest");
                next({
                    name: "Home",
                });
            } catch (e) {
                next();
            }
        },
    },
    {
        path: "/register",
        name: "Register",
        component: Register,
        async beforeEnter(to, from, next) {
            try {
                await store.dispatch("authRequest");
                next({
                    name: "Home",
                });
            } catch (e) {
                next();
            }
        },
    },
    {
        path: "/tasks",
        name: "Tasks",
        component: AllTaskList,
        async beforeEnter(to, from, next) {
            try {
                let auth = store.getters.isAuthenticated;
                if (auth) next();
                else
                    next({
                        name: "Login",
                    });
            } catch (e) {
                console.log("home err", e);
                next({
                    name: "Login",
                });
            }
        },
    },
    {
        path: "/task/:id",
        name: "TaskEdit",
        component: Home,
        async beforeEnter(to, from, next) {
            try {
                let auth = store.getters.isAuthenticated;
                if (auth) next();
                else
                    next({
                        name: "Login",
                    });
            } catch (e) {
                console.log("home err", e);
                next({
                    name: "Login",
                });
            }
        },
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
