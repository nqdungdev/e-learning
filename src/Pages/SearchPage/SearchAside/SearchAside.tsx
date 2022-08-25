import { memo, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "configStore";
import { Box, Paper, Typography } from "@mui/material";
import { MenuItemText } from "_Playground/StyledComponents/HomePage/home.styled";
import CategoryIcon from "@mui/icons-material/Category";
import { useNavigate } from "react-router-dom";

type Props = {};

const SearchAside = (props: Props) => {
  const [showCategory, setShowCategory] = useState(true);

  const navigate = useNavigate();

  const { courseCatalog } = useSelector(
    (state: RootState) => state.courseSlice
  );
  console.log(1);
  return (
    <Paper sx={{ border: "1px solid black" }}>
      <MenuItemText
        sx={{
          py: 2,
          borderBottom: "1px solid black",
        }}
        onClick={() => {
          setShowCategory((showCategory) => (showCategory = !showCategory));
        }}
      >
        <CategoryIcon />
        <Typography ml={2}>Danh mục</Typography>
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
                  search: `?page=1&pageSize=9&MaNhom=GP01`,
                })
              }
            >
              {/* <LabelImportantIcon sx={{ ml: 2 }} /> */}
              <Typography ml={5}> {category.tenDanhMuc}</Typography>
            </MenuItemText>
          );
        })}
      </Box>
    </Paper>
  );
};

export default memo(SearchAside);
