/**
 * Централизованное хранилище данных приложения
 */
export class Storage {
  // Функции, которые срабатывают при изменении набора задач
  static listeners = []

  static todos = [] 
  static sortingOrder = "asc";

  static getTodos() {
    return this.todos;
  }
  static getSortingOrder() {
    return this.sortingOrder;
  }

  static setTodos(todos) {
    this.todos = todos;
    this.notityAll();
  }
  static setSortingOrder(order) {
    this.sortingOrder = order;
  }

  static addListener(func) {
    this.listeners.push(func);
  }

  static notityAll() {
    for (const listener of this.listeners) {
      listener(this.todos);
    }
  }
}