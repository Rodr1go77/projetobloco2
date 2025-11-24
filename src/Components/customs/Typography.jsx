import React from "react";
import { Typography as MuiTypography} from "@mui/material";

const Typography = ({ children, ...rest }) => {
  return (
    <MuiTypography {...rest}>
      {children}
    </MuiTypography>
  );
};

export default Typography;
