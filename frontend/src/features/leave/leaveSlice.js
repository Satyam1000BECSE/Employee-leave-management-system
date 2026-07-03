import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import leaveAPI from "./leaveAPI";


const initialState = {
  leaves: [],
  selectedLeave: null,

  isLoading: false,
  isSuccess: false,
  isError: false,

  message: "",
};


// ================= APPLY LEAVE =================

export const applyLeave =
  createAsyncThunk(
    "leave/apply",

    async (leaveData, thunkAPI) => {
      try {
        return await leaveAPI.applyLeave(
          leaveData
        );
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message
        );
      }
    }
  );


// ================= GET LEAVES =================

export const getLeaves =
  createAsyncThunk(
    "leave/getAll",

    async (query, thunkAPI) => {
      try {
        return await leaveAPI.getLeaves(
          query
        );
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message
        );
      }
    }
  );


// ================= DELETE =================

export const deleteLeave =
  createAsyncThunk(
    "leave/delete",

    async (id, thunkAPI) => {
      try {
        await leaveAPI.deleteLeave(id);

        return id;
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message
        );
      }
    }
  );


// ================= APPROVE =================

export const approveLeave =
  createAsyncThunk(
    "leave/approve",

    async (id, thunkAPI) => {
      try {
        return await leaveAPI.approveLeave(
          id
        );
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message
        );
      }
    }
  );


// ================= REJECT =================

export const rejectLeave =
  createAsyncThunk(
    "leave/reject",

    async (
      { id, managerComments },
      thunkAPI
    ) => {
      try {
        return await leaveAPI.rejectLeave({
          id,
          managerComments,
        });
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message
        );
      }
    }
  );


const leaveSlice = createSlice({
  name: "leave",

  initialState,

  reducers: {
    resetLeaveState: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },

  extraReducers: (builder) => {

    builder

      // APPLY

      .addCase(
        applyLeave.pending,
        (state) => {
          state.isLoading = true;
        }
      )

      .addCase(
        applyLeave.fulfilled,
        (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;

          state.leaves.unshift(
            action.payload.leave
          );
        }
      )

      .addCase(
        applyLeave.rejected,
        (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        }
      )

      // GET

      .addCase(
        getLeaves.fulfilled,
        (state, action) => {
          state.leaves =
            action.payload.leaves;
        }
      )

      // DELETE

      .addCase(
        deleteLeave.fulfilled,
        (state, action) => {
          state.leaves =
            state.leaves.filter(
              (leave) =>
                leave._id !== action.payload
            );
        }
      );
  },
});

export const { resetLeaveState } =
  leaveSlice.actions;

export default leaveSlice.reducer;