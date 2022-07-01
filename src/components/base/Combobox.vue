<template lang="">
  <span class="action-combobox">
    <button class="select-selected border-icon-combobox" @click="showCombobox">
      <font-awesome-icon icon="fa-solid fa-caret-down"></font-awesome-icon>
    </button>
    <ul class="select-items" v-show="isShowCombobox">
      <li
        v-for="(option, index) in selectOptions"
        :key="index"
        @click="$emit(option.clickEvent)"
      >
        {{ option.label }}
      </li>
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
      EmployeeId: "",
    },
    isShowForm: false,
    employees: [],
    // truyền từ prop danh sách các lựa chọn, mỗi lựa chọn
    // ở dạng object với các key là {label, clickEvent}
    selectOptions: Array,
  },

  methods: {
    // hiển thị tùy chọn combobox
    showCombobox() {
      if (this.isShowCombobox == false) this.isShowCombobox = true;
      else this.isShowCombobox = false;
    },
  },
};
</script>
<style lang=""></style>
