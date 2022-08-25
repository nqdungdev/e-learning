import {
  Box,
  Container,
  Grid,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import CourseItem from "Pages/HomePage/CourseItem/CourseItem";
import { ChangeEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "configStore";
import {
  createSearchParams,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { getCourseByCategory, getCourseListPaging } from "Slices/courseSlice";
import SearchAside from "./SearchAside/SearchAside";
import { Course, SearchParams } from "Interfaces/courseInterface";

type Props = {};

const SearchPage = (props: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { catalogId } = useParams();

  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  const { courseList, courseListPaging, errorCourseListPaging } = useSelector(
    (state: RootState) => state.courseSlice
  );

  const queryParams: SearchParams = {
    tenKhoaHoc: searchParams.get("tenKhoaHoc"),
    page: parseInt(searchParams.get("page") as any),
    pageSize: parseInt(searchParams.get("pageSize") as any),
    MaNhom: searchParams.get("MaNhom"),
  };

  console.log(courseList?.slice(9));

  useEffect(() => {
    console.log(catalogId);
    if (catalogId) dispatch(getCourseByCategory(catalogId));
    return () => {};
  }, [catalogId]);

  useEffect(() => {
    console.log(queryParams);
    // if (Object.keys(queryParams).length !== 0) {
    dispatch(getCourseListPaging(queryParams));
    // } else {
    //   dispatch(getCourseListPaging());
    // }
    return () => {};
  }, [queryParams.page, queryParams.tenKhoaHoc]);

  console.log(2);

  return (
    <Box sx={{ py: 5, mt: "5rem", bgcolor: "paper.main" }}>
      <Container>
        {errorCourseListPaging && (
          <Typography>{errorCourseListPaging}</Typography>
        )}
        <Grid container>
          <Grid item xs={3}>
            <SearchAside />
          </Grid>

          <Grid item xs={9}>
            <Grid container>
              {catalogId
                ? queryParams.page === 1
                  ? courseList.slice(0, 9).map((course: Course) => {
                      return (
                        <Grid item xs={4} key={course.maKhoaHoc}>
                          <CourseItem course={course} />
                        </Grid>
                      );
                    })
                  : courseList.slice(9).map((course: Course) => {
                      return (
                        <Grid item xs={4} key={course.maKhoaHoc}>
                          <CourseItem course={course} />
                        </Grid>
                      );
                    })
                : courseListPaging?.items?.map((course: Course) => {
                    return (
                      <Grid item xs={4} key={course.maKhoaHoc}>
                        <CourseItem course={course} />
                      </Grid>
                    );
                  })}

              {courseListPaging && (
                <Grid item xs={12} pt={3}>
                  <Stack direction="row" justifyContent="center">
                    <Pagination
                      count={
                        (courseList.length > 9 && courseList.length / 10 + 1) ||
                        (courseList.length <= 9 && 1) ||
                        courseListPaging.totalPages
                      }
                      color="secondary"
                      showFirstButton
                      showLastButton
                      page={queryParams.page || 1}
                      onChange={(
                        event: ChangeEvent<unknown>,
                        value: number
                      ) => {
                        setSearchParams(
                          createSearchParams({
                            tenKhoaHoc: searchParams?.get("tenKhoaHoc") || "",
                            page: `${value}`,
                            pageSize: "9",
                            MaNhom: "GP01",
                          })
                        );
                      }}
                    />
                  </Stack>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default SearchPage;
