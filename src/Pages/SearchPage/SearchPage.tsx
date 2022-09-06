import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "configStore";
import { Box, Container, Grid } from "@mui/material";
import SearchAside from "./SearchAside/SearchAside";
import BreadcrumbNav from "Pages/DetailPage/BreadcrumbNav/BreadcrumbNav";
import SearchContent from "./SearchContent/SearchContent";
import SearchAlert from "./SearchAlert/SearchAlert";

const SearchPage = () => {
  const { courseByCatalog } = useSelector(
    (state: RootState) => state.courseSlice
  );

  useEffect(() => {
    document.title = "Tìm kiếm";
  }, []);

  return (
    <Box sx={{ py: 5, mt: "5rem", bgcolor: "paper.main" }}>
      <Container>
        <BreadcrumbNav
          secondLevel={courseByCatalog[0]?.danhMucKhoaHoc.tenDanhMucKhoaHoc}
          color="paper.contrastText"
        />
        <SearchAlert />

        <Grid container columns={20}>
          <Grid item xs={20} md={4}>
            <SearchAside />
          </Grid>

          <Grid item xs={20} md={16}>
            <SearchContent />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default SearchPage;
