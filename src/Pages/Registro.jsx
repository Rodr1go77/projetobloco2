import React from "react";
import { useState } from "react";
import { Button, Typography, Grid, TextField , Stack, Avatar, Snackbar} from "../Components";
import logo1 from "../assets/images/logo1.png";
import Authentication from "../services/Authentication";
import { modeloData } from "../services/modelo";
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
  borderRadius: 0
}
};

export default function Registro() {

const[email, setEmail] = useState("");
const[password, setPassword] = useState("");  
const [confirmPassword, setConfirmPassword] = useState("");
const [error, setError] = useState(modeloData);
const [loading, setLoading] = useState(false);
const[message, setMessage] = useState("");

const handleRegister = async () => {
  setLoading(true);
  setError(modeloData); 
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (email === '') {
      setError((prev) => ({
          ...prev,
          email: { message: 'E-mail é obrigatório', show: true }
      }));
      return;
  }
  if (!emailRegex.test(email)) {
    setError((prev) => ({
      ...prev,
      email: {message: "E-mail inválido", show: true},
    }));
    return;
  }
  if (password === "") {
    setError((prev) => ({
      ...prev, 
      password: {message: "Senha é obrigatória.", show: true},
    }));
    return;
  }
if (password.length < 8) {
    setError((prev) => ({
      ...prev,
      password: {message: "A senha deve ter pelo menos 8 caracteres.", show: true},
    }));
    return;
  }
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/;
  if (!passwordRegex.test(password)) {
      setError((prev) => ({
          ...prev,
          password: { message: 'A senha deve conter pelo menos uma letra maiúscula, uma minúscula, um número e um caractere especial', show: true }
      }));
      return;
  }
  if (confirmPassword === "") {
    setError((prev) => ({
      ...prev,  
      confirmPassword: {message: "Confirmação de senha é obrigatória.", show: true},  
    }));
    return;
  }
  if (password !== confirmPassword) {
    setError((prev) => ({
      ...prev,
      confirmPassword: {message: "As senhas não coincidem.", show: true},
    }));
    return;
  }
  try {
   const {data,error} = await Authentication.register(email, password);
   if (error) {
    throw error;  
  }
    setMessage("Usuário registrado com sucesso!");
    console.log(data)
    console.log(JSON.stringify(data))
    } catch (error) {
    setMessage("Erro ao registrar usuário:" + error.message);
    console.log("Falha no registro", error)    
  }
  setLoading(false);
}

return (    
      <Grid container spacing={2} sx={styles.container}>
        <Grid  size = {{xs:0, sm: 0, md: 4, lg: 4, xl: 4.5}} />
        <Grid  
        size ={{xs:12, sm: 12, md: 4, lg: 4, xl: 3}}   
        sx={{ marginBottom: 1, display: "flex", flexDirection: "column",  justifyContent: "center", alignItems: "center", border: "4px solid #1976d2", borderRadius: "17px", p: 3, pb: 4}}>
          <Stack direction="row" spacing={2} sx={styles.stack}>
            <Avatar  src={logo1} sx={styles.avatar} ></Avatar>
          </Stack>
            <Typography > Cadastro de Usuário</Typography>
          <TextField
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label="E-mail" 
          type="email" 
          placeholder="Digite um e-mail válido:" 
          error={error.email.show}
          helperText={error.email.show ? error.email.message : ""}
          sx={{ width: "100%", margin: 1 }} 
          />
          <TextField 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          label="Senha" 
          placeholder="Digite sua senha:"
          type="password"  
          error={error.password.show}
          helperText={error.password.show ? error.password.message : ""}
          sx={{ width: "100%", margin: 1 }}
           />
          <TextField 
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirme sua senha:"
          label="Confimar senha" 
          type="password"  
          error={error.confirmPassword.show}
          helperText={error.confirmPassword.show ? error.confirmPassword.message : ""}
          sx={{ width: "100%", margin: 1 }} 
          />
          <Grid
          sx={{ 
            display: "flex",
            flexDirection: "column",
            marginTop: 2,
            width: "100%",
           }}>
            <Button 
            loading={loading}
            variant="contained"
            sx={{ margin: 1, fontSize: "1rem" }}
            onClick={handleRegister}
            > Registrar-se 
            </Button>
          </Grid>
          <Snackbar
            open={message !== ""}
            autoHideDuration={3000}
            onClose={() => setMessage("")}
            message={message}
            severity="info"
          />
          </Grid>
        </Grid>
      
      );
}
