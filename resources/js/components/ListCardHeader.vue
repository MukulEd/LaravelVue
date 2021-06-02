<template>
    <div class="bg-purple-200 p-4 text-purple-800">
        <p class="text-lg font-bold uppercase text-center">{{ title }}</p>
    </div>
</template>

<script>
export default {
    name: "ListCardHeader",
    props: {
        title: {
            type: String,
        },
    },
};
</script>
