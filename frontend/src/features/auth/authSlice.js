import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/axios";
import authAPI from "./authAPI";

// ======================================
// Initial State
// ======================================

const initialState = {
    user: JSON.parse(localStorage.getItem("user")) || null,

    token: localStorage.getItem("token") || null,

    isLoading: false,

    isError: false,

    isSuccess: false,

    message: "",
};


// ======================================
// Login User
// ======================================

export const loginUser = createAsyncThunk(
    "auth/login",

    async (userData, thunkAPI) => {
        try {
            const response =
                await authAPI.login(userData);

            // Save in localStorage

            localStorage.setItem(
                "token",
                response.token
            );

            localStorage.setItem(
                "user",
                JSON.stringify(response.user)
            );

            return response;
        } catch (error) {

            const message =
                error.response?.data?.message ||
                error.message ||
                "Something went wrong";

            return thunkAPI.rejectWithValue(
                message
            );
        }
    }
);


// ======================================
// Logout User
// ======================================

export const logoutUser = createAsyncThunk(
    "auth/logout",

    async () => {

        localStorage.removeItem("token");

        localStorage.removeItem("user");

        return null;
    }
);


// ======================================
// Slice
// ======================================

const authSlice = createSlice({
    name: "auth",

    initialState,

    reducers: {

        reset: (state) => {
            state.isLoading = false;

            state.isError = false;

            state.isSuccess = false;

            state.message = "";
        },
    },

    extraReducers: (builder) => {

        builder

            // LOGIN

            .addCase(
                loginUser.pending,
                (state) => {

                    state.isLoading = true;
                }
            )

            .addCase(
                loginUser.fulfilled,
                (state, action) => {

                    state.isLoading = false;

                    state.isSuccess = true;

                    state.user = action.payload.user;

                    state.token = action.payload.token;
                }
            )

            .addCase(
                loginUser.rejected,
                (state, action) => {

                    state.isLoading = false;

                    state.isError = true;

                    state.message = action.payload;

                    state.user = null;
                }
            )

            // LOGOUT

            .addCase(
                logoutUser.fulfilled,
                (state) => {

                    state.user = null;

                    state.token = null;

                    state.isSuccess = false;
                }
            );
    },
});

export const { reset } =
    authSlice.actions;

export default authSlice.reducer;