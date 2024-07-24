export function displayToDoList(elementId, todoList) {
  const element = $(`#${elementId}`);
  element.empty();

  todoList.forEach((todo) => {
    const item = createItem(todo);
    element.append(item);
  });  
}

function createItem(todoData) {
  const $todoDiv = $("<div>", {"class": "todo-block"})
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

function formatDate(date) {
  const pad = (num) => num < 10 ? '0' + num : num;

  const day = pad(date.getDate());
  const month = pad(date.getMonth() + 1);
  const year = date.getFullYear();
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());

  return `${day}.${month}.${year} ${hours}:${minutes}`;
}