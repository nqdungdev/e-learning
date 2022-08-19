import { Box } from "@mui/material";
import React, { memo } from "react";

type Props = {
  children?: React.ReactNode;
};

const TabPanel = (props: Props) => {
  const { children, ...other } = props;

  return (
    <Box role="tabpanel" {...other} sx={{ mx: "-1.5rem" }}>
      {<Box sx={{ p: 3 }}>{children}</Box>}
    </Box>
  );
};

export default memo(TabPanel);
