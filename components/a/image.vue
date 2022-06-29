<template>
  <div :class="computedClasses" class="image"><slot /></div>
</template>
<script setup>
const darkMode = useState('darkMode')
const props = defineProps({
  light: {
    type: [String, Object, Array],
    default: '',
  },
  dark: {
    type: [String, Object, Array],
    default: '',
  },
  src: {
    type: String,
    default: '',
  },
})
</script>
<script>
export default {
  computed: {
    computedClasses() {
      return this.darkMode ? this.dark : this.light
    },
    imageUrl() {
      return `url(${this.src})`
    },
  },
}
</script>
<style lang="scss" scoped>
.image {
  background-image: v-bind(imageUrl) !important;
  background-size: 100%;
}
</style>
