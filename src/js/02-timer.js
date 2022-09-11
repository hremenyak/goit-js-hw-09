import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

// references
const refs = {
  datePicker: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

refs.startBtn.disabled = true;
let timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (options.defaultDate > selectedDates[0]) {
      Notify.failure('Please choose a date in the future');
      return;
    } else {
      refs.startBtn.disabled = false;
      refs.startBtn.addEventListener('click', onStartBtnClick);

      function onStartBtnClick() {
        refs.startBtn.disabled = true;

        timerId = setInterval(() => {
          const deltaTime = selectedDates[0] - new Date();
          if (deltaTime <= 0) {
            stopTimer();
            return;
          }

          const countdown = convertMs(deltaTime);
          const paddedTimeData = addLeadingZero(countdown);

          updateTime(paddedTimeData);
        }, 1000);
      }
    }
  },
};

const timePicker = flatpickr(refs.datePicker, options);

function stopTimer() {
  clearInterval(timerId);
  refs.startBtn.disabled = false;
}

function addLeadingZero({ days, hours, minutes, seconds }) {
  return {
    days: days.toString().padStart(2, '0'),
    hours: hours.toString().padStart(2, '0'),
    minutes: minutes.toString().padStart(2, '0'),
    seconds: seconds.toString().padStart(2, '0'),
  };
}

function updateTime({ days, hours, minutes, seconds }) {
  refs.days.textContent = days;
  refs.hours.textContent = hours;
  refs.minutes.textContent = minutes;
  refs.seconds.textContent = seconds;
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
9;
