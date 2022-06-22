<template lang="">
  <div class="content">
    <!-- Dialog notification -->
    <DDialog
      ref="notifDialog"
      :messages="dialogMsg"
      :dialogType="dialogType"
      @saveAgree="addOrEdit"
      @deleteAgree="btnDeleteOnClick"
      @afterCloseDialog="btnAfterCloseDialog"
    />

    <!-- Content header ----------------------------------------------->
    <div class="content-header rows-flexbox">
      <h2 class="content-title">Nhân viên</h2>
      <button
        @click="btnShowForm(null)"
        id="add-new-emp-btn"
        class="primary-btn"
      >
        Thêm mới nhân viên
      </button>
    </div>

    <!-- Main content ----------------------------------------------->
    <div class="content">
      <!-- search input and reload button----------------------->
      <div class="content-header rows-flexbox">
        <input
          id="input-search-employee"
          class="primary-input icon-input"
          type="text"
          placeholder="Tìm kiếm theo mã, tên nhân viên"
          v-model="searchPattern"
        />
        <button id="reload-data" class="none-btn" @click="employeesInPage">
          <font-awesome-icon icon="fa-solid fa-arrow-rotate-right" />
        </button>
      </div>
      <!-- Data table ------------------------------------------->
      <DTable
        v-model:employees="employees"
        @rowEdit="btnShowForm"
        @rowDuplicate="btnNewDuplicateOnClick"
        @rowDelete="btnShowDialog"
      />

      <div class="rows-flexbox table-footer">
        <div>Tổng số bản ghi: {{ totalRecords }}</div>

        <!-- Paginate -->
        <DPagination
          v-model:pageNumber="pageNumber"
          v-model:pageSize="pageSize"
          v-model:totalPages="totalPages"
        />
      </div>
    </div>

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
  </div>
</template>
<script>
// import các thư viện
import axios from "axios";

