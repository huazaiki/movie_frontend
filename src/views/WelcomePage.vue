<script setup>

</script>

<template>
  <div style="width: 100vw; height: 100vh; overflow: hidden; display: flex">
    <div style="flex: 1; background-color: black">
      <el-image style="width: 100%; height: 100%" fit="cover" src="https://cn.bing.com/th?id=OHR.CastellfollitSpain_EN-US8880313790_UHD.jpg&pid=hp&w=1920"></el-image>
    </div>

    <div class="welcome-title">
      <div style="font-size: 30px; font-weight: bold">欢迎来到后台系统</div>
      <div style="margin-top: 10px">简洁、高效、全新的后台管理系统</div>
    </div>

    <div class="right-card">
      <router-view/>
    </div>
  </div>
</template>

<style scoped>
.right-card {
  width: 400px;
  z-index: 1;
  background-color: white;
}
.welcome-title {
  position: absolute;
  bottom: 30px;
  left: 60px;
  color: white;
  text-shadow: 0 0 10px black;
}
</style>