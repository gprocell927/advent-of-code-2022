const startButton = document.querySelector('.start');
const settingsButton = document.querySelector('.settings')
const minutesInput = document.querySelector('.minutes > input[type=text]'  );
const secondsInput = document.querySelector('.seconds > input[type=text]');
const ring = document.querySelector('.ring');

let startTime = 0;
let timer = null;
let running = false;
let originalMinutes = 0;
let originalSeconds = 0;
let totalSeconds;


settingsButton.addEventListener('click', () => {
    if(running) {
        pauseTimer();
    }
    secondsInput.disabled = false;
    minutesInput.disabled = false;
})

const startTimer = () => {
    running = true
    startButton.innerText = 'Pause';
    startTime = Date.now();
    
    const secondsValue = parseInt(secondsInput.value);
    const minutesValue = parseInt(minutesInput.value);
    totalSeconds = secondsValue + minutesValue * 60;
    
    timer = setInterval(() => {
        const currentTime = Date.now();
        const diff = currentTime - startTime;
        const secondsLeft = totalSeconds - Math.floor(diff/1000);
        const minutesLeft = Math.floor(secondsLeft/60);
        secondsInput.value = padNumber(secondsLeft);
        minutesInput.value = padNumber(minutesLeft);
        
        if(secondsLeft === 0 && minutesLeft === 0) {
            finishTimer();
        }
    }, 1000)
}

const validateTimeInput = e => {
    let validatedInput = e.target.value.replace(/[^0-9]/g, '').substring(0,2);
    e.target.value = validatedInput;
}




const pauseTimer = () => {
    running = false;
    startButton.innerText = 'Start';
    clearInterval(timer);
}

startButton.addEventListener('click', () => {
    if(!running) {
        startTimer();
    } else if(running) {
        pauseTimer()
    }
})
const finishTimer = () => {
    clearInterval(timer);
    ring.classList.add('ending');
    
    setTimeout(() => {
        alert('Time is up!');
        resetTimer();
    },0)
}

const resetTimer = () => {
    clearInterval(timer);
    secondsInput.value = originalSeconds;
    minutesInput.value = originalMinutes;
    startButton.innerText = 'Start';
    ring.classList.remove('ending');
    running = false;
}

const padNumber = (number) => {
    if(number < 10) {
        return `0${number}`;
    }
    return number;
}

const setOriginalTime = () => {
    originalMinutes = padNumber(parseInt(minutesInput.value));
    originalSeconds = padNumber(parseInt(secondsInput.value));
}

minutesInput.addEventListener('keyup', validateTimeInput);
secondsInput.addEventListener('keyup', validateTimeInput);
setOriginalTime();
resetTimer();