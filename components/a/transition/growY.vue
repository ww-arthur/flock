<template>
  <transition @enter="animateEnter" @leave="animateLeave">
    <slot></slot>
  </transition>
</template>
<script setup lang="ts">
let height = 0
let defaultOverflow = ''
function animateEnter(element: HTMLElement, done: Function) {
  height = element.offsetHeight

  defaultOverflow = element.style.overflow
  element.style.overflow = 'hidden'
  let animation = element.animate(
    [
      {
        // from
        opacity: 0,
        maxHeight: '0px',
      },
      {
        // to
        opacity: 1,
        maxHeight: `${height}px`,
      },
    ],
    {
      duration: 250,
      easing: 'ease-in-out',
    },
  )
  animation.onfinish = () => {
    element.style.overflow = defaultOverflow
    done()
  }
}
function animateLeave(element: HTMLElement, done: Function) {
  height = element.offsetHeight
  element.style.overflow = 'hidden'

  let animation = element.animate(
    [
      {
        // from
        opacity: 1,
        maxHeight: `${height}px`,
      },
      {
        // to
        opacity: 0,
        maxHeight: '0px',
      },
    ],
    {
      duration: 250,
      easing: 'ease-in-out',
    },
  )
  animation.onfinish = () => {
    element.style.overflow = defaultOverflow
    done()
  }
}
</script>
