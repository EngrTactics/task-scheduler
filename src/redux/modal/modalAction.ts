import { createAction } from "@reduxjs/toolkit";

export const openEditModal = createAction("modal/openEditModal");
export const openAddModal = createAction("modal/openAddModal");
export const closeEditModal = createAction("modal/closeEditModal");
export const closeAddModal = createAction("modal/closeAddModal");
export const openRunTaskModal = createAction("modal/openRunTaskModal");
export const closeRunTaskModal = createAction("modal/closeRunTaskModal");
export const openExecutedListModal = createAction(
  "modal/openExecutedListModal",
);
export const closeExecutedListModal = createAction(
  "modal/closeExecutedListModal",
);
