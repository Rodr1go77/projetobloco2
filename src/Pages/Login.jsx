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
import { useNavigate } from "react-router-dom";
import RoutesPath from "../routes/RoutesPath";
import styles from "./Login.module.css";

export default function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(modeloData);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
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
      setLoading(true);
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
        setMessage("E-mail ou senha incorretos.");
      } else {
        setMessage("Falha no login:" + error.message);
      }
      console.log("Falha no login", error);
    }
    setLoading(false);
  };

  return (
    <Grid
      container
      spacing={2}
      className={styles.container}
      justifyContent="center"
      alignItems="center"
    >
      <Grid
        size={{ xs: 12, sm: 12, md: 4, lg: 4, xl: 3 }}
        className={styles.loginBox}
      >
        <Stack direction="row" spacing={2} className={styles.stack}>
          <Avatar src={logo1} className={styles.avatar}></Avatar>
        </Stack>

        <Typography marginBottom={1}> Bem vindo! </Typography>

        <TextField
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={error.email.show}
          helperText={error.email.show ? error.email.message : ""}
          type="email"
          placeholder="Digite o e-mail de login:"
          className={styles.input}
        />
        <TextField
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={error.password.show}
          helperText={error.password.show ? error.password.message : ""}
          placeholder="Digite a sua senha:"
          type="password"
          className={styles.input}
        />
        <Grid className={styles.buttonContainer}>
          <Button
            loading={loading}
            variant="contained"
            className={styles.button}
            onClick={handleLogin}
          >
            {" "}
            Entrar{" "}
          </Button>

          <Button
            variant="contained"
            className={styles.button}
            onClick={() => navigate(RoutesPath.REGISTRO)}
          >
            Criar Conta
          </Button>

          <Button
            variant="contained"
            className={styles.button}
            onClick={() => navigate(RoutesPath.ESQUECI_SENHA)}
          >
            {" "}
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
