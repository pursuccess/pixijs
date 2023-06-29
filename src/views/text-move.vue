<template>
  <div id="indexWrap"></div>
</template>

<script setup>
  import * as PIXI from 'pixi.js';
  import textArr from '@/utils/family-names.js'
  import { onMounted } from 'vue'
  import bunnyImg from '@/assets/images/bunny.png'
  
  const length = textArr.length
  const app = new PIXI.Application({ background: '#1099bb', resizeTo: window });

  const texture = PIXI.Texture.from(bunnyImg);
  const container1 = new PIXI.Container();
  const container2 = new PIXI.Container();
  const container3 = new PIXI.Container();
  container1.position.set(0, 20)
  container2.position.set(0, 320)
  container3.position.set(0, 620)
  app.stage.addChild(container1);
  app.stage.addChild(container2);
  app.stage.addChild(container3);
        
  const style = new PIXI.TextStyle({
      fontFamily: 'Arial',
      fontSize: 16,
      fontStyle: 'italic',
      fontWeight: 'bold',
      fill: ['#ffffff', '#00ff99'], // gradient
      stroke: '#4a1850',
      strokeThickness: 5,
      dropShadow: true,
      dropShadowColor: '#000000',
      dropShadowBlur: 4,
      dropShadowAngle: Math.PI / 6,
      dropShadowDistance: 6,
      wordWrap: true,
      wordWrapWidth: 440,
      lineJoin: 'round',
  });
  const skewStyle = new PIXI.TextStyle({
      fontFamily: 'Arial',
      dropShadow: true,
      dropShadowAlpha: 0.8,
      dropShadowAngle: 2.1,
      dropShadowBlur: 4,
      dropShadowColor: '0x111111',
      dropShadowDistance: 10,
      fill: ['#ffffff'],
      stroke: '#004620',
      fontSize: 18,
      fontWeight: 'lighter',
      lineJoin: 'round',
      strokeThickness: 12,
  });

  renderTextArr({}, container1)
  renderBtn(120, onClick1)

  renderTextArr(style, container2)
  renderBtn(420, onClick2)

  renderTextArr(skewStyle, container3)
  renderBtn(720, onClick3)


  function renderTextArr(style, container) {//生成文字
      container.removeChildren ()
      let textString = ''
      for (let i = 0; i < 100; i++) {
          if (i%50==0) {
              textString += '\r\n'
          }
          const random = Math.floor(Math.random()*length)
          textString += textArr[random]
      }
      console.log(textString)
      const basicText = new PIXI.Text(textString, style)
      container.addChild(basicText)
  }

  function renderBtn(y, onClick) {//渲染按钮
      const textBtn = new PIXI.Sprite(texture);
      textBtn.x = app.screen.width / 3
      textBtn.y = y
      textBtn.interactive = true;
      textBtn.cursor = 'pointer'
      app.stage.addChild(textBtn)
      textBtn.on('pointerdown', onClick);
  }
  
  function onClick1() {
      console.log('refresh1')
      renderTextArr({}, container1)
  }
  function onClick2() {
      console.log('refresh2')
      renderTextArr(style, container2)
  }
  function onClick3() {
      console.log('refresh3')
      renderTextArr(skewStyle, container3)
  }

  let direction1 = 'bottom', direction2 = 'bottom', direction3 = 'bottom'
  app.ticker.add(() => {
      if (direction1 == 'bottom') {
          container1.y++
          if (container1.y>=220) {
              direction1 = 'top'
          }
      } else if (direction1 == 'top') {
          container1.y--
          if (container1.y<=20) {
              direction1 = 'bottom'
          }
      }

      if (direction2 == 'bottom') {
          container2.y++
          if (container2.y>=520) {
              direction2 = 'top'
          }
      } else if (direction2 == 'top') {
          container2.y--
          if (container2.y<=320) {
              direction2 = 'bottom'
          }
      }

      if (direction3 == 'bottom') {
          container3.y++
          if (container3.y>=820) {
              direction3 = 'top'
          }
      } else if (direction3 == 'top') {
          container3.y--
          if (container3.y<=620) {
              direction3 = 'bottom'
          }
      }
  });

  onMounted(() => {
    document.getElementById('indexWrap').appendChild(app.view);
  })
</script>

<style scoped lang="scss">

</style>