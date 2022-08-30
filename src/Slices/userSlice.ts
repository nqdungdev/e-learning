import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RegisterValues, User } from "Interfaces/userInterface";
import userAPI from "Services/userAPI";

interface State {
  userRegister: RegisterValues | null;
  isRegisterLoading: boolean;
  errorRegister: string | null;
  userInfo: User | null;
  isUserInfoLoading: boolean;
  errorUserInfo: string | null;
  userUpdate: RegisterValues | null;
  isUserUpdateLoading: boolean;
  errorUserUpdate: string | null;
}

const initialState: State = {
  userRegister: null,
  isRegisterLoading: false,
  errorRegister: null,
  userInfo: null,
  isUserInfoLoading: false,
  errorUserInfo: null,
  userUpdate: null,
  isUserUpdateLoading: false,
  errorUserUpdate: null,
};

export const postRegisterUser = createAsyncThunk(
  `user/postRegisterUser`,
  async (payload: RegisterValues) => {
    try {
      const data = userAPI.postRegisterUser(payload);
      return data;
    } catch (error) {
      throw error;
    }
  }
);

export const postUserInfo = createAsyncThunk(`user/postUserInfo`, async () => {
  try {
    const data = userAPI.postUserInfo();
    return data;
  } catch (error) {
    throw error;
  }
});

export const putUpdateUser = createAsyncThunk(
  `user/putUpdateUser`,
  async (payload: RegisterValues) => {
    try {
      const data = userAPI.putUpdateUser(payload);
      return data;
    } catch (error) {
      throw error;
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(postRegisterUser.pending, (state) => {
      state.isRegisterLoading = true;
    });
    builder.addCase(postRegisterUser.fulfilled, (state, { payload }) => {
      state.errorRegister = null;
      state.isRegisterLoading = false;
      state.userRegister = payload;
    });
    builder.addCase(postRegisterUser.rejected, (state, { error }) => {
      state.isRegisterLoading = false;
      state.errorRegister = error.message as string;
    });
    //--------------------------------------------------
    builder.addCase(postUserInfo.pending, (state) => {
      state.isUserInfoLoading = true;
    });
    builder.addCase(postUserInfo.fulfilled, (state, { payload }) => {
      state.errorUserInfo = null;
      state.isUserInfoLoading = false;
      state.userInfo = payload;
    });
    builder.addCase(postUserInfo.rejected, (state, { error }) => {
      state.isUserInfoLoading = false;
      state.errorUserInfo = error.message as string;
    });
    //--------------------------------------------------
    builder.addCase(putUpdateUser.pending, (state) => {
      state.isUserUpdateLoading = true;
    });
    builder.addCase(putUpdateUser.fulfilled, (state, { payload }) => {
      state.errorUserUpdate = null;
      state.isUserUpdateLoading = false;
      state.userUpdate = payload;
    });
    builder.addCase(putUpdateUser.rejected, (state, { error }) => {
      state.isUserUpdateLoading = false;
      state.errorUserUpdate = error.message as string;
    });
  },
});

export default userSlice.reducer;
