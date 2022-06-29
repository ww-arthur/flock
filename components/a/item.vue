<template>
  <NuxtLink
    :to="toRoute.href"
    class="item transition po-relative ov-hidden row ai-center jc-center md:px-2 py-3 fl-wrap ro-2"
    :class="`${
      isActive
        ? 'background-tertiary-shade-5 background-tertiary-gradient-left'
        : ''
    }`"
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
  </NuxtLink>
</template>
<script setup>
const props = defineProps({
  color: {
    type: String,
    default: 'white',
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

  text: {
    type: String,
    default: '',
  },
  to: {
    type: [String, Object],
    defaul: '',
  },
  active: {
    type: Boolean,
    default: false,
  },
})
const route = useRoute()
const router = useRouter()
let toRoute = computed(() => {
  return props.to ? router.resolve(props.to) : {}
})
let tag = computed(() => {
  return props.to ? 'nuxt-link' : 'div'
})
let isActive = computed(() => {
  return props.active || toRoute.value.name === route.name
})

let iconAttrs = computed(() => ({
  size: props.iconSize,
  color: props.color,
}))
</script>
