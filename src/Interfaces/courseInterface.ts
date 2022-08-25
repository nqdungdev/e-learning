export interface CourseCatalog {
  maDanhMuc: string;
  tenDanhMuc: string;
}
export interface Course {
  maKhoaHoc: string;
  tenKhoaHoc: string;
  biDanh: string;
  danhMucKhoaHoc: { maDanhMucKhoahoc: string; tenDanhMucKhoaHoc: string };
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

export interface RegisterCourse {
  maKhoaHoc: string;
  taiKhoan: string;
}

export interface CoursePagination {
  count: number;
  currentPage: number;
  totalPages: number;
  totalCount: number;
  items: Course[];
}

export interface SearchParams {
  tenKhoaHoc?: string | null;
  page?: number | null;
  pageSize?: number | null;
  MaNhom?: string | null;
}
