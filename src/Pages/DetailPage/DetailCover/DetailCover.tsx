import { theme } from "GlobalStyles";
import { useState, SyntheticEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "configStore";
import { Box, Button, Container, Grid, Link, Stack } from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";
import BreadcrumbNav from "../BreadcrumbNav/BreadcrumbNav";
import {
  DetailDesc,
  DetailText,
  DetailTitle,
} from "_Playground/StyledComponents/DetailPage/detail.styled";
import SweetAlert from "react-sweetalert2";
import { useNavigate } from "react-router-dom";
import { postRegisterCourse } from "Slices/courseSlice";
import Placeholder200x150 from "Assets/img/Placeholder/200x150.jpg";

const DetailCover = () => {
  const [openWarning, setOpenWarning] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();

  const { course, errorRegisterCourse } = useSelector(
    (state: RootState) => state.courseSlice
  );

  const { userLogin } = useSelector((state: RootState) => state.authSlice);

  const handleConfirm = () => {
    if (!userLogin) {
      setOpenWarning(true);
      return;
    }
    setOpenConfirm(true);
  };

  const handleRegisterCourse = () => {
    if (userLogin && course)
      dispatch(
        postRegisterCourse({
          taiKhoan: userLogin.taiKhoan,
          maKhoaHoc: course?.maKhoaHoc,
        })
      )
        .then((res: any) => {
          if (res?.error?.message) setOpenError(true);
          else {
            setOpenSuccess(true);
          }
        })
        .catch((err: any) => console.log(err));
  };

  return (
    <Box
      sx={{
        mt: "5rem",
        bgcolor: "primary.main",
      }}
      py={5}
    >
      <SweetAlert
        show={openWarning}
        icon="warning"
        title="B???n ch??a ????ng nh???p!!!"
        text="B???n c?? mu???n ????ng nh???p?"
        confirmButtonText="?????ng ??"
        cancelButtonText="H???y b???"
        showCancelButton={true}
        onConfirm={() => {
          setOpenWarning(false);
          navigate("/login");
        }}
        didClose={() => {
          setOpenWarning(false);
        }}
      />

      <SweetAlert
        show={openConfirm}
        icon="question"
        title="B???n c?? mu???n ????ng k??!!!"
        confirmButtonText="?????ng ??"
        cancelButtonText="H???y b???"
        showCancelButton={true}
        onConfirm={() => {
          setOpenConfirm(false);
          handleRegisterCourse();
        }}
        didClose={() => {
          setOpenConfirm(false);
        }}
      />

      <SweetAlert
        show={openError}
        icon="error"
        title="C?? l???i x???y ra!!!"
        text={errorRegisterCourse || undefined}
        onConfirm={() => setOpenError(false)}
      />

      <SweetAlert
        show={openSuccess}
        icon="success"
        title="????ng k?? th??nh c??ng!!!"
        timer={2000}
        onConfirm={() => {
          setOpenSuccess(false);
        }}
        didClose={() => {
          setOpenSuccess(false);
        }}
      />

      <Container>
        <BreadcrumbNav
          secondLevel={course?.danhMucKhoaHoc.tenDanhMucKhoaHoc}
          thirdLevel={course?.tenKhoaHoc}
        />
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            sm={8}
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <DetailTitle color={theme.palette.primary.contrastText}>
              {course?.tenKhoaHoc}
            </DetailTitle>
            <DetailText color={theme.palette.primary.contrastText}>
              Gi???ng vi??n: {course?.nguoiTao.hoTen}
            </DetailText>
            <DetailDesc color={theme.palette.primary.contrastText}>
              {course?.moTa}
            </DetailDesc>
            <Link
              href="#description"
              sx={{
                width: "max-content",
                "&:hover>*": {
                  color: "secondary.main",
                  transition: "all 0.4s",
                },
              }}
            >
              <DetailText color={theme.palette.primary.contrastText}>
                [Xem th??m]
              </DetailText>
            </Link>
            <DetailText color={theme.palette.primary.contrastText}>
              C???p nh???t l???n cu???i: {course?.ngayTao}
            </DetailText>
            <Stack direction="row">
              <Stack alignItems="center" mr={5}>
                <VisibilityOutlinedIcon
                  titleAccess="L?????t xem"
                  color="secondary"
                />
                <DetailText color={theme.palette.primary.contrastText}>
                  {course?.luotXem}
                </DetailText>
              </Stack>
              <Stack alignItems="center">
                <HowToRegOutlinedIcon
                  titleAccess="L?????t ????ng k??"
                  color="secondary"
                />
                <DetailText color={theme.palette.primary.contrastText}>
                  {course?.soLuongHocVien}
                </DetailText>
              </Stack>
            </Stack>
          </Grid>
          <Grid
            item
            xs={12}
            sm={4}
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <img
              src={course?.hinhAnh}
              alt={course?.hinhAnh}
              onError={(error: SyntheticEvent<HTMLImageElement, Event>) =>
                (error.currentTarget.src = Placeholder200x150)
              }
              width="100%"
            />
            <Stack mt={2} alignItems="center">
              <Button
                variant="contained"
                color="secondary"
                sx={{
                  width: "max-content",
                  color: "secondary.contrastText",
                }}
                onClick={() => {
                  handleConfirm();
                }}
              >
                ????ng k??
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default DetailCover;
