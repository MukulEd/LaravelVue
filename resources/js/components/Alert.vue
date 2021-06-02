<template>
    <div
        class="bg-transparent px-20 py-2 mt-5 mb-5"
        v-if="allAlerts !== null && allAlerts.length > 0"
    >
        <div
            v-for="alert in allAlerts"
            :key="alert.id"
            :class="[
                'bg-' + alert.type,
                'p-3 text-white font-semibold font-mono text-md rounded-sm mb-2 text-center',
            ]"
        >
            {{ alert.msg }}
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    name: "Alert",
    computed: mapGetters(["allAlerts"]),
};
</script>
