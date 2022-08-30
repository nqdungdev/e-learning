import { Box, TextField, Button, Stack, FormHelperText } from "@mui/material";
import { AppDispatch, RootState } from "configStore";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useLayoutEffect } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Title } from "_Playground/StyledComponents/HomePage/home.styled";

import { RegisterValues } from "Interfaces/userInterface";
import SweetAlert from "react-sweetalert2";
import { schemaPassword } from "./schemaPassword";

export interface UpdatePassword {
  matKhau: string;
  confirmPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

const UserPassword = () => {
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [readOnly, setReadOnly] = useState(true);
  const dispatch = useDispatch<AppDispatch>();
  const { userInfo, isUserInfoLoading } = useSelector(
    (state: RootState) => state.userSlice
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdatePassword>({
    defaultValues: {
      matKhau: `${userInfo?.matKhau}`,
      confirmPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    mode: "onTouched",
    resolver: yupResolver(schemaPassword),
  });

  const onSubmit = (values: UpdatePassword) => {
    //   delete values["passwordConfirm"];
  };
  const onError = (error: FieldErrors<RegisterValues>) => {
    console.log(error);
  };
  return (
    <Box>
      <SweetAlert
        show={openConfirm}
        icon="question"
        title="Bạn có muốn cập nhật?"
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
      <Title>Thay đổi mật khẩu</Title>
      <Box component="form" onSubmit={handleSubmit(onSubmit, onError)}>
        <TextField
          variant="outlined"
          margin="dense"
          required
          fullWidth
          label="Nhập mật khẩu cũ!"
          type="password"
          id="confirmPassword"
          color={errors.confirmPassword && !readOnly ? "warning" : "primary"}
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && (
          <FormHelperText id="confirmPassword-text" filled error>
            {errors.confirmPassword.message}
          </FormHelperText>
        )}

        <TextField
          variant="outlined"
          margin="dense"
          required
          fullWidth
          label="Nhập mật khẩu mới!"
          type="password"
          id="newPassword"
          color={errors.newPassword && "warning"}
          {...register("newPassword")}
        />

        {errors.newPassword && (
          <FormHelperText id="newPassword-text" filled error>
            {errors.newPassword.message}
          </FormHelperText>
        )}

        <TextField
          variant="outlined"
          margin="dense"
          required
          fullWidth
          label="Xác nhận mật khẩu mới!"
          type="password"
          id="confirmNewPassword"
          color={errors.confirmNewPassword && "warning"}
          {...register("confirmNewPassword")}
        />

        {errors.confirmNewPassword && (
          <FormHelperText id="confirmNewPassword-text" filled error>
            {errors.confirmNewPassword.message}
          </FormHelperText>
        )}

        <Stack mt={2} direction="row" justifyContent="flex-end">
          <Button
            variant="contained"
            color="success"
            // type="submit"
            sx={{ mr: 2 }}
            onClick={() => setOpenConfirm(true)}
          >
            Thay đổi mật khẩu
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default UserPassword;
