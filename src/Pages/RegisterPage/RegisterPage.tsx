import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { FieldErrors, useForm } from "react-hook-form";
import { schemaRegister } from "./schemaRegister";
import { yupResolver } from "@hookform/resolvers/yup";
import { AppDispatch, RootState } from "configStore";
import { RegisterValues } from "Interfaces/userInterface";
import { postRegisterUser } from "Slices/userSlice";
import {
  Avatar,
  Button,
  CircularProgress,
  Container,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import SweetAlert from "react-sweetalert2";

export const handleMouseDownPassword = (
  event: React.MouseEvent<HTMLButtonElement>
) => {
  event.preventDefault();
};

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPassWordConfirm, setShowPassWordConfirm] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();
  const { errorRegister, isRegisterLoading } = useSelector(
    (state: RootState) => state.userSlice
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      taiKhoan: "",
      matKhau: "",
      email: "",
      hoTen: "",
      soDT: "",
      passwordConfirm: "",
    },
    mode: "onTouched",
    resolver: yupResolver(schemaRegister),
  });

  const onSuccess = (values: RegisterValues) => {
    delete values["passwordConfirm"];
    dispatch(postRegisterUser(values))
      .then((res: any) => {
        if (res?.error?.message) setOpenError(true);
        else {
          setOpenSuccess(true);
        }
      })
      .catch((err) => console.log(err));
  };

  const onError = (error: FieldErrors<RegisterValues>) => {
    console.log(error);
  };

  useEffect(() => {
    document.title = "????ng k??";
  }, []);

  return (
    <Container component="main" maxWidth="sm">
      <SweetAlert
        show={openError}
        icon="error"
        title="C?? l???i x???y ra!!!"
        text={errorRegister || undefined}
        onConfirm={() => setOpenError(false)}
      />

      <SweetAlert
        show={openSuccess}
        icon="success"
        title="????ng k?? th??nh c??ng!!!"
        timer={2000}
        onConfirm={() => {
          setOpenSuccess(false);
          navigate("/login");
        }}
        didClose={() => {
          setOpenSuccess(false);
          navigate("/login");
        }}
      />

      <Stack alignItems="center">
        <Avatar
          sx={{ margin: "0.5rem", backgroundColor: "error.main" }}
        ></Avatar>
        <Typography component="h1" variant="h5" fontWeight="bold">
          ????ng k??
        </Typography>

        <form onSubmit={handleSubmit(onSuccess, onError)}>
          <Grid container columnSpacing={2} rowSpacing={0}>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="taiKhoan"
                label="T??i kho???n"
                autoComplete="taiKhoan"
                autoFocus
                color={errors.taiKhoan && "error"}
                {...register("taiKhoan")}
              />
              {errors.taiKhoan ? (
                <FormHelperText id="taiKhoan-text" filled error>
                  {errors.taiKhoan.message}
                </FormHelperText>
              ) : (
                <FormHelperText />
              )}
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="hoTen"
                label="H??? t??n"
                autoComplete="hoTen"
                color={errors.hoTen && "warning"}
                {...register("hoTen")}
              />
              {errors.hoTen ? (
                <FormHelperText id="hoTen-text" filled error>
                  {errors.hoTen.message}
                </FormHelperText>
              ) : (
                <FormHelperText />
              )}
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                type="email"
                color={errors.email && "warning"}
                {...register("email")}
              />
              {errors.email ? (
                <FormHelperText id="email-text" filled error>
                  {errors.email.message}
                </FormHelperText>
              ) : (
                <FormHelperText />
              )}
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="soDT"
                label="S??? ??i???n tho???i"
                autoComplete="soDT"
                color={errors.soDT && "warning"}
                {...register("soDT")}
              />
              {errors.soDT ? (
                <FormHelperText id="soDT-text" filled error>
                  {errors.soDT.message}
                </FormHelperText>
              ) : (
                <FormHelperText />
              )}
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="M???t kh???u"
                type={showPassword ? "text" : "password"}
                id="matKhau"
                autoComplete="current-password"
                color={errors.matKhau && "warning"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? (
                          <VisibilityIcon />
                        ) : (
                          <VisibilityOffIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                {...register("matKhau")}
              />
              {errors.matKhau ? (
                <FormHelperText id="matKhau-text" filled error>
                  {errors.matKhau.message}
                </FormHelperText>
              ) : (
                <FormHelperText />
              )}
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Nh???p l???i m???t kh???u"
                type={showPassWordConfirm ? "text" : "password"}
                id="passwordConfirm"
                autoComplete="password-confirm"
                color={errors.matKhau && "warning"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() =>
                          setShowPassWordConfirm(!showPassWordConfirm)
                        }
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassWordConfirm ? (
                          <VisibilityIcon />
                        ) : (
                          <VisibilityOffIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                {...register("passwordConfirm")}
              />
              {errors.passwordConfirm ? (
                <FormHelperText id="passwordConfirm-text" filled error>
                  {errors.passwordConfirm.message}
                </FormHelperText>
              ) : (
                <FormHelperText />
              )}
            </Grid>
          </Grid>

          <Button
            fullWidth
            variant="contained"
            sx={{
              py: 1,
              backgroundColor: "error.main",
              "&:hover": {
                backgroundColor: "error.dark",
              },
            }}
            type="submit"
          >
            {isRegisterLoading ? (
              <CircularProgress color="inherit" size={"1.5rem"} />
            ) : (
              "????NG K??"
            )}
          </Button>

          <Stack mt={2} alignItems="flex-end">
            <NavLink
              to={"/login"}
              style={{
                fontWeight: "500",
                fontSize: "0.875rem",
              }}
            >
              B???n ???? c?? t??i kho???n? ????ng nh???p
            </NavLink>
          </Stack>
        </form>
      </Stack>
    </Container>
  );
};

export default Register;
