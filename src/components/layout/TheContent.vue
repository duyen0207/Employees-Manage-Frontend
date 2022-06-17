<template lang="">
    <div class="content">
          <!-- Content header ----------------------------------------------->
          <div class="content-header rows-flexbox">
            <h2 class="content-title">Nhân viên</h2>
            <button id="add-new-emp-btn" class="primary-btn">
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
                    <th
                      class="personal-id-column"
                      title="Số chứng minh nhân dân"
                    >
                      SỐ CMND
                    </th>
                    <th class="position-column">CHỨC DANH</th>
                    <th class="department-column">TÊN ĐƠN VỊ</th>
                    <th class="action-column">CHỨC NĂNG</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="emp in employees" :key="emp.EmployeeId">
                    <td id="{{emp.EmployeeCode}}" class="checkbox-column">
                      <input type="checkbox" name="" id="" class="check-item" />
                    </td>
                    <td class="employee-code-column">{{emp.EmployeeCode}}</td>
                    <td class="fullname-column">{{emp.EmployeeName}}</td>
                    <td class="sex-column">{{emp.GenderName}}</td>
                    <td class="dob-column">{{formatDate(emp.DateOfBirth)}}</td>
                    <td class="personal-id-column">{{emp.IdentityNumber}}</td>
                    <td class="position-column">{{emp.Position}}</td>
                    <td class="department-column">{{emp.DepartmentName}}</td>
                    <td class="action-column">
                    <button
                        data-employee-id="{{emp.EmployeeId}}"
                        class="none-btn edit-employee-btn"
                        style="color: rgb(56, 148, 234)"
                    >
                        Sửa
                    </button>
                    <span class="action-combobox">
                      <button class="select-selected border-icon-combobox">
                        <font-awesome-icon icon="fa-solid fa-caret-down"></font-awesome-icon>
                      </button>
                      <ul class="select-items">
                        <li>Nhân bản</li>
                        <li class="delete-em-btn" 
                          data-option="delete" 
                          data-employee-code="{{emp.EmployeeCode}}"
                          data-employee-id="{{emp.EmployeeId}}">
                          Xóa
                        </li>
                        <li>Ngừng sử dụng</li>
                      </ul>
                    </span>
                    </td>

                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
</template>
<script>
export default {
  name: "TheContent",
  methods: {
    /**
     * chuẩn hóa ngày dưới dạng dd/mm/yyyy
     */
    formatDate(date) {
      if (date) {
        let formatDate = new Date(date);
        formatDate = formatDate.toLocaleDateString("en-GB");
        return formatDate;
      }
      return "";
    },
  },
  props: {
    employees: Array,
  },
};
</script>
<style lang="css">
@import url("@/css/layout/content.css");
</style> 