import axios from "axios";
const setAxiosHeader = (token) => {
    if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common["Authorization"];
    }
    axios.defaults.headers.post["Content-Type"] = "application/json";
};

export default setAxiosHeader;
