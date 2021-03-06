import express from "express";
import { settings } from "../settings";

const APP_PORT = settings.APP_PORT;

const app = express()

app.use(express.json())

app.get('', (req, res) => {
  res.send('Hello World!')
})

app.listen(APP_PORT, () => {
  console.log(`Server is running on port ${APP_PORT}`)
})