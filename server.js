import express from 'express';
import {KEYS} from "./config/keys.js";
import {client} from './config/db.js'
import { generateTables } from './sql/initTables.js';
import authorRoutes from './routes/authorRoutes.js';
import fs from "fs";
const app = express();


// routes
app.use("/api/authors", authorRoutes);

app.listen(KEYS.PORT, async () => {
  console.log(`Server running on Port ${KEYS.PORT}`);
  try {
    await client.connect();
    console.log('DB Connected')

    // iniate tables
    await generateTables();
   
  } catch(err) {
    console.log(err)
  }
})