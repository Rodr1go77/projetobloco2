import { Box, Typography, Grid } from "../Components";
import { List, ListItem, Divider } from "@mui/material";
import { useEffect, useState } from "react";
import { getMatchById } from "../services/getMatchById";
import { useParams } from "react-router-dom";
import styles from "./AnalisePartida.module.css";

export default function AnalisePartida() {
  const [matchData, setMatchData] = useState(null);
  const [loading, setLoading] = useState(true);

  const capitalize = (str) =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  const lineups = matchData?.lineups?.lineups ?? null;
  const { id } = useParams();

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
      className={styles.containerGeral}
    >
      <Grid
        id="containerTitulo"
        item
        xs={12}
        sm={12}
        md={10}
        lg={8}
        xl={6}
        className={styles.containerTitulo}
      >
        <Typography className={styles.pageTitle}>
          Análise da Partida
        </Typography>

        <Typography className={styles.matchTitle}>
          {matchData.teams.home.name} vs {matchData.teams.away.name}
        </Typography>
      </Grid>

      <Box
        id="boxOdds"
        className={styles.boxOdds}
      >
        <Typography className={styles.oddsTitle}>
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
        className={styles.boxVencedor}
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

      <Box className={styles.containerInfo}>
        <Box
          id="BoxServicoJogo"
          className={styles.boxInfo}
        >
          <Typography className={styles.sectionTitle}>
            Serviço do Jogo
          </Typography>

          <Divider
            textAlign="center"
            className={styles.divider}
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
          className={styles.boxInfo}
        >
          <Typography className={styles.sectionTitle}>
            Escalações
          </Typography>

          <Divider
            textAlign="center"
            className={styles.divider}
          >
            {matchData.teams.home.name}
          </Divider>

          {lineups?.home?.map((p) => (
            <Typography key={p.player.id} sx={{ lineHeight: 1.8 }}>
              {p.player.name} ({p.position})
            </Typography>
          ))}
          <br />
          <Divider
            textAlign="center"
            className={styles.divider}
          >
            {matchData.teams.away.name}
          </Divider>

          {lineups?.away?.map((p) => (
            <Typography key={p.player.id} sx={{ lineHeight: 1.8 }}>
              {p.player.name} ({p.position})
            </Typography>
          ))}
        </Box>

        <Box
          id="boxEventos"
          className={styles.boxInfo}
        >
          <Typography className={styles.sectionTitle}>
            Eventos da Partida
          </Typography>
          <Divider
            textAlign="center"
            className={styles.divider}
          ></Divider>
          <List className={styles.list}>
            {matchData.events?.map((event, index) => (
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
