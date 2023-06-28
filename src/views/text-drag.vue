<template>
  <div id="textDragWrap"></div>
</template>

<script setup>
  import * as PIXI from 'pixi.js';
  import { onMounted } from 'vue'
  import textArr from '@/utils/family-names.js'
  import bunnyImg from '@/assets/images/bunny.png'
  
  const length = textArr.length
  const app = new PIXI.Application({ background: '#1099bb', resizeTo: window });
  
  const container = new PIXI.Container();
  app.stage.addChild(container);

  const style = new PIXI.TextStyle({
      fontFamily: 'Arial',
      fontSize: 24,
      fontWeight: 'bold',
      fill: ['#ffffff', '#00ff99'], // gradient
      stroke: '#4a1850',
      strokeThickness: 5
  });

  // create a texture from an image path
  const textureRefresh = PIXI.Sprite.from(bunnyImg);
  textureRefresh.position.set(app.screen.width / 2, app.screen.height - 200)
  textureRefresh.interactive = true;
  textureRefresh.cursor = 'pointer'
  textureRefresh.scale.set(3);
  app.stage.addChild(textureRefresh)
  textureRefresh.on('pointerdown', renderBunnys);

  renderBunnys()

  function renderBunnys() {
      console.log('重新生成')
      container.removeChildren()
      for (let i = 0; i < 50; i++) {
          const random = Math.floor(Math.random()*length)
          createBunny(
              Math.floor(Math.random() * app.screen.width),
              Math.floor(Math.random() * app.screen.height),
              textArr[random]
          );
      }
  }
  function createBunny(x, y, text) {
      // create our little bunny friend..
      const bunny = new PIXI.Text(text, style)

      // enable the bunny to be interactive... this will allow it to respond to mouse and touch events
      bunny.interactive = true;

      // this button mode will mean the hand cursor appears when you roll over the bunny with your mouse
      bunny.cursor = 'pointer';

      // center the bunny's anchor point
      bunny.anchor.set(0.5);

      // setup events for mouse + touch using
      // the pointer events
      bunny.on('pointerdown', onDragStart, bunny);

      // move the sprite to its designated position
      bunny.x = x;
      bunny.y = y;

      // add it to the stage
      container.addChild(bunny)
  }

  let dragTarget = null;

  app.stage.interactive = true;
  app.stage.hitArea = app.screen;
  app.stage.on('pointerup', onDragEnd);
  app.stage.on('pointerupoutside', onDragEnd);

  function onDragMove(event)
  {
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
    document.getElementById('textDragWrap').appendChild(app.view);
  })
</script>

<style scoped lang="scss">

</style>