import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task } from "@/types";

type TasksState = {
  tasks: Task[];
  runningTask: Task | undefined;
  pendingTasks: Task[];
  pastTasks: Task[];
};

const initialState: TasksState = {
  tasks: JSON.parse(localStorage.getItem("tasks") || "[]"),
  runningTask: undefined,
  pendingTasks: [],
  pastTasks: [],
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    loadTasks: (state) => {
      state.tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    },
    setRunningTask: (state, action: PayloadAction<Task>) => {
      state.runningTask = action.payload;
    },
    updatePendingAndPastTask: (state) => {
      const now = new Date();
      state.pendingTasks = state.tasks.filter(
        (task) => new Date(task.runDate + "T" + task.runTime) >= now,
      );
      state.pastTasks = state.tasks.filter(
        (task) => new Date(task.runDate + "T" + task.runTime) < now,
      );
    },
  },
});

export const {
  addTask,
  loadTasks,
  deleteTask,
  setRunningTask,
  updatePendingAndPastTask,
} = tasksSlice.actions;
export default tasksSlice.reducer;
