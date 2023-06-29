<template>
  <div>
    <div style="text-align: center; font-size: 20px;">这是首页</div>

    <div id="container" >
      <div id="drag" v-html="svgText"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { svg1 } from '@/utils/svg.js'
const svgText = ref(svg1)
const svgPosition  = ref({ x: 0, y: 0})
const rectClient = { width: 50, height: 50 }

const changeSvg = (left, top) => {
  const svg = svgText.value
  const reg = /("translate\()(\d+)(,\s)(\d+)/
  console.log(svg.match(reg))
  if(svg.match(reg)) {
    svgText.value = svg.replace(reg, `$1${left}$3${top}`)
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
  // setInterval(() => { 
  //   changeSvg()
  // }, 3000)
  let container = document.getElementById('container')
  let drag = document.getElementById('drag')
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
    width: 500px;
       /* overflow: hidden有效阻止鼠标超出拖动范围而触发mousemove回调 */
    overflow: hidden;
    position: relative;
    height: 500px;
    background-color: #ddd;
}

#drag {
  // width: 200px;
  // height: 200px;
}
</style>