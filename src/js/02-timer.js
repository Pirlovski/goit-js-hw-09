import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.2.min.css';

const inputEl = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');
// console.log(dataSeconds) ;
// let changeDate = null;
// console.log(dataEl) ;

startBtn.disabled = true;
const timerId = null;
let dataEl = null;
function changeDate(dataTime) {
  startBtn.disabled = true;
  const date = new Date();

  console.log(dataTime);
  if (date > dataTime) {
    Notiflix.Notify.failure('Please choose a date in the future');
  }

  startBtn.disabled = false;

  dataEl = dataTime.getTime();
  //  return dataEl;
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    changeDate(selectedDates[0]);
  },
};

flatpickr(inputEl, options);

startBtn.addEventListener('click', () => {
  // console.log( dataEl);
  // console.log(newData);

  timerId = setInterval(() => {
    const newData = new Date().getTime();
    const deltaTime = dataEl - newData;
    if (deltaTime < 0) {
      clearInterval(timerId);
    }
    const convert = convertMs(deltaTime);
    dataDays.textContent = addLeadingZero(convert.days);
    dataHours.textContent = addLeadingZero(convert.hours);
    dataMinutes.textContent = addLeadingZero(convert.minutes);
    dataSeconds.textContent = addLeadingZero(convert.seconds);
    //    console.log(deltaTime)
  }, 1000);

  function addLeadingZero(value) {
    return String(value).padStart(2, '0');
  }
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

console.log(convertMs(2000));
console.log(convertMs(140000));
console.log(convertMs(24140000));
