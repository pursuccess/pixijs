<template>
  <div id="container" >
    <div id="drag"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { svg1, svg4text, svgLogo } from '@/utils/svg.js'
const svgText = ref(svg4text)
const svgPosition  = ref({ x: 0, y: 0 })
const rectClient = { width: 50, height: 50 }
const img = new Image()

const changeSvg = (left, top) => {//改变svg的transform的值
  const svg = svgText.value
  const reg = /("translate\()(\d+)(,\s)(\d+)/
  console.log(svg.match(reg))
  if(svg.match(reg)) {
    svgText.value = svg.replace(reg, `$1${left}$3${top}`)
    img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgText.value);
  }
}

const getSvgCurrentPosition = () => {//获取当前svg rect的坐标
  const svg = svgText.value
  const reg = /("translate\()(\d+)(,\s)(\d+)/
  if(svg.match(reg)) {
    const x = svg.match(reg)[2], y = svg.match(reg)[4]
    svgPosition.value = { x, y }
  }
}

onMounted(() => {
  getSvgCurrentPosition()
  const container = document.getElementById('container')
  const drag = document.getElementById('drag')
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  drag.appendChild(canvas);

  // 设置 Canvas 的尺寸
  canvas.width = 1000;
  canvas.height = 800;

  // 将 SVG 图像绘制到 Canvas 上
  img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgText.value);
  img.onload = function() {
    // console.log(img)
    ctx.reset();
    ctx.drawImage(img, 0, 0);
  }

  drag.onmousedown = function (event) {
      let clientX = parseInt(event.clientX)//鼠标事件的x坐标位置
      let clientY = parseInt(event.clientY)//鼠标事件的y坐标位置
      let currentLeft = parseInt(svgPosition.value.x)
      let currentTop = parseInt(svgPosition.value.y)
      const rectWidth = rectClient.width
      const rectHeight = rectClient.height
      console.log(clientX, clientY, currentLeft, currentTop)
      document.onmousemove = function (event) {
          console.log(event.clientX, event.clientY, clientX, clientY)
          let left = event.clientX - clientX + currentLeft
          let top = event.clientY - clientY + currentTop
          //边缘判断
          if (left > container.clientWidth - rectWidth)
              left = container.clientWidth - rectWidth
          if (left < 0)
              left = 0
          if (top > container.clientHeight - rectHeight)
              top = container.clientHeight - rectHeight
          if (top < 0)
              top = 0
          // drag.style.left = left + "px"
          // drag.style.top = top + "px"
          // console.log(drag)
          changeSvg(left, top)
      }

      //监听整个文档区域，避免拖拽到边缘鼠标放开没有监听到回调
      document.onmouseup = function () {
          document.onmousemove = null
          getSvgCurrentPosition()
      }
  }
})
</script>

<style scoped lang="scss">
#container {
    width: 1000px;
       /* overflow: hidden有效阻止鼠标超出拖动范围而触发mousemove回调 */
    overflow: hidden;
    position: relative;
    height: 800px;
    background-color: #ddd;
}

#drag {
  // width: 200px;
  // height: 200px;
}
</style>