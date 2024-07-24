import { getAllTodos } from "./api.js";

document.addEventListener('DOMContentLoaded', () => {
  $(function() {
    $("#datepicker").datepicker({ inline: true });
  });

  $( function() {
    $("input[type='checkbox']").checkboxradio();
  });


  const todosList = document.getElementById("todos-list");
  getAllTodos()
    .then((res) => {
      res.forEach((todo) => {
        const li = document.createElement("li");
        li.textContent = todo.name;
        todosList.appendChild(li);
      });
    })
})

