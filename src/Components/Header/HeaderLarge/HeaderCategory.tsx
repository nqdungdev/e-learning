import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "configStore";
import {
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { getCourseCatalog } from "Slices/courseSlice";
import { MenuItemText } from "_Playground/StyledComponents/HomePage/home.styled";
import { useNavigate } from "react-router-dom";

const HeaderCategory = () => {
  const [category, setCategory] = useState("");

  const dispatch = useDispatch<AppDispatch>();

  const { courseCatalog } = useSelector(
    (state: RootState) => state.courseSlice
  );

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCourseCatalog());
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value);
  };

  return (
    <FormControl sx={{ mx: 3, width: "180px" }} size="small" color="secondary">
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
  );
};

export default HeaderCategory;
