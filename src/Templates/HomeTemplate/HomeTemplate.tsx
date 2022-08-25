import Donors from "Components/Donors/Donors";
import Footer from "Components/Footer/Footer";
import Header from "Components/Header/Header";
import { Fragment } from "react";
import { Outlet } from "react-router-dom";

const HomeTemplate = () => {
  return (
    <Fragment>
      <Header />
      <Outlet />
      <Donors />
      <Footer />
    </Fragment>
  );
};

export default HomeTemplate;
