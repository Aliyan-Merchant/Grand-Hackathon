import { createSlice } from '@reduxjs/toolkit';

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    applications: [],
  },
  reducers: {
    setApplications(state, action) {
      state.applications = action.payload;
    },
    updateApplicationStatus(state, action) {
      const application = state.applications.find(
        (app) => app.id === action.payload.id
      );
      if (application) {
        application.status = action.payload.status;
      }
    },
  },
});

export const { setApplications, updateApplicationStatus } = adminSlice.actions;
export default adminSlice.reducer;
