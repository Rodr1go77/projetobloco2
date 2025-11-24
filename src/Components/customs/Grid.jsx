import React from "react";
import {Grid as MuiGrid} from "@mui/material";

const Grid = (props) => {
  return (
    <MuiGrid {...props} sx={props.sx}>
      {props.children}
    </MuiGrid>
  );
}

export default Grid;
