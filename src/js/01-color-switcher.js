const refs = {
  buttonStart: document.querySelector('[data-start]'),
  buttonStop: document.querySelector('[data-stop]'),
};

//Пока не включилась генерация цветов, кнопка "Стоп" неактивна
refs.buttonStop.disabled = true;

//Включаем/выключаем генерацию цветов фона body по клику
refs.buttonStart.addEventListener('click', onBodyChangeBackgroundColor);
refs.buttonStop.addEventListener('click', onBodyStopChangeBackgroundColor);

//Функция установки цвета на фон body с интервалом в секунду.
//Выключение активности кнопки "Старт" и включение активности кнопки "Стоп".
function onBodyChangeBackgroundColor() {
  timerID = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  refs.buttonStart.disabled = true;
  refs.buttonStop.disabled = false;
}

//Остановка установки цветов на фон body. Включение активности кнопки "Старт"
//и выключение активности кнопки "Стоп".
function onBodyStopChangeBackgroundColor() {
  clearInterval(timerID);
  refs.buttonStart.disabled = false;
  refs.buttonStop.disabled = true;
}

//Функция генерации случайного цвета
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
