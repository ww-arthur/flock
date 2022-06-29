<template>
  <header class="wi-100 px-md-10 px-2 di-flex fl-wrap ai-center jc-center">
    <slot></slot>
  </header>
</template>
<script setup>
const darkMode = useState('darkMode')
</script>
<script>
export default {
  methods: {
    setTheme() {
      this.darkMode = !this.darkMode
      localStorage.setItem('theme', this.darkMode ? 'dark' : 'light')
    },
  },
  mounted() {
    document.addEventListener('scroll', (e) => {})
  },
}
</script>
<style lang="scss" scoped></style>
