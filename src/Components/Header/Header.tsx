import React, { useState } from "react";

import {
  Container,
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Avatar,
  MenuItem,
  Stack,
} from "@mui/material";
// import { scroller } from "react-scroll";

import MenuIcon from "@mui/icons-material/Menu";
// import { HeaderAside } from "_Playground/StyledComponents/home.styled";
import { NavLink, useNavigate } from "react-router-dom";
// import { Link as LinkScroll } from "react-scroll";

import Logo from "Components/Logo/Logo";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "configStore";
// import { logoutUser } from "Slices/auth";
import { logoutUser } from "Slices/authSlice";
import SweetAlert from "react-sweetalert2";

const pages = [
  { name: "Lịch chiếu", id: "schedule" },
  { name: "Cụm rạp", id: "theater" },
  { name: "Tin tức", id: "news" },
  { name: "Ứng dụng", id: "app" },
];

type Props = {};

const Header = (props: Props) => {
  const dispatch = useDispatch<any>();
  const { userLogin } = useSelector((state: RootState) => state.authSlice);
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const navigate = useNavigate();

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);

  const handleLogout = () => {
    dispatch(logoutUser());
    setOpenSuccess(true);
  };

  return (
    <AppBar position="fixed" sx={{ height: "5rem" }} color="primary">
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
        <Toolbar disableGutters sx={{ height: "100%" }}>
          <Box
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
            }}
          >
            <Logo />
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            {/* <HeaderAside
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem>
                <NavLink to={"/"}>
                  <Box
                    sx={{
                      mr: 2,
                      display: { xs: "flex", md: "none" },
                    }}
                  >
                    <Logo />
                  </Box>
                </NavLink>
              </MenuItem>
              {pages.map((page, index) => (
                <MenuItem
                  key={index}
                  onClick={() => {
                    scroller.scrollTo(page.id, {
                      duration: 0,
                      smooth: true,
                      offset: -70,
                    });
                    handleCloseNavMenu();
                  }}
                >
                  <Typography
                    sx={{
                      m: 1,
                      // color: "primary.contrastText",
                      cursor: "pointer",
                      width: "100%",
                    }}
                  >
                    {page.name}
                  </Typography>
                </MenuItem>
              ))}
            </HeaderAside> */}
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page, index) => (
              <Typography
                sx={{
                  m: 2,
                  color: "primary.contrastText",
                  "&:hover": {
                    color: "secondary.main",
                  },
                  cursor: "pointer",
                }}
                key={index}
              >
                {/* <LinkScroll
                  to={page.id}
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={100}
                >
                  {page.name}
                </LinkScroll> */}
              </Typography>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {userLogin ? (
              <Stack direction="row">
                <NavLink to={"/user"}>
                  <Stack direction="row">
                    <IconButton sx={{ p: 0 }}>
                      <Avatar
                        alt="https://i.pravatar.cc"
                        src="https://i.pravatar.cc"
                      />
                    </IconButton>

                    <Typography
                      sx={{
                        m: 2,
                        color: "primary.contrastText",
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
                    color: "primary.contrastText",
                    cursor: "pointer",
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
              <Stack direction="row">
                <NavLink to={"/login"}>
                  <Typography
                    sx={{
                      m: 2,
                      color: "primary.contrastText",
                      "&:hover": {
                        color: "secondary.main",
                      },
                    }}
                  >
                    Đăng nhập
                  </Typography>
                </NavLink>
                <NavLink to={"/register"}>
                  <Typography
                    sx={{
                      m: 2,
                      color: "primary.contrastText",
                      "&:hover": {
                        color: "secondary.main",
                      },
                    }}
                  >
                    Đăng ký
                  </Typography>
                </NavLink>
              </Stack>
            )}
          </Box>
        </Toolbar>
      </Container>
      {/* <SweetAlertConfirm
        show={open}
        icon="question"
        title="Bạn muốn đăng xuất?"
        text="Bạn có muốn đăng nhập không?"
        callbackConfirm={() => {
          handleLogout();
        }}
        callbackClose={handleClose}
      />
      <SweetAlertSuccess
        show={openSuccess}
        title="Đăng xuất thành công!"
        navigateDestination={"/"}
      /> */}
    </AppBar>
  );
};

export default Header;
