import { LoginValues } from "Interfaces/userInterface";
import axiosClient from "./axiosClient";

const userAPI = {
  postLoginUser: (payload: LoginValues) => {
    return axiosClient.post<any>("QuanLyNguoiDung/DangNhap", {
      ...payload,
    });
  },
};

export default userAPI;
