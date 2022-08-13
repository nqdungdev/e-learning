import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Course, CourseCatalog } from "Interfaces/courseInterface";
import courseAPI from "Services/courseAPI";

interface State {
  courseCatalog: CourseCatalog[];
  courseList: Course[];
}

const initialState: State = {
  courseCatalog: [],
  courseList: [],
};

export const getCourseCatalog = createAsyncThunk(
  `course/getCourseCatalog`,
  async () => {
    try {
      const data = await courseAPI.getCourseCatalog();
      return data;
    } catch (error) {
      throw error;
    }
  }
);

export const getCourseByCategory = createAsyncThunk(
  `course/getCourseByCategory`,
  async (payload: string) => {
    try {
      const data = await courseAPI.getCourseByCategory(payload);
      return data;
    } catch (error) {
      throw error;
    }
  }
);

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCourseCatalog.pending, (state) => {});
    builder.addCase(getCourseCatalog.fulfilled, (state, { payload }) => {
      state.courseCatalog = payload;
    });
    builder.addCase(getCourseCatalog.rejected, (state, { error }) => {});
    //------------------------------------------------------------------
    builder.addCase(getCourseByCategory.pending, (state) => {});
    builder.addCase(getCourseByCategory.fulfilled, (state, { payload }) => {
      state.courseList = payload;
    });
    builder.addCase(getCourseByCategory.rejected, (state, { error }) => {});
  },
});

export default courseSlice.reducer;
