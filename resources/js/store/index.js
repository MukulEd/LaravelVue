import { createStore } from "vuex";
import todo from "./modules/todo.js";
import auth from "./modules/auth.js";
import alert from "./modules/alert.js";

export default createStore({
    modules: { auth, todo, alert },
});

//  store;
// export default {
//     name:
// }
// import { useStore } from "vuex";

// export default {
//     setup() {
//         const store = useStore({ modules: { auth } });
//     },
// };
