const startBtnRef = document.querySelector('[data-start]')
const stopBtnRef = document.querySelector('[data-stop]')
const bodyRef = document.querySelector('body')

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const bodyColor = () => {
    bodyRef.style.backgroundColor = getRandomHexColor()
}

stopBtnRef.disabled = true

const handleClickStart = () => {
    startBtnRef.disabled = true
    stopBtnRef.disabled = false
    colorInterval = setInterval(bodyColor, 1000)
}

function handleClickStop() {
    startBtnRef.disabled = false
    stopBtnRef.disabled = true
    clearInterval(colorInterval)
}


startBtnRef.addEventListener('click', handleClickStart)
stopBtnRef.addEventListener('click', handleClickStop)