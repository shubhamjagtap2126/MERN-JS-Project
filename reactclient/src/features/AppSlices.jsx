// Create a Redux State Slice
import { createSlice } from "@reduxjs/toolkit";
// import { combineReducers } from "@reduxjs/toolkit";

import axios from "axios";

const API_URL = "http://localhost:3000/api";

export const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
