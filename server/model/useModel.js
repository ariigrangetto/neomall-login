import { connection } from "../config/mysql/mysqlConnection.js";
import bcrypt from "bcrypt";

export class UserModel {
  static async register(email, username, password) {
    let userId;
    let userCreated;
    let response;
    const [rows] = await connection.query(
      `SELECT user_id FROM users WHERE email = ?`,
      [email],
    );

    if (rows.length === 0) {
      const hashedPassword = await bcrypt.hash(password, 10);

      await connection.query(
        `INSERT INTO users (email, username, password)
                    VALUES (?, ?, ?)`,
        [email, username, hashedPassword],
      );

      [userCreated] = await connection.query(
        `SELECT BIN_TO_UUID(user_id) AS userId, username, email, created_at
        FROM users
        WHERE email = (?)
        `,
        [email],
      );
      userId = userCreated[0].userId;

      [response] = await connection.query(
        `SELECT BIN_TO_UUID(user_id) AS userId, username, email, created_at
      FROM users WHERE user_id = UUID_TO_BIN(?)`,
        [userId],
      );
    }
    return { userId, userCreated, rows, response };
  }

  static async login(email, password) {
    let userId;
    let response;
    let [rows] = await connection.query(
      `SELECT BIN_TO_UUID(user_id) AS userId, username, email, password FROM users WHERE email = (?)`,
      [email],
    );

    const isMatchPassword = await bcrypt.compare(password, rows[0].password);

    if (rows.length > 0 && isMatchPassword) {
      userId = rows[0].userId;
      [response] = await connection.query(
        `SELECT BIN_TO_UUID(user_id) AS userId, username, email 
          FROM users WHERE user_id = UUID_TO_BIN(?)`,
        [userId],
      );
    }

    return { rows, isMatchPassword, userId, response };
  }

  static async profile(id) {
    const [foundUser] = await connection.query(
      `
            SELECT BIN_TO_UUID(user_id) AS userId, username, email, created_at
            FROM users
            WHERE user_id = UUID_TO_BIN(?)
            `,
      [id],
    );

    return foundUser;
  }

  static async verifyToken(userId) {
    const [foundUser] = await connection.query(
      `
        SELECT BIN_TO_UUID(user_id) AS userId, username, email, created_at
        FROM users
        WHERE user_id = UUID_TO_BIN(?)
        `,
      [userId],
    );

    return foundUser;
  }
}
