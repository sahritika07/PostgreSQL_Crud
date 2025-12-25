import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

pool.on("connect", () => {
  console.log("PostgreSQL connected successfully");
});

pool.query("SELECT 1")
  .then(() => console.log("✅ DB test query successful"))
  .catch(err => console.error("❌ DB test failed", err));

export default pool;
