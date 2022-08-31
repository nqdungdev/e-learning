import { RegisteredCourseDetail } from "./courseInterface";
export interface LoginValues {
  taiKhoan: string;
  matKhau: string;
}

export interface RegisterValues {
  taiKhoan: string;
  matKhau: string;
  hoTen: string;
  soDT: string;
  email: string;
  maNhom?: string;
  passwordConfirm?: string;
}
export interface User {
  taiKhoan: string;
  hoTen: string;
  matKhau: string;
  email: string;
  soDT: string;
  maNhom: string;
  maLoaiNguoiDung: string;
  chiTietKhoaHocGhiDanh?: RegisteredCourseDetail[];
  accessToken: string;
}
