import { getDb } from "../config/connection.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({});

import { User } from "../models/userModel.js";

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Something is missing", success: false });
    }
    let user = await getDb().collection("userlist").findOne({ email: email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "User not exist", success: false });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ message: "Password is not matching", success: false });
    }
    const payload = {
      message: "user login successfull",
      userId: user.id,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    user = {
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    };
    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: true,
        sameSite: "None",
      })
      .json({
        message: `Welcome ${user.username}`,
        success: true,
        user,
        token,
      });
  } catch (error) {
    return res.status(500).json({ message: "Server error", success: false });
  }
};
const signup = async (req, res) => {
  try {
    const { email, username, password, role } = req.body;
    if ((!email, !username, !password, !role)) {
      return res
        .status(400)
        .json({ message: "Something is missing", success: false });
    }
    const user = await getDb().collection("userlist").findOne({ email: email });
    if (user) {
      return res
        .status(400)
        .json({ message: "User is already registered", success: false });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role,
    });
    await getDb().collection("userlist").insertOne(newUser);
    return res
      .status(200)
      .json({ message: "User registered successfully", success: true });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ message: "Error in registering user", success: false });
  }
};

const logout = (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });
    return res
      .status(200)
      .json({ message: "Logged out successfully", success: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error in logging out", success: false });
  }
};

export { login, signup, logout };
