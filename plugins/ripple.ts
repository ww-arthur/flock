import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  let ripple = {
    mounted(el: HTMLElement, binding: object) {
      el.style.cursor = 'pointer'
      const container = document.createElement('span')
      container.classList.add('a-ripple-container')
      const circle = document.createElement('span')
      circle.classList.add('a-ripple')
      circle.classList.add('a-ripple-out')
      el.style.position =
        el.style.position === 'static' || !el.style.position
          ? 'relative'
          : el.style.position
      var rect: DOMRect
      calculate()
      container.appendChild(circle)
      el.appendChild(container)
      let time = performance.now()
      function calculate() {
        circle.style.width = circle.style.height = `${Math.max(
          el.clientWidth,
          el.clientHeight,
        )}px`
        rect = el.getBoundingClientRect()
      }
      let timeout: NodeJS.Timeout
      function addCircle(event: MouseEvent | null) {
        time = performance.now()
        clearTimeout(timeout)
        calculate()
        circle.style.transition = 'none'
        if (event) {
          var x = event.clientX - rect.left //x position within the element.
          var y = event.clientY - rect.top
          circle.style.left = `${x}px`
          circle.style.top = `${y}px`
        } else {
          circle.style.left = `50%`
          circle.style.top = `50%`
        }
        setTimeout(() => {
          circle.classList.remove('a-ripple-out')
          circle.classList.add('a-ripple-in')
          circle.style.transition = ''
        }, 0)
      }
      function removeCircle(event: MouseEvent) {
        if (performance.now() - time < 500) {
          timeout = setTimeout(() => {
            circle.classList.remove('a-ripple-in')
            circle.classList.add('a-ripple-out')
          }, 500 - performance.now() + time)
        } else {
          circle.classList.remove('a-ripple-in')
          circle.classList.add('a-ripple-out')
        }
      }
      el.addEventListener('touchstart', (event: MouseEvent) => {
        addCircle(event)
      })
      el.addEventListener('mousedown', (event: MouseEvent) => {
        addCircle(event)
      })
      el.addEventListener('touchend', (event: MouseEvent) => {
        removeCircle(event)
      })
      el.addEventListener('touchcancel', (event: MouseEvent) => {
        removeCircle(event)
      })
      el.addEventListener('touchleave', (event: MouseEvent) => {
        removeCircle(event)
      })
      el.addEventListener('touchmove', (event: MouseEvent) => {
        removeCircle(event)
      })
      el.addEventListener('mouseup', (event: MouseEvent) => {
        removeCircle(event)
      })
      el.addEventListener('mouseout', (event: MouseEvent) => {
        removeCircle(event)
      })
    },
    getSSRProps(binding) {
      // server-side implementation:
      // return the props to be rendered.
      // getSSRProps only receives the directive binding.
      return {
        id: binding.value,
      }
    },
  }
  nuxtApp.vueApp.directive('ripple', ripple)
})
