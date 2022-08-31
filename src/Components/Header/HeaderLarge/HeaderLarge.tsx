import { useSelector } from "react-redux";
import { RootState } from "configStore";
import { NavLink } from "react-router-dom";
import {
  Container,
  Toolbar,
  IconButton,
  Typography,
  Avatar,
  Stack,
  Button,
} from "@mui/material";
import Logo from "Components/Logo/Logo";
import HeaderCategory from "./HeaderCategory";
import HeaderSearch from "../HeaderSearch/HeaderSearch";
type Props = {
  onOpenConfirm: () => void;
};

const HeaderLarge = ({ onOpenConfirm }: Props) => {
  const { userLogin } = useSelector((state: RootState) => state.authSlice);

  return (
    <Container
      sx={{
        height: "100%",
        width: "100%",
        display: { xs: "none", md: "flex" },
      }}
    >
      <Toolbar
        disableGutters
        sx={{
          height: "100%",
          width: "100%",
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
          <HeaderCategory />
        </Stack>

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{
            display: { xs: "none", md: "flex" },
          }}
        >
          <HeaderSearch />

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
                      width: "5.5rem",
                      "&:hover": {
                        color: "secondary.main",
                      },
                    }}
                    title={userLogin.hoTen}
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
                onClick={onOpenConfirm}
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
  );
};

export default HeaderLarge;
