<script setup>

</script>

<template>
  <div class="main-container">
    <div class="head-router">
      <router-link to="/">首页</router-link>
      <!-- <router-link to="/text-move">文字自动移动</router-link>
      <router-link to="/text-drag">文字拖曳</router-link> -->
      <!-- <router-link to="/img-drag">图片拖曳</router-link> -->
      <!-- <router-link to="/svg-control">svg.js实现图片控制</router-link> -->
      <router-link to="/svg-drag">svg图片拖拽</router-link>
      <!-- <router-link to="/canvas-render-svg">canvas画布绘制svg图形</router-link> -->
      <router-link to="/canvas-drag-svg">canvas画布上拖拽改变svg图形</router-link>
      <router-link to="/pixi-drag-svg">pixijs中拖拽改变svg图形</router-link>
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
