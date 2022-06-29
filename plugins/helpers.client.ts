export default defineNuxtPlugin(() => {
  return {
    provide: {
      playStartAudio() {
        let startAudio = new Audio('./assets/startSound.mp3')
        startAudio.play()
      },
      playStopAudio() {
        let endAudio = new Audio('./assets/endSound.mp3')
        endAudio.play()
      },
    },
  }
})
