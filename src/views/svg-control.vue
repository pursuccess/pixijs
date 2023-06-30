<template>
  <div>
    <input type="text" v-model="inputText" placeholder="Type text here...">
    <div id="drawing"></div>
  </div>
</template>

<script setup>
import { SVG } from '@svgdotjs/svg.js'
import { onMounted, ref } from 'vue'
import { svg3text } from '@/utils/svg.js'

const inputText = ref('Dragon----- - - - ->')

function updateText(textPath) {
	return function() {
		textPath.tspan(this.value)
	}				
}

onMounted(() => {
  var input = document.querySelector('input[type=text]')
  var draw = SVG().addTo('#drawing').viewbox(0, 0, 300, 140)
  var text = draw.text(function(add) {
    add.tspan( input.value )
  })

  var textPath = text.path('M10 80 C 40 10, 65 10, 95 80 S 150 150, 180 80')

  textPath.animate(1000).ease('<>')
    .plot('M10 80 C 40 150, 65 150, 95 80 S 150 10, 180 80')
    .loop(true, true)

  input.addEventListener('keyup', updateText(textPath))

  // 创建一个 SVG.js 画布
const canvas = SVG().addTo(document.getElementById('drawing'));

// 加载 SVG 文件并解析
const svgElement = SVG(svg3text);

// 将解析后的 SVG 元素添加到画布中
canvas.add(svgElement);

// 获取 SVG 图片中的圆圈元素，并修改其颜色
const circle = svgElement.findOne('path');
circle.attr('fill', 'green');
})
</script>

<style scoped lang="scss">

</style>