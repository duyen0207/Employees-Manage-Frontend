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
        @click="btnShowForm(ActionType.ADD)"
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
        <button
          class="primary-btn"
          :disabled="checkedRowsList.length == 0"
          @click="
            btnShowDialog(
              DialogType.DELETE_CONFIRM__DIALOG,
              checkedRowsList,
              ActionType.DELETE_MULTIPLE
            )
          "
        >
          Xóa hàng loạt
        </button>
        <div class="rows-flexbox">
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
          <button id="export-data" class="none-btn" @click="btnExportExcel">
            <div class="nav-icon m-icon m-icon-sz24 excel-icon"></div>
          </button>
        </div>
      </div>
      <!-- Data table ------------------------------------------->
      <DTable
        ref="employeeTable"
        v-model:employees="employees"
        @checkRow="getCheckedList"
        @rowEdit="btnShowForm((actionType = ActionType.EDIT), $event)"
        @rowDuplicate="btnShowForm((actionType = ActionType.DUPLICATE), $event)"
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

/** Enum loại hành động
 * ADD: thêm mới nhân viên
 * EDIT: sửa nhân viên
 * DELETE: xóa một nhân viên
 * DELETE_MULTIPLE: xóa hàng loạt
 * DUPLICATE: nhân bản
 */
export const ActionType = {
  ADD: "0",
  EDIT: "1",
  DELETE: "2",
  DELETE_MULTIPLE: "3",
  DUPLICATE: "4",
};

/** Enum loại dialog
 * type = 0: error dialog
 * type = 1: success dialog
 * type = 2: confirm save dialog
 * type = 3: confirm delete dialog
 */
