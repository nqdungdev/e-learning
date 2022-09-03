import { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "configStore";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Grid,
  Stack,
  FormControl,
  InputLabel,
  Select,
  Typography,
  SelectChangeEvent,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchAside from "./SearchAside/SearchAside";
import BreadcrumbNav from "Pages/DetailPage/BreadcrumbNav/BreadcrumbNav";
import SearchContent from "./SearchContent/SearchContent";
import SearchAlert from "./SearchAlert/SearchAlert";
import { MenuItemText } from "_Playground/StyledComponents/HomePage/home.styled";
import { decreaseSort, increaseSort } from "Slices/courseSlice";

const SearchPage = () => {
  const [sort, setSort] = useState("");
  const [category, setCategory] = useState("");

  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();

  const { courseList, courseCatalog } = useSelector(
    (state: RootState) => state.courseSlice
  );

  useEffect(() => {
    document.title = "Tìm kiếm";
  }, []);

  const handleChangeSort = useCallback((event: SelectChangeEvent) => {
    setSort(event.target.value);
  }, []);

  const handleChange = useCallback((event: SelectChangeEvent) => {
    setCategory(event.target.value);
  }, []);

  return (
    <Box sx={{ py: 5, mt: "5rem", bgcolor: "paper.main" }}>
      <Container>
        <BreadcrumbNav
          secondLevel={courseList[0]?.danhMucKhoaHoc.tenDanhMucKhoaHoc}
          color="paper.contrastText"
        />
        <SearchAlert />

        <Stack
          justifyContent="flex-start"
          alignItems="center"
          direction="row"
          sx={{ mb: 1 }}
        >
          <FilterListIcon />

          <FormControl
            sx={{ mx: 3, width: "180px" }}
            size="small"
            color="secondary"
          >
            <InputLabel id="category-select">Danh mục</InputLabel>
            <Select
              labelId="category-select"
              id="category-select"
              value={category}
              label="Category"
              onChange={handleChange}
              sx={{
                bgcolor: "paper.main",
                borderColor: "secondary.main",
                color: "paper.contrastText",
              }}
            >
              {courseCatalog.map((category) => {
                return (
                  <MenuItemText
                    key={category.maDanhMuc}
                    value={category.maDanhMuc}
                    onClick={() =>
                      navigate({
                        pathname: `/search/${category.maDanhMuc}`,
                        search: `?page=1&pageSize=6&MaNhom=GP01`,
                      })
                    }
                  >
                    {category.tenDanhMuc}
                  </MenuItemText>
                );
              })}
            </Select>
          </FormControl>
          <FormControl
            sx={{
              width: "180px",
              display: { xs: "inline-flex", md: "none" },
            }}
            size="small"
            color="secondary"
          >
            <InputLabel id="category-select">Sắp xếp</InputLabel>
            <Select
              labelId="category-select"
              id="category-select"
              value={sort}
              label="Category"
              onChange={handleChangeSort}
              sx={{
                bgcolor: "paper.main",
                borderColor: "secondary.main",
                color: "paper.contrastText",
              }}
            >
              <MenuItemText
                value="increase"
                onClick={() => dispatch(increaseSort())}
              >
                <Typography ml={1}>A-&gt;Z</Typography>
              </MenuItemText>
              <MenuItemText
                value="decrease"
                onClick={() => dispatch(decreaseSort())}
              >
                <Typography ml={1}>Z-&gt;A</Typography>
              </MenuItemText>
            </Select>
          </FormControl>
        </Stack>

        <Grid container>
          <Grid
            item
            xs={0}
            md={3}
            sx={{ display: { xs: "none", md: "block" } }}
          >
            <Box
              sx={{
                width: "100%",
                overflow: "hidden",
              }}
            >
              <SearchAside />
            </Box>
          </Grid>

          <Grid item xs={12} md={9}>
            <SearchContent />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default SearchPage;
