<template lang="">
  <div id="data-table-container" class="normal-box">
    <table id="employees-data-table" class="data-table">
      <thead class="header-table">
        <tr>
          <th class="checkbox-column">
            <label class="custom-checkbox-container">
              <input type="checkbox" class="input-check-all" />
              <span class="custom-checkbox-checkmark"></span>
            </label>
          </th>
          <th class="employee-code-column">MÃ NHÂN VIÊN</th>
          <th class="fullname-column">TÊN NHÂN VIÊN</th>
          <th class="sex-column">GIỚI TÍNH</th>
          <th class="dob-column">NGÀY SINH</th>

          <th class="position-column">CHỨC DANH</th>
          <th class="department-column">TÊN ĐƠN VỊ</th>

          <th class="personal-id-column" title="Số chứng minh nhân dân">
            SỐ CMND
          </th>
          <th class="department-column">NGÀY CẤP</th>
          <th class="department-column">NƠI CẤP</th>
          <th class="department-column">ĐỊA CHỈ</th>

          <th class="department-column">ĐT DI ĐỘNG</th>
          <th class="department-column">ĐT CỐ ĐỊNH</th>
          <th class="department-column">EMAIL</th>

          <th class="department-column">TÀI KHOẢN NGÂN HÀNG</th>
          <th class="department-column">TÊN NGÂN HÀNG</th>
          <th class="department-column">CHI NHÁNH</th>

          <th class="action-column fixed-column-container">CHỨC NĂNG</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="emp in employees" :key="emp.EmployeeId" class="data-row">
          <td :id="emp.EmployeeId" class="checkbox-column">
            <label class="custom-checkbox-container">
              <input type="checkbox" class="input-check-item" />
              <span class="custom-checkbox-checkmark"></span>
            </label>
          </td>
          <td class="employee-code-column">{{ emp.EmployeeCode }}</td>
          <td class="fullname-column">{{ emp.EmployeeName }}</td>
          <td class="sex-column">{{ setGenderName(emp.Gender) }}</td>
          <td class="dob-column">{{ formatDate(emp.DateOfBirth) }}</td>
          <td class="position-column">{{ emp.EmployeePosition }}</td>
          <td class="department-column">{{ emp.DepartmentName }}</td>

          <td class="personal-id-column">{{ emp.IdentityNumber }}</td>
          <td class="position-column">{{ formatDate(emp.IdentityDate) }}</td>
          <td class="position-column">{{ emp.IdentityPlace }}</td>
          <td class="position-column">{{ emp.Address }}</td>

          <td class="position-column">{{ emp.PhoneNumber }}</td>
          <td class="position-column">{{ emp.TelephoneNumber }}</td>
          <td class="position-column">{{ emp.Email }}</td>

          <td class="position-column">{{ emp.BankAccountNumber }}</td>
          <td class="position-column">{{ emp.BankName }}</td>
          <td class="position-column">{{ emp.BankBranchName }}</td>

          <td class="action-column fixed-column-container">
            <button
              data-employee-id="{{emp.EmployeeId}}"
              class="none-btn edit-employee-btn"
              style="color: rgb(56, 148, 234)"
              @click="$emit('rowEdit', emp.EmployeeId)"
            >
              Sửa
            </button>
            <button
              class="select-selected border-icon-combobox"
              @click="showActionList(emp, $event)"
            >
              <font-awesome-icon
                icon="fa-solid fa-caret-down"
              ></font-awesome-icon>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <DCombobox
      ref="myActionList"
      :selectOptions="selectOptions"
      :positionTop="dropdownTop"
      :positionLeft="dropdownLeft"
      @duplicateEmp="$emit('rowDuplicate', selectedRow.EmployeeId)"
      @deleteEmp="$emit('rowDelete', '3', selectedRow)"
    />
  </div>
</template>
<script>
import * as BaseFunction from "@/js/base.js";

import DCombobox from "@/components/base/Combobox.vue";

export default {
  components: {
    DCombobox,
  },
  props: {
    employees: Array,
  },

  data() {
    return {
      selectedRow: null,

      dropdownTop: 0,
      dropdownLeft: 0,

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
    };
  },

  methods: {
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

    showActionList(emp, event) {
      this.selectedRow = emp;
      let dropdownButton = event.target.getBoundingClientRect();
      this.dropdownTop = dropdownButton.top + 20;
      this.dropdownLeft = dropdownButton.left - 80;
      this.$refs.myActionList.showCombobox();
    },
  },
};
</script>
<style lang="css"></style>
