import { createAction } from "@reduxjs/toolkit";

export const addTask = createAction("tasks/addTask");
export const loadTasks = createAction("tasks/loadTasks");
