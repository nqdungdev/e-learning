import { RootState } from "configStore";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

type Props = {
  children: JSX.Element;
};

const ProtectedLogin = ({ children }: Props) => {
  const { userLogin } = useSelector((state: RootState) => state.authSlice);

  const [userAvailable, setUserAvailable] = useState(false);

  useEffect(() => {
    if (userLogin) setUserAvailable(true);
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (userLogin && userAvailable) {
    return <Navigate to={"/"} />;
  }
  return children;
};

export default ProtectedLogin;
