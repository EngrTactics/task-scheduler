import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task } from "@/types";

type TasksState = {
  tasks: Task[];
};

const initialState: TasksState = {
  tasks: JSON.parse(localStorage.getItem("tasks") || "[]"),
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
      console.log("right");
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    loadTasks: (state) => {
      state.tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    },
  },
});

export const { addTask, loadTasks } = tasksSlice.actions;
export default tasksSlice.reducer;
