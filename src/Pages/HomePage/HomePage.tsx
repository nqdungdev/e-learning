import { Fragment, useEffect } from "react";
import Banner from "./Banner/Banner";
import CourseList from "./CourseList/CourseList";
import Features from "./Features/Features";

const HomePage = () => {
  useEffect(() => {
    document.title = "Trang chủ";
  }, []);

  return (
    <Fragment>
      <Banner />
      <CourseList />
      <Features />
    </Fragment>
  );
};

export default HomePage;
