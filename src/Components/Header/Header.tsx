import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "configStore";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "Slices/authSlice";
import { AppBar } from "@mui/material";
import SweetAlert from "react-sweetalert2";
import HeaderSmall from "./HeaderSmall/HeaderSmall";
import HeaderLarge from "./HeaderLarge/HeaderLarge";

const Header = () => {
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    setOpenSuccess(true);
  };

  const handleOpenConfirm = useCallback(() => {
    setOpenConfirm(true);
  }, []);

  return (
    <AppBar
      position="fixed"
      sx={{ height: "5rem", width: "100%", bgcolor: "paper.main" }}
    >
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

      <HeaderLarge onOpenConfirm={handleOpenConfirm} />
      <HeaderSmall onOpenConfirm={handleOpenConfirm} />
    </AppBar>
  );
};

export default Header;
