const refs = {
  buttonStart: document.querySelector('[data-start]'),
  buttonStop: document.querySelector('[data-stop]'),
};
refs.buttonStop.disabled = true;
refs.buttonStart.addEventListener('click', onBodyChangeBackgroundColor);
refs.buttonStop.addEventListener('click', onBodyStopChangeBackgroundColor);

function onBodyChangeBackgroundColor() {
  timerID = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  refs.buttonStart.disabled = true;
  refs.buttonStop.disabled = false;
}

function onBodyStopChangeBackgroundColor() {
  clearInterval(timerID);
  refs.buttonStart.disabled = false;
  refs.buttonStop.disabled = true;
}
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
