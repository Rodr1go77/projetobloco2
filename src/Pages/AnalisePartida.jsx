import { Box, Typography, Grid } from "../Components";
import { List, ListItem, Divider } from "@mui/material";
import { useEffect, useState } from "react";
import localMatch from "../localData/matchLocal.json";

export default function AnalisePartida() {
  const [matchData, setMatchData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      "https://api.soccerdataapi.com/match/?match_id=954441&auth_token=2bdb4609569b5080a1163c48b598bf507fa222d3"
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Dados recebidos da API:", data);
        setMatchData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar dados:", error);
        setMatchData(localMatch);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Typography variant="body1" sx={{ mt: 2 }}>
        {" "}
        Carregando dados da partida...
      </Typography>
    );
  }

  if (!matchData) {
    return (
      <Typography color="error" variant="body1">
        {" "}
        Erro: não foi possível carregar os dados.{" "}
      </Typography>
    );
  }

  if (matchData.error) {
    return (
      <Typography color="error" variant="h6">
        Erro da API: {matchData.error}
      </Typography>
    );
  }
  return (
    <Grid id="containerGeral"
      container
      spacing={2}
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Grid id="containerTitulo"
        item
        xs={12}
        sm={12}
        md={10}
        lg={8}
        xl={6}
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          border: "4px solid #1976d2",
          borderRadius: "8px",
          width: "100%",
          padding: 1,
          margin: "0 auto",
          backgroundColor: "#AAC4F5",
        }}
      >
        <Typography
          sx={{
            fontWeight: "bolder",
            fontSize: "2rem",
            textAlign: "center",
            color: "white",
            mb: 1,
          }}
        >
          Análise da Partida
        </Typography>

        <Typography
          variant="h3"
          gutterBottom
          align="center"
          color="#064c91ff"
          fontWeight="bold"
        >
          {matchData.teams.home.name} vs {matchData.teams.away.name}
        </Typography>
      </Grid>

      <Box id="boxOdds"
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          border: "2px solid #1976d2",
          borderRadius: "8px",
          pl: 3,
          pr: 3,
          pt: 1.5,
          pb: 1.5,
          bgcolor: "white",
          width: "40%",
          mx: "auto",
        }}
      >
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", color: "steelblue" }}
        >
          Odds da partida
        </Typography>

        <Typography variant="h5">
          {matchData.teams.home.name} - {matchData.odds.match_winner.home} -
          Empate - {matchData.odds.match_winner.draw} -{" "}
          {matchData.teams.away.name} - {matchData.odds.match_winner.away}
        </Typography>
      </Box>

      <Box id="boxVencedor"
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          color: "red"
        }}
      >
        <Typography variant="h5">
          {" "}
          Vencedor da Partida:{" "}
          {matchData.winner === "home"
            ? matchData.teams.home.name
            : matchData.winner === "away"
            ? matchData.teams.away.name
            : "Empate"}{" "}
          <br />
        </Typography>
      </Box>


      <Box id="BoxServicoJogo"
              sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "flex-start",
          border: "2px solid #1976d2",
          borderRadius: "8px",
          pl: 3,
          pr: 3,
          pt: 1.5,
          pb: 1.5,
          bgcolor: "white",
          width: "40%",
          mx: "auto",
        }}
      >

            <Typography variant="body1" gutterBottom align="left">
              <br />
              Data da partida: {matchData.date} <br />
              Horário do jogo: {matchData.time} <br />
              Campeonato: {matchData.league.name} <br />
              País: {matchData.country.name} <br />
              Estádio: {matchData.stadium.name} <br />
              Cidade: {matchData.stadium.city}
            </Typography>
      </Box>



      <Divider sx={{ my: 2 }} />

      <Typography variant="h6">Eventos</Typography>
      <List>
        {matchData.events.map((event, index) => (
          <ListItem key={index} sx={{ py: 0.5 }}>
            <Typography variant="body2">
              <b>{event.event_minute}'</b> - {event.event_type} ({event.team})
            </Typography>
          </ListItem>
        ))}
      </List>
    </Grid>
  );
}
