export interface CourseCatalog {
  maDanhMuc: string;
  tenDanhMuc: string;
}
export interface Course {
  maKhoaHoc: string;
  tenKhoaHoc: string;
  biDanh: string;
  danhMucKhoaHoc: CourseCatalog;
  hinhAnh: string;
  luotXem: number;
  maNhom: string;
  moTa: string;
  ngayTao: string;
  soLuongHocVien: string;
  nguoiTao: {
    taiKhoan: string;
    hoTen: string;
    maLoaiNguoiDung: string;
    tenLoaiNguoiDung: string;
  };
}
