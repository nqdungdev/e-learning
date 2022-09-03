import { Box, Container, Typography } from "@mui/material";
import TabPanel from "./TabPanel";
import TabLabel from "./TabLabel";
import { Title } from "_Playground/StyledComponents/HomePage/home.styled";

const CourseList = () => {
  return (
    <Box sx={{ py: 5, bgcolor: "paper.main" }}>
      <Container>
        <Title>Nhiều sự chọn lựa</Title>

        <Typography variant="h5" mb={2}>
          Với hàng nghìn khóa học trực tuyến được cập nhật và phát hành hàng
          tháng.
        </Typography>
        <TabLabel />
        <TabPanel />
      </Container>
    </Box>
  );
};

export default CourseList;
