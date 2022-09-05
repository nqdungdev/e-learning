import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Icon,
} from "@mui/material";
import AltRouteIcon from "@mui/icons-material/AltRoute";
import FoundationIcon from "@mui/icons-material/Foundation";
import KeyIcon from "@mui/icons-material/Key";
import ScienceIcon from "@mui/icons-material/Science";
import GroupsIcon from "@mui/icons-material/Groups";
import BiotechIcon from "@mui/icons-material/Biotech";
import {
  FeatureText,
  FeatureTitle,
  Title,
} from "_Playground/StyledComponents/HomePage/home.styled";
import { theme } from "GlobalStyles";
import { featuresData } from "Interfaces/courseInterface";

const Features = () => {
  const data: featuresData[] = [
    {
      id: 1,
      title: "Học có lộ trình, định hướng cụ thể",
      desc: "Định hướng và đưa ra các lộ trình học lập trình nhằm phát triển năng lực và niềm đam mê lập trình của bạn.",
      icon: <AltRouteIcon />,
    },
    {
      id: 2,
      title: "Nền tảng, tư duy, cốt lõi trong lập trình",
      desc: "Cung cấp những nền tảng, giá trị tư duy cốt lõi nhất trong lập trình. Bạn sẽ tự tin trước sự thay đổi của công nghệ và môi trường làm việc.",
      icon: <FoundationIcon />,
    },
    {
      id: 3,
      title: "Trao tay chìa khóa thành công toàn diện",
      desc: "Hướng dẫn viết CV, phỏng vấn. Kết nối doanh nghiệp, gặp gỡ doanh nghiệp, phỏng vấn cùng doanh nghiệp ngay sau khi tốt nghiệp.",
      icon: <KeyIcon />,
    },
    {
      id: 4,
      title: "Mài giũa bạn qua kinh nghiệm, dự án thực tế",
      desc: "Đội ngũ Giảng viên và các Mentor là những người dày dạn kinh nghiệm qua các dự án thực tế tại các công ty lớn sẽ truyền đạt những kinh nghiệm 'máu lửa' cho bạn.",
      icon: <ScienceIcon />,
    },
    {
      id: 5,
      title: "Teamwork, Scrum-Agile. Mentor tận tâm",
      desc: "Bạn sẽ được giao dự án và làm theo Teamwork ngay từ ngày đầu tiên. Đóng vai trò một thành viên trong qui trình Scrum, Agile. Được Mentor hỗ trợ tân tâm, nhiệt tình.",
      icon: <GroupsIcon />,
    },
    {
      id: 6,
      title: "Công nghệ mới, chuyên sâu, thực tế",
      desc: "Bạn được học và trải nghiệm các công nghệ lập trình mới nhất, chuyên sâu, bám sát nhu cầu tuyển dụng thực tế từ doanh nghiệp.",
      icon: <BiotechIcon />,
    },
  ];

  return (
    <Box sx={{ py: 5, bgcolor: "paper.main", textAlign: "center" }}>
      <Container>
        <Title>Đặc điểm nổi bật</Title>
        <Grid container>
          {data.map((feature) => (
            <Grid key={feature.id} item xs={12} sm={6} md={4} p={1}>
              <Card
                sx={{
                  height: "100%",
                  bgcolor:
                    feature.id % 2 === 0 ? "secondary.main" : "paper.light",
                  border: "1px solid",
                  borderColor:
                    feature.id % 2 === 0 ? "primary.dark" : "secondary.main",
                }}
              >
                <CardActionArea
                  sx={{
                    height: "100%",
                  }}
                >
                  <CardContent
                    sx={{
                      height: "100%",
                      p: 3,
                    }}
                  >
                    <Icon
                      sx={{
                        color:
                          feature.id % 2 === 0
                            ? "secondary.contrastText"
                            : "paper.contrastText",
                      }}
                    >
                      {feature.icon}
                    </Icon>
                    <FeatureTitle
                      style={{ margin: "10px 0" }}
                      color={
                        feature.id % 2 === 0
                          ? theme.palette.secondary.contrastText
                          : theme.palette.paper.contrastText
                      }
                    >
                      {feature.title}
                    </FeatureTitle>
                    <FeatureText
                      color={
                        feature.id % 2 === 0
                          ? theme.palette.secondary.contrastText
                          : theme.palette.paper.contrastText
                      }
                    >
                      {feature.desc}
                    </FeatureText>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Features;
