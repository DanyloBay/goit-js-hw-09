import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('.form'),
  delay: document.querySelector('input[name="delay"]'),
  step: document.querySelector('input[name="step"]'),
  amount: document.querySelector('input[name="amount"]'),
  startBtn: document.querySelector('button'),
};

refs.startBtn.addEventListener('click', e => {
  e.preventDefault();
  const amount = refs.amount.value;
  const firstDelay = Number(refs.delay.value);
  const delaySteps = Number(refs.step.value);
  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, firstDelay + delaySteps * (i - 1))
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }

  refs.form.reset();
});

function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
  return promise;
}
