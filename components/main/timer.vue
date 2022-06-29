<template>
  <div
    class="col-12 background-black-tint-3 bloom-2-black-blend-8 elevated ro-5 di-flex fl-column jc-center ov-hidden"
  >
    <div class="di-flex ai-center">
      <div
        v-if="type !== 'relax'"
        class="ro-top-left-5 ro-bottom-right-5 bloom-2-black-blend-8 di-inline-block fl-shrink-1 pa-3 fs-6 fw-6 background-primary elevated"
      >
        Focus Session
      </div>
      <div
        v-else
        class="ro-top-left-5 ro-bottom-right-5 bloom-2-black-blend-8 di-inline-block fl-shrink-1 pa-3 fs-6 fw-6 background-black-blend-6 elevated"
      >
        Take a Break
      </div>
      <div
        class="ml-4 fs-6 fw-3"
        v-if="type === 'focus' && state === 'in_progress'"
      >
        {{ task }}
      </div>
    </div>
    <a-row
      cols="12 12 12 12"
      md="12 4 4 4"
      gutter="2"
      col-class="di-flex jc-center ai-center"
      class="jc-center ai-center pa-5"
    >
      <template #0>
        <div class="fl-grow-1 te-center fs-9">
          {{ time.format('mm:ss') }}
        </div>
      </template>
      <template #1>
        <a-button class="fl-grow-1" @click="stopTimer()" template="text">
          <a-icon>stop</a-icon>
        </a-button>
      </template>
      <template #2>
        <a-button
          v-if="type === 'relax'"
          @click="skipBreak()"
          class="fl-grow-1"
        >
          <a-icon>fast-forward</a-icon>
        </a-button>
      </template>
      <template #3>
        <a-button
          v-if="state === 'stopped'"
          @click="startTimer(true)"
          class="fl-grow-1"
        >
          <a-icon>play</a-icon>
        </a-button>
        <a-button
          v-else
          class="fl-grow-1"
          @click="pauseTimer()"
          template="glassy"
        >
          <a-icon :icon="state === 'paused' ? 'play' : 'pause'"></a-icon>
        </a-button>
      </template>
    </a-row>
  </div>
</template>
<script setup lang="ts">
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
const {
  $playStartAudio,
  $playStopAudio,
  $getUserData,
  $postUserData,
} = useNuxtApp()
const emit = defineEmits(['update:modelValue', 'start', 'end'])
interface UserData {
  accBreaks: 0
}
let userData = ref({
  accBreaks: 0,
})
onMounted(() => {
  $getUserData().then((res: UserData) => {
    userData.value = res || userData.value
  })
})

const props = defineProps({
  times: {
    type: Object,
    default: () => ({
      focus: 25,
      relax: 5,
    }),
  },
  task: {
    type: String,
    default: '',
  },
})
let state = ref('stopped')
dayjs.extend(duration)
let type = ref('focus')
let time = ref(dayjs.duration(props.times[type.value], 'minutes'))
function stopTimer() {
  state.value = 'stopped'
  emit('end', { type: type.value, time: time.value.asMinutes() })
  time.value = dayjs.duration(props.times[type.value], 'minutes')
}
function skipBreak() {
  userData.value.accBreaks = userData.value.accBreaks + time.value.asMinutes()

  $postUserData(userData.value)
  type.value = 'focus'
  state.value = 'stopped'
  startTimer(true)
}
function pauseTimer() {
  if (state.value === 'paused') {
    startTimer()
  } else {
    state.value = 'paused'
  }
}
function configSession(type) {
  let timers = {
    focus: $playStartAudio,
    relax: $playStopAudio,
  }
  timers[type]()
  let time = 0
  if (type === 'focus') {
    time = props.times[type]
  } else {
    time = userData.value.accBreaks + props.times[type]
    userData.value.accBreaks = 0
  }

  return time
}
let currentTimeout: NodeJS.Timeout
function startTimer(userInput = false) {
  if (state.value === 'in_progress') return
  clearTimeout(currentTimeout)
  if (userInput) {
    time.value = dayjs.duration(configSession(type.value), 'minutes')
  }
  if (state.value !== 'paused') {
    emit('start', type.value)
  }
  state.value = 'in_progress'
  let start = document.timeline.currentTime
  function frame(currentTime: number, skip = false) {
    if (state.value !== 'in_progress') return
    const elapsed = currentTime - start
    const seconds = Math.round(elapsed / 1000)
    if (!skip) {
      time.value = time.value.subtract(1, 'seconds')
    }
    const targetNext = (seconds + 1) * 1000 + start
    if (time.value.asSeconds() > 0) {
      currentTimeout = setTimeout(
        () => frame(performance.now()),
        targetNext - performance.now(),
      )
    } else {
      type.value = type.value === 'relax' ? 'focus' : 'relax'
      state.value = 'stopped'
      startTimer(true)
      // time.value = dayjs.duration(configSession(type.value), 'minutes')
    }
  }

  frame(start, true)
}
</script>
