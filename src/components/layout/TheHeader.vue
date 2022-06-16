<template lang="">
    <div class="header rows-flexbox">
          <!-- Company name --------------------------------------------------->
          <div class="rows-flexbox">
            <div class="toggle-menu-icon"></div>
            <div class="company-name">
              <h4>
                CÔNG TY TNHH SẢN XUẤT - THƯƠNG MẠI - DỊCH VỤ QUI PHÚC
                <i class="fa-solid fa-angle-down"></i>
              </h4>
            </div>
          </div>
          <!-- User context --------------------------------------------------->
          <div class="rows-flexbox">
            <div class="notification-icon"></div>
            <div class="user-toggle rows-flexbox">
              <div class="avatar-icon-container">
                <img
                  class="default-avatar-img"
                  src="@/assets/images/default-avatar.jpg"
                  alt="default-avatar"
                />
              </div>
              <div class="username">
                Nguyễn Văn Mạnh
                <i class="fa-solid fa-angle-down"></i>
              </div>
            </div>
          </div>
        </div>
</template>
<script>
export default {
  name: "TheHeader",
};
</script>
<style>
@import url("@/css/layout/header.css");
</style>>
