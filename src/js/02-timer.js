// Описан в документации
import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';
// Библиотека алертов, варнингов и так далее
import { Notify } from 'notiflix/build/notiflix-notify-aio';

//--------------Опции для flatpickr---------------------
//-enableTime - включает возможность выбора времени
//-time_24hr - устанавливает 24-х часовой формат
//-defaultDate - устанавливает начальную выбранную дату(берёт текущую на компе)
//-minuteIncrement - регулирует шаг ввода минут(включая прокрутку)
//-onClose() - срабатывает каждый раз, когда закрывается календарь.
//Обработку даты, введённой пользователем, сувать сюда^
//-selectedDates - массив выбранных дат, брать [0] элемент
//(последнее нифига непонятно, но работает, а значит не трогаем)
//UPD: Выбранную дату функция зачем-то пихает в массив.
// Она там всегда одна, последняя введённая. Зачем так сделано - хз, мож
// позже пойму. Поиск по исходникам нихрена не дал, спросить ментора?

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    // console.log(selectedDates);
    if (selectedDates[0].getTime() <= options.defaultDate.getTime()) {
      Notify.failure('Please choose a date in the future');
      return;
    }
    timerNumbers(selectedDates);
    refs.buttonStart.disabled = false;
    userSelectedDateMs = selectedDates[0].getTime();
  },
};

const refs = {
  inputDate: document.querySelector('#datetime-picker'),
  buttonStart: document.querySelector('[data-start]'),
  timer: document.querySelector('.timer'),
  spanDays: document.querySelector('[data-days]'),
  spanHours: document.querySelector('[data-hours]'),
  spanMinutes: document.querySelector('[data-minutes]'),
  spanSeconds: document.querySelector('[data-seconds]'),
};
//Дата, выбранная пользователем, в милисекундах с 01.01.1970
let userSelectedDateMs = 0;

//Кнопка "Старт" не активна, пока не выбрана валидная дата
//Выбор даты активен, пока не стартанул таймер
refs.buttonStart.disabled = true;
refs.inputDate.disabled = false;
let blue;
let brown;
flatpickr(refs.inputDate, options);

class Timer {
  constructor({ updateCountdown, buttonStartStatus, inputDateStatus }) {
    this.countdownTime = 0;
    this.timerID = 0;
    this.updateCountdown = updateCountdown;
    this.buttonStart = buttonStartStatus;
    this.inputDate = inputDateStatus;
  }

  updateCountdown({ days, hours, minutes, seconds }) {
    refs.spanDays.textContent = days;
    refs.spanHours.textContent = hours;
    refs.spanMinutes.textContent = minutes;
    refs.spanSeconds.textContent = seconds;
  }

  buttonStartStatus(status) {
    refs.buttonStart.disabled = status;
  }
  inputDateStatus(status) {
    refs.inputDate.disabled = status;
  }
}

refs.buttonStart.addEventListener('click', startTimer);

function timerNumbers(selectedDates) {
  const currentDate = Date.now();
  blue = selectedDates[0].getTime() - currentDate;
}

function startTimer() {
  let value = 0;
  setInterval(() => {
    brown = convertMs(blue);
    updateCountdown(brown);
    blue = blue - 1000;
  }, 1000);
}
// Функция добавляет 0 перед цифрой, если цифра одна
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}
