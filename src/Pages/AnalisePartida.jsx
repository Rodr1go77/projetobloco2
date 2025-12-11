import { Box, Typography, Grid } from "../Components";
import { List, ListItem, Divider, Paper, Avatar } from "@mui/material";
import { useEffect, useState } from "react";
import { getMatchById } from "../services/getMatchById";
import { useParams } from "react-router-dom";
import styles from "./AnalisePartida.module.css";
import logos from "../assets/images/escudos_premier/logos";
import ClearIcon from "@mui/icons-material/Clear";

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
    <>
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


        <Box className={styles.containerInfo1}>
          <Paper className={styles.boxPreview} elevation={2}>
            <Box sx={{ display: "flex", alignItems: "center" }}>

              <Avatar
                src={logos[matchData.teams.home.name]}
                sx={{ width: 60, height: 60 }}
              />
              <ClearIcon sx={{ fontSize: 26, color: "#064c91" }} />

              <Avatar
                src={logos[matchData.teams.away.name]}
                sx={{ width: 60, height: 60 }}
              />

            </Box>

            <Typography variant="h5" className={styles.previewTitle}>
              Preview
            </Typography>


            <Typography variant="body2" color="text.secondary">
              Nenhum preview disponível para esta partida.
            </Typography>



          </Paper>
        </Box>



        <Box className={styles.containerInfo1}>

          <Box
            id="boxOdds"
            className={styles.boxOdds}
          >
            <Typography className={styles.oddsTitle}>
              Odds da partida
            </Typography>

            <Box className={styles.teamsRow}>
              <Box className={styles.boxTeamA}>
                <Typography variant="h5" sx={{ pb: 1 }}>
                  {matchData.teams.home.name}
                </Typography>
              </Box>
              <Box className={styles.boxDraw}>
                <Typography variant="h5" sx={{ pb: 1 }}>
                  Empate
                </Typography>
              </Box>
              <Box className={styles.boxTeamB}>
                <Typography variant="h5" sx={{ pb: 1 }}>
                  {matchData.teams.away.name}
                </Typography>
              </Box>
            </Box>

            <Box className={styles.oddsRow}>
              <Box className={styles.boxOddsTeamA}>
                <Typography variant="h5" >
                  {matchData.odds.match_winner.home}
                </Typography>
              </Box>
              <Box className={styles.boxOddsDraw}>
                <Typography variant="h5">
                  {matchData.odds.match_winner.draw}
                </Typography>
              </Box>
              <Box className={styles.boxOddsTeamB}>
                <Typography variant="h5" >
                  {matchData.odds.match_winner.away}
                </Typography>
              </Box>
            </Box>

          </Box>

          <Box
            id="boxVencedor"
            className={styles.boxVencedor}
          >
            <Typography variant="h5" sx={{ p: 1 }}>
              Vencedor da Partida
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}  >
              {matchData.winner === "home"
                ? matchData.teams.home.name
                : matchData.winner === "away"
                  ? matchData.teams.away.name
                  : "Empate"}{" "}
              <br />
            </Typography>

            <Avatar
              src={matchData.winner === "home"
                ? logos[matchData.teams.home.name]
                : matchData.winner === "away"
                  ? logos[matchData.teams.away.name]
                  : "Empate"
              }

              sx={{
                width: 150,
                height: 150,
                backgroundColor: "white",
                objectFit: "contain",
                boxShadow: `0px 3px 5px rgba(0,0,0,0.2),
                0px 3px 5px rgba(0,0,0,0.14),
                0px 3px 5px rgba(0,0,0,0.12)`,  
              }}
            />

          </Box>
        </Box>





        <Box className={styles.containerInfo2}>


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
            >
            </Divider>
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
                  <Typography variant="body1">
                    <b>{event.event_minute}'</b> - {event.event_type} (
                    {event.team})
                  </Typography>
                </ListItem>
              ))}
            </List>
          </Box>

        </Box>
      </Grid>

    </>
  );
}
