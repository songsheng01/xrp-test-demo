import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

export const pool = new pg.Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Ensure the system_nfts table exists
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS system_nfts (
    id SERIAL PRIMARY KEY,
    NFTokenID TEXT UNIQUE NOT NULL,
    owner TEXT NOT NULL
  );
`;

pool.query(createTableQuery)
  .then(() => console.log("✅ Database initialized: system_nfts table ready"))
  .catch((err) => console.error("❌ Database initialization error:", err));
