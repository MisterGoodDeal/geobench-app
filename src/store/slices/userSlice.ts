import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { api } from "../../api";
import { User } from "../model/user";
import { RootState } from "../store";

const initialState: User = {
  userInfo: "",
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMessage: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialState as User,
  reducers: {
    clearState: (state) => {
      return {
        userInfo: state.userInfo,
        isFetching: false,
        isSuccess: false,
        isError: false,
        errorMessage: null,
      };
    },
    setUser: (state, action: PayloadAction<any>) => {
      state.userInfo = action.payload;
    },
  },
  extraReducers: (builder) => {
    /* Login de l'utilisateur */
    builder.addCase(api.user.login.pending, (state) => {
      state.isFetching = true;
      return state;
    });
    builder.addCase(api.user.login.fulfilled, (state, { payload }) => {
      state.userInfo = payload;
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
    });
    builder.addCase(api.user.login.rejected, (state, { payload }: any) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload;
    });
  },
});

export const userSelector = (state: RootState): User => state.user;

export const { clearState } = userSlice.actions;
export const userReducer = userSlice.reducer;