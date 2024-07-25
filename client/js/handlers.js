import { getTodosBetweenDays, getTodosByName, getTodosToday, getTodosWeek } from "./api.js";
import { Storage } from "./storage.js";
import { displayToDoList, hideErrorMessage, hideLoadingMessage, showErrorMessage, showLoadingMessage } from "./ui.js";

/**
 * Обработчик события нажатия на кнопку "Только незавершённые"
 */
export function onUncompletedTodosCheckbox() {
  const checkbox = document.getElementById('is_uncompleted');
  const todos = Storage.getTodos();
  if (!checkbox.checked) {
    displayToDoList("todo-container", todos);
    return;
  }

  const uncompletedTodos = todos.filter((todo) => !todo.status);
  displayToDoList("todo-container", uncompletedTodos);
}

/**
 * Обработчик события нажатия на кнопку "Сегодня"
 */
export const onTodayTodosButtonClick = LoadingDataDecorator(
  async function (day) {
    try {
      const todos = await getTodosToday();
      Storage.setTodos(todos)
    } catch (e) {
      showErrorMessage(e.message);
    }
  }
)

/**
 * Обработчик события нажатия на кнопку "На неделю"
 */
export const onWeekTodosButtonClick = LoadingDataDecorator(
  async function () {
    try {
      const todos = await getTodosWeek();
      Storage.setTodos(todos)
    } catch (e) {
      showErrorMessage(e);
    }
  }
)

/**
 * Обработчки нажатия на кнопку сортировки
 */
export const onSortButtonClicked = LoadingDataDecorator(
  async function () {
    const todos = Storage.getTodos();
    const order = Storage.getSortingOrder();
  
    switch (order) {
      case "asc": {
        todos.sort((a, b) => new Date(a.date) - new Date(b.date))
        Storage.setSortingOrder("desc");
        break;
      }
      case "desc": {
        todos.sort((a, b) => new Date(b.date) - new Date(a.date))
        Storage.setSortingOrder(null);
      }
      default: {
        Storage.setSortingOrder("asc");
      }
    }
  
  
    displayToDoList("todo-container", todos);
  }
)

/**
 * Обработчик обновления содержимого поисковой строки
 */
export const onSearchbarUpdate = LoadingDataDecorator(
  async function () {
    const searchInput = document.getElementById("searchbar");
    const value = searchInput.value;
  
    try {
      const todosByName = await getTodosByName(value);
      Storage.setTodos(todosByName);
    } catch (e) {
      showErrorMessage(e);
    }
  }
)

/**
 * Обработчик обновления выбранной в календаре даты
 * @param {Date} day Новый выбранный день
 */
export const onPickedDateCalenadarUpdate = LoadingDataDecorator(
  async function (day) {
    const nextDay = new Date(day);
    nextDay.setDate(day.getDate() + 1);
    
    try {
      const todos = await getTodosBetweenDays(day, nextDay);
      Storage.setTodos(todos);
    } catch (e) {
      showErrorMessage(e);
    }
  }
)

/**
 * Обработчик обновления списка дел в соответствии с выбранным диапазоном
 * @param {Date} fromDate Левая граница диапазона дат
 * @param {Date} toDate Правая граница диапазона дат
 * @returns Список дел, параметр date которых лежит внутри данного диапазона
 */
export const onPickedDateRangeCalendarUpdate = LoadingDataDecorator(
  async function (fromDate, toDate) {
    try {
      const todos = await getTodosBetweenDays(fromDate, toDate);
      Storage.setTodos(todos);
    } catch (e) {
      showErrorMessage(e);
    }
  }
)

/**
 * Декоратор, который при выполнении функции выводит уведомление о загрузке даннных
 * @param {Function} func Функция, которую необходимо обернуть
 */
function LoadingDataDecorator(func) {
  return async function (...args){
    hideErrorMessage();
    showLoadingMessage();
    const result = await func.apply(this, args);
    hideLoadingMessage();
    return result;
  }
}