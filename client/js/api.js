const url = "https://localhost:3000/todos"

export async function getAllTodos() {
  const response = await fetch(url, { mode: 'no-cors' });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Получение списка дел завершилось неудачно: ${error.message || response.statusText}`)
  }

  return response.json();
}