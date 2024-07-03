import { createAction } from "@reduxjs/toolkit";

export const addTask = createAction("tasks/addTask");
export const deleteTask = createAction<string>("tasks/deleteTask");
export const loadTasks = createAction("tasks/loadTasks");
export const setRunningTask = createAction("tasks/setRunningTask");
export const updatePendingAndPastTask = createAction(
  "tasks/updatePendingAndPastTask",
);
