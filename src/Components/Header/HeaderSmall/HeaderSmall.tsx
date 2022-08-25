import { Fragment, memo, useState } from "react";
import { Box, Container, IconButton, Toolbar } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import Logo from "Components/Logo/Logo";
import HeaderMenuAside from "./HeaderMenuAside";
import { OverlayHeader } from "_Playground/StyledComponents/HomePage/home.styled";
import HeaderSearch from "../HeaderSearch/HeaderSearch";

type Props = {
  onOpenConfirm: () => void;
};

const HeaderSmall = ({ onOpenConfirm }: Props) => {
  const [showSearchField, setShowSearchField] = useState(false);
  const [showMenuAside, setShowMenuAside] = useState(false);

  return (
    <Fragment>
      <Container
        sx={{
          height: "100%",
          width: "100%",
          display: { xs: "flex", md: "none" },
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            height: "100%",
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              sx={{
                color: "paper.contrastText",
                transition: "all 0.4s",
                "&:hover": {
                  color: "secondary.main",
                },
              }}
              onClick={() => {
                setShowMenuAside(
                  (showMenuAside) => (showMenuAside = !showMenuAside)
                );
                setShowSearchField(false);
              }}
            >
              <MenuIcon />
            </IconButton>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <Logo />
          </Box>

          <Box sx={{ flexGrow: 0, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              sx={{
                color: "paper.contrastText",
                transition: "all 0.4s",
                "&:hover": {
                  color: "secondary.main",
                },
              }}
              onClick={() => {
                setShowSearchField(
                  (showSearchField) => (showSearchField = !showSearchField)
                );
                setShowMenuAside(false);
              }}
            >
              <SearchIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>

      <Box sx={{ display: { xs: "block", md: "none" } }}>
        <HeaderSearch showSearchField={showSearchField} />
      </Box>

      <HeaderMenuAside
        showMenuAside={showMenuAside}
        onOpenConfirm={onOpenConfirm}
      />

      <OverlayHeader
        sx={{
          display: { xs: "block", md: "none" },
          visibility: showMenuAside ? "visible" : "hidden",
        }}
        onClick={() => setShowMenuAside(false)}
      />
    </Fragment>
  );
};

export default memo(HeaderSmall);
