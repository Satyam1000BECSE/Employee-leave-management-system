import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import API from "../../api/axios";


const initialState = {
  employees: [],
  employee: null,

  isLoading: false,
  isSuccess: false,
  isError: false,

  message: "",
};


// ================= GET EMPLOYEES =================

export const getEmployees =
  createAsyncThunk(
    "employee/getAll",

    async (_, thunkAPI) => {
      try {

        const response = await API.get(
          "/employees"
        );

        return response.data;

      } catch (error) {

        return thunkAPI.rejectWithValue(
          error.response?.data?.message
        );
      }
    }
  );


// ================= GET EMPLOYEE =================

export const getEmployeeById =
  createAsyncThunk(
    "employee/getOne",

    async (id, thunkAPI) => {
      try {

        const response = await API.get(
          `/employees/${id}`
        );

        return response.data;

      } catch (error) {

        return thunkAPI.rejectWithValue(
          error.response?.data?.message
        );
      }
    }
  );


const employeeSlice = createSlice({
  name: "employee",

  initialState,

  reducers: {
    resetEmployeeState: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },

  extraReducers: (builder) => {

    builder

      .addCase(
        getEmployees.pending,
        (state) => {
          state.isLoading = true;
        }
      )

      .addCase(
        getEmployees.fulfilled,
        (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;

          state.employees =
            action.payload;
        }
      )

      .addCase(
        getEmployees.rejected,
        (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        }
      )

      .addCase(
        getEmployeeById.fulfilled,
        (state, action) => {
          state.employee =
            action.payload;
        }
      );
  },
});

export const {
  resetEmployeeState,
} = employeeSlice.actions;

export default employeeSlice.reducer;