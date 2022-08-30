import { object, string } from "yup";

export const schemaInfo = object({
  taiKhoan: string()
    .required("Đây là trường bắt buộc!")
    .matches(
      /^[a-zA-Z0-9]{5,}$/,
      "Tài khoản chỉ gồm chữ hoa, thường, số và ít nhất 5 kí tự!"
    ),
  email: string()
    .required("Đây là trường bắt buộc!")
    .email("Email không đúng định dạng"),
  hoTen: string()
    .required("Đây là trường bắt buộc!")
    .matches(/^[^\d]+$/, "Họ tên không chứa số!"),

  soDT: string()
    .required("Đây là trường bắt buộc!")
    .matches(
      /(84|0[1|3|5|7|8|9])+([0-9]{8})\b/,
      "Số điện thoại phải gồm 10 chữ số, số đầu là 0 hoặc +84!"
    ),
});
