<template>
  <div class="oy-auto ox-hidden fl-grow-1">
    <a-row
      class="mt-2 md:mt-15 mx-5"
      cols="12 12 12"
      md="6 6 12"
      lg="4 4 8"
      gutter="4"
      justify="center"
    >
      <template #0>
        <div>
          <a-item icon="text-box-multiple" class="mb-3">
            <div class="fs-6 fw-6">
              Tasks
            </div>
          </a-item>

          <div v-for="t in orderedTasks" :key="`task_${t.id}`">
            <a-row
              :class="t.id === currentTask.id ? 'text-tertiary-tint-4' : ''"
              class="px-6"
              cols="6 4 2"
              col-class="te-truncate"
              gutter="3"
            >
              <template #0>{{ t.name }}</template>
              <template #1>
                <div class="di-flex jc-end">
                  {{ t.priority }}
                </div>
              </template>
              <template #2>
                <div class="di-flex jc-end">
                  <a-button
                    @click="editTask(t)"
                    template="text"
                    class="ar-1"
                    size="1"
                  >
                    <a-icon color="secondary-blend-2" size="2">pencil</a-icon>
                  </a-button>
                  <a-button
                    @click="removeTask(t)"
                    template="text"
                    class="ar-1"
                    size="1"
                  >
                    <a-icon color="tertiary-blend-1" size="2">delete</a-icon>
                  </a-button>
                </div>
              </template>
            </a-row>
          </div>
          <div class="te-center fw-1" v-if="!orderedTasks.length">
            Add your tasks with priorities
          </div>
          <div class="px-3">
            <transition name="grow-y">
              <a-card
                v-if="newTask || editingTask"
                class="grow-y-active"
                color="tertiary"
              >
                <div
                  class="ro-top-left-5 ro-bottom-right-5 bloom-2-black-blend-6 di-inline-block py-2 px-2 fs-6 fw-6 background-tertiary"
                >
                  {{ editingTask ? 'Edit task' : 'New task' }}
                </div>
                <div class="px-4 pb-4">
                  <a-row cols="12 12 12 12" md="12 12 6 6" gutter="4">
                    <template #0>
                      <a-input v-model="task.name" label="Task name"></a-input>
                    </template>
                    <template #1>
                      <a-slider
                        label="Priority"
                        :step="1"
                        :min="1"
                        :max="10"
                        v-model="task.priority"
                        color="tertiary"
                      >
                        {{ task.priority }}
                      </a-slider>
                    </template>
                    <template #2>
                      <a-button
                        @click="closeEditor"
                        class="wi-100"
                        size="1"
                        template="text"
                      >
                        <a-icon size="3" class="mr-1">close</a-icon>
                        Cancel
                      </a-button>
                    </template>
                    <template #3>
                      <a-button
                        @click="addTask(task, tasks)"
                        class="wi-100"
                        size="1"
                      >
                        <a-icon size="3" class="mr-1">
                          {{ editingTask ? 'pencil' : 'plus' }}
                        </a-icon>
                        {{ editingTask ? 'Update task' : 'Add task' }}
                      </a-button>
                    </template>
                  </a-row>
                </div>
              </a-card>
            </transition>
            <transition name="grow-y">
              <a-button
                v-if="!newTask && !editingTask"
                @click="newTask = true"
                class="wi-100 mt-3"
                size="1"
                rounded="3"
                template="glassy"
              >
                <a-icon size="2" class="mr-1">plus</a-icon>
                New task
              </a-button>
            </transition>
          </div>
        </div>
      </template>
      <template #1>
        <div class="row">
          <main-timer
            :task="currentTask.name"
            @start="startSession"
            @end="endSession"
            :times="times"
          ></main-timer>
        </div>
      </template>
      <template #2>
        <a-item icon="progress-check" class="elevated">
          <div class="fs-6 fw-6">
            Sessions
          </div>
        </a-item>
        <div v-for="session in groupedSessions" :key="`session_${session.id}`">
          <a-item>
            {{ session.name }}
            <template #end>
              {{ getSessionDuration(session.time) }}
            </template>
          </a-item>
        </div>
        <div class="te-center fw-1" v-if="!groupedSessions.length">
          Add a task to record your sessions
        </div>
      </template>
    </a-row>
  </div>
