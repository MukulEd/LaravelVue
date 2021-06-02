<template>
    <header class="p-5 bg-gray-700 flex flex-col">
        <div
            class="
                heading
                mx-auto
                p-1
                flex
                text-white
                md:text-4xl
                text-2xl
                md:items-end
                items-center
            "
        >
            <i class="far fa-list-alt mr-3"></i>
            <h1 class="font-bold font-sans uppercase">To-Do Application</h1>
        </div>
        <Navbar />
    </header>
</template>

<script>
import Navbar from "./Navbar.vue";
export default {
    name: "Header",
    components: { Navbar },
};
</script>
