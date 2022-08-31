import { memo, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "configStore";
import { theme } from "GlobalStyles";
import { NavLink } from "react-router-dom";
import {
  Avatar,
  Box,
  IconButton,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import CategoryIcon from "@mui/icons-material/Category";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import {
  MenuAside,
  MenuItemText,
} from "_Playground/StyledComponents/HomePage/home.styled";
import HeaderMenuCatalog from "./HeaderMenuCatalog";

type Props = {
  showMenuAside: boolean;
  onOpenConfirm?: () => void;
};

function important<T>(value: T): T {
  return (value + " !important") as any;
}

const HeaderMenuAside = ({ showMenuAside, onOpenConfirm }: Props) => {
  const [showCategory, setShowCategory] = useState(true);
  const { userLogin } = useSelector((state: RootState) => state.authSlice);

  return (
    <MenuAside
      sx={{
        display: { xs: "block", md: "none" },
        position: "absolute",
        top: "5rem",
        left: showMenuAside ? 0 : "-100%",
        width: { xs: "60%", sm: "40%" },
        p: 0,
      }}
    >
      {userLogin ? (
        <MenuItem
          sx={{
            bgcolor: "secondary.main",
            color: "secondary.contrastText",
            py: 3,
            "&:hover": {
              bgcolor: important(theme.palette.secondary.light),
            },
          }}
        >
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            width="100%"
          >
            <NavLink to={"/profile"}>
              <IconButton sx={{ p: 0, height: "max-content" }}>
                <Avatar
                  alt="https://i.pravatar.cc"
                  src="https://i.pravatar.cc"
                />
              </IconButton>

              <Typography
                sx={{
                  mt: 2,
                  color: "secondary.contrastText",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {userLogin?.hoTen}
              </Typography>
            </NavLink>
          </Stack>
        </MenuItem>
      ) : (
        <Box>
          <NavLink to={"/login"}>
            <MenuItemText
              sx={{
                py: 2,
              }}
            >
              <LoginIcon />
              <Typography ml={2}>Đăng nhập</Typography>
            </MenuItemText>
          </NavLink>
          <NavLink to={"/register"}>
            <MenuItemText
              sx={{
                py: 2,
              }}
            >
              <AppRegistrationIcon />
              <Typography ml={2}>Đăng ký</Typography>
            </MenuItemText>
          </NavLink>
        </Box>
      )}

      <MenuItemText
        sx={{
          py: 2,
        }}
        onClick={() => {
          setShowCategory((showCategory) => (showCategory = !showCategory));
        }}
      >
        <CategoryIcon />
        <Typography ml={2}>Danh mục</Typography>
      </MenuItemText>
      <HeaderMenuCatalog showCategory={showCategory} />

      {userLogin && (
        <MenuItemText
          sx={{
            py: 2,
          }}
          onClick={onOpenConfirm}
        >
          <LogoutIcon />
          <Typography ml={2}>Đăng xuất</Typography>
        </MenuItemText>
      )}
    </MenuAside>
  );
};

export default memo(HeaderMenuAside);
