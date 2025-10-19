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

export default function Registro() {
  return (    
      <Grid container spacing={2} sx={styles.container}>

        <Grid  size = {{xs:0, sm: 0, md: 4, lg: 4, xl: 4.5}} />

        <Grid  size ={{xs:12, sm: 12, md: 4, lg: 4, xl: 3}}   sx={{ marginBottom: 5,  display: "flex", flexDirection: "column",  justifyContent: "center", alignItems: "center", border: "4px solid #1976d2", borderRadius: "17px", p: 3, pb: 4}}>
          <Stack direction="row" spacing={2} sx={styles.stack}>
            <Avatar  src={logo1} sx={styles.avatar} ></Avatar>
          </Stack>
          <Stack > 
            <Typography> Cadastro de Usuário</Typography>
          </Stack>
          <TextField label="Nome" defaultValue="Digite o seu nome:" sx={{ width: "100%", margin: 1 }} />
          <TextField label="Endereço" defaultValue="Digite o seu endereço:" sx={{ width: "100%", margin: 1 }} />
          <TextField label="Telefone" defaultValue="Digite o seu telefone:" sx={{ width: "100%", margin: 1 }} />
          <TextField label="Senha" defaultValue="Escolha uma senha:" type="password"  sx={{ width: "100%", margin: 1 }} />
          
          <Grid sx={{ display: "flex", justifyContent: "space-evenly", width: "100%" }}>
            <Button variant="contained"  sx={{ margin: 1, fontSize: "0.7rem", width: "200px" }}> Registrar-se </Button>
          </Grid>
          
          </Grid>
    
      </Grid>
      
      );
}
