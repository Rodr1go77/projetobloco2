import {Button, Grid, Typography}  from "../Components";
import { useEffect, useState } from "react";
import Authentication from "../services/Authentication";

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
    marginTop: 2,
    marginBottom: 2,
  },
  avatar: {
    width: 250,
    height: 250,
  },
};

export default function Home() {

  const [matchData, setMatchData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      "https://api.soccerdataapi.com/match/?match_id=969716&auth_token=2bdb4609569b5080a1163c48b598bf507fa222d3"
    )
      .then((response) => response.json())
      .then((data) => {
        setMatchData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar dados:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return  <Typography variant="body1" sx={{ mt: 2 }}> Carregando dados da partida...</Typography>
  }

  if (!matchData) {
    return  <Typography color="error" variant="body1"> Erro: não foi possível carregar os dados. </Typography>
  }

  return (
    <Grid container spacing={2} sx={styles.container}>
      <Grid
        size={{ xs: 12, sm: 12, md: 12, lg:12, xl: 12 }}
        sx={{ marginBottom: 1, display: "flex", flexDirection: "column", justifyContent: "center",
          alignItems: "center", textAlign: "center", border: "4px solid #1976d2", borderRadius: "17px", p: 1, pb:0 }}
      >
        <Typography
          // sx={{ fontWeight: "bolder", fontSize: "18rem", marginBottom: 3, textAlign: "center", p: 0, m: 0 }} 
          > HOME </Typography>
        <Typography         
          sx={{ fontWeight: "bolder", fontSize: "1rem", marginBottom: 3, textAlign: "center", p: 0, m: 0 }} >Lista das Partidas</Typography>
      </Grid>
        <Button
          loading={loading}
          variant="contained"
          sx={{ margin: 1, fontSize: "1rem" }}
          onClick={async () => {
            await Authentication.logout();
            window.location.href = "/login"; }}
        > Logout
        </Button>
        </Grid>
    
  );
}
