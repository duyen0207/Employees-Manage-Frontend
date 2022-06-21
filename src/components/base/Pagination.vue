<template lang="">
  <div class="rows-flexbox">
    <select
      v-model="pageSize"
      class="primary-input"
      name="paging"
      id="records-num-pagination"
    >
      <option value="20">20 bản ghi trên 1 trang</option>
      <option value="30">30 bản ghi trên 1 trang</option>
      <option value="50">50 bản ghi trên 1 trang</option>
      <option value="100">100 bản ghi trên 1 trang</option>
    </select>

    <div class="rows-flexbox">
      <button :disabled="pageNumber == 1 ? true : false" @click="backPage">
        Trước
      </button>
      <span
        v-for="(item, index) in new Array(
          Math.ceil(employees.length / pageSize)
        )"
        :key="index"
      >
        <span
          v-if="
            index + 1 == Math.ceil(employees.length / pageSize) - 1 &&
            pageNumber < Math.ceil(employees.length / pageSize) - 4
          "
          >...</span
        >
        <button
          v-else
          v-show="showPagination(index)"
          @click="pageNumber = index + 1"
        >
          {{ index + 1 }}
        </button>
      </span>
      <button
        :disabled="
          pageNumber == Math.ceil(employees.length / pageSize) ? true : false
        "
        @click="nextPage"
      >
        Sau
      </button>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style lang=""></style>
