import { useSelector } from "react-redux";
import { RootState } from "configStore";
import LabelImportantIcon from "@mui/icons-material/LabelImportant";
import { Box, Typography } from "@mui/material";
import { MenuItemText } from "_Playground/StyledComponents/HomePage/home.styled";
type Props = { showCategory: boolean };

const HeaderMenuCatalog = ({ showCategory }: Props) => {
  const { courseCatalog } = useSelector(
    (state: RootState) => state.courseSlice
  );

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
