import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  Course,
  CourseCatalog,
  CoursePagination,
  RegisterCourse,
  SearchParams,
} from "Interfaces/courseInterface";
import courseAPI from "Services/courseAPI";

interface State {
  courseCatalog: CourseCatalog[];
  isCourseCatalogLoading: boolean;
  errorCourseCatalog: string | null;

  courseList: Course[];
  isCourseListLoading: boolean;
  errorCourseList: string | null;

  courseByCatalog: Course[];
  isCourseByCatalogLoading: boolean;
  errorCourseByCatalog: string | null;

  courseListPaging: CoursePagination | null;
  isCourseListPagingLoading: boolean;
  errorCourseListPaging: string | null;

  course: Course | null;
  isCourseLoading: boolean;
  errorCourse: string | null;

  registerCourse: Course | null;
  isRegisterCourseLoading: boolean;
  errorRegisterCourse: string | null;
}

const initialState: State = {
  courseCatalog: [],
  isCourseCatalogLoading: false,
  errorCourseCatalog: null,

  courseList: [],
  isCourseListLoading: false,
  errorCourseList: null,

  courseByCatalog: [],
  isCourseByCatalogLoading: false,
  errorCourseByCatalog: null,

  courseListPaging: null,
  isCourseListPagingLoading: false,
  errorCourseListPaging: null,

  course: null,
  isCourseLoading: false,
  errorCourse: null,

  registerCourse: null,
  isRegisterCourseLoading: false,
  errorRegisterCourse: null,
};

export const getCourseList = createAsyncThunk(
  `course/getCourseList`,
  async (payload?: string) => {
    try {
      const data = await courseAPI.getCourseList(payload);
      return data;
    } catch (error) {
      throw error;
    }
  }
);

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
  async (payload?: string) => {
    try {
      const data = await courseAPI.getCourseByCategory(payload);
      return data;
    } catch (error) {
      throw error;
    }
  }
);

export const getCourseListPaging = createAsyncThunk(
  `course/getCourseListPaging`,
  async (payload?: SearchParams) => {
    try {
      const data = await courseAPI.getCourseListPaging(payload);
      return data;
    } catch (error) {
      throw error;
    }
  }
);

export const getCourseInfo = createAsyncThunk(
  `course/getCourseInfo`,
  async (payload: string) => {
    try {
      const data = await courseAPI.getCourseInfo(payload);
      return data;
    } catch (error) {
      throw error;
    }
  }
);

export const postRegisterCourse = createAsyncThunk(
  `course/postRegisterCourse`,
  async (payload: RegisterCourse) => {
    try {
      const data = await courseAPI.postRegisterCourse(payload);
      return data;
    } catch (error) {
      throw error;
    }
  }
);

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof Course>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string | boolean },
  b: { [key in Key]: number | string | boolean }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    increaseSort: (state) => {
      state.courseByCatalog.sort(getComparator("asc", "tenKhoaHoc"));
      state.courseListPaging?.items.sort(getComparator("asc", "tenKhoaHoc"));
    },

    decreaseSort: (state) => {
      state.courseByCatalog.sort(getComparator("desc", "tenKhoaHoc"));
      state.courseListPaging?.items.sort(getComparator("desc", "tenKhoaHoc"));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCourseList.pending, (state) => {
      state.isCourseListLoading = true;
    });
    builder.addCase(getCourseList.fulfilled, (state, { payload }) => {
      state.errorCourseList = null;
      state.isCourseListLoading = false;
      state.courseList = payload;
    });
    builder.addCase(getCourseList.rejected, (state, { error }) => {
      state.isCourseListLoading = false;
      state.errorCourseList = error.message as string;
    });
    //------------------------------------------------------------------
    builder.addCase(getCourseListPaging.pending, (state) => {
      state.isCourseListPagingLoading = true;
    });
    builder.addCase(getCourseListPaging.fulfilled, (state, { payload }) => {
      state.errorCourseListPaging = null;
      state.isCourseListPagingLoading = false;
      state.courseListPaging = payload;
    });
    builder.addCase(getCourseListPaging.rejected, (state, { error }) => {
      state.isCourseListPagingLoading = false;
      state.errorCourseListPaging = error.message as string;
    });
    //------------------------------------------------------------------
    builder.addCase(getCourseCatalog.pending, (state) => {
      state.isCourseCatalogLoading = true;
    });
    builder.addCase(getCourseCatalog.fulfilled, (state, { payload }) => {
      state.errorCourseCatalog = null;
      state.isCourseCatalogLoading = false;
      state.courseCatalog = payload;
    });
    builder.addCase(getCourseCatalog.rejected, (state, { error }) => {
      state.isCourseCatalogLoading = false;
      state.errorCourseCatalog = error.message as string;
    });
    //------------------------------------------------------------------
    builder.addCase(getCourseByCategory.pending, (state) => {
      state.isCourseByCatalogLoading = true;
    });
    builder.addCase(getCourseByCategory.fulfilled, (state, { payload }) => {
      state.errorCourseByCatalog = null;
      state.isCourseByCatalogLoading = false;
      state.courseByCatalog = payload;
    });
    builder.addCase(getCourseByCategory.rejected, (state, { error }) => {
      state.isCourseByCatalogLoading = false;
      state.errorCourseByCatalog = error.message as string;
    });
    //------------------------------------------------------------------
    builder.addCase(getCourseInfo.pending, (state) => {
      state.isCourseLoading = true;
    });
    builder.addCase(getCourseInfo.fulfilled, (state, { payload }) => {
      state.errorCourse = null;
      state.isCourseLoading = false;
      state.course = payload;
    });
    builder.addCase(getCourseInfo.rejected, (state, { error }) => {
      state.isCourseLoading = false;
      state.errorCourse = error.message as string;
    });
    //------------------------------------------------------------------
    builder.addCase(postRegisterCourse.pending, (state) => {
      state.isRegisterCourseLoading = true;
    });
    builder.addCase(postRegisterCourse.fulfilled, (state, { payload }) => {
      state.errorRegisterCourse = null;
      state.isRegisterCourseLoading = false;
      state.registerCourse = payload;
    });
    builder.addCase(postRegisterCourse.rejected, (state, { error }) => {
      state.isRegisterCourseLoading = false;
      state.errorRegisterCourse = error.message as string;
    });
  },
});

export const { increaseSort, decreaseSort } = courseSlice.actions;

export default courseSlice.reducer;
