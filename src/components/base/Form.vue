<template lang="">
  <div id="form-container">
    <div v-show="isShowForm" class="modal">
      <form
        action=""
        method="post"
        id="employee-form"
        class="modal-content animate"
      >
        <div id="new-employee-container">
          <!-- Form title ------------------------>
          <div id="new-employee-title" class="rows-flexbox">
            <div class="rows-flexbox">
              <h2>Thông tin nhân viên</h2>

              <div class="horizontal-select-group">
                <input type="checkbox" id="isCustomer" />
                <label for="isCustomer">Là khách hàng</label>
                <input type="checkbox" id="isProvider" />
                <label for="isProvider">Là nhà cung cấp</label>
              </div>
            </div>
            <!-- help + close --------------------->
            <div class="normal-box">
              <button type="button" id="help-btn" class="icon">
                <font-awesome-icon
                  icon="fa-regular fa-circle-question"
                ></font-awesome-icon>
              </button>
              <button
                type="button"
                id="close-btn"
                class="icon"
                @click="btnOnCloseForm"
              >
                <font-awesome-icon icon="fa-solid fa-xmark" />
                <!-- <font-awesome-icon icon="fa-solid fa-xmark" /> -->
              </button>
            </div>
          </div>

          <!-- Form content ----------------------------->
          <div id="new-employee-content">
            <div class="rows-flexbox">
              <!-- EMPLOYEE INFO. 
                      ex: employee-code, department, position
                      -->
              <div class="" id="employee-info">
                <div class="rows-flexbox">
                  <DInput
                    :inputType="'text'"
                    :inputStyle="'primary-input'"
                    :wrapperStyle="'div-w-40'"
                    :placeHolder="'NV-001'"
                    required
                    v-model="formData.EmployeeCode"
                    >Mã</DInput
                  >

                  <DInput
                    :inputType="'text'"
                    :inputStyle="'primary-input'"
                    :wrapperStyle="'div-w-60'"
                    :placeHolder="'Nguyễn Văn A'"
                    :notifTooltip="'Tên không được để trống.'"
                    required
                    v-model="formData.EmployeeName"
                    >Tên</DInput
                  >
                </div>

                <DInput
                  :inputType="'select'"
                  :inputStyle="'primary-input'"
                  :optionGroups="optionGroups"
                  required
                  v-model="formData.DepartmentId"
                  >Đơn vị</DInput
                >

                <DInput
                  :inputType="'text'"
                  :inputStyle="'primary-input'"
                  :placeHolder="'Nhân viên'"
                  v-model="formData.EmployeePosition"
                  >Chức danh</DInput
                >
              </div>

              <!-- PERSONAL INFO. 
                      ex: birthday, sex, etc.
                      -->
              <div class="" id="personal-info">
                <div class="rows-flexbox">
                  <DInput
                    :inputType="'date'"
                    :inputStyle="'primary-input'"
                    :wrapperStyle="'div-w-40'"
                    :notifTooltip="'Ngày sinh không hợp lệ.'"
                    v-model="formData.DateOfBirth"
                    >Ngày sinh</DInput
                  >

                  <DInput
                    :inputType="'radio'"
                    :inputStyle="'primary-input'"
                    :optionGroups="radioGroups"
                    :radioName="'gender'"
                    v-model="formData.Gender"
                    >Giới tính</DInput
                  >
                </div>

                <div class="rows-flexbox">
                  <DInput
                    :inputType="'text'"
                    :inputStyle="'primary-input'"
                    :wrapperStyle="'div-w-60'"
                    v-model="formData.IdentityNumber"
                    >Số CMND</DInput
                  >

                  <DInput
                    :inputType="'date'"
                    :inputStyle="'primary-input'"
                    :wrapperStyle="'div-w-40'"
                    :notifTooltip="'Ngày cấp không hợp lệ.'"
                    v-model="formData.IdentityDate"
                    >Ngày cấp</DInput
                  >
                </div>

                <DInput
                  :inputType="'text'"
                  :inputStyle="'primary-input'"
                  v-model="formData.IdentityPlace"
                  >Nơi cấp</DInput
                >
              </div>
            </div>
            <!-- ADDRESS -->
            <DInput
              :inputType="'text'"
              :inputStyle="'primary-input'"
              v-model="formData.Address"
              >Địa chỉ</DInput
            >

            <!-- CONTACT INFO
                  ex: phone number, email -->
            <div id="contact" class="rows-flexbox">
              <DInput
                :inputType="'text'"
                :inputStyle="'primary-input'"
                v-model="formData.PhoneNumber"
                >ĐT di động</DInput
              >

              <DInput
                :inputType="'text'"
                :inputStyle="'primary-input'"
                v-model="formData.TelephoneNumber"
                >ĐT cố định</DInput
              >

              <DInput
                :inputType="'text'"
                :inputStyle="'primary-input'"
                :notifTooltip="'Email không đúng định dạng.'"
                v-model="formData.Email"
                >Email</DInput
              >
            </div>

            <!-- BANK INFO
                  ex: account, name, branch -->
            <div id="bank-info" class="rows-flexbox">
              <DInput
                :inputType="'text'"
                :inputStyle="'primary-input'"
                v-model="formData.BankAccountNumber"
                >Tài khoản ngân hàng</DInput
              >

              <DInput
                :inputType="'text'"
                :inputStyle="'primary-input'"
                v-model="formData.BankName"
                >Tên ngân hàng</DInput
              >

              <DInput
                :inputType="'text'"
                :inputStyle="'primary-input'"
                v-model="formData.BankBranchName"
                >Chi nhánh</DInput
              >
            </div>
          </div>

          <hr class="divider" />

          <!-- ACTION GROUP WITH FORM
                  ex: add, cancel, etc. -->
          <div id="form-employee-action" class="rows-flexbox">
            <button
              type="button"
              id="cancel-btn"
              class="primary-btn second-btn"
              @click="btnOnCloseForm"
            >
              Hủy
            </button>

            <div class="horizontal-group-btn">
              <button
                id="add-edit-btn"
                type="button"
                class="primary-btn second-btn"
                @click="btnSaveOnClick"
              >
                Cất
              </button>
              <button
                id="add-multi-btn"
                type="button"
                class="primary-btn"
                @click="btnSaveOnClick(true)"
              >
                Cất và thêm
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>

import DInput from "@/components/base/Input.vue"

export default {
    components: {
        DInput,
    },

    data() {
        return {
            formData:{},
        }
    },
};
</script>
<style lang="css"></style>
