<template>
  <div id="drawing">
    <div v-html="svgText" id="svgElement"></div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { svg3text } from '@/utils/svg.js'

const svgText = ref(svg3text)

const changeSvg = (left, top) => {
  const svg = svgText.value
  const reg = /("translate\()(\d+)(,\s)(\d+)/
  console.log(svg.match(reg))
  if(svg.match(reg)) {
    svgText.value = svg.replace(reg, `$1${left}$3${top}`)
  }
}

onMounted(() => {
  const drawElement = document.getElementById('drawing');
  const svgElement = document.getElementById('svgElement');

  svgElement.onmousedown = function(event) {
    let clientX = parseInt(event.clientX)//鼠标事件的x坐标位置
    let clientY = parseInt(event.clientY)//鼠标事件的y坐标位置
    console.log(event)

    svgElement.onmousemove = function(event) {
      // 获取鼠标在 SVG 元素中的位置
      const left = event.clientX - clientX + svgElement.getBoundingClientRect().left;
      const top = event.clientY - clientY + svgElement.getBoundingClientRect().top;
      
      // 在这里编写处理鼠标移动事件的代码
      // 可以根据鼠标位置进行相应的操作，例如更新图形位置、改变样式等
      if (left > drawElement.clientWidth)
          left = drawElement.clientWidth
      if (left < 0)
          left = 0
      if (top > drawElement.clientHeight)
          top = drawElement.clientHeight
      if (top < 0)
          top = 0
          console.log(left)
      changeSvg(left, top)
    };

    svgElement.onmouseup = function () {
      svgElement.onmousemove = null
    }
  }
  

})
</script>

<style scoped lang="scss">
  #drawing {
    width: 1000px;
    overflow: hidden;
    position: relative;
    height: 800px;
    background-color: #ddd;
}
</style>