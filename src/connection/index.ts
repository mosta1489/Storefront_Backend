import { Pool } from "pg";
import dotenv from "dotenv";
dotenv.config();

const { DB_HOST, DB_NAME, TEST_DB_NAME, DB_USER, DB_PASSWORD, ENV } =
  process.env;

let databaseName = DB_NAME;

if (ENV !== "dev") {
  databaseName = TEST_DB_NAME;
}

let DB: Pool;
try {
  DB = new Pool({
    host: DB_HOST,
    database: databaseName,
    user: DB_USER,
    password: DB_PASSWORD,
  });
  console.log("connection success");
} catch (error) {
  console.log("connection error");
}

export default DB;
