import { Outlet } from "react-router-dom";
import { Paper, Stack, Box, Container } from "@mui/material";
import Logo from "Components/Logo/Logo";
import { OverlayBackground } from "_Playground/StyledComponents/LoginPage/login.styled";
import background_login from "Assets/img/Background/background_login.jpg";

const LoginTemplate = () => {
  return (
    <Box
      sx={{
        background: `url(${background_login}) 100% 100% / cover no-repeat`,
      }}
    >
      <Container>
        <Stack
          alignItems="center"
          justifyContent="center"
          sx={{
            minHeight: "100vh",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              zIndex: "100",
              left: "10px",
              top: "10px",
            }}
          >
            <Logo />
          </Box>
          <Box sx={{ position: "relative", zIndex: "10" }}>
            <Paper sx={{ pt: 3, pb: 5, px: 2 }}>
              <Outlet />
            </Paper>
          </Box>

          <OverlayBackground />
        </Stack>
      </Container>
    </Box>
  );
};

export default LoginTemplate;
