<template lang="">
  <div class="content">
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
        <button id="reload-data" class="none-btn">
          <font-awesome-icon icon="fa-solid fa-arrow-rotate-right" />
        </button>
      </div>
      <!-- Data table ------------------------------------------->
      <div id="data-table-container" class="normal-box">
        <table id="employees-data-table" class="data-table">
          <thead class="header-table">
            <tr>
              <th class="checkbox-column">
                <input type="checkbox" class="check-all" />
              </th>
              <th class="employee-code-column">MÃ NHÂN VIÊN</th>
              <th class="fullname-column">TÊN NHÂN VIÊN</th>
              <th class="sex-column">GIỚI TÍNH</th>
              <th class="dob-column">NGÀY SINH</th>
              <th class="personal-id-column" title="Số chứng minh nhân dân">
                SỐ CMND
              </th>
              <th class="position-column">CHỨC DANH</th>
              <th class="department-column">TÊN ĐƠN VỊ</th>
              <th class="action-column">CHỨC NĂNG</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="emp in employees" :key="emp.EmployeeId">
              <td :id="emp.EmployeeId" class="checkbox-column">
                <input type="checkbox" name="" id="" class="check-item" />
              </td>
              <td class="employee-code-column">{{ emp.EmployeeCode }}</td>
              <td class="fullname-column">{{ emp.EmployeeName }}</td>
              <td class="sex-column">{{ emp.GenderName }}</td>
              <td class="dob-column">{{ formatDate(emp.DateOfBirth) }}</td>
              <td class="personal-id-column">{{ emp.IdentityNumber }}</td>
              <td class="position-column">{{ emp.Position }}</td>
              <td class="department-column">{{ emp.DepartmentName }}</td>
              <td class="action-column">
                <button
                  data-employee-id="{{emp.EmployeeId}}"
                  class="none-btn edit-employee-btn"
                  style="color: rgb(56, 148, 234)"
                  @click="btnShowForm(emp.EmployeeId)"
                >
                  Sửa
                </button>
                <DCombobox :emp="emp" />
              </td>
            </tr>
          </tbody>
        </table>
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
                        autofocus
                        v-model="formData.EmployeeCode"
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
                        v-model="formData.EmployeeName"
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
                    <select
                      id="department-id"
                      class="primary-input"
                      required
                      v-model="formData.DepartmentId"
                    >
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
                      v-model="formData.Position"
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
                      <input
                        type="date"
                        id="birthday"
                        class="primary-input"
                        v-model="formData.DateOfBirth"
                      />
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
                          v-model="formData.Gender"
                        />
                        <label for="male">Nam</label>

                        <input
                          name="gender"
                          type="radio"
                          value="2"
                          id="female"
                          class=""
                          v-model="formData.Gender"
                        />
                        <label for="female">Nữ</label>

                        <input
                          name="gender"
                          type="radio"
                          value="3"
                          id="other-gender"
                          class=""
                          v-model="formData.Gender"
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
                        v-model="formData.IdentityNumber"
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
                        v-model="formData.IdentityDate"
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
                      v-model="formData.IdentityPlace"
                    />
                  </div>
                </div>
              </div>
              <!-- ADDRESS -->
              <div class="normal-box">
                <label for="address" class="top-label">Địa chỉ</label>
                <input
                  type="text"
                  id="address"
                  class="primary-input"
                  v-model="formData.Address"
                />
              </div>

              <!-- CONTACT INFO
                  ex: phone number, email -->
              <div id="contact" class="rows-flexbox">
                <div class="normal-box">
                  <label for="mobile-phone" class="top-label">ĐT di động</label>
                  <input
                    type="text"
                    id="mobile-phone"
                    class="primary-input"
                    v-model="formData.PhoneNumber"
                  />
                </div>

                <div class="normal-box">
                  <label for="telephone" class="top-label">ĐT cố định</label>
                  <input
                    type="text"
                    id="telephone"
                    class="primary-input"
                    v-model="formData.TelephoneNumber"
                  />
                </div>

                <div class="normal-box">
                  <label for="email" class="top-label">Email</label>
                  <input
                    type="email"
                    id="email"
                    class="primary-input"
                    v-model="formData.Email"
                  />
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
                  <input
                    type="text"
                    id="bank-account"
                    class="primary-input"
                    v-model="formData.BankAccountNumber"
                  />
                </div>

                <div class="normal-box">
                  <label for="bank-name" class="top-label">Tên ngân hàng</label>
                  <input
                    type="text"
                    id="bank-name"
                    class="primary-input"
                    v-model="formData.BankName"
                  />
                </div>

                <div class="normal-box">
                  <label for="bank-branch" class="top-label">Chi nhánh</label>
                  <input
                    type="text"
                    id="bank-branch"
                    class="primary-input"
                    v-model="formData.BankBranchName"
                  />
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
                @click="btnOnCloseForm"
              >
                Hủy
              </button>

              <div class="horizontal-group-btn">
                <button
                  id="add-edit-btn"
                  type="button"
                  class="primary-btn second-btn"
                  @click="btnSaveOnClick(null)"
                >
                  Cất
                </button>
                <button id="add-multi-btn" type="button" class="primary-btn">
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

