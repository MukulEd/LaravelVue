<template>
    <div
        class="mt-2 mb-2 py-2 px-4"
        v-if="todo.listItems !== null && todo.listItems.length > 0"
    >
        <div
            class="p-1 mt-1 mb-1"
            v-for="item in todo.listItems"
            :key="item.itemId"
        >
            <ListItem :text="item.name" :id="item.itemId" :check="item.check" />
        </div>
    </div>
</template>

<script>
import ListItem from "./ListItem.vue";
import { mapGetters } from "vuex";
export default {
    name: "ListContainer",
    components: { ListItem },
    computed: mapGetters(["todo"]),
    created() {
        console.log(this.todo.listItems);
    },
};
</script>
