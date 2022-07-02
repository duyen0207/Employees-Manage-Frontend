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

    <!-- form -->
    <DForm
      ref="myForm"
      :isShowForm="isShowForm"
      @closeForm="btnOnCloseForm"
      @clickSave="btnSaveOnClick"
      @clickSaveAndNew="btnSaveAndNew"
    />
  </div>
</template>
<script>
// import các thư viện
import axios from "axios";

// import base function and variable
import * as BaseFunction from "@/js/base.js";

// import các components
import DCombobox from "@/components/base/Combobox.vue";
import DDialog from "@/components/base/Dialog.vue";
import DInput from "@/components/base/Input.vue";
import DTable from "@/components/base/Table.vue";
import DPagination from "@/components/base/Pagination.vue";
import DForm from "@/components/base/Form.vue";


export default {
  name: "TheContent",
  components: {
    DCombobox,
    DDialog,
    DInput,
    DTable,
    DPagination,
    DForm,
  },
  data() {
    return {
      employees: [],
      // myFormData: dùng để lưu dữ liệu từ form component
      myFormData: Object,

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
    };
  },
  watch: {
    // TÌM KIẾM
    searchPattern() {
      this.pageNumber = 1;
      this.searchEmployee();
    },

    // khi page number thay đổi, gọi hàm load dữ liệu
    pageNumber(newPageNumber) {
      if (this.searchPattern) this.searchEmployee();
      else this.employeesInPage();
    },
    // khi page size thay đổi, gọi hàm load dữ liệu
    pageSize() {
      if (this.searchPattern) this.searchEmployee();
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
        let searchURL = `${BaseFunction.SERVER_API_URL}/filter?pageSize=${this.pageSize}&pageNumber=${this.pageNumber}&employeeFilter=${this.searchPattern}`;

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
          .get(BaseFunction.employeeAPI.getEmployees)
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
        let paginateURL = `${BaseFunction.SERVER_API_URL}/filter?pageSize=${this.pageSize}&pageNumber=${this.pageNumber}`;

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
    setChosenEmpId(employeeId) {
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

    // -----------------------------------------------------
    //  hiển thị form sửa hoặc thêm mới
    // duplicate: kiểm tra nếu là chế độ nhân bản
    btnShowForm(employeeId = null, duplicate = false) {
      this.isShowForm = true;
      if (!employeeId) {
        console.log("Chế độ thêm mới: ");
        console.log("mã mới: ", this.$refs.myForm.getNewCode());
      } else {
        console.log(
          "thông tin employee ",
          this.$refs.myForm.getEmployeeInfo(employeeId)
        );
        if (duplicate == true) {
          console.log("Chế độ nhân bản");
          this.$refs.myForm.getNewCode();
        }
        // chọn employee
        this.setChosenEmpId(employeeId);
      }
    },

    // đóng form thông tin
    btnOnCloseForm() {
      // reset lại mọi thứ
      this.saveAndNewMode = false;

      this.$refs.myForm.resetForm();

      this.resetChosenEmployeeId();
      this.isShowForm = false;
    },

    /**
     * show các dialog, default: thông báo success
     * type = 0: error dialog
     * type = 1: success dialog
     * type = 2: confirm save dialog
     * type = 3: confirm delete dialog
     */
    btnShowDialog(type = "0", emp) {
      // chọn loại dialog
      this.dialogType = type;
      // thêm lời nhắn
      // confirm if delete
      if (type == "3") {
        this.dialogMsg = [
          `Bạn có chắc chắc muốn xóa nhân viên có mã <${emp.EmployeeCode}> không?`,
        ];
        this.setChosenEmpId(emp.EmployeeId);
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

    // Sửa
    addOrEdit() {
      // console.log("sau khi form đc set gender: ",this.formData.Gender, this.formData.GenderName);
      console.log("add và edit, kiểm tra my form data: ", this.myFormData);
      let employee = this.myFormData;
      employee.GenderName = this.setGenderName(employee.Gender);

      var me = this;
      let requestURL = `${BaseFunction.SERVER_API_URL}`;

      // nếu đang ở trạng thái sửa
      if (this.chosenEmployeeId) {
        requestURL = `${BaseFunction.SERVER_API_URL}/${this.chosenEmployeeId}`;
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

    // CẤT
    // saveAndNewMode: kiểm tra là nút "cất" hay nút "cất và thêm mới"
    btnSaveOnClick(formData, saveAndNewMode = false) {
      // nếu chọn cất và thêm
      if (saveAndNewMode == true) {
        this.saveAndNewMode = saveAndNewMode;
      }
      // lấy dữ liệu từ form
      this.myFormData = formData;
      const employee = formData;
      // validate
      let validate = this.validateOnclick(employee);
      if (!validate.check) {
        console.log("Dữ liệu không hợp lệ ", validate.errorInfo);
        this.dialogMsg = validate.errorInfo;
        this.btnShowDialog("0", null);
      }
      // nếu dữ liệu hợp lệ
      else {
        // nếu thêm mới
        if (!this.chosenEmployeeId) {
          this.apiMethod = "post";
          this.addOrEdit();
        }
        // nếu sửa
        else {
          this.apiMethod = "put";
          this.btnShowDialog("2");
        }
      }
    },
    // CẤT VÀ THÊM
    btnSaveAndNew(formData) {
      this.btnSaveOnClick(formData, true);
    },

    // sau khi đóng dialog
    btnAfterCloseDialog() {
      if (this.dialogType == "1") {
        if (this.saveAndNewMode == false) {
          this.btnOnCloseForm();
        } else if (this.saveAndNewMode == true) {
          // reset lại form
          this.$refs.myForm.resetForm();

          // lấy mã nhân viên mới
          this.$refs.myForm.getNewCode();
          this.saveAndNewMode = false;
        }
      }
    },

    // XÓA
    btnDeleteOnClick() {
      if (this.chosenEmployeeId) {
        try {
          var me = this;
          const deleteURL = `${BaseFunction.SERVER_API_URL}/${this.chosenEmployeeId}`;
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
      this.btnShowForm(employeeId, true);
      this.resetChosenEmployeeId();
      // lấy mã nhân viên mới và đẩy lên form
      // this.$refs.myForm.getNewCode();
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
