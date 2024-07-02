import { createAction } from "@reduxjs/toolkit";

export const openEditModal = createAction("modal/openEditModal");
export const openAddModal = createAction("modal/openAddModal");
export const closeEditModal = createAction("modal/closeEditModal");
export const closeAddModal = createAction("modal/closeAddModal");
