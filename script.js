const timeDisplay = document.getElementById('timeDisplay');
const startButton = document.getElementById('startButton');
const pauseButton = document.getElementById('pauseButton');
const resetButton = document.getElementById('resetButton');
const lapButton = document.getElementById('lapButton');
const lapList = document.getElementById('lapList');

let startTime;
let elapsedTime = 0;
let timerInterval;

function formatTime(milliseconds) {
    const date = new Date(milliseconds);
    return date.toISOString().substr(11, 8);
}

function updateDisplay() {
    timeDisplay.textContent = formatTime(elapsedTime);
}

function startTimer() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
        elapsedTime = Date.now() - startTime;
        updateDisplay();
    }, 10);
}

function pauseTimer() {
    clearInterval(timerInterval);
}

function resetTimer() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    updateDisplay();
    lapList.innerHTML = '';
}

function lapTimer() {
    const lapTime = elapsedTime;
    const lapItem = document.createElement('li');
    lapItem.textContent = `Lap ${lapList.children.length + 1}: ${formatTime(lapTime)}`;
    lapList.prepend(lapItem);
}

startButton.addEventListener('click', () => {
    startTimer();
    startButton.disabled = true;
    pauseButton.disabled = false;
    resetButton.disabled = false;
    lapButton.disabled = false;
});

pauseButton.addEventListener('click', () => {
    pauseTimer();
    startButton.disabled = false;
    pauseButton.disabled = true;
});

resetButton.addEventListener('click', () => {
    resetTimer();
    startButton.disabled = false;
    pauseButton.disabled = true;
    lapButton.disabled = true;
});

lapButton.addEventListener('click', () => {
    lapTimer();
});
