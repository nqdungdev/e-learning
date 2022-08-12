import { Box, Container } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "configStore";
import Slider from "react-slick";
import { Settings } from "Interfaces/slickInterfaces";
import TabPanel from "./TabPanel";
import TabLabel from "./TabLabel";
import CourseItem from "../CourseItem/CourseItem";

type Props = {};

const CourseList = (props: Props) => {
  const { courseList } = useSelector((state: RootState) => state.courseSlice);

  //  if (isMoviesLoading) {
  //    return <LoadingAPI />;
  //  }

  //  if (moviesError) {
  //    return <ErrorAPI />;
  //  }

  console.log(courseList);

  const settings: Settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 1000,
    autoplay: true,
    slidesToShow: courseList.length >= 4 ? 4 : courseList.length,
    slidesToScroll: 2,
    rows: 1,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          arrows: false,
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          rows: 3,
        },
      },
    ],
  };

  return (
    <Box id="schedule" sx={{ py: 5, bgcolor: "paper.main" }}>
      <Container>
        <Box sx={{ width: "100%" }}>
          <TabLabel />
          <TabPanel>
            <Slider {...settings}>
              {courseList?.map((course) => {
                return <CourseItem key={course.maKhoaHoc} course={course} />;
              })}
            </Slider>
          </TabPanel>
        </Box>
      </Container>
    </Box>
  );
};

export default CourseList;
