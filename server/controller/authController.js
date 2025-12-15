import {
  validateLoginSchema,
  validateRegisterSchema,
} from "../schema/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../model/mongoose/userModel.js";

function createAccessToken(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, process.env.TOKEN_KEY, (error, token) => {
      if (error) reject(error);
      resolve(token);
    });
  });
}

export async function register(req, res) {
  const result = validateRegisterSchema(req.body);
  if (!result.success)
    return res.status(400).json([{ message: result.error.message }]);

  const { email, password, username } = result.data;

  try {
    const findUser = await User.findOne({ email });
    if (findUser) {
      return res.status(400).json([{ message: "User already exists" }]);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const userSave = await newUser.save();

    const token = await createAccessToken({ id: userSave._id });
    res.cookie("token", token);

    res.json({
      id: userSave._id,
      email: userSave.email,
      username: userSave.username,
      createdAt: userSave.createdAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function login(req, res) {
  const result = validateLoginSchema(req.body);
  if (!result.success) return res.status(400).json(JSON.parse(result.error));

  try {
    const { email, password } = result.data;
    const findUser = await User.findOne({ email });
    if (!findUser) return res.status(400).json([{ message: "user not found" }]);

    const isMatchPassword = await bcrypt.compare(password, findUser.password);

    if (!isMatchPassword)
      return res.status(400).json([{ message: "Incorrect password" }]);

    const token = await createAccessToken({ id: findUser._id });
    res.cookie("token", token);

    res.json({
      id: findUser._id,
      username: findUser.username,
      email: findUser.email,
      createdAt: findUser.createdAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function logout(req, res) {
  res.cookie("token", "");
  return res.sendStatus(200);
}

export async function profile(req, res) {
  try {
    const userFound = await User.findById(req.user.id);
    if (!userFound)
      return res.status(400).json([{ message: "User not found" }]);

    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      createdAt: userFound.createdAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function verifyToken(req, res) {
  const { token } = req.cookies;

  if (!token) return res.status(401).json([{ message: "Unauthorized" }]);

  jwt.verify(token, process.env.TOKEN_KEY, async (error, user) => {
    try {
      if (error) return res.status(401).json([{ message: "Unauthorized" }]);

      const userFound = await User.findById(user.id);
      if (!userFound)
        return res.status(404).json([{ message: "User not found" }]);

      return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        createdAt: userFound.createdAt,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
}
