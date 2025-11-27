import { Box, Typography, Grid } from "../Components";
import { List, ListItem, Divider } from "@mui/material";
import { useEffect, useState } from "react";
import { getMatchById } from "../services/getMatchById";
import { useParams } from "react-router-dom";

export default function AnalisePartida() {
  const [matchData, setMatchData] = useState(null);
  const [loading, setLoading] = useState(true);

  const capitalize = (str) =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  const lineups = matchData?.lineups?.lineups ?? null;
  const {id} = useParams();

  useEffect(() => {
    async function loadData() {
      const response = await getMatchById(id);
      setMatchData(response.result);
      setLoading(false);
    }
    loadData();
  }, [id]);

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

  return (
    <Grid
      id="containerGeral"
      container
      spacing={2}
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Grid
        id="containerTitulo"
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
          border: "2px solid #1976d2",
          borderRadius: "4px",
          width: "100%",
          margin: "0 auto",
          backgroundColor: "#AAC4F5",
        }}
      >
        <Typography
          sx={{
            fontWeight: "bolder",
            fontSize: "1.5rem",
            textAlign: "center",
            color: "white",
            pt: 2,
            lineHeight: 1.5,
          }}
        >
          Análise da Partida
        </Typography>

        <Typography
          sx={{
            fontSize: "2rem",
            fontWeight: "bold",
            color: "#064c91ff",
            textAlign: "center",
            pb: 2,
            lineHeight: 1,
          }}
        >
          {matchData.teams.home.name} vs {matchData.teams.away.name}
        </Typography>
      </Grid>

      <Box
        id="boxOdds"
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          border: "2px solid #1976d2",
          borderRadius: "4px",
          pl: 3,
          pr: 3,
          pt: 1.5,
          pb: 1.5,
          bgcolor: "white",
          width: "50%",
          mx: "auto",
        }}
      >
        <Typography
          sx={{
            fontWeight: "bold",
            color: "steelblue",
            pb: 1,
            fontSize: "1.5rem",
          }}
        >
          Odds da partida
        </Typography>

        <Typography variant="h5" sx={{ pb: 1 }}>
          {matchData.teams.home.name} - {matchData.odds.match_winner.home} -
          Empate - {matchData.odds.match_winner.draw} -{" "}
          {matchData.teams.away.name} - {matchData.odds.match_winner.away}
        </Typography>
      </Box>

      <Box
        id="boxVencedor"
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          color: "red",
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

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          width: "100%",
          gap: 2,
        }}
      >
        <Box
          id="BoxServicoJogo"
          sx={{
            display: "flex",
            flexDirection: "column",
            border: "2px solid #1976d2",
            borderRadius: "8px",
            p: 2,
            bgcolor: "white",
            flex: 1,
          }}
        >
          <Typography
            sx={{
              fontWeight: "bold",
              color: "steelblue",
              pb: 1,
              fontSize: "1.5rem",
              textAlign: "center",
            }}
          >
            Serviço do Jogo
          </Typography>

          <Divider
            textAlign="center"
            sx={{
              lineHeight: 1.8,
              fontSize: "1rem",
              fontWeight: "bold",
              mb: 1,
            }}
          ></Divider>

          <Typography variant="body1" sx={{ lineHeight: 2 }} align="left">
            Data da partida: {matchData.date} <br />
            Horário do jogo: {matchData.time} <br />
            Campeonato: {matchData.league.name} <br />
            País: {capitalize(matchData.country.name)} <br />
            Estádio: {matchData.stadium.name} <br />
            Cidade: {matchData.stadium.city}
          </Typography>
        </Box>

        <Box
          id="BoxEscalacoes"
          sx={{
            display: "flex",
            flexDirection: "column",
            border: "2px solid #1976d2",
            borderRadius: "8px",
            p: 2,
            bgcolor: "white",
            flex: 1,
          }}
        >
          <Typography
            sx={{
              fontWeight: "bold",
              color: "steelblue",
              pb: 1,
              fontSize: "1.5rem",
              textAlign: "center",
            }}
          >
            Escalações
          </Typography>

          <Divider
            textAlign="center"
            sx={{ lineHeight: 1.8, fontSize: "1rem", fontWeight: "bold" }}
          >
            {matchData.teams.home.name}
          </Divider>

          {lineups.home.map((p) => (
            <Typography key={p.player.id} sx={{ lineHeight: 1.8 }}>
              {p.player.name} ({p.position})
            </Typography>
          ))}
          <br />
          <Divider
            textAlign="center"
            sx={{ lineHeight: 1.8, fontSize: "1rem", fontWeight: "bold" }}
          >
            {matchData.teams.away.name}
          </Divider>

          {lineups.away.map((p) => (
            <Typography key={p.player.id} sx={{ lineHeight: 1.8 }}>
              {p.player.name} ({p.position})
            </Typography>
          ))}
        </Box>

        <Box
          id="boxEventos"
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            border: "2px solid #1976d2",
            borderRadius: "8px",
            p: 2,
            bgcolor: "white",
          }}
        >
          <Typography
            sx={{
              fontWeight: "bold",
              color: "steelblue",
              pb: 1,
              fontSize: "1.5rem",
              textAlign: "center",
            }}
          >
            Eventos da Partida
          </Typography>
          <Divider
            textAlign="center"
            sx={{
              lineHeight: 1.8,
              fontSize: "1rem",
              fontWeight: "bold",
              mb: 1,
            }}
          ></Divider>
          <List
            sx={{
              maxHeight: "auto",
              overflowY: "auto",
              width: "100%",
            }}
          >
            {matchData.events.map((event, index) => (
              <ListItem key={index} sx={{ py: 1 }}>
                <Typography variant="body2">
                  <b>{event.event_minute}'</b> - {event.event_type} (
                  {event.team})
                </Typography>
              </ListItem>
            ))}
          </List>
        </Box>

      </Box>
    </Grid>
  );
}
