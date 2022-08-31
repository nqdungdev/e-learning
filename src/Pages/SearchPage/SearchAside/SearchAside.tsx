import { memo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "configStore";
import { useNavigate } from "react-router-dom";
import { Box, Divider, Stack, Typography } from "@mui/material";
import CategoryIcon from "@mui/icons-material/Category";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import SortByAlphaIcon from "@mui/icons-material/SortByAlpha";
import AddIcon from "@mui/icons-material/Add";
import { MenuItemText } from "_Playground/StyledComponents/HomePage/home.styled";
import { decreaseSort, increaseSort } from "Slices/courseSlice";

const SearchAside = () => {
  const [showCategory, setShowCategory] = useState(true);
  const [showSort, setShowSort] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  const { courseCatalog } = useSelector(
    (state: RootState) => state.courseSlice
  );

  return (
    <Box>
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
          <Typography ml={2}>Danh mục</Typography>
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
                py: 1,
              }}
              onClick={() =>
                navigate({
                  pathname: `/search/${category.maDanhMuc}`,
                  search: `?page=1&pageSize=6&MaNhom=GP01`,
                })
              }
            >
              <AddIcon sx={{ ml: 1 }} />
              <Typography ml={1}> {category.tenDanhMuc}</Typography>
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
          <Typography ml={2}>Sắp xếp</Typography>
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
          <AddIcon sx={{ ml: 1 }} />
          <Typography ml={1}>A-&gt;Z</Typography>
        </MenuItemText>

        <MenuItemText
          sx={{
            py: 1,
          }}
          onClick={() => dispatch(decreaseSort())}
        >
          <AddIcon sx={{ ml: 1 }} />
          <Typography ml={1}>Z-&gt;A</Typography>
        </MenuItemText>
      </Box>
      <Divider />
    </Box>
  );
};

export default memo(SearchAside);