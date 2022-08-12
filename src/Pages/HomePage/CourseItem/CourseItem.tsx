import {
  Card,
  CardContent,
  CardMedia,
  Box,
  CardActionArea,
  CardActions,
  Button,
} from "@mui/material";
import { Course } from "Interfaces/courseInterface";
import { TitleText, DescText } from "_Playground/StyledComponents/home.styled";

type Props = {
  course: Course;
};

const CourseItem = ({ course }: Props) => {
  return (
    <Box sx={{ px: 1 }}>
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="160"
            image={course.hinhAnh}
            alt={course.hinhAnh}
          />
          <CardContent>
            <TitleText gutterBottom variant="h5" title={course.tenKhoaHoc}>
              {course.tenKhoaHoc}
            </TitleText>
            <DescText variant="body2" color="text.secondary">
              {course.moTa}
            </DescText>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Chi tiết
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default CourseItem;
