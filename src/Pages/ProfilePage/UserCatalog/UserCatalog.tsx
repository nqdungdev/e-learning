import { Stack, Box, Button } from "@mui/material";
import { RootState } from "configStore";
import { useSelector } from "react-redux";
import { CardTitle } from "_Playground/StyledComponents/HomePage/home.styled";

type Props = {
  onSelect: (values: number) => void;
};

const UserCatalog = ({ onSelect }: Props) => {
  const { userInfo } = useSelector((state: RootState) => state.userSlice);

  return (
    <Stack
      sx={{ mb: { xs: 5, md: 0 }, pr: { xs: 0, sm: 4 } }}
      direction="column"
      alignItems="center"
    >
      <Box sx={{ borderRadius: "50%", overflow: "hidden" }}>
        <img
          src="https://i.pravatar.cc"
          alt="https://i.pravatar.cc"
          width="100%"
        />
      </Box>
      <CardTitle>{userInfo?.hoTen}</CardTitle>
      <Button
        variant="contained"
        color="secondary"
        sx={{
          color: "secondary.contrastText",
          textTransform: "capitalize",
          width: "100%",
          my: 1,
        }}
        onClick={() => {
          onSelect(1);
        }}
      >
        Thông tin tài khoản
      </Button>

      <Button
        variant="contained"
        color="secondary"
        sx={{
          color: "secondary.contrastText",
          textTransform: "capitalize",
          width: "100%",
          my: 1,
        }}
        onClick={() => {
          onSelect(2);
        }}
      >
        Đổi mật khẩu
      </Button>

      <Button
        variant="contained"
        color="secondary"
        sx={{
          color: "secondary.contrastText",
          textTransform: "capitalize",
          width: "100%",
          my: 1,
        }}
        onClick={() => {
          onSelect(3);
        }}
      >
        Khóa học đã đăng ký
      </Button>
    </Stack>
  );
};

export default UserCatalog;
