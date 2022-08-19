import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "configStore";
import { NavLink, useNavigate } from "react-router-dom";
import { FieldErrors, useForm } from "react-hook-form";
import { logoutUser } from "Slices/authSlice";
import {
  Container,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Avatar,
  Stack,
  Paper,
  InputLabel,
  FormControl,
  SelectChangeEvent,
  Select,
  Button,
  TextField,
  InputAdornment,
  Box,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import SweetAlert from "react-sweetalert2";
import Logo from "Components/Logo/Logo";
import {
  MenuItemText,
  OverlayHeader,
} from "_Playground/StyledComponents/HomePage/home.styled";
import HeaderMenuAside from "./HeaderMenuAside";

const Header = () => {
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [category, setCategory] = useState("");
  const [showSearchField, setShowSearchField] = useState(false);
  const [showMenuAside, setShowMenuAside] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  const { userLogin } = useSelector((state: RootState) => state.authSlice);

  const { courseCatalog } = useSelector(
    (state: RootState) => state.courseSlice
  );

  const handleChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value);
  };

  const { register, handleSubmit } = useForm({
    defaultValues: {
      searchText: "",
    },
    mode: "onSubmit",
  });

  const onSuccess = (values: any) => {};
  const onError = (errors: FieldErrors<{ searchText: string }>) => {
    console.log(errors);
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    setOpenSuccess(true);
  };

  return (
    <AppBar position="fixed" sx={{ height: "5rem", bgcolor: "paper.main" }}>
      <SweetAlert
        show={openConfirm}
        icon="question"
        title="Bạn muốn đăng xuất?"
        confirmButtonText="Đồng ý"
        cancelButtonText="Hủy bỏ"
        showCancelButton={true}
        onConfirm={() => {
          handleLogout();
          setOpenSuccess(true);
        }}
        didClose={() => {
          setOpenConfirm(false);
        }}
      />

      <SweetAlert
        show={openSuccess}
        icon="success"
        title="Đăng xuất thành công!!!"
        confirmButtonText="Đồng ý"
        timer={2000}
        onConfirm={() => {
          setOpenSuccess(false);
        }}
        didClose={() => {
          setOpenSuccess(false);
          navigate("/");
        }}
      />

      <Container sx={{ height: "100%" }}>
        <Toolbar
          disableGutters
          sx={{
            height: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{
              display: { xs: "none", md: "flex" },
            }}
          >
            <Logo />
            <FormControl
              sx={{ mx: 3, width: "180px" }}
              size="small"
              color="secondary"
            >
              <InputLabel id="category-select">Danh mục</InputLabel>
              <Select
                labelId="category-select"
                id="category-select"
                value={category}
                label="Category"
                onChange={handleChange}
                sx={{
                  bgcolor: "paper.main",
                  borderColor: "secondary.main",
                  color: "paper.contrastText",
                }}
              >
                {courseCatalog.map((category) => {
                  return (
                    <MenuItemText
                      key={category.maDanhMuc}
                      value={category.maDanhMuc}
                    >
                      {category.tenDanhMuc}
                    </MenuItemText>
                  );
                })}
              </Select>
            </FormControl>
          </Stack>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              sx={{
                color: "paper.contrastText",
                transition: "all 0.4s",
                "&:hover": {
                  color: "secondary.main",
                },
              }}
              onClick={() => {
                setShowMenuAside(
                  (showMenuAside) => (showMenuAside = !showMenuAside)
                );
                setShowSearchField(false);
              }}
            >
              <MenuIcon />
            </IconButton>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <Logo />
          </Box>

          <Box sx={{ flexGrow: 0, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              sx={{
                color: "paper.contrastText",
                transition: "all 0.4s",
                "&:hover": {
                  color: "secondary.main",
                },
              }}
              onClick={() => {
                setShowSearchField(
                  (showSearchField) => (showSearchField = !showSearchField)
                );
                setShowMenuAside(false);
              }}
            >
              <SearchIcon />
            </IconButton>
          </Box>

          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{
              display: { xs: "none", md: "flex" },
            }}
          >
            <Paper
              component="form"
              sx={{
                display: "flex",
                alignItems: "center",
                width: "max-content",
                height: "max-content",
                mr: 3,
              }}
              onSubmit={handleSubmit(onSuccess, onError)}
            >
              <TextField
                label="Tìm kiếm"
                id="searchText"
                size="small"
                color="secondary"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton sx={{ mr: "-10px" }} type="submit">
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                {...register("searchText")}
              />
            </Paper>

            {userLogin ? (
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <NavLink to={"/user"}>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <IconButton sx={{ p: 0, height: "max-content" }}>
                      <Avatar
                        alt="https://i.pravatar.cc"
                        src="https://i.pravatar.cc"
                      />
                    </IconButton>

                    <Typography
                      sx={{
                        m: 2,
                        color: "paper.contrastText",
                        transition: "all 0.4s",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        "&:hover": {
                          color: "secondary.main",
                        },
                      }}
                    >
                      {userLogin.hoTen}
                    </Typography>
                  </Stack>
                </NavLink>

                <Typography
                  sx={{
                    m: 2,
                    color: "paper.contrastText",
                    cursor: "pointer",
                    transition: "all 0.4s",
                    whiteSpace: "nowrap",
                    "&:hover": {
                      color: "secondary.main",
                    },
                  }}
                  onClick={() => {
                    setOpenConfirm(true);
                  }}
                >
                  Đăng xuất
                </Typography>
              </Stack>
            ) : (
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <NavLink to={"/login"}>
                  <Button
                    variant="contained"
                    color="secondary"
                    sx={{
                      color: "secondary.contrastText",
                      textTransform: "capitalize",
                      width: "7rem",
                      mr: 1,
                    }}
                  >
                    Đăng nhập
                  </Button>
                </NavLink>
                <NavLink to={"/register"}>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{
                      color: "secondary.contrastText",
                      textTransform: "capitalize",
                      width: "7rem",
                    }}
                  >
                    Đăng ký
                  </Button>
                </NavLink>
              </Stack>
            )}
          </Stack>
        </Toolbar>
      </Container>

      <Paper
        sx={{
          display: { xs: "block", md: "none" },
          position: "absolute",
          top: "5rem",
          left: 0,
          width: "100%",
          height: "3.5rem",
          visibility: showSearchField ? "visible" : "hidden",
          opacity: showSearchField ? 1 : 0,
          transition: "all 0.4s",
          zIndex: 10,
        }}
      >
        <TextField
          label="Tìm kiếm"
          fullWidth
          color="secondary"
          sx={{ borderRadius: 0 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton sx={{ mr: "-10px" }} type="submit">
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          {...register("searchText")}
        />
      </Paper>

      <HeaderMenuAside
        showMenuAside={showMenuAside}
        onSetOpenConfirm={() => {
          setOpenConfirm(true);
        }}
      />

      <OverlayHeader
        sx={{
          display: { xs: "block", md: "none" },
          visibility: showMenuAside ? "visible" : "hidden",
        }}
        onClick={() => setShowMenuAside(false)}
      />
    </AppBar>
  );
};

export default Header;
