import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { api } from "../../api";
import { User } from "../model/user";
import { RootState } from "../store";

const initialState: User = {
  userInfo: "",
  community: null,
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMessage: null,
  darkMode: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialState as User,
  reducers: {
    clearState: (state) => {
      return {
        userInfo: state.userInfo,
        community: state.community,
        isFetching: false,
        isSuccess: false,
        isError: false,
        errorMessage: null,
        darkMode: state.darkMode,
      };
    },
    setUser: (state, action: PayloadAction<any>) => {
      state.userInfo = action.payload;
    },
    setDarkMode: (state, action: PayloadAction<boolean>) => {
      state.darkMode = action.payload;
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

    /* Login de l'utilisateur Google */
    builder.addCase(api.user.loginGoogle.pending, (state) => {
      state.isFetching = true;
      return state;
    });
    builder.addCase(api.user.loginGoogle.fulfilled, (state, { payload }) => {
      state.userInfo = payload;
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
    });
    builder.addCase(
      api.user.loginGoogle.rejected,
      (state, { payload }: any) => {
        state.isFetching = false;
        state.isError = true;
        state.errorMessage = payload;
      }
    );

    /* Login de l'utilisateur Apple */
    builder.addCase(api.user.loginApple.pending, (state) => {
      state.isFetching = true;
      return state;
    });
    builder.addCase(api.user.loginApple.fulfilled, (state, { payload }) => {
      state.userInfo = payload;
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
    });
    builder.addCase(api.user.loginApple.rejected, (state, { payload }: any) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload;
    });

    /* Réinitialisation du mot de passe de l'utilisateur */
    builder.addCase(api.user.reset.pending, (state) => {
      state.isFetching = true;
      return state;
    });
    builder.addCase(api.user.reset.fulfilled, (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
    });
    builder.addCase(api.user.reset.rejected, (state, { payload }: any) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload;
    });

    /* Check l'OTP et modifier le mot de passe */
    builder.addCase(api.user.checkAndChange.pending, (state) => {
      state.isFetching = true;
      return state;
    });
    builder.addCase(api.user.checkAndChange.fulfilled, (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
    });
    builder.addCase(
      api.user.checkAndChange.rejected,
      (state, { payload }: any) => {
        state.isFetching = false;
        state.isError = true;
        state.errorMessage = payload;
      }
    );

    /* Créer un compte utilisateur */
    builder.addCase(api.user.register.pending, (state) => {
      state.isFetching = true;
      return state;
    });
    builder.addCase(api.user.register.fulfilled, (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
    });
    builder.addCase(api.user.register.rejected, (state, { payload }: any) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload;
    });

    /* Changer le nom complet de l'utilisateur */
    builder.addCase(api.user.updateFullname.pending, (state) => {
      state.isFetching = true;
      return state;
    });
    builder.addCase(api.user.updateFullname.fulfilled, (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
    });
    builder.addCase(
      api.user.updateFullname.rejected,
      (state, { payload }: any) => {
        state.isFetching = false;
        state.isError = true;
        state.errorMessage = payload;
      }
    );

    /* Changer le nom complet de l'utilisateur */
    builder.addCase(api.user.updateEmail.pending, (state) => {
      state.isFetching = true;
      return state;
    });
    builder.addCase(api.user.updateEmail.fulfilled, (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
    });
    builder.addCase(
      api.user.updateEmail.rejected,
      (state, { payload }: any) => {
        state.isFetching = false;
        state.isError = true;
        state.errorMessage = payload;
      }
    );

    /* Récupérer les infos de la communauté */
    builder.addCase(api.communaute.get.pending, (state) => {
      state.isFetching = true;
      return state;
    });
    builder.addCase(api.communaute.get.fulfilled, (state, { payload }) => {
      state.community = payload;
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
    });
    builder.addCase(api.communaute.get.rejected, (state, { payload }: any) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload;
    });

    /* Supprimer un compte */
    builder.addCase(api.user.delete.pending, (state) => {
      state.isFetching = true;
      return state;
    });
    builder.addCase(api.user.delete.fulfilled, (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
    });
    builder.addCase(api.user.delete.rejected, (state, { payload }: any) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload;
    });
  },
});

export const userSelector = (state: RootState): User => state.user;

export const { clearState } = userSlice.actions;
export const userReducer = userSlice.reducer;
