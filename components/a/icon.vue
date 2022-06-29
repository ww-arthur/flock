<template>
  <svg
    v-show="actualSize"
    class="icon ov-visible"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 24 24"
    xml:space="preserve"
  >
    <g>
      <path
        :class="`transition sw-${strokeWidth} stroke-${strokeColor} background-${color}`"
      />
    </g>
  </svg>
</template>
<script setup>
const darkMode = useState('darkMode')

const props = defineProps({
  icon: {
    type: String,
    default: 'square-rounded',
  },
  color: {
    type: String,
    default: '',
  },
  outline: {
    type: [Boolean, Number, String],
    default: false,
  },
  strokeColor: {
    type: String,
    default: '',
  },
  strokeWidth: {
    type: String,
    default: '1',
  },
  size: {
    type: [String, Number],
    default: 3,
  },
})
let actualSize = computed(() =>
  isNaN(props.size) ? props.size : parseInt(props.size) * 4 * 2 + 'px',
)
</script>
<script>
export default {
  computed: {
    iconPath() {
      return `path("${this.$icon.get(
        this.$slots.default?.()?.[0]?.children ?? this.icon,
      )}")`
    },
    fillOpacity() {
      return this.outline ? 0 : 1
    },
  },
}
</script>
<style scoped>
.wi-0 {
  width: 0;
}
.icon {
  fill: currentColor;
  aspect-ratio: 1;
  stroke-linecap: round;
  fill-opacity: v-bind(fillOpacity);
  width: v-bind(actualSize) !important;
  height: auto;
}
.icon path {
  transition: 0.2s;
  d: v-bind(iconPath);
}
</style>