const DialogType = {
  ERROR_DIALOG: "0",
  SUCCESS_DIALOG: "1",
  SAVE_CONFIRM_DIALOG: "2",
  DELETE_CONFIRM__DIALOG: "3",
};

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
      // myFormData: lưu dữ liệu từ form component
      myFormData: Object,

      /** Phân trang
       * totalRecords: tổng số bản ghi
       * totalPages: tổng số trang
       * pageNumber: chỉ mục trang
       * pageSize: số bản ghi trên một trang
       */
      totalRecords: 0,
      totalPages: 0,
      pageNumber: 1,
      pageSize: "10",

      /**
       * searchPattern: từ khóa tìm kiếm
       * chosenEmployeeId: nhân viên được chọn để sửa, nhân bản hoặc xóa
       * checkedRowsList[]: danh sách hàng được chọn trong bảng dữ liệu
       */
      searchPattern: "",
      chosenEmployeeId: null,
      checkedRowsList: [],

      /**
       * isShowForm: bật tắt form thông tin nhân viên
       * saveAndNewMode: bật tắt chế độ "cất và thêm mới" (mặc định tắt)
       * deleteType: chế độ xóa: xóa 1 hoặc nhiều
       */
      isShowForm: false,
      saveAndNewMode: false,
      deleteType: ActionType.DELETE,

      /**
       * dialogMsg: nội dung của dialog
       * dialogType: loại dialog hiển thị: thông báo lỗi, thông báo thành công, confirm
       * DialogType: enum thể hiện type của dialog
       */
      dialogMsg: ["Thêm mới thành công"],
      dialogType: DialogType.SUCCESS_DIALOG,
      DialogType,
      ActionType,

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
      this.employeesInPage();
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
    // load danh sách nv theo trang, tìm kiếm
    employeesInPage() {
      try {
        let paginateURL = `${BaseFunction.SERVER_API_URL}/filter?pageSize=${this.pageSize}&pageNumber=${this.pageNumber}&employeeFilter=${this.searchPattern}`;

        var me = this;
        // gọi api search
        axios
          .get(paginateURL)
          .then(function (res) {
            me.employees = res.data.Data;
            console.log(res);
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

    /**CÁC CHỨC NĂNG THÊM, SỬA, XÓA, XUẤT EXCEL------------------------------------------------------------
     */

    // Sửa
    addOrEdit() {
      console.log("api method is: ", this.apiMethod);
      // console.log("sau khi form đc set gender: ",this.formData.Gender, this.formData.GenderName);
      console.log("add và edit, kiểm tra my form data: ", this.myFormData);
      let employee = this.myFormData;
      employee.GenderName = BaseFunction.setGenderName(employee.Gender);

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
          me.btnShowDialog(me.DialogType.SUCCESS_DIALOG);
          // reset choosen emp id
          me.resetChosenEmployeeId();
          // load lại bảng
          me.employeesInPage();
        })
        .catch(function (error) {
          console.log(
            "Lỗi khi lưu, sửa bản ghi: ",
            error,
            error.response.devMsg
          );
          // hiển thị thông báo lỗi
          me.dialogMsg = [error.response.data.devMsg];
          me.btnShowDialog(me.DialogType.ERROR_DIALOG);
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
        // thông báo lỗi cho người dùng
        this.btnShowDialog(this.DialogType.ERROR_DIALOG, null);
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
          this.btnShowDialog(this.DialogType.SAVE_CONFIRM_DIALOG);
        }
      }
    },
    // CẤT VÀ THÊM MỚI
    btnSaveAndNew(formData) {
      this.btnSaveOnClick(formData, true);
    },

    /** XÓA: 2 chế độ
     * deleteType: loại xóa: xóa hàng loạt hay xóa đơn lẻ
     * DELETE: xóa 1 nhân viên
     * DELETE_MULTIPLE: xóa hàng loạt
     */
    btnDeleteOnClick() {
      // lưu con trỏ this
      var me = this;
      var data = null;
      var url = null;

      // B1: set url-------------------------------------------
      if (this.deleteType == this.ActionType.DELETE) {
        if (this.chosenEmployeeId)
          url = `${BaseFunction.SERVER_API_URL}/${this.chosenEmployeeId}`;
        else console.log("Phải biết id thì ms xóa đc chứ!!");
      }
      // nếu là xóa hàng loạt
      else if (this.deleteType == this.ActionType.DELETE_MULTIPLE) {
        url = BaseFunction.SERVER_API_URL;
        if (this.checkedRowsList.length > 0) data = me.checkedRowsList;
        else console.log("Không thể xóa hàng loạt được, danh sách rỗng");
      }

      // B2: gọi api------------------------------------------------------
      try {
        const deleteURL = url;
        axios({
          method: "delete",
          url: deleteURL,
          data: data,
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
        })
          .then(function (res) {
            console.log("xóa thành công.", res);
            // load lại trang khi xóa thành công
            me.employeesInPage();

            // reset emp id, checked list
            me.resetChosenEmployeeId();
            me.checkedRowsList = [];

            me.dialogMsg = ["Xóa thành công."];
            me.btnShowDialog(me.DialogType.SUCCESS_DIALOG);
          })
          .catch(function (error) {
            console.log("không xóa được. server trả về: ", error);
          });
      } catch (error) {
        console.log("Try catch - Lỗi khi xóa: ", error);
      }
    },

    // XUẤT DANH SÁCH RA FILE EXCEL
    btnExportExcel() {
      try {
        var me = this;

        // gọi api export dữ liệu
        console.log("export thành công.");
      } catch (error) {}
    },

    // chọn hàng loạt để thực hiện chức năng xóa
    getCheckedList(checkedEmployee) {
      this.checkedRowsList = checkedEmployee;
      // if (this.checkedRowsList.length == 0) console.log("oh nâuuuuuu");
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
    // validate when click save
    validateOnclick(data) {
      let errorInfo = [];
      let check = true;

      // check compulsory field-----------------------------------------
      if (!data.EmployeeCode) {
        check = false;
        errorInfo.push("- Mã nhân viên không được để trống.\n");
      }

      if (!data.FullName) {
        check = false;
        errorInfo.push("- Tên nhân viên không được để trống.\n");
      }

      if (!data.DepartmentId) {
        check = false;
        errorInfo.push("- Đơn vị không được để trống.\n");
      }

      // check date field-------------------------------------------------
      let dobValid = BaseFunction.validateDate(data.DateOfBirth);
      if (!dobValid.check) {
        check = false;
        errorInfo.push("- Ngày sinh: " + dobValid.errorMsg);
      }

      let idDateValid = BaseFunction.validateDate(data.IdentityDate);
      if (!idDateValid.check) {
        check = false;
        errorInfo.push("- Ngày cấp CMND: " + idDateValid.errorMsg);
      }

      // check email-----------------------------------------------------
      if (data.Email) {
        if (!BaseFunction.validateEmail(data.Email)) {
          check = false;
          errorInfo.push("- Email không đúng định dạng.\n");
        }
      }

      return {
        check: check,
        errorInfo: errorInfo,
      };
    },

    // Hiển thị form -----------------------------------------------------

    /** các chế độ:
     * thêm mới: lấy sẵn mã nhân viên mới
     * sửa: hiển thị thông tin nhân viên lên form
     * nhân bản: hiển thị thông tin nhân viên và lấy sẵn mã mới
     */
    btnShowForm(actionType = this.ActionType.ADD, employeeId) {
      this.isShowForm = true;
      console.log("loại hành động: ", actionType);

      // B1: nếu là SỬA hoặc NHÂN BẢN, hiển thị nhân viên lên form
      if (
        actionType == this.ActionType.EDIT ||
        actionType == this.ActionType.DUPLICATE
      ) {
        // kiểm tra mã có bị null không
        if (employeeId) this.$refs.myForm.getEmployeeInfo(employeeId);
        else
          console.log("Hiển thị form lỗi do id nhân viên chưa được truyền vào");
      }

      // B2: nếu là NHÂN BẢN hoặc THÊM MỚI, lấy mã nhân viên mới
      if (
        actionType == this.ActionType.DUPLICATE ||
        actionType == this.ActionType.ADD
      )
        this.$refs.myForm.getNewCode();

      // B3: nếu là SỬA: setChosenEmpId là id truyền vào
      if (actionType == this.ActionType.EDIT) this.setChosenEmpId(employeeId);
      else this.resetChosenEmployeeId();
    },

    // đóng form
    btnOnCloseForm() {
      // reset lại mọi thứ
      this.saveAndNewMode = false;

      this.$refs.myForm.resetForm();

      this.resetChosenEmployeeId();
      this.isShowForm = false;
    },

    /** show các dialog, default: thông báo success
     */
    btnShowDialog(
      type = this.DialogType.ERROR_DIALOG,
      emp,
      deleteType = this.ActionType.DELETE
    ) {
      // chọn loại dialog
      this.dialogType = type;
      // thêm lời nhắn

      // XÓA-----------------------------------------------
      if (type == this.DialogType.DELETE_CONFIRM__DIALOG) {
        this.deleteType = deleteType;
        // xóa 1 nhân viên
        if (this.deleteType == this.ActionType.DELETE) {
          this.dialogMsg = [
            `Bạn có chắc chắc muốn xóa nhân viên có mã <${emp.EmployeeCode}> không?`,
          ];
          this.setChosenEmpId(emp.EmployeeId);
        }
        // xóa hàng loạt
        else if (this.deleteType == this.ActionType.DELETE_MULTIPLE) {
          this.dialogMsg = [
            `Bạn có chắc chắc muốn xóa ${emp.length} nhân viên đã chọn không?`,
          ];
        }
      }
      // LƯU -------------------------------------------------
      else if (type == this.DialogType.SAVE_CONFIRM_DIALOG) {
        this.dialogMsg = ["Dữ liệu đã bị thay đổi, bạn có muốn cất không?"];
      }

      // hiển thị dialog------------------------------------------------
      console.log("hiển thị dialog", this);
      this.$refs.notifDialog.showDialog();
    },

    // sau khi đóng dialog: tùy vào chọn thêm sửa xóa hay nhân bản mà thực
    // hiện các hành động tiếp theo
    btnAfterCloseDialog() {
      if (this.dialogType == this.DialogType.SUCCESS_DIALOG) {
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

  // before update
  beforeUpdate() {},

  // updated
  updated() {},
};
</script>
<style lang="css">
@import url("@/css/layout/content.css");
</style>
