<template lang="">
    <div>
      <div class="rows-flexbox">
        <TheNavbar/>
        <div class="main">
            <TheHeader/>
            <TheContent :employees="employees"/>
        </div>
      </div>

      <!-- Form -->
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
                    <font-awesome-icon icon="fa-regular fa-circle-question"></font-awesome-icon>
                  </button>
                  <button
                    type="button"
                    id="close-btn"
                    class="icon"
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
                      <div class="normal-box div-employee-code">
                        <label
                          for="employee-code"
                          class="compulsory-label top-label"
                        >
                          Mã
                        </label>
                        <input
                          type="text"
                          id="employee-code"
                          class="primary-input"
                          placeholder="NV-0001"
                          required
                        />
                        <div class="tool-tip-container">
                          <div class="wrong-notif-tooltip">
                            Mã nhân viên không được để trống
                          </div>
                        </div>
                      </div>

                      <div class="normal-box div-fullname">
                        <label
                          for="employee-name"
                          class="compulsory-label top-label"
                          >Tên</label
                        >
                        <input
                          type="text"
                          id="employee-name"
                          class="primary-input"
                          placeholder="Nguyễn Văn A"
                          required
                        />
                        <div class="tool-tip-container">
                          <div class="wrong-notif-tooltip">
                            Tên không được để trống.
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="normal-box">
                      <label
                        for="department-id"
                        class="compulsory-label top-label"
                        >Đơn vị</label
                      >
                      <select id="department-id" class="primary-input" required>
                        <option value="142cb08f-7c31-21fa-8e90-67245e8b283e">
                          Phòng nhân sự
                        </option>
                        <option value="17120d02-6ab5-3e43-18cb-66948daf6128">
                          Phòng tuyển sinh
                        </option>
                        <option value="469b3ece-744a-45d5-957d-e8c757976496">
                          Phòng sản xuất
                        </option>
                        <option value="4e272fc4-7875-78d6-7d32-6a1673ffca7c">
                          Phòng đào tạo
                        </option>
                      </select>
                      <div class="tool-tip-container">
                        <div class="wrong-notif-tooltip">
                          Đơn vị không được để trống
                        </div>
                      </div>
                    </div>
                    <div class="normal-box">
                      <label for="employee-position" class="top-label"
                        >Chức danh</label
                      >
                      <input
                        type="text"
                        id="employee-position"
                        class="primary-input"
                        placeholder="Nhân viên"
                      />
                    </div>
                  </div>

                  <!-- PERSONAL INFO. 
                      ex: birthday, sex, etc.
                      -->
                  <div class="" id="personal-info">
                    <div class="rows-flexbox">
                      <div class="normal-box div-birthday">
                        <label for="birthday" class="top-label">Ngày sinh</label>
                        <input type="date" id="birthday" class="primary-input" />
                        <div class="tool-tip-container">
                          <div class="wrong-notif-tooltip">
                            Ngày sinh không hợp lệ
                          </div>
                        </div>
                      </div>

                      <div class="normal-box div-sex">
                        <label for="" class="top-label">Giới tính</label>
                        <div
                          id="sex-select-group"
                          class="horizontal-select-group"
                        >
                          <input
                            name="gender"
                            type="radio"
                            value="1"
                            id="male"
                            class=""
                          />
                          <label for="male">Nam</label>

                          <input
                            name="gender"
                            type="radio"
                            value="2"
                            id="female"
                            class=""
                          />
                          <label for="female">Nữ</label>

                          <input
                            name="gender"
                            type="radio"
                            value="3"
                            id="other-gender"
                            class=""
                          />
                          <label for="other-gender">Khác</label>
                        </div>
                      </div>
                    </div>

                    <div class="rows-flexbox">
                      <div class="normal-box div-personal-id">
                        <label for="identity-number" class="top-label"
                          >Số CMND</label
                        >
                        <input
                          type="text"
                          id="identity-number"
                          class="primary-input"
                        />
                      </div>

                      <div class="normal-box div-id-issued-on">
                        <label for="identity-date" class="top-label"
                          >Ngày cấp</label
                        >
                        <input
                          type="date"
                          id="identity-date"
                          class="primary-input"
                        />
                        <div class="tool-tip-container">
                          <div class="wrong-notif-tooltip">
                            Ngày cấp CMND không hợp lệ
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="normal-box">
                      <label for="identity-place" class="top-label"
                        >Nơi cấp</label
                      >
                      <input
                        type="text"
                        id="identity-place"
                        class="primary-input"
                      />
                    </div>
                  </div>
                </div>
                <!-- ADDRESS -->
                <div class="normal-box">
                  <label for="address" class="top-label">Địa chỉ</label>
                  <input type="text" id="address" class="primary-input" />
                </div>

                <!-- CONTACT INFO
                  ex: phone number, email -->
                <div id="contact" class="rows-flexbox">
                  <div class="normal-box">
                    <label for="mobile-phone" class="top-label">ĐT di động</label>
                    <input type="text" id="mobile-phone" class="primary-input" />
                  </div>

                  <div class="normal-box">
                    <label for="telephone" class="top-label">ĐT cố định</label>
                    <input type="text" id="telephone" class="primary-input" />
                  </div>

                  <div class="normal-box">
                    <label for="email" class="top-label">Email</label>
                    <input type="email" id="email" class="primary-input" />
                    <div class="tool-tip-container">
                      <div class="wrong-notif-tooltip">
                        Email không đúng định dạng
                      </div>
                    </div>
                  </div>
                </div>

                <!-- BANK INFO
                  ex: account, name, branch -->
                <div id="bank-info" class="rows-flexbox">
                  <div class="normal-box">
                    <label for="bank-account" class="top-label"
                      >Tài khoản ngân hàng</label
                    >
                    <input type="text" id="bank-account" class="primary-input" />
                  </div>

                  <div class="normal-box">
                    <label for="bank-name" class="top-label">Tên ngân hàng</label>
                    <input type="text" id="bank-name" class="primary-input" />
                  </div>

                  <div class="normal-box">
                    <label for="bank-branch" class="top-label">Chi nhánh</label>
                    <input type="text" id="bank-branch" class="primary-input" />
                  </div>
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
                >
                  Hủy
                </button>

                <div class="horizontal-group-btn">
                  <button
                    id="save-edit-btn"
                    type="button"
                    class="primary-btn second-btn"
                  >
                    Cất
                  </button>
                  <button id="save-new-btn" type="button" class="primary-btn">
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
import axios from "axios";

