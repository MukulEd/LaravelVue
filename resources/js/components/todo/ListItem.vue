<template>
    <div
        class="
            flex
            text-lg
            p-3
            content-center
            border-b-2
            items-center
            hover:bg-gray-100
        "
    >
        <p
            :class="[
                check ? 'line-through' : '',
                'w-full text-left text-gray-500 font-semibold font-mono flex-grow-0 text-xl',
            ]"
        >
            {{ titleCaseItem }}
        </p>
        <span
            ><i
                class="
                    fas
                    fa-times-circle
                    ml-2
                    text-red-500 text-xl
                    cursor-pointer
                "
                @click="deleteItem(id)"
            ></i
        ></span>
        <span>
            <i
                :class="[
                    check ? 'fa-undo-alt' : 'fa-check-circle',
                    'fas ml-5 text-green-500 text-xl cursor-pointer',
                ]"
                @click="toggleItemCheck(id)"
            ></i>
            <i class="fas"></i>
        </span>
    </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
    name: "ListItem",
    props: {
        text: {
            type: String,
            required: true,
        },
        id: {
            type: String,
            required: true,
        },
        check: {
            type: Boolean,
            required: true,
        },
    },
    computed: {
        titleCaseItem: function () {
            var splitStr = this.text.toLowerCase().split(" ");
            for (var i = 0; i < splitStr.length; i++) {
                splitStr[i] =
                    splitStr[i].charAt(0).toUpperCase() +
                    splitStr[i].substring(1);
            }
            return splitStr.join(" ");
        },
    },
    methods: {
        ...mapActions(["deleteToDoItem", "toggleCheckToDoItem"]),
        deleteItem(id) {
            this.deleteToDoItem(id);
        },
        toggleItemCheck(id) {
            this.toggleCheckToDoItem(id);
        },
    },
};
</script>
