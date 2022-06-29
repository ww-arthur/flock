<template>
  <div class="a-color-picker ro-3 elevated">
    <input
      @blur="$emit('blur')"
      @input="$emit('update:modelValue', $event.target.value)"
      ref="input"
      type="color"
      style="opacity: 0;"
      v-model="val"
    />
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  color: {
    type: String,
    default: 'grey',
  },

  loading: {
    type: [Boolean, Number, String],
    default: true,
  },
  size: {
    type: [String, Number],
    default: 2,
  },
})
let val = ref(props.modelValue)
watch(
  () => props.modelValue,
  (newValue) => {
    val.value = newValue
  },
)
let actualSize = computed(() => {
  return isNaN(props.size) ? props.size : parseInt(props.size) * 3 * 6 + 'px'
})

const input = ref(null)
function focusInput() {
  input.value.focus?.()
}
function blurInput() {
  input.value.blur?.()
}
</script>

<style>
.a-color-picker {
  background-color: v-bind(val);
  width: v-bind(actualSize);
  height: v-bind(actualSize);
}
.a-color-picker > input {
  width: 100%;
  height: 100%;
}
</style>
