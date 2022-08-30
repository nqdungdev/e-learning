import { LoginValues, RegisterValues, User } from "Interfaces/userInterface";
import axiosClient from "./axiosClient";

const userAPI = {
  postLoginUser: (payload: LoginValues) => {
    return axiosClient.post<User>("QuanLyNguoiDung/DangNhap", {
      ...payload,
    });
  },
  postRegisterUser: (payload: RegisterValues) => {
    return axiosClient.post<RegisterValues>("QuanLyNguoiDung/DangKy", {
      ...payload,
      maNhom: "GP01",
    });
  },
  postUserInfo: () => {
    return axiosClient.post<User>("QuanLyNguoiDung/ThongTinTaiKhoan");
  },
  putUpdateUser: (payload: RegisterValues) => {
    return axiosClient.put<RegisterValues>(
      "QuanLyNguoiDung/CapNhatThongTinNguoiDung",
      {
        ...payload,
        maNhom: "GP01",
      }
    );
  },
};

export default userAPI;
