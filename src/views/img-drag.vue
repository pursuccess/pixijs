<template>
  <div id="imgDragWrap"></div>
</template>

<script setup>
  import * as PIXI from 'pixi.js';
  import { onMounted } from 'vue'
  import bunnyImg1 from '@/assets/images/1.png'
  import bunnyImg2 from '@/assets/images/2.png'
  import bunnyImg3 from '@/assets/images/3.png'
  import bunnyImg4 from '@/assets/images/4.png'
  import bunnyImg5 from '@/assets/images/1.svg'
  import bunnyImg6 from '@/assets/images/2.svg'
  import bunnyImg7 from '@/assets/images/3.svg'
  import bunnyImg8 from '@/assets/images/4.svg'
  
  const app = new PIXI.Application({ background: '#1099bb', resizeTo: window });

  // create a texture from an image path
  const imgFrames = [
    bunnyImg1,
    bunnyImg2,
    bunnyImg3,
    bunnyImg4,
    bunnyImg5,
    bunnyImg6,
    bunnyImg7,
    bunnyImg8
  ]
  
  renderBunnys()

  function renderBunnys() {
      for (let i = 0; i < 20; i++) {
          const random = imgFrames[i%8]
          createBunny(
              Math.floor(Math.random() * app.screen.width),
              Math.floor(Math.random() * app.screen.height),
              random
          );
      }
  }
  function createBunny(x, y, text) {
      // create our little bunny friend..
      const bunny = PIXI.Sprite.from(text)

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
      bunny.width = 200;
      bunny.height = 200;

      // add it to the stage
      app.stage.addChild(bunny)
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
    document.getElementById('imgDragWrap').appendChild(app.view);
  })
</script>

<style scoped lang="scss">

</style>