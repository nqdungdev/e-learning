import { Fragment } from "react";
import Banner from "./Banner/Banner";
import CourseList from "./CourseList/CourseList";

type Props = {};

const HomePage = (props: Props) => {
  return (
    <Fragment>
      <Banner />
      <CourseList />
    </Fragment>
  );
};

export default HomePage;
