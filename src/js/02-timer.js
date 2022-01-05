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


startBtn.disabled = true;
const timerId = null;
let changeDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    ///////////////////////////////////////
    // Актуальная дата из опшинс.//
    // console.log(options.defaultDate) ;

    ///////////////////////////////////////

    ///////////////////////////////////////
    // Выбранная ДАта
    changeDate = selectedDates[0];
    // console.log( "  changeDate  : " ,   changeDate);
    ///////////////////////////////////////

    ///////////////////////////////////////
    // кнопка не активна
    startBtn.disabled = true;
    ///////////////////////////////////////

    if (changeDate < options.defaultDate) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else startBtn.disabled = false;
  },
};

flatpickr(inputEl, options);

startBtn.addEventListener('click', startTimer);

function startTimer() {
  // console.log( dataEl);
  // console.log(newData);

  timerId = setInterval(() => {
    ///////////////////////////////////////////
    // выбранная дата в секундах
    console.log('chose date', changeDate.getTime()); // вывод выбранной даты
    ///////////////////////////////////////////

    ///////////////////////////////////////////
    // Актуальная дата в секундах
    const newData = Date.now();
    console.log('Activ date', newData); // вывод актуальной даты
    ///////////////////////////////////////////

    ///////////////////////////////////////////
    // разница двух дат в секундах
    const deltaTime = changeDate.getTime() - newData;
    console.log(deltaTime);
    ///////////////////////////////////////////
    // если 0 больше разницы во времени , очищаем таймер
    if (deltaTime < 0) {
     return clearInterval(timerId);
    }
    ///////////////////////////////////////////
    ///////////////////////////////////////////
// привязываем значение к текстовому контенту таймера 
    const convert = convertMs(deltaTime);
    dataDays.textContent = addLeadingZero(convert.days);
    dataHours.textContent = addLeadingZero(convert.hours);
    dataMinutes.textContent = addLeadingZero(convert.minutes);
    dataSeconds.textContent = addLeadingZero(convert.seconds);
  }, 1000);
///////////////////////////////////////////

///////////////////////////////////////////
  function addLeadingZero(value) {
    return String(value).padStart(2, '0');
  }
}
///////////////////////////////////////////
///////////////////////////////////////////
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
///////////////////////////////////////////
