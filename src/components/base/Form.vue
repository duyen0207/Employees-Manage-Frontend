<template lang=""></template>
<script>
import DInput from "@/components/base/Input.vue";

export default {
  components: {
    DInput,
  },
  props: {},

  data() {
    return {
      isShowForm: false,
      saveAndNewMode: false,

      chosenEmployeeId: null,

      departmentsGroup: [
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

      genderGroup: [
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
        EmployeeCode: "Hello",
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

  methods: {
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
  },
};
</script>
<style lang="css"></style>
