import { createAsyncThunk } from "@reduxjs/toolkit";
import userApi from "../../utils/api/userApi";

// Lấy danh sách người dùng
export const getUsers = createAsyncThunk("user/getUsers", async () => {
  const users = await userApi.getUsers();
  return users;
});

// Lấy thông tin người dùng theo ID
export const getUser = createAsyncThunk("user/getUser", async (userId) => {
  const user = await userApi.getUser(userId);
  return user;
});

// Xử lý đăng nhập
export const login = createAsyncThunk("user/login", async (loginData) => {
  console.log("Login data:", loginData);
  const user = await userApi.login(loginData);
  console.log("User is:", user);
  return user;
});

// Tạo mới người dùng
export const createUser = createAsyncThunk("user/createUser", async (user) => {
  const newUser = await userApi.registerUser(user);
  return newUser;
});

// Đăng ký người dùng mới
export const registerUser = createAsyncThunk("user/registerUser", async (user) => {
  try {
    const response = await userApi.registerUser(user);
    console.log("Registration successful:", response);
    return response;
  } catch (error) {
    console.error("Registration failed:", error);
    throw error.response?.data || "Registration failed";
  }
});
