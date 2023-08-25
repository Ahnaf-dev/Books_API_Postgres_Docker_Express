import pg from "pg";
// import {KEYS} from "./keys.js";
import dotenv from 'dotenv';
dotenv.config();
const {Client} = pg;

export const client = new Client({
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  host: 'localhost', // Change to your Docker host or container IP if needed
  port: 5432, // Default PostgreSQL port
  database: process.env.POSTGRES_DB,
});