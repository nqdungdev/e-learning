import { Box } from "@mui/material";
import Loading from "Assets/img/Loading/loading.gif";

const LoadingLazy = () => {
  return (
    <Box
      sx={{
        background: `url(${Loading}) center center / cover no-repeat`,
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
      }}
    />
  );
};

export default LoadingLazy;
