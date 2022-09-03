import { Stack } from "@mui/material";
import { NavLink } from "react-router-dom";
import LogoElearning from "Assets/img/Logo/E-learning.png";

const Logo = () => {
  return (
    <Stack alignItems="center" justifyContent="center">
      <NavLink to={"/"}>
        <img src={LogoElearning} alt={LogoElearning} width="80rem" />
      </NavLink>
    </Stack>
  );
};

export default Logo;
