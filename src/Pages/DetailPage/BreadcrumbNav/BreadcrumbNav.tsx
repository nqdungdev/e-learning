import { Typography, Breadcrumbs, Box } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import CategoryIcon from "@mui/icons-material/Category";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import { NavLink } from "react-router-dom";
import { BreadcrumbText } from "_Playground/StyledComponents/DetailPage/detail.styled";

type Props = {
  secondLevel?: string;
  thirdLevel?: string;
  color?: string;
};

const BreadcrumbNav = ({ secondLevel, thirdLevel, color }: Props) => {
  return (
    <Box role="presentation">
      <Breadcrumbs
        sx={{ mb: 5, fontWeight: 700 }}
        color={color || "primary.contrastText"}
      >
        <NavLink to={"/"}>
          <BreadcrumbText color={color}>
            <HomeIcon sx={{ mr: 0.5 }} />
            Trang chủ
          </BreadcrumbText>
        </NavLink>

        {secondLevel ? (
          thirdLevel ? (
            <NavLink to={"/search"}>
              <BreadcrumbText color={color}>
                <CategoryIcon sx={{ mr: 0.5 }} />
                {secondLevel}
              </BreadcrumbText>
            </NavLink>
          ) : (
            <Typography
              sx={{ display: "flex", alignItems: "center" }}
              color="secondary.main"
            >
              <CategoryIcon sx={{ mr: 0.5 }} />
              {secondLevel}
            </Typography>
          )
        ) : (
          ""
        )}

        {thirdLevel ? (
          <Typography
            sx={{ display: "flex", alignItems: "center" }}
            color="secondary.main"
          >
            <AutoStoriesIcon sx={{ mr: 0.5 }} />
            {thirdLevel}
          </Typography>
        ) : (
          ""
        )}
      </Breadcrumbs>
    </Box>
  );
};

export default BreadcrumbNav;
