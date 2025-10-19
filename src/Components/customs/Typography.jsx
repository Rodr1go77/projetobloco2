import React from "react";
import { Typography as MuiTypography} from "@mui/material";

const Typography = ({ children }) => {
  return (
    <MuiTypography
      sx={{
        fontWeight: "bolder",
        fontSize: "2rem",
        marginBottom: 3,
        color: "white",
      }}
    >
      {children}
    </MuiTypography>
  );
};

export default Typography;
