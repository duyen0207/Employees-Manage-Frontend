<template>
  <router-view />
  <div>
    

  </div>
</template>

<script>
import DButton from "@/components/base/Button.vue";
// import Dialog from "@/components/base/Dialog.vue";

export default {
  name: "App",
  components: {
    DButton,
    // Dialog,
  },
};
</script>

<style lang="css">
@import url("@/css/main.css");
</style>
