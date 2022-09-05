import { theme } from "GlobalStyles";
import { Typography, Link, Box, MenuList, MenuItem } from "@mui/material";
import styled from "styled-components";

export const Title = styled.h1<{ color?: string }>`
  color: ${({ color }) => (color ? color : theme.palette.paper.contrastText)};
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

//Header
export const OverlayHeader = styled(Box)`
  background-color: ${theme.palette.primary.dark};
  position: fixed;
  top: 5rem;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.5;
`;

export const MenuAside = styled(MenuList)`
  min-height: 100vh;
  height: max-content;
  background-color: ${theme.palette.paper.main};
  color: ${theme.palette.paper.contrastText};
  transition: all 0.4s;
  z-index: 10;
`;

export const MenuItemText = styled(MenuItem)`
  color: ${theme.palette.paper.contrastText} !important;
  &:hover {
    background-color: ${theme.palette.secondary.main} !important;
    color: ${theme.palette.secondary.contrastText} !important;
  }
  & > p {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

//Course item
export const FeatureTitle = styled.p<{ color?: string }>`
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  color: ${({ color }) => (color ? color : theme.palette.paper.contrastText)};
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.8rem;
`;

export const FeatureText = styled.p<{ color?: string }>`
  font-size: 0.8rem;
  font-weight: 500;
  line-height: 1.6rem;
  color: ${({ color }) => (color ? color : theme.palette.paper.contrastText)};
  opacity: 0.8;
`;

//Footer

export const TitleFooter = styled(Typography)`
  font-size: 0.9rem;
  font-weight: 400;
`;

export const TextFooter = styled(Typography)`
  color: #9e9e9e;
  font-size: 0.85rem;
  font-weight: 300;
  transition: all 0.4s;
`;

export const LinkFooter = styled(Link)`
  color: #9e9e9e !important;
  font-size: 0.85rem;
  font-weight: 300;
  transition: all 0.4s;
  &:hover {
    color: ${theme.palette.secondary.light} !important;
  }
`;