// import các components
import DCombobox from "@/components/base/Combobox.vue";
import DDialog from "@/components/base/Dialog.vue";
import DInput from "@/components/base/Input.vue";
import DTable from "@/components/base/Table.vue";
import DPagination from "@/components/base/Pagination.vue";

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
  name: "TheContent",
  components: {
    DCombobox,
    DDialog,
    DInput,
    DTable,
    DPagination,
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

      employees: [],

      totalRecords: 0,
      totalPages: 0,
      pageNumber: 1,
      pageSize: "10",

      searchPattern: "",
      chosenEmployeeId: null,

      isShowForm: false,
      saveAndNewMode: false,

      dialogMsg: ["Thêm mới thành công"],
      dialogType: "2",

      // custom action combobox
      selectOptions: [
        {
          label: "Nhân bản",
          clickEvent: "duplicateEmp",
        },
        {
          label: "Xóa",
          clickEvent: "deleteEmp",
        },
        {
          label: "Ngừng sử dụng",
          clickEvent: "stopUsing",
        },
      ],

      apiMethod: "post",
      formData: {
        EmployeeCode: "",
        EmployeeName: "Tên",
        DepartmentId: "142cb08f-7c31-21fa-8e90-67245e8b283e",
        DepartmentName: "tên đơn vị",
        EmployeePosition: "Nhân Viên",

        DateOfBirth: null,
        Gender: "1",
        GenderName: String,
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
  watch: {
    // TÌM KIẾM
    searchPattern() {
      this.pageNumber=1;
      this.searchEmployee();
    },

    // khi page number thay đổi, gọi hàm load dữ liệu
    pageNumber(newPageNumber) { 
      if(this.searchPattern) this.searchEmployee();
      else this.employeesInPage();
    },
    // khi page size thay đổi, gọi hàm load dữ liệu
    pageSize() {
      if(this.searchPattern) this.searchEmployee();
      else this.employeesInPage();
    },
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

    // ktra giới tính
    setGenderName(gender) {
      let genderName = "";
      if (gender == "1") {
        genderName = "Nam";
      } else if (gender == "2") {
        genderName = "Nữ";
      } else if (gender == "3") {
        genderName = "Khác";
      }
      return genderName;
    },

    // tìm kiếm
    searchEmployee() {
      try {
        // console.log("Searching...", newSearchPattern);
        let searchURL = `${SERVER_API_URL}/filter?pageSize=${this.pageSize}&pageNumber=${this.pageNumber}&employeeFilter=${this.searchPattern}`;

        var me = this;
        // gọi api search
        axios
          .get(searchURL)
          .then(function (res) {
            if (res.data.Data) {
              me.employees = res.data.Data;
              me.totalPages = res.data.TotalPage;
              me.totalRecords = res.data.TotalRecord;
            } else if (!res.data.Data) {
              me.employees = [];
              me.totalPages = 1;
              me.totalRecords = 0;
            }
            console.log("search result: ", me.employees);
          })
          .catch(function (res) {
            console.log(res);
          });
      } catch (error) {
        console.log("lỗi khi search: ", error);
      }
    },

    // gọi api load toàn bộ dữ liệu
    loadData() {
      try {
        console.log("load data");
        var me = this;
        // gọi api để load dữ liệu lên bảng
        axios
          .get(employeeAPI.getEmployees)
          .then(function (res) {
            me.employees = res.data.Data;
            console.log("this is data: ", me.employees);
            me.totalRecords = me.employees.length;
          })
          .catch(function (res) {
            console.log(res);
          });
      } catch (error) {
        console.log("lỗi khi created: ", error);
      }
    },

    // load danh sách nv theo trang
    employeesInPage() {
      try {
        let paginateURL = `${SERVER_API_URL}/filter?pageSize=${this.pageSize}&pageNumber=${this.pageNumber}`;

        var me = this;
        // gọi api search
        axios
          .get(paginateURL)
          .then(function (res) {
            me.employees = res.data.Data;

            me.totalPages = res.data.TotalPage;
            me.totalRecords = res.data.TotalRecord;
          })
          .catch(function (res) {
            console.log(res);
          });
      } catch (error) {
        console.log("lỗi khi lọc: ", error);
      }
    },

    // lựa chọn emp id để thực hiện các hành động như sửa, xóa
    setChoosenEmpId(employeeId) {
      if (employeeId) {
        this.chosenEmployeeId = employeeId;
      }
      console.log("set employee id: ", this.chosenEmployeeId);
    },

    // reset lại employee đã chọn
    resetChosenEmployeeId() {
      console.log("nhân viên được chọn là: ", this.chosenEmployeeId);
      this.chosenEmployeeId = null;
      console.log("reset thành công.");
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
            console.log("gọi xong api rồi ", res.data);
            return res.data;
          })
          .then(function (code) {
            me.formData.EmployeeCode = code;
            console.log("lấy mã mới nào: ", code);
          })
          .catch(function (res) {
            console.log(res);
          });
      } catch (error) {
        console.log("lỗi khi lấy mã nhân viên: ", error);
      }
    },

    // reset form
    resetForm() {
      console.log("reset lại form...");
      Object.keys(this.formData).forEach((key) => {
        this.formData[key] = null;
      });

      console.log("đã reset xong: ", this.formData);
    },

    // validate---------------------------------------------
    // validate date
    validateDate(date) {
      let checkDate = true;
      let errorMsg = "Ngày không tồn tại.\n";
      if (date) {
        const dateFormat = new Date(date);

        let year = dateFormat.getFullYear();
        let day = dateFormat.getDate();
        let month = dateFormat.getMonth() + 1;

        // kiểm tra ngày có tồn tại không
        if (day > 31 || month > 12 || day < 1 || month < 1) return false;
        else {
          // năm nhuận
          if (year % 4 == 0) {
            if (month == 2 && day > 29) checkDate = false;
          } else {
            let numDays = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            if (day > numDays[month]) checkDate = false;
          }
        }

        // kiểm tra ngày có hợp lệ không
        let today = new Date();
        if (dateFormat.getTime() > today.getTime()) {
          checkDate = false;
          errorMsg = "Ngày không được lớn hơn thời điểm hiện tại.\n";
        }
      } else checkDate = false;

      return {
        check: checkDate,
        errorMsg: errorMsg,
      };
    },

    // validate email
    validateEmail(email) {
      var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      return re.test(email);
    },

    // validate when click save
    validateOnclick(data) {
      let errorInfo = [];
      let check = true;

      // check compulsory field-----------------------------------------
      if (!data.EmployeeCode) {
        check = false;
        errorInfo.push("- Mã nhân viên không được để trống.\n");
      }

      if (!data.EmployeeName) {
        check = false;
        errorInfo.push("- Tên nhân viên không được để trống.\n");
      }

      if (!data.DepartmentId) {
        check = false;
        errorInfo.push("- Đơn vị không được để trống.\n");
      }

      // check date field-------------------------------------------------
      let dobValid = this.validateDate(data.DateOfBirth);
      if (!dobValid.check) {
        check = false;
        errorInfo.push("- Ngày sinh: " + dobValid.errorMsg);
      }

      let idDateValid = this.validateDate(data.IdentityDate);
      if (!idDateValid.check) {
        check = false;
        errorInfo.push("- Ngày cấp CMND: " + idDateValid.errorMsg);
      }

      // check email-----------------------------------------------------
      if (data.Email) {
        if (!this.validateEmail(data.Email)) {
          check = false;
          errorInfo.push("- Email không đúng định dạng.\n");
        }
      }

      return {
        check: check,
        errorInfo: errorInfo,
      };
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

    // xóa toàn bộ thông báo validate
    resetValidateNow() {
      this.$refs.empCodeInput.turnOffWrongNotif();
      this.$refs.empNameInput.turnOffWrongNotif();
      this.$refs.empDepartmentInput.turnOffWrongNotif();
    },

    // -----------------------------------------------------
    //  hiển thị form sửa hoặc thêm mới
    btnShowForm(employeeId = null) {
      if (!employeeId) {
        console.log("Chế độ thêm mới: ");
        console.log("mã mới: ", this.getNewCode());
      } else {
        console.log("mã mới: ", this.getEmployeeInfo(employeeId));
        // chọn employee
        this.setChoosenEmpId(employeeId);
      }
      this.isShowForm = true;
    },

    // đóng form thông tin
    btnOnCloseForm() {
      this.isShowForm = false;
      // reset lại mọi thứ
      this.saveAndNewMode = false;
      this.resetForm();
      this.resetChosenEmployeeId();
      this.resetValidateNow();
    },

    /**
     * show các dialog, default: thông báo success
     * type = 0: error dialog
     * type = 1: success dialog
     * type = 2: confirm save dialog
     * type = 3: confirm delete dialog
     */
    btnShowDialog(type = "0", employeeCode = null, employeeId = null) {
      // chọn loại dialog
      this.dialogType = type;
      // thêm lời nhắn
      // confirm if delete
      if (type == "3") {
        this.dialogMsg = [
          `Bạn có chắc chắc muốn xóa nhân viên có mã <${employeeCode}> không?`,
        ];
        this.setChoosenEmpId(employeeId);
      }
      // confirm if save
      else if (type == "2") {
        this.dialogMsg = ["Dữ liệu đã bị thay đổi, bạn có muốn cất không?"];
      }

      // hiển thị dialog
      console.log("hiển thị dialog", this);
      this.$refs.notifDialog.showDialog();
    },

    /**
     * CÁC CHỨC NĂNG THÊM, SỬA, XÓA------------------------------------------------------------
     */

    addOrEdit() {
      // console.log("sau khi form đc set gender: ",this.formData.Gender, this.formData.GenderName);
      let employee = this.formData;
      employee.GenderName = this.setGenderName(employee.Gender);

      var me = this;
      let requestURL = `${SERVER_API_URL}`;

      console.log("đang lưu lại cái ng này: ", this.chosenEmployeeId);
      // nếu đang ở trạng thái sửa
      if (this.chosenEmployeeId) {
        requestURL = `${SERVER_API_URL}/${this.chosenEmployeeId}`;
        this.apiMethod = "put";
      } else {
        console.log("thêm hay sửa: ", this.apiMethod);
        this.apiMethod = "post";
      }

      axios({
        method: this.apiMethod,
        url: requestURL,
        data: employee,
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      })
        .then(function (res) {
          console.log("thành công: ", res);

          // hiển thị thông báo thành công
          if (me.apiMethod == "post") {
            me.dialogMsg = ["Thêm mới nhân viên thành công."];
          } else {
            me.dialogMsg = ["Sửa nhân viên thành công."];
          }
          me.btnShowDialog("1");
          // reset choosen emp id
          me.resetChosenEmployeeId();
          // load lại bảng
          me.employeesInPage();
        })
        .catch(function (error) {
          console.log(
            "Lỗi khi lưu, sửa bản ghi: ",
            error,
            error.response.data.userMsg
          );
          // hiển thị thông báo lỗi
          me.dialogMsg = [error.response.data.userMsg];
          me.btnShowDialog("0");
        });
    },

    // CẤT, CẤT VÀ THÊM
    btnSaveOnClick(saveAndNewMode = false) {
      // nếu chọn cất và thêm
      if (saveAndNewMode == true) {
        this.saveAndNewMode = saveAndNewMode;
      }
      // lấy dữ liệu từ form
      const employee = this.formData;
      // validate
      let validate = this.validateOnclick(employee);
      if (!validate.check) {
        console.log("Dữ liệu không hợp lệ ", validate.errorInfo);
        this.dialogMsg = validate.errorInfo;
        this.btnShowDialog("0", null);
      } else {
        this.btnShowDialog("2");
      }
    },

    // sau khi đóng dialog
    btnAfterCloseDialog() {
      if (this.dialogType == "1") {
        if (this.saveAndNewMode == false) {
          this.btnOnCloseForm();
        } else if (this.saveAndNewMode == true) {
          // reset lại form
          this.resetForm();

          // lấy mã nhân viên mới
          this.getNewCode();
        }
      }
    },

    // XÓA
    btnDeleteOnClick() {
      if (this.chosenEmployeeId) {
        try {
          var me = this;
          const deleteURL = `${SERVER_API_URL}/${this.chosenEmployeeId}`;
          // gọi api
          axios
            .delete(deleteURL)
            .then(function (res) {
              console.log("xóa thành công: ", res);
              console.log(res.data);
              me.employeesInPage();

              // reset emp id
              me.resetChosenEmployeeId();
              me.dialogMsg = ["Xóa thành công."];
              me.btnShowDialog("1");
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

    // NHÂN BẢN
    btnNewDuplicateOnClick(employeeId) {
      // get thông tin của employee để đẩy lên form
      this.btnShowForm(employeeId);
      this.resetChosenEmployeeId();
      // lấy mã nhân viên mới và đẩy lên form
      this.getNewCode();
    },
  },

  //before create, created
  created() {
    this.employeesInPage();
    this.isShowForm = false;
  },
  //before mount
  beforeMount() {},

  //mounted
  mounted() {},

  //   before update
  beforeUpdate() {},

  // updated
  updated() {},
};
</script>
<style lang="css">
@import url("@/css/layout/content.css");
</style>
