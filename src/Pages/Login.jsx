import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "../Components/default/Button";
import Typography from "../Components/default/Typography";
// import { supabase } from "./services/supabaseClient";

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
        <Typography> BET RIGHT</Typography>
        <TextField
          label="Nome"
          defaultValue="Digite o seu nome:"
          sx={{ width: 420, margin: 1 }}
        />
        <TextField
          label="E-mail"
          defaultValue="Digite o seu e-mail:"
          sx={{ width: 420, margin: 1 }}
        />
        <Box>
          <Button variant="contained" sx={{ margin: 1 }}>
            Login
          </Button>
          <Button variant="contained" sx={{ margin: 1 }}>
            Registre-se
          </Button>
          <Button variant="contained" sx={{ margin: 1 }}>
            {" "}
            Esqueci a minha senha
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
