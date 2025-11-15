import React from "react";
import { useState } from "react";
import {
  Button,
  Typography,
  Grid,
  TextField,
  Stack,
  Avatar,
  Snackbar,
} from "../Components";
import logo1 from "../assets/images/logo1.png";
import { modeloData } from "../services/modelo";
import Authentication from "../services/Authentication";
// import { supabase } from "./services/supabaseClient";
import { useNavigate } from "react-router";
import RoutesPath from "../routes/RoutesPath";

const styles = {
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
    marginTop: 14,
    marginBottom: 2,
  },
  avatar: {
    width: 250,
    height: 250,
  },
};

export default function Login({onLoginSuccess}) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(modeloData);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    setError(modeloData);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "") {
      setError((prev) => ({
        ...prev,
        email: { message: "E-mail é obrigatório", show: true },
      }));
      return;
    }
    if (!emailRegex.test(email)) {
      setError((prev) => ({
        ...prev,
        email: { message: "E-mail inválido", show: true },
      }));
      return;
    }
    if (password === "") {
      setError((prev) => ({
        ...prev,
        password: { message: "A senha é obrigatória.", show: true },
      }));
      return;
    }
    try {
      const { data, error } = await Authentication.login(email, password);
      if (error) {
        throw error;
      }
      setMessage("Login efetuado com sucesso!");
      console.log(JSON.stringify(data));
      navigate(RoutesPath.LISTA_PARTIDAS);
      setTimeout(() => {
        if (onLoginSuccess) onLoginSuccess();
      }, 3000);
    } catch (error) {
      if (error.message === "Invalid login credentials") {
        setMessage ("E-mail ou senha incorretos.");
      } else {
        setMessage("Falha no login:" + error.message);
      }
      console.log("Falha no login", error);
    }
    setLoading(false);
  };

  return (
    <Grid container spacing={2} sx={styles.container}>
      <Grid size={{ xs: 0, sm: 0, md: 4, lg: 4, xl: 4.5 }} />

      <Grid
        size={{ xs: 12, sm: 12, md: 4, lg: 4, xl: 3 }}
        sx={{
          marginBottom: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          border: "4px solid #1976d2",
          borderRadius: "17px",
          p: 2,
          pb: 4,
        }}
      >
        <Stack direction="row" spacing={2} sx={styles.stack}>
          <Avatar src={logo1} sx={styles.avatar}></Avatar>
        </Stack>
          <Typography marginBottom={1} > Bem vindo! </Typography>
        <TextField
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={error.email.show}
          helperText={error.email.show ? error.email.message : ""}
          label="E-mail"
          type="email"
          placeholder="Digite o e-mail de login:"
          sx={{ width: "100%", margin: 1 }}
        />
        <TextField
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={error.password.show}
          helperText={error.password.show ? error.password.message : ""}
          label="Senha"
          placeholder="Digite a sua senha:"
          type="password"
          sx={{ width: "100%", margin: 1 }}
        />
        <Grid
          sx={{
            display: "flex",
            flexDirection: "column",
            marginTop: 2,
            width: "100%",
          }}
        >
          <Button
            loading={loading}
            variant="contained"
            sx={{ margin: 1, fontSize: "1rem" }}
            onClick={handleLogin}
          >
            {" "}
            Entrar{" "}
          </Button>
          <Button 
            variant="contained"
            sx={{ margin: 1, fontSize: "1rem" }}
          >
            {" "}
            Registrar{" "}
          </Button>
          <Button variant="contained" sx={{ margin: 1, fontSize: "1rem" }}>
            Esqueci a senha{" "}
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
