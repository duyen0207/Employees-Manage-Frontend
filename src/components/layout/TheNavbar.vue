<template lang="">
    <div class="navbar">
        <!-- navbar header --------------------------------------------------->
        <div class="navbar-header rows-flexbox">
          <a href="/">
            <div id="grid-icon" class=""></div>
          </a>
          <a href="/" class="logo-container rows-flexbox">

            <img id="logo-img" src="../../assets/images/icons/search-line.png" alt="Amis Logo" />
            <h2>Kế toán</h2>
          </a>
        </div>
        <!-- menu items list -------------------------------------------------->
        <div class="main-menu scroll">
          <li class="normal-box">
            <div class="tooltip">Tổng quan</div>
            <a href="#Tổng quan" class="menu-item-link rows-flexbox">
              <div id="general-icon" class="nav-icon"></div>
              <div class="menu-item-title">Tổng quan</div>
            </a>
          </li>

          <li class="normal-box">
            <div class="tooltip">Tiền mặt</div>
            <a href="#Tiền mặt" class="menu-item-link rows-flexbox">
              <div id="money-bag-icon" class="nav-icon"></div>
              <div class="menu-item-title">Tiền mặt</div>
            </a>
          </li>

          <li class="normal-box">
            <div class="tooltip">Tiền gửi</div>
            <a href="#" class="menu-item-link rows-flexbox">
              <div id="bank-icon" class="nav-icon"></div>
              <div class="menu-item-title">Tiền gửi</div>
            </a>
          </li>

          <li class="normal-box">
            <div class="tooltip">Mua hàng</div>
            <a href="#" class="menu-item-link rows-flexbox">
              <div id="shopping-bag-icon" class="nav-icon"></div>
              <div class="menu-item-title">Mua hàng</div>
            </a>
          </li>

          <li class="normal-box">
            <div class="tooltip">Bán hàng</div>
            <a href="#" class="menu-item-link rows-flexbox">
              <div id="shopping-cart-icon" class="nav-icon"></div>
              <div class="menu-item-title">Bán hàng</div>
            </a>
          </li>

          <li class="normal-box">
            <div class="tooltip">Quản lý hóa đơn</div>
            <a href="#" class="menu-item-link rows-flexbox">
              <div id="bill-icon" class="nav-icon"></div>
              <div class="menu-item-title">Quản lý hóa đơn</div>
            </a>
          </li>

          <li class="normal-box">
            <div class="tooltip">Kho</div>
            <a href="#" class="menu-item-link rows-flexbox">
              <div id="warehouse-icon" class="nav-icon"></div>
              <div class="menu-item-title">Kho</div>
            </a>
          </li>

          <li class="normal-box">
            <div class="tooltip">Công cụ dụng cụ, chi phí trả trước</div>
            <a href="#" class="menu-item-link rows-flexbox">
              <div id="tools-icon" class="nav-icon"></div>
              <div class="menu-item-title">Công cụ dụng cụ</div>
            </a>
          </li>

          <li class="normal-box">
            <div class="tooltip">Tài sản cố định</div>
            <a href="#" class="menu-item-link rows-flexbox">
              <div id="car-icon" class="nav-icon"></div>
              <div class="menu-item-title">Tài sản cố định</div>
            </a>
          </li>

          <li class="normal-box">
            <div class="tooltip">Thuế</div>
            <a href="#" class="menu-item-link rows-flexbox">
              <div id="government-house-icon" class="nav-icon"></div>
              <div class="menu-item-title">Thuế</div>
            </a>
          </li>

          <li class="normal-box">
            <div class="tooltip">Giá thành</div>
            <a href="#" class="menu-item-link rows-flexbox">
              <div id="price-tag" class="nav-icon"></div>
              <div class="menu-item-title">Giá thành</div>
            </a>
          </li>

          <li class="normal-box">
            <div class="tooltip">Tổng hợp</div>
            <a href="#" class="menu-item-link rows-flexbox">
              <div id="money-notebook" class="nav-icon"></div>
              <div class="menu-item-title">Tổng hợp</div>
            </a>
          </li>

          <li class="normal-box">
            <div class="tooltip">Ngân sách</div>
            <a href="#" class="menu-item-link rows-flexbox">
              <div id="dollar-circle" class="nav-icon"></div>
              <div class="menu-item-title">Ngân sách</div>
            </a>
          </li>

          <li class="normal-box">
            <div class="tooltip">Báo cáo</div>
            <a href="#" class="menu-item-link rows-flexbox">
              <div id="graph-icon" class="nav-icon"></div>
              <div class="menu-item-title">Báo cáo</div>
            </a>
          </li>

          <li class="normal-box">
            <div class="tooltip">Phân tích tài chính</div>
            <a href="#" class="menu-item-link rows-flexbox">
              <div id="analysis-icon" class="nav-icon"></div>
              <div class="menu-item-title">Phân tích tài chính</div>
            </a>
          </li>
        </div>
      </div>
</template>
<script>
export default {
    name:"TheNavbar",
    // data () {
    //     return {
    //         logoUrl: "@/assets/images/favicon.ico" ,
    //     }
    // }
};
</script>
<style>
@import url("@/css/layout/navbar.css");
</style>