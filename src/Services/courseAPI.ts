import {
  Course,
  CourseCatalog,
  CoursePagination,
  RegisterCourse,
  SearchParams,
} from "Interfaces/courseInterface";
import axiosClient from "./axiosClient";

const courseAPI = {
  getCourseList: (tenKhoaHoc?: string) => {
    return axiosClient.get(`QuanLyKhoaHoc/LayDanhSachKhoaHoc`, {
      params: {
        tenKhoaHoc: tenKhoaHoc,
      },
    });
  },

  getCourseCatalog: () => {
    return axiosClient.get<CourseCatalog[]>(`QuanLyKhoaHoc/LayDanhMucKhoaHoc`);
  },

  getCourseByCategory: (
    maDanhMuc: string = "TuDuy",
    maNhom: string = "GP01"
  ) => {
    return axiosClient.get<Course[]>(
      `QuanLyKhoaHoc/LayKhoaHocTheoDanhMuc?maDanhMuc=${maDanhMuc}&MaNhom=${maNhom}`
    );
  },

  getCourseListPaging: (
    payload?: SearchParams,
    tenKhoaHoc: string | null = "",
    page: number | null = 1,
    pageSize: number | null = 6,
    MaNhom: string | null = "GP01"
  ) => {
    return axiosClient.get<CoursePagination>(
      `QuanLyKhoaHoc/LayDanhSachKhoaHoc_PhanTrang?tenKhoaHoc=${
        payload?.tenKhoaHoc || tenKhoaHoc
      }&page=${payload?.page || page}&pageSize=${
        payload?.pageSize || pageSize
      }&MaNhom=${payload?.MaNhom || MaNhom}`
    );
  },

  getCourseInfo: (courseId: string) => {
    return axiosClient.get<Course>(
      `QuanLyKhoaHoc/LayThongTinKhoaHoc?maKhoaHoc=${courseId}`
    );
  },

  postRegisterCourse: (payload: RegisterCourse) => {
    return axiosClient.post(`QuanLyKhoaHoc/DangKyKhoaHoc`, { ...payload });
  },
};

export default courseAPI;
