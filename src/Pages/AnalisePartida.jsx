import { Box, Typography, Grid, Avatar } from "../Components";
import { List, ListItem, Divider, Paper } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import { getMatchById } from "../services/getMatchById";
import { getPreview } from "../services/getPreview";
import { useParams } from "react-router-dom";
import styles from "./AnalisePartida.module.css";
import logos from "../assets/images/escudos_premier/logos";
import ClearIcon from "@mui/icons-material/Clear";
import logo1 from "../assets/images/logo1.png";

export default function AnalisePartida() {
  const [matchData, setMatchData] = useState(null);
  const [previewData, setPreviewData] = useState(null);
  const capitalize = (str) =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  const lineups = matchData?.lineups?.lineups ?? null;
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const alertShownRef = useRef(false);

  // Carrega os dados da partida e do preview
  useEffect(() => {
    let isMounted = true;

    async function loadAll() {
      try {
        const [matchRes, previewRes] = await Promise.all([
          getMatchById(id),
          getPreview(id)
        ]);

        if (!isMounted) return;

        setMatchData(matchRes.result);
        setPreviewData(previewRes.result);

        if ((matchRes.error || previewRes.error) && !alertShownRef.current) {
          alert("Falha ao carregar dados. Usando dados locais.");
          alertShownRef.current = true;
        }

      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadAll();
    return () => { isMounted = false };
  }, [id]);

// Verifica se os dados da partida estão sendo carregados
  if (loading) {
    return (
      <Typography variant="body1" sx={{ mt: 2 }}>
        {" "}
        Carregando dados da partida...
      </Typography>
    );
  }

  // Verifica se os dados da partida foram carregados
  if (!matchData) {
    return (
      <Typography color="error" variant="body1">
        {" "}
        Erro: não foi possível carregar os dados.{" "}
      </Typography>
    );
  }

  // Verifica se os dados do preview  foram carregados
  if (!previewData) {
    return (
      <Typography color="error" variant="body1">
        {" "}
        Erro: não foi possível carregar preview da partida.{" "}
      </Typography>
    );
  }


  return (
    <>
      {/* Container Título */}
      <Grid
        id="containerTitulo" 
        className={styles.containerTitulo}
      >
        <Typography className={styles.pageTitle}>
          Análise da Partida
        </Typography>

        <Typography className={styles.matchTitle}>
          {matchData.teams.home.name} vs {matchData.teams.away.name}
        </Typography>

      </Grid>

      {/* Container Geral */}
      <Grid
        id="containerGeral"
        container
        spacing={2}
        className={styles.containerGeral}
      >

        {/* Container Informações Preview, IA e Vencedor 1 */}
        <Box id="boxPreview" className={styles.containerInfo1}>

          <Box className={styles.colunaEsquerda}>

            <Paper className={styles.boxPreview} elevation={2}>

              <Box className={styles.previewAvatars} sx={{ display: "flex", alignItems: "center", margin: 1, gap: 1 }}>

                <Avatar
                  src={logos[matchData.teams.home.name]}
                  sx={{ width: 80, padding: 0.8, height: 80, "& img": { objectFit: "contain" }, border: "3px solid #064c91" }}
                />
                <ClearIcon sx={{ fontSize: 26, color: "#064c91" }} />

                <Avatar
                  src={logos[matchData.teams.away.name]}
                  sx={{ width: 80, padding: 1, height: 80, "& img": { objectFit: "contain" }, border: "3px solid #064c91" }}
                />

              </Box>

              <Typography variant="h5" className={styles.previewTitle}>
                Preview
              </Typography>

              <Typography variant="body2" color="text.secondary">

                <Typography variant="body1" component="span">
                  Previsão do Tempo: {previewData.match_data.weather.description}
                </Typography>
                <br />
                <Typography variant="body1" component="span">
                  Temperatura: {previewData.match_data.weather.temp_c}ºC
                </Typography>
                <br />
                <br />
              </Typography>

              <Typography variant="body1" color="text.secondary" sx={{ fontWeight: "bold", textAlign: "justify" }}>
                {previewData.preview_content[0].content}
              </Typography>
              <br />
              <Typography variant="body1" color="text.secondary" sx={{ textAlign: "justify" }}>
                {previewData.preview_content[1].content}
              </Typography>
              <br />
              <Typography variant="body1" color="text.secondary" sx={{ textAlign: "justify" }}>
                {previewData.preview_content[2].content}
              </Typography>
              <br />
              <Typography variant="body1" color="text.secondary" sx={{ textAlign: "justify" }}>
                {previewData.preview_content[3].content}
              </Typography>
              <br />
              <Typography variant="body1" color="text.secondary" sx={{ textAlign: "justify" }}>
                {previewData.preview_content[4].content}
              </Typography>
              <br />
              <Typography variant="body1" color="text.secondary" sx={{ textAlign: "justify" }}>
                {previewData.preview_content[5].content}
              </Typography>
              <br />
              <Typography variant="body1" color="text.secondary" sx={{ textAlign: "justify" }}>
                {previewData.preview_content[6].content}
              </Typography>
              <br />
              <Typography variant="body1" color="text.secondary" sx={{ textAlign: "justify" }}>
                {previewData.preview_content[7].content}
              </Typography>



            </Paper>

            <Paper className={styles.boxEventos} elevation={2}>
              <Typography className={styles.sectionTitle}>
                Eventos da Partida
              </Typography>
              <Divider
                textAlign="center"
                className={styles.divider}
              />
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


            </Paper>

          </Box>

          <Box className={styles.colunaDireita}>

            <Box className={styles.linhaDuasCaixas}>

              <Paper className={`${styles.boxIA} ${styles.caixa20}`} elevation={2}>
                <Avatar src={logo1} className={styles.avatar}></Avatar>
                <Typography variant="body1">Escolhas da IA para o jogo:</Typography>
                <Divider />
                <Typography variant="body1">
                  Mercado: {previewData.match_data.prediction.type}
                </Typography>
                <Typography variant="body1">
                  Aposta: {previewData.match_data.prediction.choice} {previewData.match_data.prediction.total}
                </Typography>
              </Paper>

              <Paper className={`${styles.boxVencedor} ${styles.caixa20}`} elevation={2}>

                <Typography variant="h5" sx={{ color: 'steelblue', fontWeight: 'bold' }}>
                  Vencedor da Partida
                </Typography>

                <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 1, color: 'red' }}  >
                  {matchData.status !== "finished"
                    ? "Partida não realizada"
                    : matchData.winner === "home"
                      ? matchData.teams.home.name
                      : matchData.winner === "away"
                        ? matchData.teams.away.name
                        : matchData.winner === "draw"
                          ? "Empate"
                          : "Erro"
                  }
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
                    width: 120,
                    p: 1,
                    height: 120,
                    backgroundColor: "white",
                    objectFit: "contain",
                    boxShadow: `0px 3px 5px rgba(0,0,0,0.2),
                0px 3px 5px rgba(0,0,0,0.14),
                0px 3px 5px rgba(0,0,0,0.12)`,
                  }}
                />

              </Paper>

            </Box>

            <Paper className={styles.boxOdds} elevation={2}>
              <Typography className={styles.oddsTitle}>
                Odds da partida
              </Typography>

              <Divider
                textAlign="center"
                className={styles.divider}
              />

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

            </Paper>

            <Paper className={styles.boxServico} elevation={2}>

              <Typography className={styles.sectionTitle}>
                Serviço do Jogo
              </Typography>

              <Divider
                textAlign="center"
                className={styles.divider}
              />
              <Typography variant="body1" sx={{ lineHeight: 2 }} align="left">
                Data da partida: {matchData.date} <br />
                Horário do jogo: {matchData.time} <br />
                Campeonato: {matchData.league.name} <br />
                País: {capitalize(matchData.country.name)} <br />
                Estádio: {matchData.stadium.name} <br />
                Cidade: {matchData.stadium.city}
              </Typography>

            </Paper>

            <Paper className={styles.boxEscalacoes} elevation={2}>

              <Typography className={styles.sectionTitle}>
                Escalações
              </Typography>

              <Divider
                textAlign="center"
                sx={{ fontWeight: 'bold' }}

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
                sx={{ fontWeight: 'bold' }}
              >
                {matchData.teams.away.name}
              </Divider>

              {lineups?.away?.map((p) => (
                <Typography key={p.player.id} sx={{ lineHeight: 1.8 }}>
                  {p.player.name} ({p.position})
                </Typography>
              ))}

            </Paper>


          </Box >

        </Box>

      </Grid >
      <br />

    </>
  );
}