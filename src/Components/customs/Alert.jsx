import React from "react";
import { Alert as MuiAlert, AlertTitle } from "@mui/material";

const Alert = (props) => {
  return (
    <MuiAlert {...props}>
      {props.alertTitle ? <AlertTitle>{props.alertTitle}</AlertTitle> : null}
      {props.children}
    </MuiAlert>
  );
};

export default Alert;
