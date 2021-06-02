<template>
    <div class="bg-pink-500 p-1 mt-3">
        <input
            class="
                text-white
                border-none
                focus:outline-none
                focus:ring-1 focus:ring-pink-500
                font-semibold
                text-3xl
                w-full
                text-center
                bg-transparent
                appearence-none
                p-0
                placeholder-pink-100
                h-full
            "
            type="text"
            :value="todo.title"
            placeholder="Add Title"
            @blur="changeListTitle"
        />
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
    name: "TitleHeader",
    methods: {
        ...mapActions(["changeToDoTitle"]),
        changeListTitle(e) {
            if (e.target.value.trim() == "") return;
            this.changeToDoTitle(e.target.value);
        },
    },
    computed: {
        ...mapGetters(["todo"]),
    },
};
</script>
