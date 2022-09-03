import { useSelector } from "react-redux";
import { RootState } from "configStore";
import { Box, Container } from "@mui/material";
import { DetailText } from "_Playground/StyledComponents/DetailPage/detail.styled";
import { Title } from "_Playground/StyledComponents/HomePage/home.styled";

const DetailOverView = () => {
  const { course } = useSelector((state: RootState) => state.courseSlice);

  return (
    <Box id="description" bgcolor="paper.main" py={5}>
      <Container>
        <Title style={{ textAlign: "center" }}>Giới thiệu khóa học</Title>
        <DetailText>{course?.moTa}</DetailText>
      </Container>
    </Box>
  );
};

export default DetailOverView;
