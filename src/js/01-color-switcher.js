const startEl = document.querySelector('[data-start]');
const stopEl = document.querySelector('[data-stop]');
const bodyEl = document.querySelector('body');
console.log(startEl);
console.log(stopEl);
console.dir(bodyEl);
timerId = null;

const getRandomHexColor = () => {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

const onActiveStartEl = () => {
  timerId = setInterval(() => {
    bodyEl.style.backgroundColor = getRandomHexColor();
  }, 1000);

  if ((startEl.disabled = true)) {
    stopEl.disabled = false;
  }
};

const onActiveStopEl = () => {
  clearInterval(timerId);
  if ((stopEl.disabled = true)) {
    startEl.disabled = false;
  }
};

startEl.addEventListener('click', onActiveStartEl);
stopEl.addEventListener('click', onActiveStopEl);
