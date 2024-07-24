import dotenv from 'dotenv'
import express from 'express'

dotenv.config();

const app = express();

const port = process.env['PORT'];
const serverUrl = process.env['SERVER_URL'];

app.get("/todos", async (_req, res) => {
  const serverResponse = await fetch(serverUrl);
  const data = await serverResponse.json();
  res.json(data);
})

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})