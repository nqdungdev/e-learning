import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "configStore";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getCourseCatalog } from "Slices/courseSlice";
import { Box, Typography } from "@mui/material";
import LabelImportantIcon from "@mui/icons-material/LabelImportant";
import { MenuItemText } from "_Playground/StyledComponents/HomePage/home.styled";
type Props = { showCategory: boolean };

const HeaderMenuCatalog = ({ showCategory }: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  const { courseCatalog } = useSelector(
    (state: RootState) => state.courseSlice
  );

  useEffect(() => {
    dispatch(getCourseCatalog());
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const navigate = useNavigate();

  return (
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
            <LabelImportantIcon sx={{ ml: 2 }} />
            <Typography ml={2}> {category.tenDanhMuc}</Typography>
          </MenuItemText>
        );
      })}
    </Box>
  );
};

export default HeaderMenuCatalog;
