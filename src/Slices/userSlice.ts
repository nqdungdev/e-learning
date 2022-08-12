import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface State {}

const initialState: State = {};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
});

export default userSlice.reducer;
