import { memo, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "configStore";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Divider,
  Stack,
  Typography,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import CategoryIcon from "@mui/icons-material/Category";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import SortByAlphaIcon from "@mui/icons-material/SortByAlpha";
import AddIcon from "@mui/icons-material/Add";
import FilterListIcon from "@mui/icons-material/FilterList";
import { MenuItemText } from "_Playground/StyledComponents/HomePage/home.styled";
import { decreaseSort, increaseSort } from "Slices/courseSlice";

const SearchAside = () => {
  const [sort, setSort] = useState("");
  const [category, setCategory] = useState("");
  const [showCategory, setShowCategory] = useState(true);
  const [showSort, setShowSort] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  const { courseCatalog } = useSelector(
    (state: RootState) => state.courseSlice
  );

  const handleChangeSort = useCallback((event: SelectChangeEvent) => {
    setSort(event.target.value);
  }, []);

  const handleChange = useCallback((event: SelectChangeEvent) => {
    setCategory(event.target.value);
  }, []);

  return (
    <Box>
      <Stack
        justifyContent="flex-start"
        alignItems="center"
        direction="row"
        sx={{ mb: 1, display: { xs: "inline-flex", md: "none" } }}
      >
        <FilterListIcon />

        <FormControl
          sx={{
            mx: 3,
            width: "180px",
          }}
          size="small"
          color="secondary"
        >
          <InputLabel id="category-select-label">Danh mục</InputLabel>
          <Select
            labelId="category-select-label"
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

      <Box
        sx={{
          display: { xs: "none", md: "block" },
        }}
      >
        <Divider />
        <MenuItemText
          sx={{
            py: 2,
            display: "flex",
            justifyContent: "space-between",
          }}
          onClick={() => {
            setShowCategory((showCategory) => (showCategory = !showCategory));
          }}
        >
          <Stack direction="row">
            <CategoryIcon />
            <Typography sx={{ fontWeight: 700 }} ml={1}>
              Danh mục
            </Typography>
          </Stack>
          {showCategory ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </MenuItemText>

        <Box
          sx={{
            overflow: "hidden",
            height: showCategory ? "15rem" : 0,
            transition: "all 0.4s",
          }}
        >
          {courseCatalog.map((category) => {
            return (
              <MenuItemText
                key={category.maDanhMuc}
                value={category.maDanhMuc}
                sx={{
                  width: "100%",
                  py: 1,
                }}
                onClick={() =>
                  navigate({
                    pathname: `/search/${category.maDanhMuc}`,
                    search: `?page=1&pageSize=6&MaNhom=GP01`,
                  })
                }
              >
                <AddIcon />
                <Typography ml={1} title={category.tenDanhMuc}>
                  {category.tenDanhMuc}
                </Typography>
              </MenuItemText>
            );
          })}
        </Box>
        <Divider />
        <MenuItemText
          sx={{
            py: 2,
            display: "flex",
            justifyContent: "space-between",
          }}
          onClick={() => {
            setShowSort((showSort) => (showSort = !showSort));
          }}
        >
          <Stack direction="row">
            <SortByAlphaIcon />
            <Typography sx={{ fontWeight: 700 }} ml={2}>
              Sắp xếp
            </Typography>
          </Stack>
          {showSort ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </MenuItemText>
        <Box
          sx={{
            overflow: "hidden",
            height: showSort ? "5rem" : 0,
            transition: "all 0.4s",
          }}
        >
          <MenuItemText
            sx={{
              py: 1,
            }}
            onClick={() => dispatch(increaseSort())}
          >
            <AddIcon />
            <Typography ml={1}>A-&gt;Z</Typography>
          </MenuItemText>

          <MenuItemText
            sx={{
              py: 1,
            }}
            onClick={() => dispatch(decreaseSort())}
          >
            <AddIcon />
            <Typography ml={1}>Z-&gt;A</Typography>
          </MenuItemText>
        </Box>
        <Divider />
      </Box>
    </Box>
  );
};

export default memo(SearchAside);
