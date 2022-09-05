import { Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "configStore";
import { useParams } from "react-router-dom";
import { getCourseInfo } from "Slices/courseSlice";
import DetailCover from "./DetailCover/DetailCover";
import DetailOverView from "./DetailOverview/DetailOverView";
import DetailRelated from "./DetailRelated/DetailRelated";
import DetailFeatures from "./DetailFeatures/DetailFeatures";

const DetailPage = () => {
  const { courseId } = useParams();

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    document.title = "Chi tiết";
  }, []);

  useEffect(() => {
    if (courseId) dispatch(getCourseInfo(courseId));
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseId]);

  return (
    <Fragment>
      <DetailCover />
      <DetailOverView />
      <DetailFeatures />
      <DetailRelated />
    </Fragment>
  );
};

export default DetailPage;
