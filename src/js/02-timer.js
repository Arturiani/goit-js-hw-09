import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
require("flatpickr/dist/themes/dark.css");
import { Notify } from 'notiflix/build/notiflix-notify-aio';


const inputDateRef = document.querySelector('#datetime-picker')
const startBtnRef = document.querySelector('[data-start]')
const daysRestRef = document.querySelector('[data-days]')
const hoursRestRef = document.querySelector('[data-hours]')
const minutesRestRef = document.querySelector('[data-minutes]')
const secondsRestRef = document.querySelector('[data-seconds]')

startBtnRef.disabled = true

let userDate = null

const date = new Date()
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] < date) {
            Notify.failure('Please choose a date in the future')
        }
        if (selectedDates[0] > date) {
            startBtnRef.disabled = false
            userDate = selectedDates[0].getTime()
        }
    },
};

flatpickr(inputDateRef, options)

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}


function addLeadingZero(value) {
    return String(value).padStart(2, '0')
}

const timer = {
    intervalId: null,
    isActive: false,
    timerStart() {
        if (this.isActive) {
            return
        }
        this.isActive = true
        this.intervalId = setInterval(() => {
            const currentTime = Date.now()
            const differenceTime = userDate - currentTime
            const { days, hours, minutes, seconds } = convertMs(differenceTime)
            daysRestRef.textContent = addLeadingZero(days)
            hoursRestRef.textContent = addLeadingZero(hours)
            minutesRestRef.textContent = addLeadingZero(minutes)
            secondsRestRef.textContent = addLeadingZero(seconds)
            if (userDate <= currentTime) {
                clearInterval(this.intervalId)
                daysRestRef.textContent = '00'
                hoursRestRef.textContent = '00'
                minutesRestRef.textContent = '00'
                secondsRestRef.textContent = '00'
            }
        }, 1000)
    }
}


startBtnRef.addEventListener('click', () => { timer.timerStart() })