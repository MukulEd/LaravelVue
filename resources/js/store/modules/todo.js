import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const state = {
    todo: {
        title: "",
        listItems: [],
        update: false,
    },
    todoLists: [],
};

const getters = {
    todo: (state) => state.todo,
    todoLists: (state) => state.todoLists,
};

const actions = {
    changeToDoTitle({ commit }, payload) {
        commit("setToDoTitle", payload);
    },
    addToDoItem({ commit }, payload) {
        const itemObject = {
            itemId: uuidv4(),
            name: payload,
            check: false,
        };
        commit("addToDoItemToList", itemObject);
    },
    deleteToDoItem({ commit }, payload) {
        commit("deleteToDoItemToList", payload);
    },
    toggleCheckToDoItem({ commit }, payload) {
        commit("toggleCheckToDoItemToList", payload);
    },

    async saveToDoListFormItems({ commit, dispatch }, payload) {
        try {
            let body = {
                title: payload.title,
                listItems: payload.listItems,
            };

            const res = await axios.post("/api/todo", body);
            dispatch("setAlert", { msg: res.data.message, type: "success" });
            commit("resetTodo");
        } catch (err) {
            console.log(err.response);
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
        }
    },

    async getToDoList({ dispatch, commit }, payload) {
        try {
            const res = await axios.get(`/api/todo/${payload}`);
            console.log(res);
            commit("setToDo", res.data.list);
            return new Promise((resolve, reject) => {
                resolve();
            });
        } catch (err) {
            console.log(err.response);
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

    async getAllToDoList({ dispatch, commit }) {
        try {
            const res = await axios.get(`/api/todo`);
            commit("setToDoLists", res.data.list);
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
        }
    },

    async updateToDoListFormItems({ dispatch, commit }, payload) {
        try {
            let body = {
                id: payload.id,
                title: payload.title,
                listItems: payload.listItems,
            };
            const res = await axios.put(`/api/todo`, body);
            dispatch("setAlert", { msg: res.data.message, type: "success" });
            commit("resetTodo");
            return new Promise((resolve, reject) => {
                resolve();
            });
        } catch (err) {
            console.log(err);
            if (err.response && err.response.data) {
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

    async deleteToDoList({ dispatch, commit }, payload) {
        try {
            const res = await axios.delete(`/api/todo/${payload}`);
            dispatch("setAlert", { msg: res.data.message, type: "success" });
            commit("filterToDoLists", payload);
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
        }
    },
};

const mutations = {
    setToDoTitle(state, payload) {
        state.todo.title = payload;
    },
    addToDoItemToList(state, payload) {
        state.todo.listItems = [...state.todo.listItems, payload];
    },
    deleteToDoItemToList(state, payload) {
        state.todo.listItems = state.todo.listItems.filter(
            (item) => item.itemId !== payload
        );
    },
    toggleCheckToDoItemToList(state, payload) {
        state.todo.listItems.forEach((item) => {
            item.itemId === payload ? (item.check = !item.check) : "";
        });
        // state.todo.listItems.map((item) =>
        //     item.itemId === payload ? { ...item, check:!check } : item
        // );
    },
    resetTodo(state) {
        state.todo.title = "";
        state.todo.listItems = [];
        state.todo.update = false;
    },
    setToDo(state, payload) {
        state.todo.title = payload.title;
        state.todo.listItems = payload.listItems;
        state.todo.update = true;
    },
    setToDoLists(state, payload) {
        state.todoLists = payload;
    },
    filterToDoLists(state, payload) {
        state.todoLists = state.todoLists.filter(
            (list) => list._id !== payload
        );
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
};
