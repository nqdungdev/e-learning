import { SyntheticEvent } from "react";
import { useSelector } from "react-redux";
import { RootState } from "configStore";
import { useNavigate } from "react-router-dom";
import { RegisteredCourseDetail } from "Interfaces/courseInterface";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import {
  CardTitle,
  Title,
} from "_Playground/StyledComponents/HomePage/home.styled";
import Placeholder200x150 from "Assets/img/Placeholder/200x150.jpg";

const RegisteredCourse = () => {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state: RootState) => state.userSlice);

  const chiTietKhoaHocGhiDanh: RegisteredCourseDetail[] | undefined =
    userInfo?.chiTietKhoaHocGhiDanh;

  console.log(userInfo);
  return (
    <Box>
      <Title style={{ textAlign: "center" }}>Khóa học đã đăng ký</Title>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell align="center">
                <CardTitle>STT</CardTitle>
              </TableCell>
              <TableCell align="left">
                <CardTitle>Tên khóa học</CardTitle>
              </TableCell>
              <TableCell
                align="right"
                sx={{ display: { xs: "none", md: "table-cell" } }}
              >
                <CardTitle>Hình ảnh</CardTitle>
              </TableCell>
              <TableCell align="center">
                <CardTitle>Chi tiết</CardTitle>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {chiTietKhoaHocGhiDanh?.map(
              (course: RegisteredCourseDetail, index: number) => (
                <TableRow
                  key={course.maKhoaHoc}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row" align="center">
                    {index}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {course.tenKhoaHoc}
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{ display: { xs: "none", md: "table-cell" } }}
                  >
                    <img
                      src={course.hinhAnh}
                      onError={(
                        error: SyntheticEvent<HTMLImageElement, Event>
                      ) => (error.currentTarget.src = Placeholder200x150)}
                      alt={course.hinhAnh}
                      width={200}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      size="small"
                      color="secondary"
                      sx={{ color: "secondary.contrastText" }}
                      onClick={() => navigate(`/detail/${course.maKhoaHoc}`)}
                    >
                      Chi tiết
                    </Button>
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default RegisteredCourse;
