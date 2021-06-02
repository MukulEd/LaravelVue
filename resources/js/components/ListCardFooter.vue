<template>
    <div class="p-2 bg-gray-300 flex">
        <div class="created p-1">
            <p class="text-md">Created At: {{ timestamp }}</p>
        </div>
        <div class="edit p-1">
            <i
                class="
                    fas
                    fa-edit
                    text-gray-500
                    hover:text-black
                    cursor-pointer
                "
                @click="editCalled"
            ></i>
        </div>
        <div class="delete p-1">
            <i
                class="
                    fas
                    fa-trash
                    text-gray-500
                    hover:text-red-500
                    cursor-pointer
                "
                @click="deleteCalled"
            ></i>
        </div>
    </div>
</template>

<script>
import moment from "moment";
export default {
    name: "ListCardFooter",
    props: {
        created_at: {
            type: String,
        },
    },
    methods: {
        deleteCalled() {
            this.$emit("deleteCalled");
        },
        editCalled() {
            this.$emit("editCalled");
        },
    },
    computed: {
        timestamp: function () {
            return moment(this.created_at).format("Do MMMM YYYY");
        },
    },
};
</script>
