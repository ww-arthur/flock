import { defineNuxtPlugin } from '#app'
import * as icons from '@mdi/js'
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.config.globalProperties.$icon = {
    get(name: String) {
      return icons[
        'mdi' +
          name?.trim?.()?.[0]?.toUpperCase() +
          name
            .trim?.()
            .substring(1)
            .replace(/-./g, (x) => x[1].toUpperCase())
      ]
    },
  }
})
