<template>
  <a-row
    cols="3 9"
    col-class="ov-visible  po-relative di-flex ai-center jc-center"
    align="stretch"
  >
    <template #0>
      <div
        style="width: 2px;"
        class="po-absolute he-min-100 background-grey"
      ></div>
      <a-div
        class="po-absolute di-flex ai-center ro-6 fs-3 fw-5 pa-3 bloom-1-dark-alpha-7"
        :light="`background-${color}-tint-6 text-${color}-shade-6 bloom-5-light`"
        :dark="`background-${color}-shade-6 text-${color}-tint-6 bloom-5-dark`"
      >
        <a-div
          :class="`background-${color}-tint-7`"
          class="ar-1 pa-2 di-flex ai-center jc-center ro-circle my-n9 mr-2 ml-n5 bloom-3-dark-alpha-5"
        >
          <slot name="icon">
            <a-icon :color="`${color}-shade-6`">
              {{ icon }}
            </a-icon>
          </slot>
        </a-div>
        <div class="te-truncate-nowrap">
          <slot name="label">{{ label }}</slot>
        </div>
      </a-div>
    </template>
    <template #1>
      <div class="py-4 wi-100 di-flex fl-column jc-center ai-start">
        <a-div
          class="pt-8 pa-4 ro-4 transition wi-100"
          :dark="`background-${color}-alpha-9-gradient-top`"
          :light="`background-${color}-alpha-9-gradient-top`"
        >
          <a-div class="fs-4 fw-5">
            <slot name="header">{{ header }}</slot>
          </a-div>
          <a-div
            class="fs-2 fw-2 mt-2"
            light="text-dark-tint-3"
            dark="text-light-shade-3"
          >
            <slot name="subHeader">{{ subHeader }}</slot>
          </a-div>
        </a-div>
      </div>
    </template>
  </a-row>
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
  label: {
    type: String,
    default: '',
  },
  header: {
    type: String,
    default: '',
  },
  subHeader: {
    type: String,
    default: '',
  },
})
</script>
<style lang="scss" scoped></style>
