import { Notify } from 'notiflix/build/notiflix-notify-aio';

const delayInputRef = document.querySelector('[name=delay]')
const stepInputRef = document.querySelector('[name=step]')
const amountInputRef = document.querySelector('[name=amount]')
const formRef = document.querySelector('form')


function createPromise(position, delay) {
    const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
        return new Promise((resolve) => {
            setTimeout(() => {
                Notify.success(`Fulfilled promise ${position} in ${delay}ms`)
                resolve({ position, delay })
            }, delay);
        })
    } else {
        return new Promise((reject) => {
            setTimeout(() => {
                Notify.failure(`Rejected promise ${position} in ${delay}ms`)
                reject({ position, delay })
            }, delay);
        })
    }
}



function createPromises(amount, delay, step) {
    for (let i = 0; i < amount; i++) {
        const fullDelay = delay + step * i
        const position = i + 1;
        createPromise(position, fullDelay)
    }
}


formRef.addEventListener("submit", e => {
    e.preventDefault()
    createPromises(+amountInputRef.value, +delayInputRef.value, +stepInputRef.value)
})