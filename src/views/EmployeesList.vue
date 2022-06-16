<template lang="">
    <div>
        <!-- <TheContent/> -->
        <div class="rows-flexbox">
            <TheNavbar/>
            <div class="main">
                <TheHeader/>
                <TheContent :employees="employees"/>
            </div>
        </div>
    </div>
</template>
<script>
import axios from "axios";

import TheContent from "@/components/layout/TheContent.vue";
import TheHeader from "@/components/layout/TheHeader.vue";
import AppButton from "@/components/base/Button.vue";
import TheNavbar from "@/components/layout/TheNavbar.vue";

const SERVER_API_URL = "https://amis.manhnv.net/api/v1/Employees";

let employeeAPI = {
  getEmployees: `${SERVER_API_URL}/filter`,
  addNewEmployees: `${SERVER_API_URL}`,
  getNewCode: `${SERVER_API_URL}/NewEmployeeCode`,
};

const Action = {
  VALIDATE: 0,
  ADD: 1,
  EDIT: 2,
  DELETE: 3,
  GET_INFO: 4,
};


export default {
  name: "EmployeesList",
  components: {
    TheNavbar,
    TheHeader,
    TheContent,
    AppButton,
  },
  data() {
    return {
      FullName: "Nguyễn Văn Mạnh",
      employees: [],
    };
  },
  //before create, created
  created() {
    try {
      console.log("1. created");

      var me = this;
      // gọi api
      axios.get(employeeAPI.getEmployees)
      .then(function(res){
        console.log(res.data.Data);
        me.employees = res.data.Data;
        console.log("this is me: ",me.employees[0].EmployeeCode);
      })
      .catch(function(res) {
        console.log(res);
      })
      
    } catch (error) {
      console.log("lỗi khi created: ", error);
    }
  },
  //before mount
  beforeMount() {
    console.log("2. on before mount");
  },

  //mounted
  mounted() {
    console.log("3. on mounted");
  },

  //   before update
  beforeUpdate() {
    console.log("4. on before update");
  },

  // updated
  updated() {
    console.log("5. on updated");
  },

  // before destroy
  beforeDestroy() {
    console.log("6. before destroy");
  },
  // destroyed
  destroyed() {
    console.log("7. destroyed");
  },
};
</script>
<style>
</style>