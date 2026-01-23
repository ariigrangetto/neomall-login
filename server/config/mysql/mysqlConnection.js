import mysql from "mysql2/promise";
import "dotenv/config";

console.log({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

export const createDBConnection = async () => {
  return mysql.createConnection({
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  });
};
