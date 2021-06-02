<template>
    <div class="mt-2 py-4 px-5 flex content-center items-center">
        <input
            type="text"
            class="
                mr-5
                border-0 border-b-2
                w-full
                focus:outline-none
                focus:ring-0
                text-gray-500 text-lg
                font-semibold
                focus:border-pink-500
            "
            @keyup.enter="addItem"
            @keydown.enter="addItem"
            v-model="itemName"
            placeholder="Add Item"
        />
        <i
            :class="[
                itemName !== ''
                    ? 'text-green-500  cursor-pointer'
                    : 'text-gray-400',
                'fas fa-plus-circle',
                'text-2xl text-right',
            ]"
            @click="addItem"
        ></i>
    </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
    name: "AddItem",
    data() {
        return {
            itemName: "",
        };
    },
    methods: {
        ...mapActions(["addToDoItem"]),
        addItem(e) {
            e.preventDefault();
            if (this.itemName.trim() == "") return;
            this.addToDoItem(this.itemName);
            this.itemName = "";
        },
    },
};
</script>
