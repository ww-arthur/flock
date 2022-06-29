<template>
  <div class="a-slider-wrapper">
    <slot name="label">
      <div class="mr-6">
        {{ label }}
      </div>
    </slot>

    <div
      @pointerdown="teleportSlider"
      class="a-slider"
      :class="`text-${color}-shade-5`"
    >
      <div
        class="a-slider-range background-tertiary py-1 ro-5"
        :style="` flex-basis: ${val.toFixed(2)}%; width: ${val.toFixed(2)}%`"
      ></div>
      <div
        class="a-slider-range fl-grow-1 py-1 ro-5 background-tertiary-tone-9"
      ></div>
      <div
        @pointerdown.stop="beginSliding"
        @pointerup="stopSliding"
        :style="`left: ${val}%`"
        class="thumb-wrapper pa-3"
        :class="`ro-pill ar-1 background-tertiary-blend-10 background-tertiary-blend-8:hover`"
      >
        <div
          class="thumb transition"
          :class="`background-tertiary-tint-8 background-tertiary-tint-4-gradient-bottom-right bloom-4-black-blend-6 ro-5 px-3 fs-3 fw-6 di-flex ai-center`"
        >
          <slot></slot>
        </div>
      </div>
    </div>
    <slot name="end"></slot>
  </div>
</template>
<script setup lang="ts">
const emit = defineEmits(['update:modelValue'])

const sliderProps = defineProps({
  modelValue: {
    type: [Number, String],
    default: 0,
  },
  min: {
    type: [Number, String],
    default: 0,
  },
  max: {
    type: [String, Number],
    default: 100,
  },
  step: {
    type: [String, Number],
    default: 1,
  },
  color: {
    type: String,
    default: 'tertiary',
  },
  label: {
    type: String,
    default: '',
  },

  loading: {
    type: [Boolean, Number, String],
    default: true,
  },
})

function beginSliding(event) {
  let slider = event.target
  let rect = event.target.parentElement.getBoundingClientRect()
  slider.onpointermove = (event) => updateModelValue(event, rect)
  slider.setPointerCapture(event.pointerId)
}
function teleportSlider(event) {
  let slider = event.target.lastChild
  let rect = event.target.getBoundingClientRect()
  updateModelValue(event, rect)
  slider.onpointermove = (event) => updateModelValue(event, rect)
  slider.setPointerCapture(event.pointerId)
}
function stopSliding(event) {
  let slider = event.target
  slider.onpointermove = null
  slider.releasePointerCapture(event.pointerId)
}

let val = ref(valueToPercentage(sliderProps.modelValue))
watch(
  () => sliderProps.modelValue,
  (newValue) => {
    val.value = valueToPercentage(newValue)
  },
)

let ticking = false
function updateModelValue(event, rect) {
  if (ticking) return
  requestAnimationFrame(() => {
    let position = (event.clientX - rect.left) / rect.width
    if (position <= 0) {
      val.value = 0
      val.value !== sliderProps.modelValue &&
        emit('update:modelValue', sliderProps.min)
    } else if (position >= 1) {
      val.value = 100
      val.value !== sliderProps.modelValue &&
        emit('update:modelValue', sliderProps.max)
    } else {
      val.value =
        roundToStep(
          position,
          (sliderProps.step as number) /
            ((sliderProps.max as number) - (sliderProps.min as number)),
        ) * 100
      emit('update:modelValue', percentageToValue(val.value))
    }
    ticking = false
  })
  ticking = true
}
function valueToPercentage(value) {
  return (
    ((value - parseInt(sliderProps.min as string)) /
      (parseInt(sliderProps.max as string) -
        parseInt(sliderProps.min as string))) *
    100
  )
}
function percentageToValue(percentage) {
  return roundToStep(
    (parseInt(sliderProps.max as string) -
      parseInt(sliderProps.min as string)) *
      (percentage * 0.01) +
      parseInt(sliderProps.min as string),
    sliderProps.step as number,
  )
}
function roundToStep(number: number, mult: number) {
  return Math.round(number / mult) * mult
}
</script>
<style>
.a-slider-wrapper {
  display: flex;
}
.a-slider-range {
  pointer-events: none;
  user-select: none;
  touch-action: none;
}
.a-slider {
  position: relative;
  display: flex;
  flex-grow: 1;
  align-items: center;
  overflow: visible;
}
.thumb-wrapper {
  user-select: none;
  position: absolute;
  touch-action: none;
  transition: transform, background-color 0.3s ease-out;
  transform: translateX(-50%);
  display: flex;
  align-items: stretch;
  justify-content: stretch;
}
.thumb-wrapper:active > .thumb {
  transform: scale(1.5);
}
.thumb {
  pointer-events: none;
  transform: scale(1);
}
</style>
