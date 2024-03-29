import { useState } from "react";
import { AppDispatch, RootState } from "configStore";
import { useDispatch, useSelector } from "react-redux";
import { FieldErrors, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { postUserInfo, putUpdateUser } from "Slices/userSlice";
import { changeName } from "Slices/authSlice";
import { Box, TextField, Button, Stack, FormHelperText } from "@mui/material";
import { RegisterValues } from "Interfaces/userInterface";
import SweetAlert from "react-sweetalert2";
import { Title } from "_Playground/StyledComponents/HomePage/home.styled";
import { schemaInfo } from "./schemaInfo";

const UserInfo = () => {
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [readOnly, setReadOnly] = useState(true);
  const dispatch = useDispatch<AppDispatch>();
  const { userInfo } = useSelector((state: RootState) => state.userSlice);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterValues>({
    defaultValues: {
      taiKhoan: `${userInfo?.taiKhoan}`,
      email: `${userInfo?.email}`,
      hoTen: `${userInfo?.hoTen}`,
      soDT: `${userInfo?.soDT}`,
    },
    mode: "onTouched",
    resolver: yupResolver(schemaInfo),
  });

  const onSubmit = (values: RegisterValues) => {
    setOpenConfirm(false);
    dispatch(putUpdateUser({ ...userInfo, ...values })).then(() => {
      dispatch(changeName());
      dispatch(postUserInfo());
    });
    setOpenSuccess(true);
    setOpenUpdate(false);
    setReadOnly(true);
  };

  const onError = (error: FieldErrors<RegisterValues>) => {
    console.log(error);
  };

  return (
    <Box>
      <SweetAlert
        show={openConfirm}
        icon="question"
        title="Bạn có muốn thay đổi thông tin?"
        confirmButtonText="Đồng ý"
        cancelButtonText="Hủy bỏ"
        showCancelButton={true}
        onConfirm={handleSubmit(onSubmit, onError)}
        didClose={() => {
          setOpenConfirm(false);
        }}
      />

      <SweetAlert
        show={openSuccess}
        icon="success"
        title="Thay đổi thông tin thành công!!!"
        confirmButtonText="Đồng ý"
        timer={2000}
        onConfirm={() => {
          setOpenSuccess(false);
        }}
        didClose={() => {
          setOpenSuccess(false);
        }}
      />
      <Title style={{ textAlign: "center" }}>Thông tin tài khoản</Title>

      <Box component="form" onSubmit={handleSubmit(onSubmit, onError)}>
        <TextField
          variant="outlined"
          margin="dense"
          required
          fullWidth
          id="account"
          label="Tài khoản"
          autoComplete="account"
          disabled
          {...register("taiKhoan")}
        />

        <TextField
          variant="outlined"
          margin="dense"
          required
          fullWidth
          id="fullName"
          label="Họ tên"
          color={errors.hoTen && !readOnly ? "warning" : "primary"}
          {...register("hoTen")}
          InputProps={{
            readOnly: readOnly,
          }}
        />
        {!readOnly && errors.hoTen && (
          <FormHelperText id="fullName-text" filled error>
            {errors.hoTen.message}
          </FormHelperText>
        )}

        <TextField
          variant="outlined"
          margin="dense"
          required
          fullWidth
          id="email"
          label="Email"
          type="email"
          color={errors.email && !readOnly ? "warning" : "primary"}
          {...register("email")}
          InputProps={{
            readOnly: readOnly,
          }}
        />
        {!readOnly && errors.email && (
          <FormHelperText id="email-text" filled error>
            {errors.email.message}
          </FormHelperText>
        )}

        <TextField
          variant="outlined"
          margin="dense"
          required
          fullWidth
          id="phone"
          label="Số điện thoại"
          color={errors.soDT && !readOnly ? "warning" : "primary"}
          {...register("soDT")}
          InputProps={{
            readOnly: readOnly,
          }}
        />
        {!readOnly && errors.soDT && (
          <FormHelperText id="phone-text" filled error>
            {errors.soDT.message}
          </FormHelperText>
        )}

        {openUpdate ? (
          <Stack mt={2} direction="row" justifyContent="flex-end">
            <Button
              variant="contained"
              color="secondary"
              // type="submit"
              sx={{
                color: "secondary.contrastText",
                textTransform: "capitalize",
                width: "5rem",
                mr: 2,
              }}
              onClick={() => setOpenConfirm(true)}
            >
              Lưu
            </Button>
            <Button
              variant="contained"
              color="primary"
              sx={{
                color: "primary.contrastText",
                textTransform: "capitalize",
                width: "5rem",
                mr: 2,
              }}
              onClick={() => {
                setOpenUpdate(false);
                setReadOnly(true);
              }}
            >
              Hủy
            </Button>
          </Stack>
        ) : (
          <Stack mt={2} direction="row" justifyContent="flex-end">
            <Button
              variant="contained"
              color="primary"
              sx={{
                color: "primary.contrastText",
                textTransform: "capitalize",
                width: { xs: "100%", md: "15rem" },
              }}
              onClick={() => {
                setOpenUpdate(true);
                setReadOnly(false);
              }}
            >
              Thay đổi thông tin
            </Button>
          </Stack>
        )}
      </Box>
    </Box>
  );
};

export default UserInfo;
