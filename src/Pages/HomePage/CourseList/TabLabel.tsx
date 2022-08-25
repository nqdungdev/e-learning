import { Tabs, Tab, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { AppDispatch, RootState } from "configStore";
import { useDispatch, useSelector } from "react-redux";
import { getCourseByCategory, getCourseCatalog } from "Slices/courseSlice";

const TabLabel = () => {
  const [value, setValue] = useState("BackEnd");
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getCourseCatalog());
    return () => {};
  }, [dispatch]);

  useEffect(() => {
    dispatch(getCourseByCategory(value));
    return () => {};
  }, [value, dispatch]);

  const { courseCatalog } = useSelector(
    (state: RootState) => state.courseSlice
  );

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Stack alignItems="center" width="100%">
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        textColor="secondary"
        indicatorColor="secondary"
        scrollButtons
        allowScrollButtonsMobile
        sx={{ width: { xs: "100%", lg: "auto" } }}
      >
        {courseCatalog?.map((course) => (
          <Tab
            key={course.maDanhMuc}
            value={course.maDanhMuc}
            label={course.tenDanhMuc}
            sx={{ fontWeight: 700, textTransform: "capitalize" }}
          />
        ))}
      </Tabs>
    </Stack>
  );
};

export default TabLabel;
