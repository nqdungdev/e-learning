import { useEffect } from "react";
import { AppDispatch, RootState } from "configStore";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import { Settings } from "Interfaces/slickInterfaces";
import { getCourseByCategory } from "Slices/courseSlice";
import { Box, Container } from "@mui/material";
import CourseItem from "Pages/HomePage/CourseItem/CourseItem";
import { Title } from "_Playground/StyledComponents/HomePage/home.styled";
import LoadingAPI from "Components/LoadingAPI/LoadingAPI";
import ErrorAPI from "Components/ErrorAPI/ErrorAPI";

const DetailRelated = () => {
  const {
    course,
    courseByCatalog,
    isCourseByCatalogLoading,
    errorCourseByCatalog,
  } = useSelector((state: RootState) => state.courseSlice);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (course)
      dispatch(getCourseByCategory(course?.danhMucKhoaHoc.maDanhMucKhoahoc));
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [course]);

  const settings: Settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 1000,
    autoplay: true,
    slidesToShow:
      courseByCatalog.length > 0 && courseByCatalog.length <= 4
        ? courseByCatalog.length
        : 4,
    slidesToScroll: 2,
    rows: 1,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow:
            courseByCatalog.length > 0 && courseByCatalog.length <= 4
              ? courseByCatalog.length
              : 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow:
            courseByCatalog.length > 0 && courseByCatalog.length <= 4
              ? courseByCatalog.length
              : 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow:
            courseByCatalog.length > 0 && courseByCatalog.length <= 4
              ? courseByCatalog.length
              : 1,
          slidesToScroll: 1,
          rows: 3,
        },
      },
    ],
  };

  if (isCourseByCatalogLoading) {
    return <LoadingAPI />;
  }

  if (errorCourseByCatalog) {
    return <ErrorAPI />;
  }

  return (
    <Box sx={{ py: 5, bgcolor: "paper.main" }}>
      <Container>
        <Title>Khóa học liên quan</Title>
        <Slider {...settings}>
          {courseByCatalog?.map((course) => {
            return <CourseItem key={course.maKhoaHoc} course={course} />;
          })}
        </Slider>
      </Container>
    </Box>
  );
};

export default DetailRelated;
