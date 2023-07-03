<template>
  <div id="imgDragWrap"></div>
</template>

<script setup>
  import * as PIXI from 'pixi.js';
  import { ref, onMounted } from 'vue'
  import { svg4text, svg3text, svg1 } from '@/utils/svg.js'
  const svgText = ref(svg4text)
  const svgPosition  = ref({ x: 0, y: 0})
  
  const app = new PIXI.Application({ background: '#1099bb', resizeTo: window });


  // create our little bunny friend..
  const bunny = PIXI.Sprite.from(PIXI.Texture.from(svgText.value))

  // enable the bunny to be interactive... this will allow it to respond to mouse and touch events
  bunny.interactive = true;

  // this button mode will mean the hand cursor appears when you roll over the bunny with your mouse
  bunny.cursor = 'pointer';

  // center the bunny's anchor point
  // bunny.anchor.set(0.5);

  // setup events for mouse + touch using
  // the pointer events
  // bunny.on('pointerdown', onDragStart, bunny);

  // move the sprite to its designated position
  bunny.x = 200;
  bunny.y = 200;
  bunny.width = 400;
  bunny.height = 400;

  // add it to the stage
  app.stage.addChild(bunny)

  let dragTarget = null;

  app.stage.interactive = true;
  app.stage.hitArea = app.screen;
  app.stage.on('pointerup', onDragEnd);
  app.stage.on('pointerupoutside', onDragEnd);

  const changeSvg = (left, top) => {//改变svg 坐标
    const svg = svgText.value
    const reg = /("translate\()(\d+)(,\s)(\d+)/
    console.log(svg.match(reg))
    if(svg.match(reg)) {
      PIXI.utils.destroyTextureCache()
      svgText.value = svg.replace(reg, `$1${left}$3${top}`)
      bunny.texture = PIXI.Texture.from(svgText.value)
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

  function onDragMove(event)
  {
    bunny.texture = PIXI.Texture.from(svgText.value)
      if (dragTarget)
      {
          dragTarget.parent.toLocal(event.global, null, dragTarget.position);
      }
  }

  function onDragStart()
  {
      // store a reference to the data
      // the reason for this is because of multitouch
      // we want to track the movement of this particular touch
      // this.data = event.data;
      this.alpha = 0.5;
      dragTarget = this;
      app.stage.on('pointermove', onDragMove);
  }

  function onDragEnd()
  {
      if (dragTarget)
      {
          app.stage.off('pointermove', onDragMove);
          dragTarget.alpha = 1;
          dragTarget = null;
      }
  }

  onMounted(() => {
    getSvgCurrentPosition()
    document.getElementById('imgDragWrap').appendChild(app.view);
    const container = document.getElementById('imgDragWrap')
    document.onmousedown = function (event) {
        let clientX = parseInt(event.clientX)//鼠标事件的x坐标位置
        let clientY = parseInt(event.clientY)//鼠标事件的y坐标位置
        let currentLeft = parseInt(svgPosition.value.x)
        let currentTop = parseInt(svgPosition.value.y)
        console.log(clientX, clientY, currentLeft, currentTop)
        document.onmousemove = function (event) {
            console.log(event.clientX, event.clientY, clientX, clientY)
            let left = event.clientX - clientX + currentLeft
            let top = event.clientY - clientY + currentTop
            //边缘判断
            if (left > container.clientWidth)
                left = container.clientWidth
            if (left < 0)
                left = 0
            if (top > container.clientHeight)
                top = container.clientHeight
            if (top < 0)
                top = 0
            changeSvg(left, top)
            console.log(left, top)
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

</style>