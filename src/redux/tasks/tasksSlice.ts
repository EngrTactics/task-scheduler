import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task } from "@/types";

type TasksState = {
  tasks: Task[];
  runningTask?: Task;
  taskToEdit?: Task;
  pendingTasks: Task[];
  pastTasks: Task[];
};

const initialState: TasksState = {
  tasks: JSON.parse(localStorage.getItem("tasks") || "[]"),
  runningTask: undefined,
  taskToEdit: undefined,
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
    editTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id,
      );
      if (index !== -1) {
        state.tasks[index] = action.payload;
        localStorage.setItem("tasks", JSON.stringify(state.tasks));
      }
    },
    updateTaskToEdit: (state, action: PayloadAction<Task>) => {
      state.taskToEdit = action.payload;
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    loadTasks: (state) => {
      const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
      state.tasks = tasks.map((task: any) => ({
        ...task,
        runDate: new Date(task.runDate),
      }));
    },
    setRunningTask: (state, action: PayloadAction<Task>) => {
      state.runningTask = action.payload;
    },
    updatePendingAndPastTask: (state) => {
      const now = new Date();
      state.pendingTasks = state.tasks.filter(
        (task) =>
          new Date(task.runDate.toDateString() + " " + task.runTime) >= now,
      );
      state.pastTasks = state.tasks.filter(
        (task) =>
          new Date(task.runDate.toDateString() + " " + task.runTime) < now,
      );
    },
  },
});

export const {
  addTask,
  editTask,
  deleteTask,
  loadTasks,
  setRunningTask,
  updateTaskToEdit,
  updatePendingAndPastTask,
} = tasksSlice.actions;
export default tasksSlice.reducer;
