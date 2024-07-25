const url = "http://localhost:3000/todos"

/**
 * Получение набора всех дел
 * @returns Список со всеми существующими делами
 */
export async function getAllTodos() {
  const response = await fetch(url);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Возникла ошибка во время получения объектов: ${error.message || response.statusText}`)
  }

  return response.json();
}

/**
 * Получение списка дел за сегодняшний день
 * @returns Список todo дел, которые в поле date имеют дату, равнюю сегоднящнему дню
 */
export async function getTodosToday() {
  const today = new Date();
  
  const tommorow = new Date(today);
  tommorow.setDate(tommorow.getDate() + 1);

  return getTodosBetweenDays(today, tommorow);
}

/**
 * Получение списка дел на текущую неделю
 * @returns Список todo дел, которые в поле data имеют даты, входящую в текущую неделю
 */
export async function getTodosWeek() {
  const today = new Date();

  const oneWeekLater = new Date(today)
  oneWeekLater.setDate(oneWeekLater.getDate() + 7);

  return getTodosBetweenDays(today, oneWeekLater);
}

/**
 * Получение списка дел по их названию или по его части
 * @param {string} name Полное название предмета или его часть
 * @returns Список дел, название которых полностью или частично совпадает с вводом
 */
export async function getTodosByName(name) {
  const response = await fetch(`${url}/find?q=${name}`)
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Возникла ошибка во время получения объектов по содержимому: ${error.message || response.statusText}`)
  }

  return response.json(); 
}

/**
 * Получение списка дел в определённый промежуток дней
 * @param {Date} fromDate День, начиная с которого необходимо найти задания
 * @param {Date} toDate День, по который надо найти задания
 * @returns Все todo, у которых поле date попадает в заданный промежуток
 */
export async function getTodosBetweenDays(fromDate, toDate) {
  fromDate.setHours(0, 0, 0, 0);
  toDate.setHours(0, 0, 0, 0);

  const response = await fetch(`${url}/date?from=${fromDate.getTime()}&to=${toDate.getTime()}`);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Возникла ошибка во время получения объектов за неделю: ${error.message || response.statusText}`);
  }

  return response.json(); 
}