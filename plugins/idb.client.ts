import { openDB } from 'idb'
let db
openDB('foke', 2, {
  upgrade(db) {
    db.createObjectStore('tasks', {
      keyPath: 'id',
      autoIncrement: true,
    })
    db.createObjectStore('sessions', {
      keyPath: 'id',
      autoIncrement: true,
    })
    db.createObjectStore('userData')
  },
}).then((database) => {
  db = database
})
export default defineNuxtPlugin(() => {
  return {
    provide: {
      async postUserData(content) {
        return new Promise(async (resolve, reject) => {
          db.put('userData', { ...content }, 'user')
            .then((res) => {
              resolve(content)
            })
            .catch((err) => {
              reject(err)
            })
        })
      },
      async getUserData() {
        return new Promise(async (resolve, reject) => {
          db.get('userData', 'user')
            .then((res: object) => {
              resolve(res)
            })
            .catch((err) => {
              reject(err)
            })
        })
      },

      async postTask(content) {
        return new Promise(async (resolve, reject) => {
          db.put('tasks', { ...content })
            .then((res) => {
              resolve({ ...content, ...{ id: res } })
            })
            .catch((err) => {
              reject(err)
            })
        })
      },
      async deleteTask(key) {
        return new Promise(async (resolve, reject) => {
          db.delete('tasks', key)
            .then((res) => {
              resolve(res)
            })
            .catch((err) => {
              reject(err)
            })
        })
      },
      async getTasks() {
        return new Promise(async (resolve, reject) => {
          db.getAll('tasks')
            .then((res: Array<object>) => {
              resolve(res)
            })
            .catch((err) => {
              reject(err)
            })
        })
      },

      async postSession(content) {
        return new Promise(async (resolve, reject) => {
          db.put('sessions', { ...content })
            .then((res) => {
              resolve({ ...content, ...{ id: res } })
            })
            .catch((err) => {
              reject(err)
            })
        })
      },
      async deleteSession(key) {
        return new Promise(async (resolve, reject) => {
          db.delete('sessions', key)
            .then((res) => {
              resolve(res)
            })
            .catch((err) => {
              reject(err)
            })
        })
      },
      async getSessions() {
        return new Promise(async (resolve, reject) => {
          db.getAll('sessions')
            .then((res: Array<object>) => {
              resolve(res)
            })
            .catch((err) => {
              reject(err)
            })
        })
      },
    },
  }
})
