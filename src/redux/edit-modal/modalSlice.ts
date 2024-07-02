import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: { isEditModalOpen: false, isAddModalOpen: false },
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
  },
});

export default modalSlice.reducer;
