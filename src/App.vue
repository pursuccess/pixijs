<script setup>

</script>

<template>
  <div class="main-container">
    <div class="head-router">
      <router-link to="/">首页</router-link>
      <router-link to="/text-drag">文字拖曳</router-link>
      <router-link to="/img-drag">图片拖曳</router-link>
      <router-link to="/svg-control">svg图片控制</router-link>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<style lang="scss">
  * {
    box-sizing: border-box;
  }
  body {
      margin: 0;
  }
  .main-container {
    padding-top: 80px;
    .head-router {
      position: fixed;
      left: 0;
      right: 0;
      top: 0;
      height: 80px;
      padding: 30px;
      text-align: center;
      a {
        margin: 0 20px;
        font-size: 20px;
      }
    }
    .content {
      flex: 1;
    }
  }
</style>
