import { getTodosToday, getTodosWeek } from "./api.js";
import { Storage } from "./storage.js";
import { displayToDoList } from "./ui.js";

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
export async function onTodayTodosButtonClick() {
  try {
    const todos = await getTodosToday();
    Storage.setTodos(todos);
  } catch (e) {
    console.error(e);
  }
}

/**
 * Обработчик события нажатия на кнопку "На неделю"
 */
export async function onWeekTodosButtonClick() {
  try {
    const todos = await getTodosWeek();
    Storage.setTodos(todos)
  } catch (e) {
    console.error(e)
  }
}

/**
 * Обработчки нажатия на кнопку сортировки
 */
export function onSortButtonClicked() {
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

export function onSearchbarUpdate() {
  const searchInput = document.getElementById("searchbar");
  // TODO
}