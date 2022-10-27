import { Pool } from "pg";
import dotenv from "dotenv";
dotenv.config();

const { DB_HOST, DB_NAME, DB_USER, DB_PASSWORD } = process.env;
console.log({ DB_HOST, DB_NAME, DB_USER, DB_PASSWORD });
let DB;
try {
  DB = new Pool({
    host: DB_HOST,
    database: DB_NAME,
    user: DB_USER,
    password: DB_PASSWORD,
  });
  console.log("connection success");
} catch (error) {
  console.log("connection error");
}

export default DB;
