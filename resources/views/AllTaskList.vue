<template>
    <div class="p-2" v-if="todoLists !== null && todoLists.length > 0">
        <div
            v-for="list in todoLists"
            :key="list._id"
            class="inline-block p-2 rounded-md min-w-32 max-w-sm shadow-md"
        >
            <ListCardHeader :title="list.title" />
            <ListCardFooter
                :created_at="list.created_at"
                @deleteCalled="deleteList(list._id)"
                @editCalled="editList(list._id)"
            />
        </div>
    </div>

    <div v-else class="p-2 flex">
        <div class="mx-auto p-3">
            <h1 class="text-2xl">No TaskList/ToDo List Found</h1>
            <h2 class="text-xl hover:text-blue-500">
                <router-link to="/home">Add ToDo/Task List</router-link>
            </h2>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import ListCardHeader from "../js/components/ListCardHeader.vue";
import ListCardFooter from "../js/components/ListCardFooter.vue";

export default {
    name: "AllTaskList",
    components: { ListCardHeader, ListCardFooter },
    computed: {
        ...mapGetters(["todoLists"]),
    },
    methods: {
        ...mapActions([
            "getAllToDoList",
            "getToDoList",
            "deleteToDoList",
            "setAlert",
        ]),
        deleteList(id) {
            this.deleteToDoList(id);
        },
        editList(id) {
            this.getToDoList(id)
                .then(() => this.$router.push(`/task/${id}`))
                .catch(() =>
                    this.setAlert({
                        msg: "Not able to fetch Data",
                        type: "danger",
                    })
                );
        },
    },
    created() {
        this.getAllToDoList();
    },
};
</script>
