import {computed, ref} from "vue";

const isStopWatchStart = ref(false)
const intervalId = ref(0)
const time = ref(1)

const timeInMinute = computed(() => {
    return time.value / 60
})


function startStopwatch() {
    if (isStopWatchStart.value) return

    intervalId.value = setInterval(() => {
        time.value++
    }, 1000)

    isStopWatchStart.value = true
}

function stopStopwatch() {
    clearInterval(intervalId.value)
    isStopWatchStart.value = false
}

function restartStopwatch() {
    stopStopwatch()
    time.value = 1
    startStopwatch()
}

export {
    // refs
    time,
    timeInMinute,

    // functions
    startStopwatch,
    stopStopwatch,
    restartStopwatch
}
