import React from "react";
import { useState } from "react";
import { Button, Typography, Grid, TextField, Stack, Avatar, Snackbar } from "../Components";
import logo1 from "../assets/images/logo1.png";
import Authentication from "../services/Authentication";
import { modeloData } from "../services/modelo";
import styles from "./EsqueciMinhaSenha.module.css";

export default function EsqueciMinhaSenha() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(modeloData);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleRegister = async () => {
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
    if (password === "") {
      setError((prev) => ({
        ...prev,
        password: { message: "Senha é obrigatória.", show: true },
      }));
      return;
    }
    if (password.length < 8) {
      setError((prev) => ({
        ...prev,
        password: { message: "A senha deve ter pelo menos 8 caracteres.", show: true },
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
        confirmPassword: { message: "Confirmação de senha é obrigatória.", show: true },
      }));
      return;
    }
    if (password !== confirmPassword) {
      setError((prev) => ({
        ...prev,
        confirmPassword: { message: "As senhas não coincidem.", show: true },
      }));
      return;
    }
    try {
      setLoading(true);
      const { data, error } = await Authentication.register(email, password);
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
        <Typography marginBottom={1}> Troca de Senha</Typography>

        <TextField
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Digite a nova senha:"
          type="password"
          error={error.password.show}
          helperText={error.password.show ? error.password.message : ""}
          className={styles.input}
        />
        <TextField
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirme a nova senha:"
          type="password"
          error={error.confirmPassword.show}
          helperText={error.confirmPassword.show ? error.confirmPassword.message : ""}
          className={styles.input}
        />
        <Grid className={styles.buttonContainer}>
          <Button
            loading={loading}
            variant="contained"
            className={styles.button}
            onClick={handleRegister}
          > Trocar Senha
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
