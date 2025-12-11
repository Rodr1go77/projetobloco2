import {Divider as MuiDivider} from "@mui/material";

const Divider = (props) => {
  return (
    <MuiDivider {...props}>{props.children}</MuiDivider>
  );
};

export default Divider;