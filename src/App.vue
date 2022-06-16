<template>
  <router-view />
  <div>

  </div>
</template>

<script>
import AppButton from "@/components/base/Button.vue";
export default {
  name: "App",
  components: {
    AppButton,
  },
};
</script>

<style lang="css">
@import url("@/css/main.css");
</style>
