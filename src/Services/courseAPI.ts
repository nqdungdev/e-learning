import { Course, CourseCatalog } from "Interfaces/courseInterface";
import axiosClient from "./axiosClient";

const courseAPI = {
  getCourseCatalog: () => {
    return axiosClient.get<CourseCatalog[]>(`QuanLyKhoaHoc/LayDanhMucKhoaHoc`);
  },

  getCourseByCategory: (maDanhMuc: string, maNhom: string = "GP01") => {
    return axiosClient.get<Course[]>(
      `QuanLyKhoaHoc/LayKhoaHocTheoDanhMuc?maDanhMuc=${maDanhMuc}&MaNhom=${maNhom}`
    );
  },
};

export default courseAPI;
