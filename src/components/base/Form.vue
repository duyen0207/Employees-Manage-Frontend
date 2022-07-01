<template lang="">
  <!-- Form -->
  <div id="form-container">
    <div v-if="isShowForm" class="modal">
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
                @click="$emit('closeForm')"
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
                    ref="empCodeInput"
                    :inputType="'text'"
                    :inputStyle="'primary-input'"
                    :wrapperStyle="'div-w-40'"
                    :placeHolder="'NV-001'"
                    required
                    :notifTooltip="'Mã nhân viên không được để trống.'"
                    v-model="formData.EmployeeCode"
                    >Mã</DInput
                  >

                  <DInput
                    ref="empNameInput"
                    :inputType="'text'"
                    :inputStyle="'primary-input'"
                    :wrapperStyle="'div-w-60'"
                    :placeHolder="'Nguyễn Văn A'"
                    :notifTooltip="'Tên không được để trống.'"
                    required
                    @inputFocus="validateEmployeeCode"
                    v-model="formData.EmployeeName"
                    >Tên</DInput
                  >
                </div>

                <DInput
                  ref="empDepartmentInput"
                  :inputType="'select'"
                  :inputStyle="'primary-input'"
                  :optionGroups="optionGroups"
                  required
                  :notifTooltip="'Đơn vị không được để trống.'"
                  @inputFocus="validateCodeName"
                  v-model="formData.DepartmentId"
                  >Đơn vị</DInput
                >

                <DInput
                  ref="empPositionInput"
                  :inputType="'text'"
                  :inputStyle="'primary-input'"
                  :placeHolder="'Nhân viên'"
                  @inputFocus="validateCodeNameDepartment"
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
                    ref="empBirthInput"
                    :inputType="'date'"
                    :inputStyle="'primary-input'"
                    :wrapperStyle="'div-w-40'"
                    :notifTooltip="'Ngày sinh không hợp lệ.'"
                    @inputFocus="validateCodeNameDepartment"
                    v-model="formData.DateOfBirth"
                    >Ngày sinh</DInput
                  >

                  <DInput
                    ref="empGenderInput"
                    :inputType="'radio'"
                    :inputStyle="'primary-input'"
                    :optionGroups="radioGroups"
                    :radioName="'gender'"
                    @inputFocus="validateCodeNameDepartment"
                    v-model="formData.Gender"
                    >Giới tính</DInput
                  >
                </div>

                <div class="rows-flexbox">
                  <DInput
                    ref="empIdNumberInput"
                    :inputType="'text'"
                    :inputStyle="'primary-input'"
                    :wrapperStyle="'div-w-60'"
                    @inputFocus="validateCodeNameDepartment"
                    v-model="formData.IdentityNumber"
                    >Số CMND</DInput
                  >

                  <DInput
                    ref="empIdDateInput"
                    :inputType="'date'"
                    :inputStyle="'primary-input'"
                    :wrapperStyle="'div-w-40'"
                    :notifTooltip="'Ngày cấp không hợp lệ.'"
                    @inputFocus="validateCodeNameDepartment"
                    v-model="formData.IdentityDate"
                    >Ngày cấp</DInput
                  >
                </div>

                <DInput
                  ref="empIdPlaceInput"
                  :inputType="'text'"
                  :inputStyle="'primary-input'"
                  @inputFocus="validateCodeNameDepartment"
                  v-model="formData.IdentityPlace"
                  >Nơi cấp</DInput
                >
              </div>
            </div>
            <!-- ADDRESS -->
            <DInput
              ref="empAddressInput"
              :inputType="'text'"
              :inputStyle="'primary-input'"
              @inputFocus="validateCodeNameDepartment"
              v-model="formData.Address"
              >Địa chỉ</DInput
            >

            <!-- CONTACT INFO
                  ex: phone number, email -->
            <div id="contact" class="rows-flexbox">
              <DInput
                ref="empPhoneInput"
                :inputType="'text'"
                :inputStyle="'primary-input'"
                @inputFocus="validateCodeNameDepartment"
                v-model="formData.PhoneNumber"
                >ĐT di động</DInput
              >

              <DInput
                ref="empTelephoneInput"
                :inputType="'text'"
                :inputStyle="'primary-input'"
                @inputFocus="validateCodeNameDepartment"
                v-model="formData.TelephoneNumber"
                >ĐT cố định</DInput
              >

              <DInput
                ref="empEmailInput"
                :inputType="'text'"
                :inputStyle="'primary-input'"
                @inputFocus="validateCodeNameDepartment"
                :notifTooltip="'Email không đúng định dạng.'"
                v-model="formData.Email"
                >Email</DInput
              >
            </div>

            <!-- BANK INFO
                  ex: account, name, branch -->
            <div id="bank-info" class="rows-flexbox">
              <DInput
                ref="empBankAccountInput"
                :inputType="'text'"
                :inputStyle="'primary-input'"
                @inputFocus="validateCodeNameDepartment"
                v-model="formData.BankAccountNumber"
                >Tài khoản ngân hàng</DInput
              >

              <DInput
                ref="empBankNameInput"
                :inputType="'text'"
                :inputStyle="'primary-input'"
                @inputFocus="validateCodeNameDepartment"
                v-model="formData.BankName"
                >Tên ngân hàng</DInput
              >

              <DInput
                ref="empBankBranchInput"
                :inputType="'text'"
                :inputStyle="'primary-input'"
                @inputFocus="validateCodeNameDepartment"
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
              @click="$emit('closeForm')"
            >
              Hủy
            </button>

            <div class="horizontal-group-btn">
              <button
                id="add-edit-btn"
                type="button"
                class="primary-btn second-btn"
                @click="$emit('clickSave', this.formData)"
              >
                Cất
              </button>
              <button
                id="add-multi-btn"
                type="button"
                class="primary-btn"
                @click="$emit('clickSaveAndNew', this.formData)"
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
// import các thư viện
import axios from "axios";

