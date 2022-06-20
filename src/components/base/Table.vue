<template lang="">
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
          <td class="sex-column">{{ setGenderName(emp.Gender) }}</td>
          <td class="dob-column">{{ formatDate(emp.DateOfBirth) }}</td>
          <td class="personal-id-column">{{ emp.IdentityNumber }}</td>
          <td class="position-column">{{ emp.EmployeePosition }}</td>
          <td class="department-column">{{ emp.DepartmentName }}</td>
          <td class="action-column">
            <button
              data-employee-id="{{emp.EmployeeId}}"
              class="none-btn edit-employee-btn"
              style="color: rgb(56, 148, 234)"
              @click="$emit('rowEdit', emp.EmployeeId)"
            >
              Sửa
            </button>
            <DCombobox
              :emp="emp"
              :selectOptions="selectOptions"
              @duplicateEmp="$emit('rowDuplicate', emp.EmployeeId)"
              @deleteEmp="
                $emit('rowDelete', '3', emp.EmployeeCode, emp.EmployeeId)
              "
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import DCombobox from "@/components/base/Combobox.vue"

export default {
  components: {
    DCombobox,
  },
  props: {
    employees: Array,
  },

  data() {
    return {
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
  },
};
</script>
<style lang="css"></style>
