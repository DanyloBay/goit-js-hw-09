// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  timePicker: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  alert: document.querySelector('.alert'),
  dateOut: document.querySelector('.value[data-days]'),
  hourOut: document.querySelector('.value[data-hours]'),
  minutOut: document.querySelector('.value[data-minutes]'),
  secondOut: document.querySelector('.value[data-seconds]'),
};

const ALERT_DELAY = 3000;

const date = new Date();

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < date) {
      showNotification();
    } else {
      startBtnDisabled(false);
    }
  },
};

flatpickr(refs.timePicker, options);

startBtnDisabled(true);

// Timer

refs.startBtn.addEventListener('click', () => {
  const timeId = setInterval(() => {
    const ms = new Date(refs.timePicker.value) - date;
    startBtnDisabled(true);
    // ms -= 1000;
    if (ms >= 0) {
      let convertTimeObject = convertMs(ms);
      refs.dateOut.textContent = addLeadingZero(convertTimeObject.days);
      refs.hourOut.textContent = addLeadingZero(convertTimeObject.hours);
      refs.minutOut.textContent = addLeadingZero(convertTimeObject.minutes);
      refs.secondOut.textContent = addLeadingZero(convertTimeObject.seconds);
    } else {
      clearInterval(timeId);
    }
  }, 1000);
});

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

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
  timeId = setTimeout(hideNotification, ALERT_DELAY);
}

function hideNotification() {
  refs.alert.classList.add('is-hidden');
}
