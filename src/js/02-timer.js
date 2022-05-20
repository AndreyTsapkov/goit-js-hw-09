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
    //Если дата из прошлого, выдаём алерт
    if (selectedDates[0].getTime() <= options.defaultDate.getTime()) {
      Notify.failure('Please choose a date in the future');
      return;
    }
    //Считаем дату и отдаём в объект
    timer.timerNumbers(selectedDates);
    //Включаем кнопку "Старт"
    refs.buttonStart.disabled = false;
  },
};

const refs = {
  inputDate: document.querySelector('#datetime-picker'),
  buttonStart: document.querySelector('[data-start]'),
  buttonStop: document.querySelector('[data-stop]'),
  spanDays: document.querySelector('[data-days]'),
  spanHours: document.querySelector('[data-hours]'),
  spanMinutes: document.querySelector('[data-minutes]'),
  spanSeconds: document.querySelector('[data-seconds]'),
};

class Timer {
  constructor() {
    this.countdownTime = 0;
    this.timerID = null;
  }
  //Обновление чисел таймера
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
  buttonStopStatus(status) {
    refs.buttonStop.disabled = status;
  }
  //Старт таймера, выключение кнопки "Старт" и выбора даты, включение кнопки "Стоп"
  startTimer() {
    this.timerID = setInterval(() => {
      if (this.countdownTime < 0) {
        return clearInterval(this.timerID);
      }
      this.updateCountdown(this.convertMs(this.countdownTime));
      this.countdownTime = this.countdownTime - 1000;
    }, 1000);
    this.buttonStartStatus(true);
    this.inputDateStatus(true);
    this.buttonStopStatus(false);
  }
  //Стопаем и очищаем таймер, включаем выбор даты, выключаем кнопку "Стоп"
  stopAndClearTimer() {
    clearInterval(this.timerID);
    this.updateCountdown(this.convertMs(0));
    this.inputDateStatus(false);
    this.buttonStopStatus(true);
  }
  //Функция рассчитывает, сколько считать таймеру :D
  timerNumbers(selectedDates) {
    const currentDate = Date.now();
    this.countdownTime = selectedDates[0].getTime() - currentDate;
  }

  convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = this.addLeadingZero(Math.floor(ms / day));
    // Remaining hours
    const hours = this.addLeadingZero(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = this.addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = this.addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

    return { days, hours, minutes, seconds };
  }

  // Функция добавляет 0 перед цифрой, если цифра одна
  addLeadingZero(value) {
    return String(value).padStart(2, '0');
  }
}
//Кнопка "Старт" не активна, пока не выбрана валидная дата
//Кнопка "Стоп" не активна, пока таймер не запустился
//Выбор даты активен, пока не стартанул таймер
refs.buttonStart.disabled = true;
refs.buttonStop.disabled = true;
refs.inputDate.disabled = false;
// Инициализация библиотеки с датами
flatpickr(refs.inputDate, options);

const timer = new Timer();

refs.buttonStart.addEventListener('click', () => timer.startTimer());
refs.buttonStop.addEventListener('click', () => timer.stopAndClearTimer());
