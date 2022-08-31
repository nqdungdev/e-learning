import { useEffect } from "react";
import { AppDispatch, RootState } from "configStore";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import { Settings } from "Interfaces/slickInterfaces";
import { getCourseByCategory } from "Slices/courseSlice";
import { Box, Container } from "@mui/material";
import CourseItem from "Pages/HomePage/CourseItem/CourseItem";
import { Title } from "_Playground/StyledComponents/HomePage/home.styled";

const DetailRelated = () => {
  const { course, courseList } = useSelector(
    (state: RootState) => state.courseSlice
  );

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (course)
      dispatch(getCourseByCategory(course?.danhMucKhoaHoc.maDanhMucKhoahoc));
    return () => {};
  }, [dispatch, course]);

  const settings: Settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 1000,
    autoplay: true,
    slidesToShow:
      courseList.length > 0 && courseList.length <= 4 ? courseList.length : 4,
    slidesToScroll: 2,
    rows: 1,
    responsive: [
      {
        breakpoint: 992,
        settings: {
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
          rows: 3,
        },
      },
    ],
  };
  return (
    <Box sx={{ py: 5, bgcolor: "paper.main" }}>
      <Container>
        <Title>Khóa học liên quan</Title>
        <Slider {...settings}>
          {courseList?.map((course) => {
            return <CourseItem key={course.maKhoaHoc} course={course} />;
          })}
        </Slider>
      </Container>
    </Box>
  );
};

export default DetailRelated;
