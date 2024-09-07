import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";

// # ConfigureStore
import { configureStore } from "@reduxjs/toolkit";

import { TodosSlice } from "./pages/todos";
import { authSlice } from "./pages/AuthPage";

// Store
export const store = configureStore({
  reducer: {
    users: authSlice.reducer,
    todos: TodosSlice.reducer,
  },
});

// console.log(store.getState());

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
