// Библиотека алертов, варнингов и так далее
import { Notify } from 'notiflix/build/notiflix-notify-aio';

// const refs = {
//   formRef: document.querySelector('.form'),
//   // inputDelay: document.getElementsByName('delay'),
//   // inputStep: document.getElementsByName('step'),
//   // inputAmount: document.getElementsByName('amount'),
// };

// refs.formRef.addEventListener('submit', handleCreatePromises);
// //Почему промисы не работают через getElements?
// function handleCreatePromises(event) {
//   event.preventDefault();
//   // console.log(refs.inputAmount);
//   const inputAmountValue = +event.target.elements.amount.value;
//   let inputDelayValue = +event.target.elements.delay.value;
//   const inputStepValue = +event.target.elements.step.value;
//   let promiseCounter = 1;
//   const timerID = setInterval(() => {
//     createPromise(promiseCounter, inputDelayValue)
//       .then(({ position, delay }) => {
//         Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
//       })
//       .catch(({ position, delay }) => {
//         Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
//       });
//     if (promiseCounter === inputAmountValue) {
//       return clearInterval(timerID);
//     }
//     promiseCounter += 1;
//     inputDelayValue += inputStepValue;
//   }, inputDelayValue);
//   event.currentTarget.reset();
// }

// function createPromise(position, delay) {
//   const shouldResolve = Math.random() > 0.3;
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       if (shouldResolve) {
//         resolve({ position, delay }); // Fulfill
//       } else {
//         reject({ position, delay }); // Reject
//       }
//     }, delay);
//   });
// }

const refs = {
  formRef: document.querySelector('.form'),
  inputDelay: document.querySelector('[name="delay"]'),
  inputStep: document.querySelector('[name="step"]'),
  inputAmount: document.querySelector('[name="amount"]'),
};

function handleSubmitForm(event) {
  event.preventDefault();
  let delayAmount = +refs.inputDelay.value;
  const stepDelay = +refs.inputStep.value;

  for (let i = 1; i <= +refs.inputAmount.value; i++) {
    createPromise(i, delayAmount)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delayAmount += stepDelay;
  }
  event.currentTarget.reset();
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
        // Fulfill
      } else {
        reject({ position, delay });
        // Reject
      }
    }, delay);
  });
}

refs.formRef.addEventListener('submit', handleSubmitForm);
