export default defineNuxtPlugin(() => {
  return {
    provide: {
      playStartAudio() {
        let startAudio = new Audio('/startSound.mp3')
        startAudio.play()
      },
      playStopAudio() {
        let endAudio = new Audio('/endSound.mp3')
        endAudio.play()
      },
    },
  }
})
