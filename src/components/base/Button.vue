<template lang="">
    <button class="primary-btn"><slot/></button> 
</template>

<script>
export default {
  props: {
    type: "add",
  },
};
</script>
<style>
@import url("@/css/base/button.css");
</style>


