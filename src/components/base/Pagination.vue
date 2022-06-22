<template lang="">
  <div class="rows-flexbox pagination">
    <select
      :value="pageSize"
      @input="$emit('update:pageSize', $event.target.value)"
      class="primary-input"
      name="paging"
      id="records-num-pagination"
    >
      <option value="10">10 bản ghi trên 1 trang</option>
      <option value="20">20 bản ghi trên 1 trang</option>
      <option value="30">30 bản ghi trên 1 trang</option>
      <option value="50">50 bản ghi trên 1 trang</option>
      <option value="100">100 bản ghi trên 1 trang</option>
    </select>

    <div class="rows-flexbox pagination-group-btn">
      <button
        class="paginate-direction-btn"
        :disabled="pageNumber == 1 ? true : false"
        @click="backPage"
      >
        Trước
      </button>
      <span v-for="(item, index) in new Array(totalPages)" :key="index">
        <span
          class="pagination-more-index"
          v-if="index + 1 == totalPages - 1 && pageNumber < totalPages - 4"
          >...</span
        >
        <button
          :class="[
            pageNumber == index + 1 ? 'pagination-index-btn-focus' : '',
            'pagination-index-btn',
          ]"
          v-else
          v-show="showPagination(index)"
          @click="choosePage(index)"
        >
          {{ index + 1 }}
        </button>
      </span>
      <button
        class="paginate-direction-btn"
        :disabled="pageNumber == totalPages ? true : false"
        @click="nextPage"
      >
        Sau
      </button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    pageNumber: Number,
    pageSize: String,
    totalPages: Number,
  },

  watch: {
    pageSize(newPageSize) {
      console.log("from child component: ", newPageSize);
      this.$emit("update:pageNumber", 1);
    },
  },

  methods: {
    // chọn page number
    choosePage(index) {
      // emit lên component cha
      this.$emit("update:pageNumber", index + 1);
    },

    // quay lại paginate index trước
    backPage() {
      console.log("in pagination, page number is: ", this.pageNumber);
      if (this.pageNumber == 1) {
        return true;
      } else {
        // emit lên component cha
        this.$emit("update:pageNumber", this.pageNumber - 1);

        return false;
      }
    },
    // chuyển đến paginate index đằng sau
    nextPage() {
      if (this.pageNumber == this.totalPages) {
        return true;
      } else {
        // emit lên component cha
        this.$emit("update:pageNumber", this.pageNumber + 1);
        return false;
      }
    },
    // hiển thị index của các trang
    showPagination(index) {
      let isShowPageIndex = false;
      // nếu số trang <5 hoặc là trang cuối
      if (
        this.totalPages <= 5 ||
        index + 1 == this.totalPages ||
        (index + 1 == this.totalPages - 1 &&
          this.pageNumber < this.totalPages - 4)
      )
        isShowPageIndex = true;
      // nếu pageNumber nằm trong 5 trang cuối
      else if (
        this.pageNumber >= this.totalPages - 4 &&
        index + 1 >= this.totalPages - 4
      )
        isShowPageIndex = true;
      // nếu index >= pageNumber và nhỏ hơn pageNumber +4
      else if (index + 1 >= this.pageNumber && index + 1 <= this.pageNumber + 3)
        isShowPageIndex = true;

      return isShowPageIndex;
    },
  },
};
</script>
<style lang="css">
@import url("@/css/base/pagination.css");
</style>
