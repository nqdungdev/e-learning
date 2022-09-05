import { Box, Container, Grid, Icon, Stack } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

import ForumIcon from "@mui/icons-material/Forum";
import FindInPageIcon from "@mui/icons-material/FindInPage";
import InsightsIcon from "@mui/icons-material/Insights";
import { featuresData } from "Interfaces/courseInterface";
import {
  FeatureText,
  FeatureTitle,
} from "_Playground/StyledComponents/HomePage/home.styled";

const DetailFeatures = () => {
  const data: featuresData[] = [
    {
      id: 1,
      title: "Nâng cao kỹ năng nghề nghiệp của bạn",
      desc: "Bạn sẽ được cung cấp TẤT TẦN TẬT các kiến thức lập trình chuyên nghiệp, từ phân tích hệ thống, phân tích đối tượn, phân tích cơ sở dữ liệu, thao tác giao tiếp Backend và Frontend.",
      icon: <TrendingUpIcon />,
    },
    {
      id: 2,
      title: "Kết nối bạn với các chuyên gia lập trình",
      desc: "Bạn sẽ code 'Sặp mặt', không lý thuyết lan man bới các Giảng viên vô cùng tận tâm, cực kì chuyên nghiệp và vô cùng dễ hiểu, được support nhiệt tình mọi lúc cùng với MENTOR hỗ trợ suốt quá trình học. Và được kết nối đến nhiều doanh nghiệp sau khi hoàn thành khóa học.",
      icon: <ForumIcon />,
    },
    {
      id: 3,
      title: "Hãy để nhà tuyển dụng 'chốt đơn' ngay với bạn",
      desc: "Bạn sẽ được kết nối nhiều doanh nghiệp sau khi kết thúc khóa học. Bạn CHỨNG TỎ được với nhà tuyển dụng bạn có đầy đủ kinh nghiệm từng trải qua các dự án khi học, diều mà Doanh nghiệp luôn yêu cầu khi phỏng vấn.",
      icon: <FindInPageIcon />,
    },
    {
      id: 4,
      title: "Lộ trình được thiết kế cho cuộc sống bận rộn của bạn",
      desc: "Bạn có thể tham gia khóa học trực tiếp hoặc học online thoải mái tại nhà. Tài nguyên và hệ thống học tập vô cùng lớn và chuyên nghiệp. Bạn sẽ có hệ thống để thẩm định kiến thức học, hệ thống bài giảng và VIDEO đã được thu âm cực kì chất lượng.",
      icon: <InsightsIcon />,
    },
  ];

  return (
    <Box sx={{ py: 1, bgcolor: "paper.main" }}>
      <Container>
        <Grid container spacing={2}>
          {data.map((feature) => (
            <Grid item xs={12} sm={6} key={feature.id}>
              <Stack direction="row">
                <Icon>{feature.icon}</Icon>
                <Box ml={3}>
                  <FeatureTitle>{feature.title}</FeatureTitle>
                  <FeatureText>{feature.desc}</FeatureText>
                </Box>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default DetailFeatures;
