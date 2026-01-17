// db.js
import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 3306, // Add port support
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 5, // Lower for serverless (was 10)
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
  connectTimeout: 60000, // 60 seconds timeout
  // Serverless-friendly settings
  maxIdle: 5,
  idleTimeout: 60000,
});

// Test connection only in development
if (process.env.NODE_ENV !== "production") {
  async function testConnection() {
    try {
      const connection = await pool.getConnection();
      console.log("✅ Database Connected Successfully!");
      connection.release();
    } catch (err) {
      console.error("❌ Connection failed:", err);
    }
  }
  testConnection();
}

export default pool;
