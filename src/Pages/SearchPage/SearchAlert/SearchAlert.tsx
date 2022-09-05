import { useSelector } from "react-redux";
import { RootState } from "configStore";
import { useParams, useSearchParams } from "react-router-dom";
import { Alert, Box } from "@mui/material";
import { FeatureTitle } from "_Playground/StyledComponents/HomePage/home.styled";

const SearchAlert = () => {
  const [searchParams] = useSearchParams();

  const { courseListPaging, errorCourseListPaging } = useSelector(
    (state: RootState) => state.courseSlice
  );

  const { catalogId } = useParams();

  return (
    <Box sx={{ mb: 3 }}>
      {!catalogId ? (
        errorCourseListPaging ? (
          <Alert severity="error">{errorCourseListPaging}</Alert>
        ) : (
          courseListPaging &&
          searchParams.get("tenKhoaHoc") &&
          searchParams.get("tenKhoaHoc") !== "" && (
            <FeatureTitle>
              {courseListPaging.totalCount} kết quả tìm kiếm cho từ khóa "
              {searchParams.get("tenKhoaHoc")}"
            </FeatureTitle>
          )
        )
      ) : (
        <></>
      )}
    </Box>
  );
};

export default SearchAlert;
