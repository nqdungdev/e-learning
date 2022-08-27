import {
  Box,
  Container,
  Grid,
  Pagination,
  Stack,
  Alert,
  Button,
} from "@mui/material";
import CourseItem from "Pages/HomePage/CourseItem/CourseItem";
import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "configStore";
import {
  createSearchParams,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { getCourseByCategory, getCourseListPaging } from "Slices/courseSlice";
import SearchAside from "./SearchAside/SearchAside";
import FilterListIcon from "@mui/icons-material/FilterList";
import { Course, SearchParams } from "Interfaces/courseInterface";
import BreadcrumbNav from "Pages/DetailPage/BreadcrumbNav/BreadcrumbNav";

type Props = {};

const SearchPage = (props: Props) => {
  const [showAside, setShowAside] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  const { catalogId } = useParams();

  const dispatch = useDispatch<AppDispatch>();

  const { courseList, courseListPaging, errorCourseListPaging } = useSelector(
    (state: RootState) => state.courseSlice
  );

  const queryParams: SearchParams = {
    tenKhoaHoc: searchParams.get("tenKhoaHoc"),
    page: parseInt(searchParams.get("page") as any),
    pageSize: parseInt(searchParams.get("pageSize") as any),
    MaNhom: searchParams.get("MaNhom"),
  };

  console.log(courseList.length);
  console.log(courseListPaging);

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
  }, [queryParams.page, queryParams.pageSize, queryParams.tenKhoaHoc]);

  console.log(2);

  return (
    <Box sx={{ py: 5, mt: "5rem", bgcolor: "paper.main" }}>
      <Container>
        <BreadcrumbNav secondLevel={catalogId} color="paper.contrastText" />
        {errorCourseListPaging && (
          <Alert severity="error">{errorCourseListPaging}</Alert>
        )}
        <Stack alignItems="flex-start">
          <Button
            onClick={() => {
              setShowAside((showAside) => (showAside = !showAside));
              setSearchParams(
                createSearchParams({
                  tenKhoaHoc: searchParams?.get("tenKhoaHoc") || "",
                  page: searchParams?.get("page") || "1",
                  pageSize: !showAside ? "6" : "8",
                  MaNhom: "GP01",
                })
              );
            }}
          >
            <FilterListIcon />
          </Button>
        </Stack>
        <Grid container>
          <Grid
            item
            xs={showAside ? 3 : 0}
            sx={{ visibility: showAside ? "visible" : "hidden" }}
          >
            <Box
              sx={{
                width: showAside ? "100%" : 0,
                overflow: "hidden",
                transition: "all 0.4s",
              }}
            >
              <SearchAside />
            </Box>
          </Grid>

          <Grid
            item
            xs={showAside ? 9 : 12}
            sx={{ transition: showAside ? "all 0s" : "all 0.4s 0.4s" }}
          >
            <Grid container>
              {catalogId
                ? queryParams.page === 1
                  ? showAside
                    ? courseList.slice(0, 6).map((course: Course) => {
                        return (
                          <Grid
                            item
                            xs={showAside ? 4 : 3}
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
                            xs={showAside ? 4 : 3}
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
                          xs={showAside ? 4 : 3}
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
                          xs={showAside ? 4 : 3}
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
                        xs={showAside ? 4 : 3}
                        sx={{
                          transition: "all 0.4s",
                        }}
                        key={course.maKhoaHoc}
                      >
                        <CourseItem course={course} />
                      </Grid>
                    );
                  })}

              {courseListPaging && (
                <Grid item xs={12} pt={3}>
                  <Stack direction="row" justifyContent="center">
                    <Pagination
                      count={
                        showAside
                          ? courseList.length !== 0
                            ? courseList.length > 6
                              ? Math.floor(courseList.length / 7) + 1
                              : 1
                            : courseListPaging.totalPages
                          : courseList
                          ? courseList.length > 8
                            ? Math.floor(courseList.length / 9) + 1
                            : 1
                          : courseListPaging.totalPages
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
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default SearchPage;
