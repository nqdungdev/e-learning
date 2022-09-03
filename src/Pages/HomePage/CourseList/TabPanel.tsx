import { memo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "configStore";
import { Box } from "@mui/material";
import Slider from "react-slick";
import { Settings } from "Interfaces/slickInterfaces";
import CourseItem from "../CourseItem/CourseItem";

const TabPanel = () => {
  const { courseByCatalog } = useSelector(
    (state: RootState) => state.courseSlice
  );
  const settings: Settings = {
    dots: true,
    arrows: false,
    infinite: true,
    autoplaySpeed: 5000,
    speed: 2000,
    autoplay: true,
    slidesToShow:
      courseByCatalog?.length > 0 && courseByCatalog?.length <= 4
        ? courseByCatalog?.length
        : 4,
    slidesToScroll: 2,
    rows: 1,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          arrows: false,
          slidesToShow:
            courseByCatalog?.length > 0 && courseByCatalog?.length <= 4
              ? courseByCatalog?.length
              : 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow:
            courseByCatalog?.length > 0 && courseByCatalog?.length <= 4
              ? courseByCatalog?.length
              : 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow:
            courseByCatalog?.length > 0 && courseByCatalog?.length <= 4
              ? courseByCatalog?.length
              : 1,
          slidesToScroll: 1,
          rows: 2,
        },
      },
    ],
  };

  return (
    <Box sx={{ mx: { xs: "auto", md: "-1.5rem" } }}>
      {
        <Box sx={{ p: 3 }}>
          <Slider {...settings}>
            {courseByCatalog?.map((course) => {
              return <CourseItem key={course.maKhoaHoc} course={course} />;
            })}
          </Slider>
        </Box>
      }
    </Box>
  );
};

export default memo(TabPanel);
