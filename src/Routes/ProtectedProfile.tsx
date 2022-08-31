import { RootState } from "configStore";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

type Props = {
  children: JSX.Element;
};

const ProtectedProfile = ({ children }: Props) => {
  const { userLogin } = useSelector((state: RootState) => state.authSlice);

  if (!userLogin) {
    return <Navigate to={"/"} />;
  }
  return children;
};

export default ProtectedProfile;
