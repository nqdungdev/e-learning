import { object, string, ref } from "yup";

export const schemaPassword = object({
  matKhau: string()
    .required("Đây là trường bắt buộc!")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
      "Mật khẩu ít nhất một chữ cái, một số và ít nhất 6 kí tự!"
    ),
  confirmPassword: string()
    .required("Đây là trường bắt buộc!")
    .oneOf([ref("matKhau")], "Mật khẩu không trùng khớp"),
  newPassword: string()
    .required("Đây là trường bắt buộc!")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
      "Mật khẩu ít nhất một chữ cái, một số và ít nhất 6 kí tự!"
    ),
  confirmNewPassword: string()
    .required("Đây là trường bắt buộc!")
    .oneOf([ref("newPassword")], "Mật khẩu không trùng khớp"),
});
