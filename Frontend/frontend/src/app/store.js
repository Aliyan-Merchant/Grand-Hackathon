import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice.jsx';
import loanReducer from '../features/loans/loanSlice.jsx';
import adminReducer from '../features/admin/adminSlice.jsx';

const store = configureStore({
  reducer: {
    auth: authReducer,
    loans: loanReducer,
    admin: adminReducer,
  },
});

export default store;