import DInput from "@/components/base/Input.vue";

const SERVER_API_URL = "https://amis.manhnv.net/api/v1/Employees";

let employeeAPI = {
  getEmployees: `${SERVER_API_URL}/filter`,
  addNewEmployees: `${SERVER_API_URL}`,
  getNewCode: `${SERVER_API_URL}/NewEmployeeCode`,
};
export default {
  components: {
    DInput,
  },
  props: {
    isShowForm: Boolean,
  },
  data() {
    return {
      optionGroups: [
        {
          value: "142cb08f-7c31-21fa-8e90-67245e8b283e",
          label: "Phòng nhân sự",
        },
        {
          value: "17120d02-6ab5-3e43-18cb-66948daf6128",
          label: "Phòng tuyển sinh",
        },
        {
          value: "469b3ece-744a-45d5-957d-e8c757976496",
          label: "Phòng sản xuất",
        },
        {
          value: "4e272fc4-7875-78d6-7d32-6a1673ffca7c",
          label: "Phòng đào tạo",
        },
      ],

      radioGroups: [
        {
          value: "1",
          label: "Nam",
        },
        {
          value: "2",
          label: "Nữ",
        },
        {
          value: "3",
          label: "Khác",
        },
      ],

      formData: {
        EmployeeCode: "",
        EmployeeName: "",
        DepartmentId: "142cb08f-7c31-21fa-8e90-67245e8b283e",
        DepartmentName: "",
        EmployeePosition: "Nhân Viên",

        DateOfBirth: null,
        Gender: "1",
        GenderName: "",
        IdentityNumber: "823923",
        IdentityDate: null,
        IdentityPlace: "Hà Nội",
        Address: "Hà Nội",

        PhoneNumber: "804895",
        TelephoneNumber: "84093895",
        Email: "abc@gmail.com",

        BankAccountNumber: "8304938",
        BankName: "BIDV",
        BankBranchName: "6",
      },
    };
  },

  methods: {
    /**
     * chuẩn hóa ngày theo format
     * default: dd/mm/yyyy
     */
    formatDate(date, type = "en-GB") {
      if (date) {
        let formatDate = new Date(date);
        formatDate = formatDate.toLocaleDateString(type);
        return formatDate;
      }
      return "";
    },

    // reset form
    resetForm() {
      console.log("reset lại form...");
      Object.keys(this.formData).forEach((key) => {
        this.formData[key] = null;
      });

      console.log("đã reset xong: ", this.formData);
    },

    // lấy thông tin cụ thể của 1 employee
    getEmployeeInfo(employeeId) {
      try {
        var me = this;
        const getInforURL = `${SERVER_API_URL}/${employeeId}`;
        // gọi api
        axios
          .get(getInforURL)
          .then(function (res) {
            console.log("lấy thông tin nhân viên ", res.data);
            return res.data;
          })
          .then(function (employee) {
            // chuẩn hóa ngày
            employee.DateOfBirth = me.formatDate(employee.DateOfBirth, "en-CA");
            employee.IdentityDate = me.formatDate(
              employee.IdentityDate,
              "en-CA"
            );
            // hiển thị trên form
            let { EmployeeId, ...empData } = employee;
            me.formData = empData;
          })
          .catch(function (res) {
            console.log("thế này là hỏng ", res);
          });
      } catch (error) {
        console.log("lỗi khi lấy thông tin nhân viên: ", error);
      }
    },

    // lấy mã nhân viên mới
    getNewCode() {
      try {
        var me = this;
        // gọi api để lấy mã nhân viên mới
        axios
          .get(employeeAPI.getNewCode)
          .then(function (res) {
            return res.data;
          })
          .then(function (code) {
            me.formData.EmployeeCode = code;
            console.log("lấy mã mới nào: ", code);
          })
          .catch(function (res) {
            console.log("lỗi khi lấy mã nhân viên: ",res);
            me.formData.EmployeeCode=null;
          });
      } catch (error) {
        console.log("lỗi khi lấy mã nhân viên: ", error);
      }
    },

    // validate ngay trên form-----------------------------
    // kiểm tra nếu mã để trống
    validateEmployeeCode() {
      if (!this.formData.EmployeeCode) {
        this.$refs.empCodeInput.turnOnWrongNotif();
      }
    },
    // kiểm tra nếu mã và tên để trống
    validateCodeName() {
      this.validateEmployeeCode();
      if (!this.formData.EmployeeName) {
        this.$refs.empNameInput.turnOnWrongNotif();
      }
    },
    // kiểm tra nếu mã, tên, và đơn vị để trống
    validateCodeNameDepartment() {
      this.validateCodeName();
      if (!this.formData.DepartmentId) {
        this.$refs.empDepartmentInput.turnOnWrongNotif();
      }
    },
  },
};
</script>
<style lang=""></style>
