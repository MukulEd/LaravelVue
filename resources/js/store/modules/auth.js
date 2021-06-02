import axios from "axios";

const state = {
    token: localStorage.getItem("token"),
    isAuthenticated: false,
    loading: true,
    user: null,
};

const getters = {
    user: (state) => state.user,
    isAuthenticated: (state) => state.isAuthenticated,
    token: (state) => state.token,
    loading: (state) => state.loading,
};

const actions = {
    async loginRequest({ dispatch, commit }, formData) {
        try {
            const body = { email: formData.email, password: formData.password };
            const res = await axios.post("/api/login", body);
            commit("loginSuccess", res.data);
            dispatch("setAlert", { msg: res.data.message, type: "success" });
            console.log(res);
            return new Promise((resolve, reject) => {
                resolve();
            });
        } catch (err) {
            if (err.response.data) {
                const errors = err.response.data.errors;
                for (const [key, value] of Object.entries(errors)) {
                    dispatch(
                        "setAlert",
                        { msg: value[0], type: "danger" },
                        { root: true }
                    );
                }
            }
            return new Promise((resolve, reject) => {
                reject();
            });
        }
    },

    async registerRequest({ dispatch, commit }, formData) {
        try {
            const body = {
                name: formData.name,
                email: formData.email,
                password: formData.password,
                password_confirmation: formData.password_confirmation,
            };
            const res = await axios.post("/api/register", body);
            dispatch("setAlert", { msg: res.data.message, type: "success" });
            commit("registerSuccess", res.data);
            return new Promise((resolve, reject) => {
                resolve();
            });
        } catch (err) {
            if (err.response.data) {
                const errors = err.response.data.errors;
                for (const [key, value] of Object.entries(errors)) {
                    dispatch(
                        "setAlert",
                        { msg: value[0], type: "danger" },
                        { root: true }
                    );
                }
            }
            return new Promise((resolve, reject) => {
                reject();
            });
        }
    },

    async authRequest({ commit }) {
        try {
            const res = await axios.get("/api/me");
            commit("authSuccess", res.data);
            console.log(res.data);
            return new Promise((resolve, reject) => {
                resolve(true);
            });
        } catch (err) {
            console.log(err.response);
            commit("authFailed");
            return new Promise((resolve, reject) => {
                reject(false);
            });
        }
    },

    async logout({ commit }) {
        try {
            const res = await axios.get("/api/logout");
            commit("logout");
        } catch (err) {}
    },
};

const mutations = {
    loginSuccess(state, payload) {
        localStorage.setItem("token", payload.access_token);
        state.isAuthenticated = true;
        state.loading = false;
        state.user = payload.user;
        state.token = payload.access_token;
    },
    registerSuccess(state) {
        localStorage.removeItem("token");
        state.isAuthenticated = false;
        state.loading = false;
        state.token = "";
    },
    // loginFailed(state) {},
    // registerFailed(state) {},
    logout(state) {
        localStorage.removeItem("token");
        state.isAuthenticated = false;
        state.loading = true;
        state.user = null;
        state.token = null;
    },

    authFailed(state) {
        localStorage.removeItem("token");
        state.isAuthenticated = false;
        state.loading = true;
        state.user = null;
        state.token = null;
    },
    authSuccess(state, payload) {
        state.isAuthenticated = true;
        state.loading = false;
        state.user = payload.user;
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
};
