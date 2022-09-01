import { useSelector } from "react-redux";
import { RootState } from "configStore";
import { useParams, useSearchParams } from "react-router-dom";
import { Alert, Box } from "@mui/material";
import { CardTitle } from "_Playground/StyledComponents/HomePage/home.styled";

const SearchAlert = () => {
  const [searchParams] = useSearchParams();

  const { courseListPaging, errorCourseListPaging } = useSelector(
    (state: RootState) => state.courseSlice
  );

  const { catalogId } = useParams();

  return (
    <Box>
      {!catalogId ? (
        errorCourseListPaging ? (
          <Alert severity="error">{errorCourseListPaging}</Alert>
        ) : (
          courseListPaging &&
          searchParams.get("tenKhoaHoc") !== "" && (
            <CardTitle>
              {courseListPaging.totalCount} kết quả tìm kiếm cho từ khóa "
              {searchParams.get("tenKhoaHoc")}"
            </CardTitle>
          )
        )
      ) : (
        <></>
      )}
    </Box>
  );
};

export default SearchAlert;
