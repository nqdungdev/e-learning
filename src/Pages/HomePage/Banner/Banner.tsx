import { Box } from "@mui/material";
import { Settings } from "Interfaces/slickInterfaces";
import Slider from "react-slick";
import banner_1 from "Assets/img/Banner/banner_1.jpg";
import banner_2 from "Assets/img/Banner/banner_2.jpg";
import CustomPrevArrow from "Components/CustomSlick/CustomPrevArrow";
import CustomNextArrow from "Components/CustomSlick/CustomNextArrow";
import BannerItem from "./BannerItem";

interface BannerData {
  image: string;
  title: string;
  text: string;
}

const banners: BannerData[] = [
  {
    image: banner_1,
    title: "Khai phá sức mạnh con người bạn.",
    text: "Tìm hiểu những gì chúng tôi có thể làm cho bạn.",
  },
  {
    image: banner_2,
    title: "Học tập cải thiện kỹ năng.",
    text: "Hãy bắt đầu với chúng tôi!",
  },
];

const Banner = () => {
  const settings: Settings = {
    dots: false,
    arrows: true,
    infinite: true,
    autoplaySpeed: 8000,
    speed: 2000,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    responsive: [
      {
        breakpoint: 900,
        settings: {
          arrows: false,
        },
      },
    ],
  };

  return (
    <Box sx={{ mt: "5rem" }}>
      <Slider {...settings}>
        {banners.map((banner, index) => (
          <BannerItem
            key={index}
            image={banner.image}
            title={banner.title}
            text={banner.text}
          />
        ))}
      </Slider>
    </Box>
  );
};

export default Banner;
