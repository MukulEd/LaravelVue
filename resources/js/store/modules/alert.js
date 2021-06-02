import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const state = {
    alerts: [],
};

const getters = {
    allAlerts: (state) => state.alerts,
};

const actions = {
    setAlert({ commit }, payload) {
        let alertBody = {
            id: uuidv4(),
            msg: payload.msg,
            type: payload.type,
        };
        commit("addAlert", alertBody);
        let ttl = payload.timeout ? payload.timeout : 3000;
        setTimeout(() => commit("removeAlert", alertBody.id), ttl);
    },
};

const mutations = {
    addAlert(state, alertBody) {
        state.alerts = [...state.alerts, alertBody];
    },
    removeAlert(state, alertId) {
        state.alerts = state.alerts.filter((alert) => alert.id !== alertId);
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
};
