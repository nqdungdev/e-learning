import { AppDispatch, RootState } from "configStore";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { postUserInfo } from "Slices/userSlice";
import { Box, Container, Grid } from "@mui/material";
import UserInfo from "./UserInfo/UserInfo";
import LoadingAPI from "Components/LoadingAPI/LoadingAPI";
import UserCatalog from "./UserCatalog/UserCatalog";
import UserPassword from "./UserPassword/UserPassword";
import RegisteredCourse from "./RegisteredCourse/RegisteredCourse";
import ErrorBoundary from "Components/ErrorBoundary/ErrorBoundary";

const ProfilePage = () => {
  const [selected, setSelected] = useState<number>(1);
  const dispatch = useDispatch<AppDispatch>();

  const { isUserInfoLoading, errorUserInfo } = useSelector(
    (state: RootState) => state.userSlice
  );

  useEffect(() => {
    dispatch(postUserInfo());
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    document.title = "Thông tin tài khoản";
  }, []);

  const handleSelect = (values: number) => {
    setSelected(values);
  };

  if (isUserInfoLoading) {
    return <LoadingAPI />;
  }

  if (errorUserInfo) {
    return <ErrorBoundary />;
  }

  return (
    <Box sx={{ mt: "5rem", py: 5 }} bgcolor="paper.main">
      <Container>
        <Grid container rowSpacing={2}>
          <Grid item xs={12} sm={5} md={4}>
            <UserCatalog onSelect={handleSelect} />
          </Grid>
          <Grid item xs={12} sm={7} md={8}>
            {selected === 1 && <UserInfo />}
            {selected === 2 && <UserPassword />}
            {selected === 3 && <RegisteredCourse />}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ProfilePage;