</template>
<script setup lang="ts">
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(duration)
dayjs.extend(relativeTime)
const {
  $postTask,
  $getTasks,
  $deleteTask,
  $postSession,
  $getSessions,
} = useNuxtApp()

let newTask = ref(false)
let editingTask = ref(false)
let times = ref({
  focus: 25,
  relax: 5,
})

let task = ref({
  name: '',
  priority: 1,
})

let tasks = ref([])
let sessions = ref([])

const orderedTasks = computed(() => {
  return tasks.value.sort((a, b) => b.priority - a.priority)
})
const groupedSessions = computed(() => {
  return sessions.value.reduce((acc, cur) => {
    let group = acc.find((item) => item.task_id === cur.task_id)
    if (group) {
      group.sessions += 1
      group.time += cur.time
    } else {
      group = { ...cur, ...{ sessions: 1 } }
      acc.push(group)
    }
    return acc
  }, [])
})

onMounted(() => {
  $getTasks().then((res: Array<object>) => {
    tasks.value = res
  })
  $getSessions().then((res: Array<object>) => {
    sessions.value = res
  })
})

function editTask(t) {
  task.value = t
  editingTask.value = true
}
function closeEditor() {
  newTask.value = false
  editingTask.value = false
  task.value = { name: '', priority: 1 }
}
function addTask(t, taskArray) {
  $postTask(t)
    .then((res) => {
      if (!editingTask.value) {
        taskArray.push(res)
      }
    })
    .finally(() => {
      closeEditor()
    })
}

function removeTask(t) {
  $deleteTask(t.id).then(() => {
    tasks.value.splice(
      tasks.value.findIndex((task) => task.id === t.id),
      1,
    )
  })
}

let currentTask = ref({
  id: null,
  name: '',
  priority: 1,
})
function startSession(type: string) {
  if (type === 'focus') {
    notify('Time to focus', `Started focusing on ${randomTask().name}`)
  } else {
    let session = {
      ...currentTask.value,
      ...{ task_id: currentTask.value.id, time: times.value.focus },
    }
    delete session.id
    $postSession(session).then((res) => {
      sessions.value.push(res)
    })
    notify('Relax a little', `Started session break`)
  }
}
function getSessionDuration(time: number) {
  return dayjs.duration(Math.floor(time), 'minutes').humanize()
}

function endSession(data = { type: 'focus', time: 0 }) {
  if (data.type === 'focus' && currentTask.value.id) {
    let session = {
      ...currentTask.value,
      ...{ task_id: currentTask.value.id, time: times.value.focus - data.time },
    }
    delete session.id
    $postSession(session).then((res) => {
      sessions.value.push(res)
    })
  }
}

let prioritySum = computed(() => {
  return tasks.value.reduce((acc, cur) => {
    acc += cur.priority
    return acc
  }, 0)
})
function randomTask() {
  const threshold = Math.random() * prioritySum.value
  let total = 0
  for (let i = 0; i < tasks.value.length; i++) {
    total += tasks.value[i].priority
    if (total >= threshold) {
      currentTask.value = tasks.value[i]
      return tasks.value[i]
    }
  }
  return currentTask.value
}

function notify(title, message) {
  if (window.Notification && Notification.permission === 'granted') {
    var n = new Notification(title, {
      body: message,
      renotify: true,
      silent: true,
      tag: 'FocusSessions',
    })
    /*     n.onshow = (event) => {
      console.log(event)
    } */
  } else if (window.Notification && Notification.permission !== 'denied') {
    Notification.requestPermission(function (status) {
      if (status === 'granted') {
        var n = new Notification(title, {
          body: message,
          renotify: true,
          silent: true,
          tag: 'FocusSessions',
        })
        /*  n.onshow = (event) => {
          console.log(event)
        } */
      }
    })
  }
}
</script>
