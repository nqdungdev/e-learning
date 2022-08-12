import { Fragment } from "react";
import { Outlet } from "react-router-dom";

type Props = {};

const LoginTemplate = (props: Props) => {
  return (
    <Fragment>
      <Outlet />
    </Fragment>
  );
};

export default LoginTemplate;
