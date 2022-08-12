import { useEffect, useRef, useState } from "react";
import { Navigate, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import {
  Avatar,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  InputAdornment,
  IconButton,
  Alert,
  CircularProgress,
  Stack,
  FormHelperText,
} from "@mui/material";
// import { makeStyles } from "@mui/styles";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { schemaLogin } from "./schemaLogin";
import { yupResolver } from "@hookform/resolvers/yup";
import { AppDispatch, RootState } from "configStore";
import { postLoginUser } from "Slices/authSlice";
import { LoginValues } from "Interfaces/userInterface";
// import { makeStyles } from "@mui/styles";
// import SweetAlert2 from "react-sweetalert2";

type Props = {};

type LocationState = {
  prevRoute: {
    pathname: string;
  };
};

export const handleMouseDownPassword = (
  event: React.MouseEvent<HTMLButtonElement>
) => {
  event.preventDefault();
};

const LoginPage = (props: Props) => {
  //   const classes = useStyles();
  const dispatch = useDispatch<AppDispatch>();
  const [modalOpen, setModalOpen] = useState(false);
  const [swalProps, setSwalProps] = useState({});

  //   const { errorLogin, isLoading, user, availableUser } = useSelector(
  //     (state: RootState) => state.auth
  //   );
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({
    defaultValues: {
      taiKhoan: "",
      matKhau: "",
    },
    mode: "onTouched",
    resolver: yupResolver(schemaLogin),
  });
  const onSuccess = async (values: LoginValues) => {
    dispatch(postLoginUser(values));
    // try {
    //   await dispatch(loginUser(values)).unwrap();
    //   setModalOpen(true);
    // } catch (error) {
    //   // console.log(error);
    // }
  };

  const onError = () => {
    // console.log(error);
  };

  const location = useLocation();
  const navigate = useNavigate();
  const navigateDestination = () => {
    if (location.state) {
      const { prevRoute } = location.state as LocationState;
      if (prevRoute.pathname === "/form/sign-up") {
        navigate("/");
        // dispatch(setAvailableUser());
        return;
      }
    }
    navigate(-1);
    // dispatch(setAvailableUser());
  };
  useEffect(() => {
    setSwalProps({
      show: modalOpen,
      position: "center",
      icon: "success",
      title: "Đăng nhập thành công",
      showConfirmButton: true,
      timer: 2500,
    });
  }, [modalOpen]);

  useEffect(() => {
    document.title = "Đăng nhập";
    // setAvailableUser(false);
  }, []);

  //   if (user && availableUser) {
  //     return <Navigate to={"/"} />;
  //   }
  return (
    <Container component="main" maxWidth="sm">
      {/* <SweetAlertSuccess
        show={modalOpen}
        navigateDestination={navigateDestination()}
      /> */}
      {/* <SweetAlert2 {...swalProps} didClose={navigateDestination} /> */}

      <Stack alignItems="center">
        <Avatar
          sx={{ margin: "0.5rem", backgroundColor: "error.main" }}
        ></Avatar>
        <Typography component="h1" variant="h5" fontWeight="bold">
          Đăng nhập
        </Typography>
        <form onSubmit={handleSubmit(onSuccess, onError)}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="taiKhoan"
            label="Tài khoản"
            autoComplete="taiKhoan"
            autoFocus
            color={errors.taiKhoan && "error"}
            {...register("taiKhoan")}
          />
          {errors.taiKhoan ? (
            <FormHelperText id="taiKhoan-text" error>
              {errors.taiKhoan.message}
            </FormHelperText>
          ) : (
            <FormHelperText id="taiKhoan-text"></FormHelperText>
          )}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Mật khẩu"
            type={showPassword ? "text" : "matKhau"}
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
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            {...register("matKhau")}
          />
          {errors.matKhau ? (
            <FormHelperText id="matKhau-text" error>
              {errors.matKhau.message}
            </FormHelperText>
          ) : (
            <FormHelperText id="matKhau-text"></FormHelperText>
          )}
          <FormControlLabel
            control={<Checkbox value="remember" color="error" />}
            label="Nhớ tài khoản"
          />
          {/* {errorLogin && (
            <Alert severity="error" sx={{ fontWeight: "600" }}>
              {errorLogin}
            </Alert>
          )} */}
          <Button
            fullWidth
            variant="contained"
            sx={{
              margin: "1rem 0",
              backgroundColor: "error.main",
              "&:hover": {
                backgroundColor: "error.dark",
              },
            }}
            type="submit"
          >
            {/* {isLoading ? <CircularProgress color="inherit" /> : "ĐĂNG NHẬP"} */}
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Quên mật khẩu?
              </Link>
            </Grid>
            <Grid item>
              <NavLink
                to={"/register"}
                style={{
                  textDecoration: "underline",
                  fontWeight: "600",
                  fontSize: "0.875rem",
                  color: "#212121",
                  textDecorationColor: "rgba(33, 33, 33, 0.4)",
                }}
              >
                Bạn chưa có tài khoản? Đăng kí
              </NavLink>
            </Grid>
          </Grid>
        </form>
        <Box mt={8}>{/* <Copyright /> */}</Box>
      </Stack>
    </Container>
  );
};

export default LoginPage;
