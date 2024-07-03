import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    isEditModalOpen: false,
    isAddModalOpen: false,
    isRunTaskOpen: false,
  },
  reducers: {
    openEditModal: (state) => {
      state.isEditModalOpen = true;
    },
    openAddModal: (state) => {
      state.isAddModalOpen = true;
    },
    closeEditModal: (state) => {
      state.isEditModalOpen = false;
    },
    closeAddModal: (state) => {
      state.isAddModalOpen = false;
    },
    openRunTaskModal: (state) => {
      state.isRunTaskOpen = true;
    },
    closeRunTaskModal: (state) => {
      state.isRunTaskOpen = false;
    },
  },
});

export default modalSlice.reducer;
