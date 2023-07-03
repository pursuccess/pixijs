import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/text-move',
      name: 'textMove',
      component: () => import('../views/text-move.vue')
    },
    {
      path: '/text-drag',
      name: 'textDrag',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/text-drag.vue')
    },
    {
      path: '/img-drag',
      name: 'imgDrag',
      component: () => import('../views/img-drag.vue')
    },
    {
      path: '/svg-control',
      name: 'svgControl',
      component: () => import('../views/svg-control.vue')
    },
    {
      path: '/svg-drag',
      name: 'svgDrag',
      component: () => import('../views/svg-drag.vue')
    },
    {
      path: '/canvas-render-svg',
      name: 'canvasRenderSvg',
      component: () => import('../views/canvas-render-svg.vue')
    },
    {
      path: '/canvas-drag-svg',
      name: 'canvasDragSvg',
      component: () => import('../views/canvas-drag-svg.vue')
    },
    {
      path: '/pixi-drag-svg',
      name: 'pixiDragSvg',
      component: () => import('../views/pixi-drag-svg.vue')
    }
  ]
})

export default router
