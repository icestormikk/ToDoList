import { getAllTodos } from "./api.js";
import { 
  onPickedDateCalenadarUpdate, 
  onPickedDateRangeCalendarUpdate, 
  onSearchbarUpdate, 
  onSortButtonClicked, 
  onTodayTodosButtonClick, 
  onUncompletedTodosCheckbox, 
  onWeekTodosButtonClick 
} from "./handlers.js";
import { Storage } from "./storage.js";
import { displayToDoList, hideLoadingMessage, showErrorMessage, showLoadingMessage } from "./ui.js";

document.addEventListener('DOMContentLoaded', () => {
  let from = null, to = null;

  // Создаём календарь
  $("#datepicker").datepicker({
    inline: true,
    numberOfMonths: 1,
    onSelect: function(dateText, inst) {
      const date = $(this).datepicker('getDate');

      if (!from || to) {
          from = date;
          to = null;
      } else {
          if (date < from) {
            to = from;
            from = date;
          } else {
            to = date;
          }
      }

      // если выбран только один день
      if (from && !to) {
        onPickedDateCalenadarUpdate(from);
      }
      // если указан конец и начало диапазона
      if (from && to) {
        onPickedDateRangeCalendarUpdate(from, to);
      }
    },
    // стилизация ячеек, оказавшихся внутри промежутка 
    beforeShowDay: function(date) {
      if (!from || !to) {
        return [true, ""];
      }
      
      let cssClass = "";
      if (from && !to && date.getTime() === from.getTime()) {
          cssClass = "selected-start";
      } else if (to && date.getTime() === to.getTime()) {
          cssClass = "selected-end";
      } else if (from && to && date >= from && date <= to) {
          cssClass = "range";
      }
      return [true, cssClass];
    }
  });

  // Создаём кнопку для выбора только незавершённых задач
  $(function() {
    $("input[type='checkbox']").checkboxradio();
  });

  // Запрашиваем все задачи и заносим их в хранилище
  showLoadingMessage()
  getAllTodos()
    .then((res) => Storage.setTodos(res))
    .catch((err) => showErrorMessage(err))
    .finally(() => hideLoadingMessage());

  // Добавляем слушателя, который при обновлении списка задач выводит обновлённый список на экран
  Storage.addListener((todos) => {
    displayToDoList('todo-container', todos);
  });

  // Ставим текущую дату в нужное поле на интерфейсе
  $(".today-date").text(new Date().toISOString().split("T")[0]);

  // Создание и стилизация диалогового окна
  $("#dialog").dialog({
    autoOpen: false,
    modal: true,
    width: '400px',
    open: function() {
        $(".ui-widget-overlay").css({ background: 'rgba(0,0,0,0.8)', opacity: 0.5 });
        $(".ui-dialog-titlebar").hide();
        // Отключаем скролл окна при открытии
        $("body").css({ overflow: 'hidden' })
    },
    close: function () {
        // Включаем скролл окна при закрытии модального окна
        $("body").css({ overflow: '' })
    },
    buttons: {
      "Готово": function() {
          $(this).dialog("close");
      }
    }
  });

  // Ставим слушателей на различные элементы страницы
  document.getElementById("is_uncompleted").addEventListener('click', onUncompletedTodosCheckbox);
  document.getElementById("today-todos-button").addEventListener('click', onTodayTodosButtonClick);
  document.getElementById("week-todos-button").addEventListener('click', onWeekTodosButtonClick);
  document.getElementById("todo-sorting").addEventListener('click', onSortButtonClicked);
  document.getElementById("searchbar").addEventListener('change', onSearchbarUpdate)
})

