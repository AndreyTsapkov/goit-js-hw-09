// Описан в документации
import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';

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
      window.alert('Please choose a date in the future');
      return;
    }
    refs.buttonStart.disabled = false;
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

//Кнопка "Старт" не активна, пока не выбрана валидная дата
refs.buttonStart.disabled = true;

flatpickr(refs.inputDate, options);

function addLeadingZero(value) {}
