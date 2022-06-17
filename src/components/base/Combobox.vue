<template lang="">
  <span class="action-combobox">
    <button class="select-selected border-icon-combobox" @click="showCombobox">
      <font-awesome-icon icon="fa-solid fa-caret-down"></font-awesome-icon>
    </button>
    <ul class="select-items" v-show="isShowCombobox">
      <li>Nhân bản</li>
      <li class="delete-em-btn" @click="btnDeleteOnClick(emp.EmployeeId)">
        Xóa
      </li>
      <li>Ngừng sử dụng</li>
    </ul>
  </span>
</template>
<script>
export default {
  name: "DCombobox",
  data() {
    return {
      isShowCombobox: false,
    };
  },
  props: {
    emp: {
        EmployeeId: ""
    },
    SERVER_API_URL: "https://amis.manhnv.net/api/v1/Employees"
  },

  methods: {
    // hiển thị tùy chọn combobox
    showCombobox() {
      this.isShowCombobox = true;
    },
    // XÓA
    btnDeleteOnClick(employeeId = null) {
      if (employeeId) {
        try {
          const deleteURL = `${SERVER_API_URL}/${employeeId}`;
          // gọi api
          axios
            .delete(deleteURL)
            .then(function (res) {
              console.log("xóa thành công: ", res);
              console.log(res.data);
            })
            .catch(function (error) {
              console.log("không xóa được. server trả về: ", error);
            });
        } catch (error) {
          console.log("lỗi khi xóa: ", error);
        }
      } else {
        console.log("Phải biết id thì ms xóa đc chứ!!");
      }
    },
  },
};
</script>
<style lang=""></style>
