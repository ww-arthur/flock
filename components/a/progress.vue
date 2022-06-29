<template>
  <div class="po-relative">
    <div class="fs-1 po-absolute mt-n3">
      <slot name="label">
        {{ label }}
      </slot>
    </div>
    <div class="progress mt-3" :class="background">
      <div class="progress-bar" :class="progress"></div>
    </div>
  </div>
</template>
<script setup>
const darkMode = useState('darkMode')
const props = defineProps({
  modelValue: {
    type: [Number, String],
    default: 0,
  },
  backgroundColor: {
    type: String,
    default: 'grey-alpha-5',
  },
  progressColor: {
    type: String,
    default: 'purple',
  },
  rounded: {
    type: [String, Number],
    default: '0',
  },
  height: {
    type: String,
    default: '5px',
  },
  label: {
    type: String,
    default: '',
  },
})
</script>
<script>
export default {
  computed: {
    width() {
      return parseFloat(this.modelValue) + '%'
    },
    background() {
      return [
        this.backgroundColor
          .trim()
          .split(' ')
          .map((color) => 'background-' + color)
          .join(' '),
        `ro-${this.rounded}`,
      ]
    },
    progress() {
      return [
        this.progressColor
          .trim()
          .split(' ')
          .map((color) => 'background-' + color)
          .join(' '),
        `ro-${this.rounded}`,
      ]
    },
  },
}
</script>
<style lang="scss" scoped>
.progress {
  overflow: hidden;
  .progress-bar {
    width: v-bind(width);
    height: v-bind(height);
  }
}
</style>
