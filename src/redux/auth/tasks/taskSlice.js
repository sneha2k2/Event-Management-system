import { configureStore } from "@reduxjs/toolkit";
import signupReducer from "./auth/authSlice";
// import taskReducer from "./tasks/taskSlice";

export const store = configureStore({
  reducer: {
    user: signupReducer,
    // tasks: taskReducer,
  },
});