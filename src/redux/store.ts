// redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./modal/modalSlice";
import taskReducer from "./tasks/tasksSlice";

const store = configureStore({
  reducer: {
    modal: modalReducer,
    tasks: taskReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
