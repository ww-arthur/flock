<template>
  <div class="a-card elevated" :class="computedClasses">
    <slot></slot>
  </div>
</template>
<script setup>
const props = defineProps({
  color: {
    type: String,
    default: 'black',
  },
  rounded: {
    type: [String, Number],
    default: '5',
  },
  size: {
    type: [String, Number],
    default: '3',
  },
  template: {
    type: String,
    default: 'default',
  },
})
function computeColors(template, color, size, rounded) {
  let templates = {
    default: `bloom-1-black-blend-7
     text-${color}-tint-8 background-${color}-blend-8-gradient-top-left background-${color}-blend-9`,
    text: `bloom-1-black-blend-7 
     text-${color}-tint-3  `,
  }
  return `ro-${rounded}  ${templates[template]}`
}
const computedClasses = computed(() => {
  return computeColors(props.template, props.color, props.size, props.rounded)
})
</script>
<style scoped></style>
