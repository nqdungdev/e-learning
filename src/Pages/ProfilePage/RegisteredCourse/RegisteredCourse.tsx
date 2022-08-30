import { AppDispatch, RootState } from "configStore";
import { useDispatch, useSelector } from "react-redux";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Course } from "Interfaces/courseInterface";
import { Title } from "_Playground/StyledComponents/HomePage/home.styled";
import { Box } from "@mui/material";

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

type Props = {};

const RegisteredCourse = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const { userInfo, isUserInfoLoading } = useSelector(
    (state: RootState) => state.userSlice
  );

  const chiTietKhoaHocGhiDanh: any = userInfo?.chiTietKhoaHocGhiDanh;

  console.log(userInfo);
  return (
    <Box>
      <Title>Khóa học đã đăng ký</Title>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="center">STT</TableCell>
              <TableCell>Tên khóa học</TableCell>
              <TableCell align="right">Hình ảnh</TableCell>
              <TableCell align="right">Chi tiết</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {chiTietKhoaHocGhiDanh?.map((row: any, index: number) => (
              <TableRow
                key={row.maKhoaHoc}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row" align="center">
                  {index}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.tenKhoaHoc}
                </TableCell>
                <TableCell align="right">
                  <img src={row.hinhAnh} alt={row.hinhAnh} width={200} />
                </TableCell>
                {/* <TableCell align="right">{row.moTa}</TableCell> */}
                {/* <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default RegisteredCourse;
