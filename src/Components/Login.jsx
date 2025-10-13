import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {
  Typography,
  Button
} from "@mui/material";

export default function Main() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          marginBottom: 5,
          // height: "80vh",
          display: "flex",
          flexDirection: "column",
          width: 450,
          justifyContent: "center",
          alignItems: "center",
          border: "4px solid #1976d2",
          borderRadius: "17px",
          padding: 4,
          margin: "auto",
        }}
      >
        <Typography
          sx={{
            fontWeight: "bolder",
            fontSize: "2rem",
            marginBottom: 3,
            color: "white",
          }}
        >
          {" "}
          BET RIGHT
        </Typography>
        <TextField
          required
          id="outlined-required"
          label="Nome"
          defaultValue="Digite o seu nome:"
          sx={{ width: 400, margin: 3 }}
        />
        <TextField
          required
          id="outlined-required"
          label="E-mail"
          defaultValue="Digite o seu e-mail:"
          sx={{ width: 400, margin: 3 }}
        />
        <Box>
          <Button variant="contained">Login</Button>
          <Button variant="contained" sx={{margin: 1}}>Registre-se</Button>
          <Button variant="contained" sx={{margin: 1}}> Esqueci minha senha</Button>
        </Box>
      </Box>
    </Box>
  );
}
