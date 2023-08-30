import { client } from "../config/db.js";
import fs from "fs";

export async function generateTables() {
  const createAuthorTable = fs.readFileSync('./sql/author/createTable.sql').toString();
  await client.query(createAuthorTable);
}