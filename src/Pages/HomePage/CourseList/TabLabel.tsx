import { Tabs, Tab, Stack } from "@mui/material";
import { memo, useCallback, useEffect, useState, SyntheticEvent } from "react";
import { AppDispatch, RootState } from "configStore";
import { useDispatch, useSelector } from "react-redux";
import { getCourseByCategory } from "Slices/courseSlice";

const TabLabel = () => {
  const [value, setValue] = useState("BackEnd");

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getCourseByCategory(value));
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const { courseCatalog } = useSelector(
    (state: RootState) => state.courseSlice
  );

  const handleChange = useCallback(
    (event: SyntheticEvent, newValue: string) => {
      setValue(newValue);
    },
    []
  );

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

export default memo(TabLabel);
