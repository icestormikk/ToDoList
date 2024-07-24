import { getAllTodos } from "./api.js";
import { onSortButtonClicked, onTodayTodosButtonClick, onUncompletedTodosCheckbox, onWeekTodosButtonClick } from "./handlers.js";
import { Storage } from "./storage.js";
import { displayToDoList } from "./ui.js";

document.addEventListener('DOMContentLoaded', () => {
  // Создаём календарь
  $(function() {
    $("#datepicker").datepicker({ inline: true });
  });

  // Создаём кнопку для выбора только незавершённых задач
  $(function() {
    $("input[type='checkbox']").checkboxradio();
  });

  // Запрашиваем все задачи и заносим их в хранилище
  getAllTodos().then((res) => Storage.setTodos(res));

  // Добавляем слушателя, который при обновлении списка задач выводит обновлённый список на экран
  Storage.addListener((todos) => {
    displayToDoList('todo-container', todos);
  });

  // Ставим текущую дату в нужное поле на интерфейсе
  $(".today-date").text(new Date().toISOString().split("T")[0]);

  // Ставим слушателей на различные элементы страницы
  document.getElementById("is_uncompleted").addEventListener('click', onUncompletedTodosCheckbox);
  document.getElementById("today-todos-button").addEventListener('click', onTodayTodosButtonClick);
  document.getElementById("week-todos-button").addEventListener('click', onWeekTodosButtonClick);
  document.getElementById("todo-sorting").addEventListener('click', onSortButtonClicked);
  
})

