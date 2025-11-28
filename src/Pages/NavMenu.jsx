import RoutesPath from "../routes/RoutesPath";
import { Link } from "react-router-dom";
import { Grid, Button } from "../Components";
import Authentication from "../services/Authentication";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./NavMenu.module.css";

export default function NavMenu() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const user = await Authentication.getUser();
      if (user) {
        setUserEmail(user.email);
      }
    };
    fetchUser();
  }, []);

  return (
    <>
      <Grid
        container
        spacing={2}
        className={styles.container}
      >
        <Link className={styles.menuItem} to={RoutesPath.LISTA_PARTIDAS}>
          Home
        </Link>
        {/* <Link className={styles.menuItem} to={RoutesPath.ANALISE_PARTIDA}>
          Análise
          </Link> */}
        <Link className={styles.menuItem} to={RoutesPath.PERFIL}>
          Perfil
        </Link>
        <Link className={styles.menuItem} to={RoutesPath.JOGO_RESPONSAVEL}>
          Jogo Responsável
        </Link>
        {/* <Link className={styles.menuItem} to={RoutesPath.REGISTRO}>
          Registrar
        </Link> */}
        {/* <Link className={styles.menuItem} to={RoutesPath.ESQUECI_SENHA}>
          Esqueci Senha
        </Link> */}

        {userEmail && (
          <div className={styles.userInfo}>
            <p className={styles.userLabel}>Usuário: </p>
            {userEmail}
          </div>
        )}

        <Grid item>
          <Button
            variant="contained"
            sx={{ fontSize: "1rem" }}
            onClick={async () => {
              await Authentication.logout();
              navigate(RoutesPath.LOGIN);
            }}
          >
            Logout
          </Button>
        </Grid>
      </Grid>

      <div className={styles.spacer}></div>
    </>
  );
}
