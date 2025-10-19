import { avatarClasses } from "@mui/material";
import { Box, Button, Typography, Grid, TextField , Stack, Avatar} from "../Components";
import logo1 from "../assets/images/logo1.png";

// import { supabase } from "./services/supabaseClient";

const styles  = {
stack: {
  color: "#080808ff",
  padding: "10px",
  textAlign: "center",  
},
container: {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  marginTop: 2,
  marginBottom: 2,
},
avatar: {
  width: 250,
  height: 250,
}
};

export default function Login() {
  return (    
      <Grid container spacing={2} sx={styles.container}>

        <Grid  size = {{xs:0, sm: 0, md: 4, lg: 4, xl: 4.5}} />

        <Grid  size ={{xs:12, sm: 12, md: 4, lg: 4, xl: 3}}   sx={{ marginBottom: 5,  display: "flex", flexDirection: "column",  justifyContent: "center", alignItems: "center", border: "4px solid #1976d2", borderRadius: "17px", p: 3, pb: 4}}>
          <Stack direction="row" spacing={2} sx={styles.stack}>
            <Avatar  src={logo1} sx={styles.avatar} ></Avatar>
          </Stack>
          <Stack > 
            <Typography> Bem vindo de volta! </Typography>
          </Stack>
          <TextField label="E-mail" defaultValue="Digite o seu e-mail:" sx={{ width: "100%", margin: 1 }} />
          <TextField label="Senha" type="password"  sx={{ width: "100%", margin: 1 }} />
          <TextField label="Confirmar Senha" type="password"  sx={{ width: "100%", margin: 1 }} />
      
          <Grid sx={{ display: "flex", justifyContent: "space-evenly", width: "100%" }}>
            <Button variant="contained" sx={{ margin: 1, fontSize: "0.7rem" }}> Fazer Login </Button>
            <Button variant="contained"  sx={{ margin: 1, fontSize: "0.7rem", width: "200px" }}> Registrar-se </Button>
            <Button variant="contained" sx={{ margin: 1, fontSize: "0.7rem" }}>Esqueci a senha </Button>
          </Grid>
          
          </Grid>
    
      </Grid>
      
      );
}


/* Versao anterior */
      {/* <Box
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
            width: 300,
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
            sx={{ width: 330, margin: 1 }}
          />
          <TextField
            label="E-mail"
            defaultValue="Digite o seu e-mail:"
            sx={{ width: 330, margin: 1 }}
          />
          <Box sx={{ display: "flex" }}>
            <Button variant="contained" sx={{ margin: 1, fontSize: "0.7rem" }}>
              Login
            </Button>
            <Button
              variant="contained"
              sx={{ margin: 1, fontSize: "0.7rem", width: "140px" }}
            >
              Registre-se
            </Button>
            <Button variant="contained" sx={{ margin: 1, fontSize: "0.7rem" }}>
              {" "}
              Esqueci a senha
            </Button>
          </Box>
        </Box>
      </Box> */}