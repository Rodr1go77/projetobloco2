import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Typography, Divider, autocompleteClasses } from "@mui/material";

export default function Main() {
  return (
    <>
      <Box
        sx={{
          marginBottom: 5,
          display: "flex",
          flexDirection: "column",
          width: 450,
          alignItems: "center",
          border: "2px solid white",
          borderRadius: "7px",
          padding: 4,
          margin: "auto",
        }}
      >
        <Typography
          sx={{ fontWeight: "bolder", fontSize: "2rem", marginBottom: 3, color: "white" }}
        >
          {" "}
          BET RIGHT
        </Typography>
        <TextField
          required
          id="outlined-required"
          label="Nome"
          defaultValue="Digite o seu nome:"
          sx={{ width: 400 }}
        />
        <Divider> Divisor </Divider>
        <TextField
          required
          id="outlined-required"
          label="E-mail"
          defaultValue="Digite o seu e-mail:"
          sx={{ width: 400 }}
        />
      </Box>
    </>
  );
}
