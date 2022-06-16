<template lang="">
    <div>
        <!-- <TheContent/> -->
        <the-header/>
        <TheContent/>
        <app-button/>
    </div>
</template>
<script>
import TheContent from "@/components/layout/TheContent.vue";
import TheHeader from "@/components/layout/TheHeader.vue";
import AppButton from "@/components/base/Button.vue"

// import TheNavbar from "../components/layout/TheNavbar.vue";

export default {
    name: "EmployeesList",
    components: {
        // TheNavbar,
        TheHeader,
        TheContent,
        AppButton,
    }
}
</script>
<style>
</style>