<template>
  <div :class="computedClasses"><slot /></div>
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
})
</script>
<script>
export default {
  computed: {
    computedClasses() {
      return this.darkMode ? this.dark : this.light
    },
  },
}
</script>
<style lang="scss" scoped></style>
