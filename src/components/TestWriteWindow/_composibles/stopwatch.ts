import {computed, ref} from "vue";

const intervalId = ref(0)
const time = ref(1)

const timeInMinute = computed(() => {
    return time.value / 60
})


function startStopwatch() {
    intervalId.value = setInterval(() => {
        time.value++
    }, 1000)
}

function stopStopwatch() {
    clearInterval(intervalId.value)
    time.value = 0
}

export {
    // refs
    time,
    timeInMinute,

    // functions
    startStopwatch,
    stopStopwatch,
}
