import Box from "@mui/material/Box";
import RoutesPath from "../routes/RoutesPath";
import { Link } from "react-router";

export default function NavMenu() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "auto",
      }}
    >
      <Box
        sx={{
          marginBottom: 5,
          display: "flex",
          width: 1000,
          justifyContent: "space-evenly",
          alignItems: "center",
          border: "4px solid #1976d2",
          borderRadius: "8px",
          padding: 4,
          margin: "auto",
        }}
      >
        <Link to={RoutesPath.LISTA_PARTIDAS}> Home </Link>
        <Link to={RoutesPath.ANALISE_PARTIDA}> Análise da Partida </Link>
        <Link to={RoutesPath.JOGO_RESPONSAVEL}> Jogo Responsável </Link> 
        <Link to={RoutesPath.PERFIL}> Perfil </Link> 
        <Link to={RoutesPath.REGISTRO}> Registrar </Link>
        <Link to={RoutesPath.ESQUECI_SENHA}> Esqueci Minha Senha </Link>
      </Box>
    </Box>
  );
}