const DIALOG = {
  // validate
  ERROR: 0,
  // add success, edit success, delete success
  SUCCESS: 1,
  // confirm delete, confirm edit
  CONFIRM: 2,
};

export default {
  name: "TheContent",
  components: {
    DCombobox,
  },
  data() {
    return {
      employees: [],
      searchPattern: "",

      isShowForm: false,
      isShowDialog: false,

      apiMethod: "post",
      formData: {
        EmployeeCode: "Hello",
        EmployeeName: "Tên",
        DepartmentId: "142cb08f-7c31-21fa-8e90-67245e8b283e",
        DepartmentName: "tên đơn vị",
        Position: "Nhân Viên",

        DateOfBirth: null,
        Gender: "1",
        GenderName: "Nam",
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
    searchPattern(newSearchPattern) {
      try {
        console.log("Searching...", newSearchPattern);
        let searchURL = `${SERVER_API_URL}/filter?employeeFilter=${this.searchPattern}`;

        var me = this;
        // gọi api search
        axios
          .get(searchURL)
          .then(function (res) {
            me.employees = res.data.Data;
            console.log("search result: ", me.employees);
          })
          .catch(function (res) {
            console.log(res);
          });
      } catch (error) {
        console.log("lỗi khi search: ", error);
      }
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

    // empty table
    emptyTable() {
      console.log("ĐANG EMPTY TABLE...");
      this.employees = [];
    },

    // gọi api load dữ liệu
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
          })
          .catch(function (res) {
            console.log(res);
          });
      } catch (error) {
        console.log("lỗi khi created: ", error);
      }
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
            me.formData = employee;

            console.log("đưa thông tin nhân viên lên form: ");
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
      let dobValid = this.validateDate(data.DateOfBirth);
      if (!dobValid.check) {
        check = false;
        errorInfo += "- Ngày sinh: " + dobValid.errorMsg;
      }
      console.log("check xong ngày sinh: ", errorInfo);

      let idDateValid = this.validateDate(data.IdentityDate);
      if (!idDateValid.check) {
        check = false;
        errorInfo += "- Ngày cấp CMND: " + idDateValid.errorMsg;
      }
      console.log("check xong ngày cấp: ", errorInfo);

      // check email-----------------------------------------------------
      console.log("check email hợp lệ...");
      if (data.Email) {
        console.log("email validate: ", data.Email);
        if (!this.validateEmail(data.Email)) {
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

    //  hiển thị form sửa hoặc xóa
    btnShowForm(employeeId = null) {
      if (!employeeId) {
        console.log("Chế độ thêm mới: ");
        console.log("mã mới: ", this.getNewCode());
      } else {
        console.log("mã mới: ", this.getEmployeeInfo(employeeId));
      }
      this.isShowForm = true;
    },

    // đóng form thông tin
    btnOnCloseForm() {
      this.isShowForm = false;
      this.resetForm();
    },
    // show các dialog, default: thông báo success
    btnShowDialog(employeeCode = null, type = DIALOG.SUCCESS) {},

    /**
     * CÁC CHỨC NĂNG THÊM, SỬA, XÓA------------------------------------------------------------
     */

    // CẤT: thêm hoặc sửa: mặc định là thêm
    btnSaveOnClick(employeeId = null) {
      // lấy dữ liệu từ form
      const employee = this.formData;
      // validate
      let validate = this.validateOnclick(employee);
      if (!validate.check) {
        console.log("Dữ liệu không hợp lệ ", validate.errorInfo);
      } else {
        let requestURL = `${SERVER_API_URL}`;

        // nếu đang ở trạng thái sửa
        if (employeeId) {
          requestURL = `${SERVER_API_URL}/${employeeId}`;
          this.apiMethod = "put";
          //dialog xác nhận lại xem user có muốn lưu sửa đổi không
        } else {
          console.log("thêm hay sửa: ", this.apiMethod);
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
            // return res;
          })
          .catch((error) => console.log("Lỗi khi lưu, sửa bản ghi: ", error));
      }
    },

    // CẤT VÀ THÊM MỚI: sửa và thêm nhiều employee một cách liên tục
    btnSaveAndNew(employeeId = null) {},

    // XÓA
    btnDeleteOnClick(employeeId = null) {
      if (employeeId) {
        try {
          var me = this;
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
  // props: {
  //   employees: Array,
  // },

  //before create, created
  created() {
    // this.employees = [];
    console.log("1. content created");

    this.loadData();
    this.isShowForm = false;
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
};
</script>
<style lang="css">
@import url("@/css/layout/content.css");
</style>
