import { connection } from "../model/mysql/connection.js";
import {
  validateLoginSchema,
  validateRegisterSchema,
} from "../schema/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const createAccessToken = (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, process.env.TOKEN_KEY, (error, token) => {
      if (error) reject;
      resolve(token);
    });
  });
};

export const register = async (req, res) => {
  const result = validateRegisterSchema(req.body);
  if (!result.success) {
    return res.status(400).json([{ message: result.error.message }]);
  }

  const { email, username, password } = result.data;

  try {
    const [rows] = await connection.query(
      `SELECT user_id FROM users WHERE email = ?`,
      [email]
    );

    if (rows.length > 0) {
      return res.status(400).json([{ message: "User already exists" }]);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await connection.query(
      `INSERT INTO users (email, username, password)
        VALUES (?, ?, ?)`,
      [email, username, hashedPassword]
    );

    const [userCreated] = await connection.query(
      `SELECT BIN_TO_UUID(user_id) AS userId, username, email, created_at
      FROM users`
    );

    const userId = userCreated[0].user_id;

    const token = await createAccessToken({ userId });
    res.cookie("token", token);

    return res.status(201).json(userCreated[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const result = validateLoginSchema(req.body);
  if (!result.success) {
    return res.status(400).json([{ message: result.error.message }]);
  }
  try {
    const { email, password } = result.data;
    const [rows] = await connection.query(
      `SELECT BIN_TO_UUID(user_id) AS userId, username, email, password FROM users WHERE email = ?`,
      [email]
    );

    if (rows.length < 0) {
      return res.status(400).json([{ message: "User not found" }]);
    }

    const isMatchPassword = await bcrypt.compare(password, rows[0].password);

    if (!isMatchPassword) {
      return res.status(400).json([{ message: "Incorrect password" }]);
    }

    const userId = rows[0].userId;

    console.log(userId);

    const token = await createAccessToken({ userId });
    res.cookie("token", token);

    const [response] = await connection.query(
      `SELECT BIN_TO_UUID(user_id) AS userId, username, email, created_at
        FROM users`
    );

    return res.status(201).json(response[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logout = async (req, res) => {
  res.cookie("token", "");
  return res.sendStatus(201);
};

export const profile = async (req, res) => {
  console.log(req.user.userId);
  const id = req.user.userId;
  try {
    const [foundUser] = await connection.query(
      `
            SELECT BIN_TO_UUID(user_id) AS userId, username, email, created_at
            FROM users
            WHERE user_id = UUID_TO_BIN(?)
            `,
      [id]
    );

    if (foundUser.length === 0) {
      return res.status(400).json([{ message: "user not found" }]);
    }

    return res.status(201).json(foundUser[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const verifyToken = async (req, res) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json([{ message: "Unauthorized" }]);
  }

  try {
    jwt.verify(token, process.env.TOKEN_KEY, async (error, decoded) => {
      if (error) return res.status(401).json([{ message: "Unauthorized" }]);

      const [foundUser] = await connection.query(
        `
        SELECT BIN_TO_UUID(user_id) AS userId, username, email, created_at
        FROM users
        WHERE user_id = UUID_TO_BIN(?)
        `,
        [decoded.userId]
      );

      return res.json(foundUser[0]);
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
