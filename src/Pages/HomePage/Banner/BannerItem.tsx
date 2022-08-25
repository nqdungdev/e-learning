import { Box, Card, CardContent, Typography } from "@mui/material";
import React from "react";
import { Title } from "_Playground/StyledComponents/HomePage/home.styled";

type Props = {
  image: string;
  title: string;
  text: string;
};

const BannerItem = ({ image, title, text }: Props) => {
  return (
    <Box
      sx={{
        position: "relative",
        backgroundImage: `url(${image})`,
        backgroundPosition: "100% 50%",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        paddingTop: { xs: "40%", lg: "30%" },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: { md: "30%", lg: "20%" },
          left: { md: "10%", lg: "5%" },
          zIndex: 10,
          display: { xs: "none", md: "block" },
        }}
      >
        <Card sx={{ maxWidth: "450px" }}>
          <CardContent>
            <Title>{title}</Title>
            <Typography>{text}</Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default BannerItem;
