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
import LoadingAPI from "Components/LoadingAPI/LoadingAPI";
import ErrorAPI from "Components/ErrorAPI/ErrorAPI";

const SearchContent = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { catalogId } = useParams();

  const dispatch = useDispatch<AppDispatch>();

  const {
    courseByCatalog,
    courseListPaging,
    isCourseByCatalogLoading,
    isCourseListPagingLoading,
    errorCourseByCatalog,
    errorCourseListPaging,
  } = useSelector((state: RootState) => state.courseSlice);

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

  if (isCourseByCatalogLoading || isCourseListPagingLoading) {
    return <LoadingAPI />;
  }

  if (errorCourseListPaging && errorCourseByCatalog) {
    return <ErrorAPI />;
  }

  return (
    <Grid container spacing={1}>
      {!catalogId
        ? courseListPaging?.items.map((course: Course) => {
            return (
              <Grid
                item
                xs={6}
                sm={4}
                md={4}
                sx={{
                  transition: "all 0.4s",
                }}
                key={course.maKhoaHoc}
              >
                <CourseItem course={course} />
              </Grid>
            );
          })
        : courseByCatalog
            .slice(
              parseInt(searchParams.get("page") as any) * 6 - 6,
              (parseInt(searchParams.get("page") as any) + 1) * 6 - 6
            )
            .map((course: Course) => {
              return (
                <Grid
                  item
                  xs={6}
                  sm={4}
                  md={4}
                  sx={{
                    transition: "all 0.4s",
                  }}
                  key={course.maKhoaHoc}
                >
                  <CourseItem course={course} />
                </Grid>
              );
            })}

      <Grid item xs={12} pt={3}>
        <Stack direction="row" justifyContent="center">
          <Pagination
            count={
              catalogId
                ? courseByCatalog.length > 6
                  ? Math.floor(courseByCatalog.length / 7) + 1
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
                  pageSize: "6",
                  MaNhom: "GP01",
                })
              );
            }}
          />
        </Stack>
      </Grid>
    </Grid>
  );
};

export default SearchContent;
