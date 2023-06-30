<template>
  <div id="canvas"></div>
</template>

<script setup>
import { onMounted } from 'vue';
import { svg1 } from '@/utils/svg.js'

onMounted(() => {
  // 创建一个 Canvas 元素和上下文
  const canvas = document.createElement('canvas');
  document.getElementById('canvas').appendChild(canvas);
  const ctx = canvas.getContext('2d');

  // 设置 Canvas 的尺寸与 SVG 图像相同
  canvas.width = 300;
  canvas.height = 300;

  // 将 SVG 图像绘制到 Canvas 上
  const img = new Image();

  img.onload = function() {
    ctx.drawImage(img, 0, 0);
  };

  img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg1);
})
</script>

<style scoped lang="scss">

</style>