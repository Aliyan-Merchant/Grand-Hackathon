import { createSlice } from '@reduxjs/toolkit';

const loanSlice = createSlice({
  name: 'loans',
  initialState: {
    loanCategories: [], // e.g., Wedding Loans, Business Startup Loans
    userLoanRequests: [],
  },
  reducers: {
    setLoanCategories(state, action) {
      state.loanCategories = action.payload;
    },
    addLoanRequest(state, action) {
      state.userLoanRequests.push(action.payload);
    },
  },
});

export const { setLoanCategories, addLoanRequest } = loanSlice.actions;
export default loanSlice.reducer;
