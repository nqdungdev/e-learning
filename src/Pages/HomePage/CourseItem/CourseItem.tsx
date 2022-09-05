import { SyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardMedia,
  Box,
  CardActionArea,
  CardActions,
  Button,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import { Course } from "Interfaces/courseInterface";
import {
  FeatureTitle,
  FeatureText,
} from "_Playground/StyledComponents/HomePage/home.styled";
import Placeholder200x150 from "Assets/img/Placeholder/200x150.jpg";

type Props = {
  course: Course;
};

const CourseItem = ({ course }: Props) => {
  const navigate = useNavigate();

  const randomStar = (): number => {
    return Math.floor(Math.random() * 11) / 2;
  };

  const star: number = randomStar();

  return (
    <Box sx={{ mb: 2, mx: "auto", width: "100%", p: 1 }}>
      <Card sx={{ maxWidth: 240, width: "100%" }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="160"
            image={course.hinhAnh}
            onError={(error: SyntheticEvent<HTMLImageElement, Event>) =>
              (error.currentTarget.src = Placeholder200x150)
            }
            alt={course.hinhAnh}
          />
          <CardContent>
            <FeatureTitle title={course.tenKhoaHoc}>
              {course.tenKhoaHoc}
            </FeatureTitle>
            <FeatureText>{course.nguoiTao.hoTen}</FeatureText>
            <Stack direction="row" alignItems="center">
              <Typography color="secondary.main" sx={{ fontWeight: 700 }}>
                {star}
              </Typography>
              <Rating
                name="half-rating-read"
                value={star}
                precision={0.5}
                size="small"
                readOnly
              />
              <FeatureText
                title="Số lượng học viên"
                style={{ marginLeft: "5px" }}
              >
                ({course.soLuongHocVien})
              </FeatureText>
            </Stack>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            variant="contained"
            size="small"
            color="secondary"
            sx={{ color: "secondary.contrastText" }}
            onClick={() => navigate(`/detail/${course.maKhoaHoc}`)}
          >
            Chi tiết
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default CourseItem;
