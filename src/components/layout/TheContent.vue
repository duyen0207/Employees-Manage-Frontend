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
                style="
                  --icon-url: url('../../assets/images/icons/search-line.png');
                "
                type="text"
                placeholder="Tìm kiếm theo mã, tên nhân viên"
              />
              <button id="reload-data" class="none-btn">
                <i class="fa-solid fa-arrow-rotate-right"></i>
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
                <tbody></tbody>
              </table>
            </div>
          </div>
        </div>
</template>
<script>
export default {
  name: "TheContent",
};
</script>
<style lang="css">
@import url("@/css/layout/content.css");
</style> 