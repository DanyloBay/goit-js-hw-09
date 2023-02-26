// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

let timeId = null;

const refs = {
  timePicker: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  alert: document.querySelector('.alert'),
  dateOut: document.querySelector('.value[data-days]'),
  hourOut: document.querySelector('.value[data-hours]'),
  minutOut: document.querySelector('.value[data-minutes]'),
  secondOut: document.querySelector('.value[data-seconds]'),
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      showNotification();
    } else {
      startBtnDisabled(false);
    }
  },
};

flatpickr(refs.timePicker, options);

startBtnDisabled(true);

// Timer

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

refs.startBtn.addEventListener('click', () => {
  const timeoutId = setInterval(() => {
    const ms = new Date(refs.timePicker.value) - new Date();
    startBtnDisabled(true);
    if (ms >= 0) {
      let convertTimeObject = convertMs(ms);
      refs.dateOut.textContent = addLeadingZero(convertTimeObject.days);
      refs.hourOut.textContent = addLeadingZero(convertTimeObject.hours);
      refs.minutOut.textContent = addLeadingZero(convertTimeObject.minutes);
      refs.secondOut.textContent = addLeadingZero(convertTimeObject.seconds);
    } else {
      clearInterval(timeoutId);
    }
  }, 1000);
});

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);

  const hours = Math.floor((ms % day) / hour);

  const minutes = Math.floor(((ms % day) % hour) / minute);

  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// Button

function startBtnDisabled(bool) {
  refs.startBtn.disabled = bool;
}

// Alert

refs.alert.addEventListener('click', () => {
  hideNotification();
  clearTimeout(timeId);
});

function showNotification() {
  refs.alert.classList.remove('is-hidden');
  timeId = setTimeout(() => {
    hideNotification();
  }, 3000);
}

function hideNotification() {
  refs.alert.classList.add('is-hidden');
}