import TheContent from "@/components/layout/TheContent.vue";
import TheHeader from "@/components/layout/TheHeader.vue";
import TheNavbar from "@/components/layout/TheNavbar.vue";

import AppButton from "@/components/base/Button.vue";

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
      isShowForm: true,
    };
  },

  methods: {
    // empty table
    emptyTable() {
      $("#employees-data-table tbody").empty();
    },

    // gọi api load dữ liệu
    loadData() {
      try {
        console.log("1. created");
        var me = this;
        // gọi api để load dữ liệu lên bảng
        axios
          .get(employeeAPI.getEmployees)
          .then(function (res) {
            console.log(res.data.Data);
            me.employees = res.data.Data;
            console.log("this is me: ", me.employees[0].EmployeeCode);
          })
          .catch(function (res) {
            console.log(res);
          });
      } catch (error) {
        console.log("lỗi khi created: ", error);
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
            console.log(res);
            // me.employees = res.data.Data;
            // console.log("this is me: ", me.employees[0].EmployeeCode);
            return res;
          })
          .catch(function (res) {
            console.log(res);
          });
      } catch (error) {
        console.log("lỗi khi lấy mã nhân viên: ", error);
      }
    },

    // thêm mới employee
    addNewEmployee() {},
    // lấy các giá trị input đầu vào từ form
    getFormData() {
      // Get value from form add employee
      const employeeCode = $("#employee-code").val();
      const employeeName = $("#employee-name").val();
      const departmentId = $("#department-id option:selected").val();
      const departmentName = $("#department-id option:selected").text();
      const employeePosition = $("#employee-position").val();

      let birthday = $("#birthday").val();
      // let sex = $("#sex-select-group input[name='gender']:checked").val();
      console.log(
        "kiểm tra có check vào nữ không: ",
        document.getElementById("female").checked
      );
      let sex, sex_name;
      if (document.getElementById("female").checked) {
        sex = 2;
        sex_name = "Nữ";
      } else if (document.getElementById("male").checked) {
        sex = 1;
        sex_name = "Nam";
      } else if (document.getElementById("other-gender").checked) {
        sex = 3;
        sex_name = "Khác";
      }

      const identityNumber = $("#identity-number").val();
      let identityDate = $("#identity-date").val();
      const identityPlace = $("#identity-place").val();
      const address = $("#address").val();

      const mobilephone = $("#mobile-phone").val();
      const telephone = $("#telephone").val();
      const email = $("#email").val();

      const bankAccount = $("#bank-account").val();
      const bankName = $("#bank-name").val();
      const bankBranch = $("#bank-branch").val();

      // create data
      let data = {
        EmployeeCode: employeeCode,
        EmployeeName: employeeName,
        DepartmentId: departmentId,
        DepartmentName: departmentName,
        EmployeePosition: employeePosition,

        DateOfBirth: birthday,
        Gender: sex,
        GenderName: sex_name,
        Address: address,
        IdentityNumber: identityNumber,
        IdentityDate: identityDate,
        IdentityPlace: identityPlace,
        Address: address,

        PhoneNumber: mobilephone,
        TelephoneNumber: telephone,
        Email: email,

        BankAccountNumber: bankAccount,
        BankName: bankName,
        BankBranchName: bankBranch,
      };

      return data;
    },

    btnAddOnClick() {
      $("#add-new-emp-btn").click()
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

        console.log("đây là mảng ngày ", year, month, day, dateFormat);

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
      console.log("Validate email: ", re.test(email));

      return re.test(email);
    },

    // validate when click save
    validateOnclick(data) {
      let errorInfo = "";
      let check = true;

      // check compulsory field-----------------------------------------
      console.log("check các trường bắt buộc...");
      if (!data.EmployeeCode) {
        check = false;
        errorInfo += "- Mã nhân viên không được để trống.\n";
      }
      console.log("check xong mã: ", errorInfo);

      if (!data.EmployeeName) {
        check = false;
        errorInfo += "- Tên nhân viên không được để trống.\n";
      }
      console.log("check xong tên: ", errorInfo);

      if (!data.DepartmentId) {
        check = false;
        errorInfo += "- Đơn vị không được để trống.\n";
      }
      console.log("check xong đơn vị: ", errorInfo);

      // check date field-------------------------------------------------
      console.log("check ngày tháng hợp lệ...");
      let dobValid = validateDate(data.DateOfBirth);
      if (!dobValid.check) {
        check = false;
        errorInfo += "- Ngày sinh: " + dobValid.errorMsg;
      }
      console.log("check xong ngày sinh: ", errorInfo);

      let idDateValid = validateDate(data.IdentityDate);
      if (!idDateValid.check) {
        check = false;
        errorInfo += "- Ngày cấp CMND: " + idDateValid.errorMsg;
      }
      console.log("check xong ngày cấp: ", errorInfo);

      // check email-----------------------------------------------------
      console.log("check email hợp lệ...");
      if (data.Email) {
        console.log("email validate: ", data.Email);
        if (!validateEmail(data.Email)) {
          check = false;
          errorInfo += "- Email không đúng định dạng.\n";
        }
      }
      console.log("check xong email: ", errorInfo);

      return {
        check: check,
        errorInfo: errorInfo,
      };
    },
  },

  
  //before create, created
  created() {
    this.loadData();
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