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
export async function getTodayTodos() {
  const todayDate = new Date();
  todayDate.setHours(0, 0, 0, 0);
  
  const tommorowDate = new Date(todayDate);
  tommorowDate.setDate(todayDate.getDate() + 1);
  tommorowDate.setHours(0, 0, 0, 0)

  const response = await fetch(`${url}/date?from=${todayDate.getTime()}&to=${tommorowDate.getTime()}`);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Возникла ошибка во время получения объектов за текущий день: ${error.message || response.statusText}`);
  }

  return response.json();
}

export async function getTodosToday() {
  const today = new Date();
  
  const tommorow = new Date(today);
  tommorow.setDate(tommorow.getDate() + 1);

  return getTodosBetween(today, tommorow);
}

export async function getTodosWeek() {
  const today = new Date();

  const oneWeekLater = new Date(today)
  oneWeekLater.setDate(oneWeekLater.getDate() + 7);

  return getTodosBetween(today, oneWeekLater);
}

async function getTodosBetween(fromDate, toDate) {
  fromDate.setHours(0, 0, 0, 0);
  toDate.setHours(0, 0, 0, 0);

  const response = await fetch(`${url}/date?from=${fromDate.getTime()}&to=${toDate.getTime()}`)

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Возникла ошибка во время получения объектов за неделю: ${error.message || response.statusText}`);
  }

  return response.json(); 
}