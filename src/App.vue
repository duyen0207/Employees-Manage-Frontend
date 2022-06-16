<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <router-view/>
  <div>
    <app-button>bye</app-button>
  </div>
</template>

<script>
import AppButton from "@/components/base/Button.vue"
export default {
  name: "App",
  components: {
    AppButton,
  }
}
</script>

<style lang="css">
@import url("@/css/main.css");
</style>
