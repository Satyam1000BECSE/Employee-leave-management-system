import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../features/auth/authSlice";
import leaveReducer from "../features/leave/leaveSlice";
import employeeReducer from "../features/employee/employeeSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    leave: leaveReducer,
    employee: employeeReducer,
  },
});

export default store;