import GlobalStyles, { theme } from "GlobalStyles";
import { ThemeProvider } from "@mui/material";
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ErrorBoundary from "Components/ErrorBoundary/ErrorBoundary";
import LoadingLazy from "Components/LoadingLazy/LoadingLazy";
import HomeTemplate from "Templates/HomeTemplate/HomeTemplate";
import LoginTemplate from "Templates/LoginTemplate/LoginTemplate";
import ProtectedLogin from "Routes/ProtectedLogin";

const HomePage = lazy(() => import("Pages/HomePage/HomePage"));
const LoginPage = lazy(() => import("Pages/LoginPage/LoginPage"));
const RegisterPage = lazy(() => import("Pages/RegisterPage/RegisterPage"));

function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingLazy />}>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <Routes>
              <Route path="" element={<HomeTemplate />}>
                <Route index element={<HomePage />} />
              </Route>
              <Route path="/" element={<LoginTemplate />}>
                <Route
                  path="login"
                  element={
                    <ProtectedLogin>
                      <LoginPage />
                    </ProtectedLogin>
                  }
                />
                <Route path="register" element={<RegisterPage />} />
              </Route>
              <Route path="*" element={<Navigate to={"/"} />} />
            </Routes>
            <GlobalStyles />
          </ThemeProvider>
        </BrowserRouter>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
