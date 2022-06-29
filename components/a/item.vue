<template>
  <div
    class="item po-relative ov-hidden row ai-center md:px-2 jc-center md:jc-space-between py-3 fl-wrap ro-2"
    :class="`background-${color}-alpha-9-hover  bloom-2-${color}-alpha-7-hover`"
  >
    <div class="di-flex ai-center jc-center md:pa-1 mx-2 ar-1">
      <slot name="icon" :attrs="iconAttrs">
        <a-icon v-if="icon" v-bind="iconAttrs">
          {{ icon }}
        </a-icon>
      </slot>
    </div>
    <div class="po-relative fl-grow-1 te-left">
      <small
        class="di-block po-absolute opacity-8 mt-3 fw-3"
        style="transform: translateY(-100%); top: 0;"
      >
        <slot name="label">
          {{ label }}
        </slot>
      </small>
      <div class="fs-3 sm:fs-4 md:fs-5">
        <slot>
          {{ text }}
        </slot>
      </div>
    </div>
    <small>
      <slot name="end"></slot>
    </small>
  </div>
</template>
<script setup>
const props = defineProps({
  color: {
    type: String,
    default: 'grey',
  },
  icon: {
    type: String,
    default: '',
  },
  iconSize: {
    type: [String, Number],
    default: '24px',
  },
  label: {
    type: String,
    default: '',
  },
  justify: {
    type: String,
    default: 'space-between',
  },
  text: {
    type: String,
    default: '',
  },
})
</script>
<script>
export default {
  data() {
    return {
      iconAttrs: {
        size: this.iconSize,
        color: this.color,
      },
    }
  },
  computed: {
    computedClasses() {
      return this.darkMode ? this.dark : this.light
    },
  },
}
</script>
