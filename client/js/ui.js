/**
 * Отображение списка задач в определённый html-элемент
 * @param {string} elementId Идентификатор элемента, в который помещается список
 * @param {any[]} todoList Массив объектов с информацией о задачах
 */
export function displayToDoList(elementId, todoList) {
  const element = $(`#${elementId}`);
  element.empty();

  todoList.forEach((todo) => {
    const item = createItem(todo);
    element.append(item);
  });  
}

/**
 * Создание div-контейнера с информацией о конкретной задаче
 * @param {any} todoData Информация о конкретной задаче
 * @returns html-элемент, заполненный информацией о переданной задаче
 */
function createItem(todoData) {
  const $todoDiv = $("<div>", {"class": "todo-block"})
    .click(function() {
      $("#modal-todo-name").text(todoData.name);
      $("#modal-todo-status").attr("src", todoData.status ? 'styles/images/completed_task.svg' : 'styles/images/uncompleted_task.svg');
      $("#modal-todo-datetime").text(formatDate(new Date(todoData.date)));
      $("#modal-todo-desc").text(todoData.fullDesc);
      $("#dialog").dialog("open");
    })
  const $todoText = $("<div>", {"class": "todo-text"})
    .append($("<b>").text(todoData.name))
    .append($("<p>").text(todoData.shortDesc))

  const $status = $('<img>', {
    src: todoData.status ? 'styles/images/completed_task.svg' : 'styles/images/uncompleted_task.svg',
    alt: 'status'
  });

  const $dateTime = $('<span>', { class: 'todo-datetime' }).text(formatDate(new Date(todoData.date)));

  $todoDiv.append($todoText).append($status).append($dateTime);
  return $todoDiv;
}

/**
 * Отображение уведомления о загрузке данных
 */
export function showLoadingMessage() {
  $("#loading-message").css({ display: 'block' });
}
/**
 * Скрытие уведомления о загрузке данных
 */
export function hideLoadingMessage() {
  $("#loading-message").css({ display: 'none' });
}

/**
 * Отображение уведомления об ошибке
 * @param {string} message Содержание ошибки
 */
export function showErrorMessage(message) {
  $("#error-message").css({ display: 'block' }).text(message);
}
/**
 * Скрытие уведомления об ошибке
 */
export function hideErrorMessage() {
  $("#error-message").css({ display: 'none' }).text("");
} 

/**
 * Форматирование даты в строку вида "dd.MM.uuuu HH:mm"
 * @param {Date} date Дата, которую необходимо отформматировать
 * @returns Строка вида "dd.MM.uuuu HH:mm"
 */
function formatDate(date) {
  const pad = (num) => num < 10 ? '0' + num : num;

  const day = pad(date.getDate());
  const month = pad(date.getMonth() + 1);
  const year = date.getFullYear();
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());

  return `${day}.${month}.${year} ${hours}:${minutes}`;
}