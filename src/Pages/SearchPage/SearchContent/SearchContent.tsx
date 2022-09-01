import { ChangeEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "configStore";
import {
  createSearchParams,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { getCourseByCategory, getCourseListPaging } from "Slices/courseSlice";
import { Grid, Pagination, Stack } from "@mui/material";
import CourseItem from "Pages/HomePage/CourseItem/CourseItem";
import { Course, SearchParams } from "Interfaces/courseInterface";

type Props = {
  showAside: boolean;
};

const SearchContent = ({ showAside }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { catalogId } = useParams();

  const dispatch = useDispatch<AppDispatch>();

  const { courseList, courseListPaging } = useSelector(
    (state: RootState) => state.courseSlice
  );

  const queryParams: SearchParams = {
    tenKhoaHoc: searchParams.get("tenKhoaHoc"),
    page: parseInt(searchParams.get("page") as any),
    pageSize: parseInt(searchParams.get("pageSize") as any),
    MaNhom: searchParams.get("MaNhom"),
  };

  useEffect(() => {
    if (catalogId) {
      dispatch(getCourseByCategory(catalogId));
    } else dispatch(getCourseListPaging(queryParams));
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    catalogId,
    queryParams.page,
    queryParams.pageSize,
    queryParams.tenKhoaHoc,
  ]);

  return (
    <Grid container>
      {catalogId
        ? queryParams.page === 1
          ? showAside
            ? courseList.slice(0, 6).map((course: Course) => {
                return (
                  <Grid
                    item
                    xs={showAside ? 6 : 4}
                    md={showAside ? 4 : 3}
                    sx={{
                      transition: "all 0.4s",
                    }}
                    key={course.maKhoaHoc}
                  >
                    <CourseItem course={course} />
                  </Grid>
                );
              })
            : courseList.slice(0, 8).map((course: Course) => {
                return (
                  <Grid
                    item
                    xs={showAside ? 6 : 4}
                    md={showAside ? 4 : 3}
                    sx={{
                      transition: "all 0.4s",
                    }}
                    key={course.maKhoaHoc}
                  >
                    <CourseItem course={course} />
                  </Grid>
                );
              })
          : showAside
          ? courseList.slice(6).map((course: Course) => {
              return (
                <Grid
                  item
                  xs={showAside ? 6 : 4}
                  md={showAside ? 4 : 3}
                  sx={{
                    transition: "all 0.4s",
                  }}
                  key={course.maKhoaHoc}
                >
                  <CourseItem course={course} />
                </Grid>
              );
            })
          : courseList.slice(8).map((course: Course) => {
              return (
                <Grid
                  item
                  xs={showAside ? 6 : 4}
                  md={showAside ? 4 : 3}
                  sx={{
                    transition: "all 0.4s",
                  }}
                  key={course.maKhoaHoc}
                >
                  <CourseItem course={course} />
                </Grid>
              );
            })
        : courseListPaging?.items?.map((course: Course) => {
            return (
              <Grid
                item
                xs={showAside ? 6 : 4}
                md={showAside ? 4 : 3}
                sx={{
                  transition: "all 0.4s",
                }}
                key={course.maKhoaHoc}
              >
                <CourseItem course={course} />
              </Grid>
            );
          })}

      {(courseList.length !== 0 || courseListPaging) && (
        <Grid item xs={12} pt={3}>
          <Stack direction="row" justifyContent="center">
            <Pagination
              count={
                courseList.length !== 0
                  ? showAside
                    ? courseList.length > 6
                      ? Math.floor(courseList.length / 7) + 1
                      : 1
                    : courseList.length > 8
                    ? Math.floor(courseList.length / 9) + 1
                    : 1
                  : courseListPaging?.totalPages
              }
              color="secondary"
              showFirstButton
              showLastButton
              page={queryParams.page || 1}
              onChange={(event: ChangeEvent<unknown>, value: number) => {
                setSearchParams(
                  createSearchParams({
                    tenKhoaHoc: searchParams?.get("tenKhoaHoc") || "",
                    page: `${value}`,
                    pageSize: showAside ? "6" : "8",
                    MaNhom: "GP01",
                  })
                );
              }}
            />
          </Stack>
        </Grid>
      )}
    </Grid>
  );
};

export default SearchContent;
