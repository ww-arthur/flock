<template>
  <div class="a-select-box">
    <a-button
      class="wi-min-100 he-min-100"
      @click="focus()"
      :rounded="rounded"
      :color="color"
      template="gradient"
    >
      <div class="di-flex jc-space-between wi-100 ai-center">
        <slot v-if="selected.text || selected.value" :selected="selected">
          {{ selected.text || selected.value }}
        </slot>
        <slot v-else name="notFound">
          Select
        </slot>
        <a-icon
          size="24px"
          :light="`${color}-shade-6`"
          :dark="`${color}-tint-6`"
          class="mr-2"
        >
          chevron-down
        </a-icon>
      </div>
    </a-button>
    <transition @enter="onEnter" @leave="onLeave" :css="false">
      <div
        v-show="isFocused"
        class="a-select-items"
        :class="`ro-${rounded} ${
          darkMode
            ? `background-${color}-shade-9`
            : `background-${color}-tint-9`
        }`"
      >
        <div
          class="po-relative ov-hidden"
          v-for="(item, i) in items"
          :key="item.value"
          v-ripple
          @click="input(item, i)"
        >
          <slot name="item" :item="item">
            <a-item
              :icon="item.icon"
              :color="(item.color || 'grey')"
              :label="item.label"
              :text="item.text || item.value"
            >
              {{ (item.text || item.value) }}
            </a-item>
          </slot>
        </div>
      </div>
    </transition>
  </div>
</template>
<script setup>
const darkMode = useState('darkMode')
const props = defineProps({
  modelValue: {
    type: [String, Object],
    default: '',
  },
  color: {
    type: String,
    default: 'purple',
  },
  mode: {
    type: String,
    default: 'filled',
  },
  rounded: {
    type: String,
    default: '5',
  },

  items: {
    type: Array,
    default: () => [],
  },
})
</script>
<script>
export default {
  data() {
    return {
      isFocused: false,
      selected: {
        text: '',
        value: '',
      },
      itemsCmp: this.items,
    }
  },
  methods: {
    onEnter(el, done) {
      this.$anime({
        targets: el,
        duration: 400,
        easing: 'easeOutCirc',
        opacity: [0, 1],
        rotateX: ['-90deg', '0deg'],
        complete: done,
      })
    },
    onLeave(el, done) {
      this.$anime({
        targets: el,
        duration: 400,
        easing: 'easeInCirc',
        opacity: [1, 0],
        rotateX: ['0deg', '-90deg'],
        complete: done,
      })
    },
    focus() {
      this.isFocused = !this.isFocused
    },
    input(item, i) {
      this.selected = item
      this.isFocused = false
      this.$emit('update:modelValue', item.value ?? item)
    },
  },
  mounted() {
    this.selected =
      this.items.find((item) => item.value === this.modelValue) ??
      this.modelValue
  },
  watch: {
    items: {
      handler: function () {
        this.itemsCmp = this.items
      },
      deep: true,
    },
  },
}
</script>
<style lang="scss">
.a-select-box {
  position: relative;
  perspective-origin: 50% 50%;
  perspective: 300px;
  transform-style: preserve-3d;
  input {
    z-index: 1;
  }
  .a-select-items {
    cursor: pointer;
    position: absolute;
    flex-direction: column;
    min-width: 100%;
    z-index: -1;
    transform-origin: top center;
    top: calc(100% - 24px);
    padding-top: 24px;
    padding-bottom: 8px;
  }
}
.select-scroll-enter-active {
  animation: bounce-in 0.2s ease-out;
}
.select-scroll-leave-active {
  animation: bounce-in 0.2s ease-out reverse;
}
.select-scroll-enter-to {
  transform: translate(0, 100%);
}
.select-scroll-enter-from,
.select-scroll-leave-to {
  transform: translate(0, 80%);
  opacity: 0;
  z-index: -1;
}

@keyframes bounce-in {
  0% {
    transform: translate(0, 80%);
    opacity: 0;
  }

  100% {
    transform: translate(0, 100%);
    opacity: 1;
  }
}
</style>
