import RoutesPath from "../routes/RoutesPath";
import { Link } from "react-router-dom";
import { Grid, Button } from "../Components";
import Authentication from "../services/Authentication";
import { useNavigate } from "react-router-dom";

const styles = {
  container: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    zIndex: 999,
    background: "e6e2e2ff",
    borderBottom: "4px solid #1976d2",
    fontFamily: "Roboto",
    padding: "20px 0",
  },
  menuItem: {
    textDecoration: "none",
    color: "#1976d2",
    fontWeight: "500",
    fontSize: "1.1rem",
    transition: "0.2s ease",
  },
};


export default function NavMenu() {
  const navigate = useNavigate();

  return (
    <>
      <Grid
        container
        spacing={2}
        sx={{
          ...styles.container,
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <Link style={styles.menuItem} to={RoutesPath.LISTA_PARTIDAS}>Home</Link>
        <Link style={styles.menuItem} to={RoutesPath.ANALISE_PARTIDA}>Análise</Link>
        <Link style={styles.menuItem} to={RoutesPath.JOGO_RESPONSAVEL}>Jogo Responsável</Link>
        <Link style={styles.menuItem} to={RoutesPath.PERFIL}>Perfil</Link>
        <Link style={styles.menuItem} to={RoutesPath.REGISTRO}>Registrar</Link>
        <Link style={styles.menuItem} to={RoutesPath.ESQUECI_SENHA}>Esqueci Senha</Link>

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

      <div style={{ height: "80px" }}></div>
    </>
  );
}
