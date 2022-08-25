import { useSelector } from "react-redux";
import { RootState } from "configStore";
import Slider from "react-slick";
import { Settings } from "Interfaces/slickInterfaces";
import { Box, Container, Typography } from "@mui/material";
import TabPanel from "./TabPanel";
import TabLabel from "./TabLabel";
import CourseItem from "../CourseItem/CourseItem";
import { Title } from "_Playground/StyledComponents/HomePage/home.styled";

type Props = {};

const CourseList = (props: Props) => {
  const { courseList } = useSelector((state: RootState) => state.courseSlice);

  const settings: Settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 5000,
    autoplay: true,
    slidesToShow:
      courseList.length > 0 && courseList.length <= 4 ? courseList.length : 4,
    slidesToScroll: 2,
    rows: 1,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          arrows: false,
          slidesToShow:
            courseList.length > 0 && courseList.length <= 4
              ? courseList.length
              : 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow:
            courseList.length > 0 && courseList.length <= 4
              ? courseList.length
              : 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow:
            courseList.length > 0 && courseList.length <= 4
              ? courseList.length
              : 1,
          slidesToScroll: 1,
          rows: 2,
        },
      },
    ],
  };

  return (
    <Box id="schedule" sx={{ py: 5, bgcolor: "paper.main" }}>
      <Container>
        <Title>Nhiều sự chọn lựa</Title>

        <Typography variant="h5" mb={2}>
          Với hàng nghìn khóa học trực tuyến được cập nhật và phát hành hàng
          tháng.
        </Typography>
        <TabLabel />
        <TabPanel>
          <Slider {...settings}>
            {courseList?.map((course) => {
              return <CourseItem key={course.maKhoaHoc} course={course} />;
            })}
          </Slider>
        </TabPanel>
      </Container>
    </Box>
  );
};

export default CourseList;
