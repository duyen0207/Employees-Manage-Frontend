<template lang="">
  <span class="action-combobox">
    <ul class="select-items" v-show="isShowCombobox"
      :style="{top: `${positionTop}px`, left: `${positionLeft}px`}"
    >
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
    isShowForm: false,
    employees: [],

    positionTop: 0,
    positionLeft: 0,
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
