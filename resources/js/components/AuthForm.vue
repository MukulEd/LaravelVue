<template>
    <div class="form-group" v-if="addPasswordComfirmation">
        <input
            type="text"
            placeholder="Name"
            name="name"
            minLength="2"
            required
            v-model="formData.name"
            class="
                w-full
                border-0 border-b-2 border-gray-500
                mt-1
                mb-1
                bg-transparent
                focus:border-gray-600
                focus:ring-0
                focus:outline-none
                text-purple-800
            "
        />
    </div>
    <div class="form-group">
        <input
            type="email"
            placeholder="Email Address"
            name="email"
            required
            v-model="formData.email"
            class="
                w-full
                border-gray-500
                mt-1
                mb-1
                border-0 border-b-2
                bg-transparent
                focus:border-gray-600
                focus:ring-0
                focus:outline-none
                text-purple-800
            "
        />
    </div>
    <div class="form-group">
        <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            required
            v-model="formData.password"
            class="
                w-full
                border-0 border-b-2 border-gray-500
                mt-1
                mb-1
                bg-transparent
                focus:border-gray-600
                focus:ring-0
                focus:outline-none
                text-purple-800
            "
        />
    </div>
    <div class="form-group" v-if="addPasswordComfirmation">
        <input
            type="password"
            placeholder="Confirm Password"
            name="password_confirmation"
            minLength="6"
            required
            v-model="formData.password_confirmation"
            class="
                w-full
                border-0 border-b-2 border-gray-500
                mt-1
                mb-1
                bg-transparent
                focus:border-gray-600
                focus:ring-0
                focus:outline-none
                text-purple-800
            "
        />
    </div>
</template>

<script>
export default {
    name: "AuthForm",
    props: {
        addPasswordComfirmation: {
            type: Boolean,
            default: false,
        },
        formData: {
            type: Object,
            required: true,
        },
    },
    emits: ["form-input"],
    watch: {
        formData() {
            this.$emit("form-input", this.formData);
        },
    },
};
</script>

<style></style>
