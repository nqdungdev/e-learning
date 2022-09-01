import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "configStore";
import { createSearchParams, useSearchParams } from "react-router-dom";
import {
  Box,
  Container,
  Grid,
  Stack,
  Button,
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
  const [showAside, setShowAside] = useState(true);

  const [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useDispatch<AppDispatch>();

  const { courseList } = useSelector((state: RootState) => state.courseSlice);

  useEffect(() => {
    document.title = "Tìm kiếm";
  }, []);

  const handleChange = (event: SelectChangeEvent) => {
    setSort(event.target.value);
  };

  console.log(2);

  return (
    <Box sx={{ py: 5, mt: "5rem", bgcolor: "paper.main" }}>
      <Container>
        <BreadcrumbNav
          secondLevel={courseList[0]?.danhMucKhoaHoc.tenDanhMucKhoaHoc}
          color="paper.contrastText"
        />
        <SearchAlert />

        <Stack justifyContent="flex-start" direction="row" pt={5}>
          <Button
            onClick={() => {
              setShowAside((showAside) => (showAside = !showAside));
              setSearchParams(
                createSearchParams({
                  tenKhoaHoc: searchParams?.get("tenKhoaHoc") || "",
                  page: searchParams?.get("page") || "1",
                  pageSize: !showAside ? "6" : "8",
                  MaNhom: "GP01",
                })
              );
            }}
          >
            <FilterListIcon />
          </Button>

          <FormControl
            sx={{
              mx: 1,
              display: { xs: "inline-flex", md: "none" },
              visibility: showAside ? "visible" : "hidden",
              width: showAside ? "180px" : 0,
              transition: "all 0.4s",
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
              onChange={handleChange}
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
            xs={showAside ? 4 : 0}
            md={showAside ? 3 : 0}
            sx={{ visibility: showAside ? "visible" : "hidden" }}
          >
            <Box
              sx={{
                width: showAside ? "100%" : 0,
                overflow: "hidden",
                transition: "all 0.4s",
              }}
            >
              <SearchAside />
            </Box>
          </Grid>

          <Grid
            item
            xs={showAside ? 8 : 12}
            md={showAside ? 9 : 12}
            sx={{ transition: showAside ? "all 0s" : "all 0.4s 0.4s" }}
          >
            <SearchContent showAside={showAside} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default SearchPage;
