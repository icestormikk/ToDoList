import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'

dotenv.config();

const app = express();
app.use(cors())

const port = process.env['PORT'];
const serverUrl = process.env['SERVER_URL'];

/**
 * Получение списка всех задач
 */
app.get("/todos", async (_req, res) => {
  const serverResponse = await fetch(serverUrl);
  const data = await serverResponse.json();
  res.json(data);
})

/**
 * Получение списка всех задач в определённом диапазоне дат
 */
app.get("/todos/date", async (req, res) => {
  const from = req.query['from'];
  const to = req.query['to'];
  const status = req.query['status'];

  if (!from || !to) {
    throw new Error("Не заданы значения параметров from, to")
  }

  const serverResponse = await fetch(`${serverUrl}/date?from=${from}&to=${to}` + (status ? `&status=${status}` : ''))
  const data = await serverResponse.json();
  res.json(data);
})

/**
 * Получение списка дат, имеющих в своём названии определённую строку
 */
app.get("/todos/find", async (req, res) => {
  const q = req.query['q'] || '';

  console.log(`${serverUrl}/find?q=${q}`)
  const serverResponse = await fetch(`${serverUrl}/find?q=${q}`);
  const data = await serverResponse.json();
  res.json(data);
})

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})