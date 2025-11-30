import { useState } from "react";
import { Button, Typography, Grid, TextField, Stack, Avatar, Snackbar } from "../Components";
import logo1 from "../assets/images/logo1.png";
import Authentication from "../services/Authentication";
import { modeloData } from "../services/modelo";
import styles from "./EsqueciMinhaSenha.module.css";

export default function EsqueciMinhaSenha() {

  const [email, setEmail] = useState("");
  const [error, setError] = useState(modeloData);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleForgotPassword = async () => {
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
        email: { message: "E-mail inválido", show: true },
      }));
      return;
    }

    try {
      setLoading(true);

      const { error } = await Authentication.forgotPassword(email);

      if (error) {
        throw error;
      }

      setMessage("Enviamos um link para o seu e-mail!");

    } catch (error) {
      setMessage("Erro ao enviar e-mail:" + error.message);
      console.log("Falha no envio do email de redefinição de senha", error)
    }
    setLoading(false);
  }

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
        className={styles.changePasswordBox}
      >
        <Stack direction="row" spacing={2} className={styles.stack}>
          <Avatar src={logo1} className={styles.avatar} ></Avatar>
        </Stack>
        <Typography marginBottom={1}> Esqueci minha senha</Typography>

        <Grid className={styles.buttonContainer}>

          <TextField
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={error.email.show}
            helperText={error.email.show ? error.email.message : ""}
            type="email"
            placeholder="Digite seu e-mail de login:"
            className={styles.input}
          />

          <Button
            loading={loading}
            variant="contained"
            className={styles.button}
            onClick={handleForgotPassword}
          > Enviar e-mail de redefinição de senha
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



