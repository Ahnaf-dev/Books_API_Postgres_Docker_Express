import express from 'express';
import {KEYS} from "./config/keys.js";
import {client} from './config/db.js'
const app = express();

app.get("/", (req, res) => {
  res.send("Api is running");
})

app.listen(KEYS.PORT, async () => {
  console.log(`Server running on Port ${KEYS.PORT}`);
  // console.log(`postgresql://${KEYS.DB_USER}:${KEYS.DB_PASSWORD}@${KEYS.DB_HOST}:${KEYS.DB_PORT}/${KEYS.DB_NAME}`)
  try {
    await client.connect();
    console.log('DB Connected')
  } catch(err) {
    console.log(err)
  }
})