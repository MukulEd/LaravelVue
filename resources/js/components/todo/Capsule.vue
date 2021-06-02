<template>
    <div
        class="
            min-w-sm
            max-w-md
            bg-white
            rounded-2xl
            min-h-96
            overflow-y-auto overflow-x-hidden
            shadow-xl
            ring-2 ring-purple-400
        "
    >
        <form @submit="saveToDoList">
            <TitleHeader />
            <AddItem />
            <ListContainer />
            <FormSubmitButton
                v-if="
                    todo.title != '' &&
                    todo.listItems !== null &&
                    todo.listItems.length > 0
                "
            />
        </form>
    </div>
</template>

<script>
import TitleHeader from "./TitleHeader";
import AddItem from "./AddItem";
import ListContainer from "./ListContainer";
import { mapGetters, mapActions } from "vuex";
import FormSubmitButton from "../FormSubmitButton.vue";
export default {
    name: "Capsule",
    components: { TitleHeader, AddItem, ListContainer, FormSubmitButton },
    methods: {
        ...mapActions(["saveToDoListFormItems", "updateToDoListFormItems"]),
        saveToDoList(e) {
            e.preventDefault();
            if (this.todo.update) {
                let payload = {
                    id: this.$route.params.id,
                    title: this.todo.title,
                    listItems: this.todo.listItems,
                };
                this.updateToDoListFormItems(payload)
                    .then(() => this.$router.push("/"))
                    .catch(() => console.log("error updating"));
            } else this.saveToDoListFormItems(this.todo);
        },
    },
    computed: {
        ...mapGetters(["todo"]),
    },
};
</script>
