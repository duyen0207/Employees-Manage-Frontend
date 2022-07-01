<template lang="">
  <div>
    <div class="rows-flexbox">
      <TheNavbar />
      <div class="main">
        <TheHeader />
        <TheContent />
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";

import TheContent from "@/components/layout/TheContent.vue";
import TheHeader from "@/components/layout/TheHeader.vue";
import TheNavbar from "@/components/layout/TheNavbar.vue";

export default {
  name: "EmployeesList",
  components: {
    TheNavbar,
    TheHeader,
    TheContent,
  },

  data() {
    return {
      FullName: "Nguyễn Văn Mạnh",
      // employees: [],
    };
  },

  //before create, created
  created() {
    // this.loadData();
    console.log("page created.");
  },
  //before mount
  beforeMount() {
    // console.log("2. on before mount");
  },

  //mounted
  mounted() {
    // console.log("3. on mounted");
  },

  //   before update
  beforeUpdate() {
    // console.log("4. on before update");
  },

  // updated
  updated() {
    // console.log("5. on updated");
  },

  // before destroy
  beforeDestroy() {
    // console.log("6. before destroy");
  },
  // destroyed
  destroyed() {
    // console.log("7. destroyed");
  },
};
</script>
<style></style>
