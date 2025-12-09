import { useState, useEffect } from "react";
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
import { useNavigate } from "react-router-dom";
import RoutesPath from "../routes/RoutesPath";
import styles from "./RedefinirSenha.module.css";

export default function RedefinirSenha() {

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(modeloData);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/;

    useEffect(() => {
        const hash = window.location.hash;
        const params = new URLSearchParams(hash.replace("#", ""));
        const access_token = params.get("access_token");
        const refresh_token = params.get("refresh_token");

        if (access_token) {
           Authentication.setSession({
                access_token,
                refresh_token,
            });
        }
    }, []);


    const validaCampoSenha = () => {

        if (password === "") {
            return { field: "password", message: "Senha é obrigatória." };
        }

        if (password.length < 8) {
            return { field: "password", message: "A senha deve ter pelo menos 8 caracteres." };
        }

        if (!strongPasswordRegex.test(password)) {
            return {
                field: "password",
                message:
                    "A senha deve conter letra maiúscula, minúscula, número e caractere especial.",
            };
        }

        if (confirmPassword === "") {
            return { field: "confirmPassword", message: "Confirmação de senha é obrigatória." };
        }

        if (password !== confirmPassword) {
            return { field: "confirmPassword", message: "As senhas não coincidem." };
        }

        return null;
    };

    const handleResetPassword = async () => {

        setError(modeloData);

        const validacao = validaCampoSenha();
        
        if (validacao) {
            setError((prev) => ({
                ...prev,
                [validacao.field]: { message: validacao.message, show: true },
            }));
            return;
        }

        try {
            setLoading(true);

            const { error } = await Authentication.updatePassword(password);
            if (error) throw error;

            setMessage("Senha redefinida com sucesso!");

            setTimeout(() => navigate(RoutesPath.LOGIN), 2000);

        } catch (err) {
            setMessage("Erro ao redefinir senha: " + err.message);
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
                className={styles.redefinirBox}
            >
                <Stack direction="row" spacing={2} className={styles.stack}>
                    <Avatar src={logo1} className={styles.avatar}></Avatar>
                </Stack>

                <Typography marginBottom={1}> Redefinição de Senha </Typography>

                <TextField
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    label="Nova senha"
                    placeholder="Digite sua nova senha:"
                    type="password"
                    error={error.password.show}
                    helperText={error.password.show ? error.password.message : ""}
                    className={styles.input}
                />

                <TextField
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    label="Confirmar nova senha"
                    placeholder="Confirme sua nova senha:"
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
                        onClick={handleResetPassword}
                    >
                        {" "}
                        Salvar nova Senha{" "}
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
