import { Task } from "@/types";
import { createAction } from "@reduxjs/toolkit";

export const addTask = createAction("tasks/addTask");
export const editTask = createAction<Task>("tasks/edit");
export const updateTaskToEdit = createAction<Task>("tasks/updateTaskToEdit");
export const deleteTask = createAction<string>("tasks/deleteTask");
export const loadTasks = createAction("tasks/loadTasks");
export const setRunningTask = createAction("tasks/setRunningTask");
export const updatePendingAndPastTask = createAction(
  "tasks/updatePendingAndPastTask",
);
