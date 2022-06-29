<template>
  <div class="a-input-box ro-5" :class="`text-${color}-tint-3`">
    <slot name="prepend"></slot>
    <label
      :class="
        isFocused || val
          ? 'fs-2 a-input-label--active text-tertiary-tint-5'
          : 'fs-5 a-input-label text-tertiary-tint-9'
      "
      ref="label"
    >
      <slot name="label">
        {{ label }}
      </slot>
    </label>
    <input
      :type="type"
      @focus="focus()"
      @blur="blur()"
      @input="$emit('update:modelValue', $event.target.value)"
      :class="`a-input py-3 text-tertiary-tint-9`"
      v-model="val"
    />
    <div class="a-bar ro-5 background-white-shade-3"></div>
    <transition name="grow-x">
      <div
        v-show="isFocused"
        class="a-bar ro-5 background-tertiary transition"
      ></div>
    </transition>
    <!--     <transition @enter="enterLoading" @leave="leaveLoading" :css="false">
      <div v-show="loading" class="a-loading-bar"></div>
    </transition> -->
  </div>
</template>
<script setup>
const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: '',
  },
  color: {
    type: String,
    default: 'grey',
  },
  label: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'text',
  },
  placeholder: {
    type: String,
    default: '',
  },
  loading: {
    type: [Boolean, Number, String],
    default: true,
  },
})
let val = ref(props.modelValue)
watch(
  () => props.modelValue,
  (newValue) => {
    val.value = newValue
  },
)
</script>
<script>
export default {
  data() {
    return {
      isFocused: false,
      timeout: null,
    }
  },
  /*   watch: {
    val() {
      if (!this.isFocused || this.val) {
      }
       clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        this.$emit('update:modelValue', this.val)
      }, 1000)
    },
  }, */

  methods: {
    focus() {
      this.isFocused = true
    },
    blur() {
      this.$emit('blur')
      this.isFocused = false
    },
  },
}
</script>
<style>
.a-input-box {
  margin-top: 1rem;
  margin-bottom: 1rem;
  position: relative;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}
.a-input-label {
  pointer-events: none;
  transition: all 0.2s ease-in;
  position: absolute;
  transform: translate(0, -50%);
  top: 50%;
  left: 0%;
}
.a-input-label--active {
  position: absolute;
  transform: translate(0, -50%);
  transition: all 0.2s ease-in;
  top: 0;
  left: 0;
}
.a-input {
  padding: 0;
  outline: none;
  appearance: none;
  background-color: transparent;
  border-style: none;
  font: inherit;
  flex: 1 1 auto;
  line-height: 20px;
  width: 100%;
  height: 100%;
}
.a-bar {
  position: absolute;
  height: 1px;
  z-index: 0;
  width: 100%;
}

.grow-x-enter-to,
.grow-x-leave-from {
  width: 100%;
}

.grow-x-leave-to,
.grow-x-enter-from {
  width: 0;
}
</style>
