<template lang="">
  <div id="dialog">
    <div v-show="isShowDialog" class="modal"
    style="z-index: 10;"
    >
      <div class="notif-window modal-content">
        <div class="notif-msg rows-flexbox">
          <div class="notif-icon">
            <!-- <i class="fa-solid fa-circle-question"></i> -->
            <font-awesome-icon
              :icon="iconType[dialogType].icon"
              :class="iconType[dialogType].class"
            />
          </div>
          <div class="notif-text">
            <div v-for="(msg, index) in messages" :key="index">
              {{ msg }}
            </div>
          </div>
        </div>
        <hr />
        <!-- Success dialog hoặc validate dialog-->
        <div
          v-if="dialogType == type.SUCCESS || dialogType == type.ERROR"
          class="action-btn rows-flexbox"
          style="justify-content: center"
        >
          <button
            @click="closeDialog"
            id="close-success-notif"
            class="primary-btn"
          >
            Đóng
          </button>
        </div>

        <!-- confirm edit or add -->
        <div
          v-else-if="dialogType == type.CONFIRM_SAVE"
          class="action-btn rows-flexbox"
        >
          <button
            @click="closeDialog"
            id="cancel"
            class="primary-btn second-btn"
          >
            Hủy
          </button>
          <div class="normal-box">
            <!-- đóng cả dialog -->
            <button
              @click="closeDialog"
              id="reject"
              class="primary-btn second-btn"
            >
              Không
            </button>
            <!-- lưu dữ liệu-->
            <button @click="confirmSave" id="agree" class="primary-btn">
              Có
            </button>
          </div>
        </div>

        <!-- confirm delete -->
        <div
          v-else-if="dialogType == type.CONFIRM_DELETE"
          class="action-btn rows-flexbox"
        >
          <!-- đóng dialog -->
          <button
            @click="closeDialog"
            id="del-reject"
            class="primary-btn second-btn"
          >
            Không
          </button>
          <!-- thực hiện hành động xóa -->
          <button @click="confirmDelete" id="del-agree" class="primary-btn">
            Có
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShowDialog: true,
      type: {
        // validate
        ERROR: "0",
        // add success, edit success, delete success
        SUCCESS: "1",
        // confirm delete, confirm save
        CONFIRM_SAVE: "2",
        CONFIRM_DELETE: "3",
      },
      iconType: [
        {
          icon: "fa-solid fa-circle-exclamation",
          class: "error-icon",
        },
        {
          icon: "fa-solid fa-circle-check",
          class: "success-icon",
        },
        {
          icon: "fa-solid fa-circle-question",
          class: "question-icon",
        },
        {
          icon: "fa-solid fa-triangle-exclamation",
          class: "warning-icon",
        },
      ],
    };
  },
  props: {
    messages: Array,
    // default: success
    dialogType: String,
  },
  methods: {
    // hiển thị dialog
    showDialog() {
      this.isShowDialog = true;
    },
    // đóng dialog
    closeDialog() {
      this.isShowDialog = false;
    },

    // xác nhận lưu
    confirmSave() {
      this.closeDialog();
      this.$emit("saveAgree");
    },

    // xác nhận xoá
    confirmDelete() {
      this.closeDialog();
      this.$emit("deleteAgree");
    },
  },
};
</script>
<style lang="css">
#dialog {
    z-index: 10;
}

</style>
