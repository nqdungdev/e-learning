import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "configStore";
import {
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { MenuItemText } from "_Playground/StyledComponents/HomePage/home.styled";

const HeaderCategory = () => {
  const [category, setCategory] = useState("");

  const { courseCatalog } = useSelector(
    (state: RootState) => state.courseSlice
  );

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
            <MenuItemText key={category.maDanhMuc} value={category.maDanhMuc}>
              {category.tenDanhMuc}
            </MenuItemText>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default HeaderCategory;
