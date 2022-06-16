<template lang="">
    <div>
        <!-- <TheContent/> -->
        <div class="rows-flexbox">
            <TheNavbar/>
            <div class="main">
                <TheHeader/>
                <TheContent/>
            </div>
            <!-- <app-button/> -->
        </div>
    </div>
</template>
<script>
import TheContent from "@/components/layout/TheContent.vue";
import TheHeader from "@/components/layout/TheHeader.vue";
import AppButton from "@/components/base/Button.vue";

import TheNavbar from "@/components/layout/TheNavbar.vue";

export default {
  name: "EmployeesList",
  components: {
    TheNavbar,
    TheHeader,
    TheContent,
    AppButton,
  },
};
</script>
<style>
</style>