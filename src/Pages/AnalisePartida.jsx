import { Box, Typography, Grid, Avatar } from "../Components";
import { List, ListItem, Divider, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { getMatchById } from "../services/getMatchById";
import { useParams } from "react-router-dom";
import styles from "./AnalisePartida.module.css";
import logos from "../assets/images/escudos_premier/logos";
import ClearIcon from "@mui/icons-material/Clear";
import logo1 from "../assets/images/logo1.png";

export default function AnalisePartida() {
  const [matchData, setMatchData] = useState(null);
  const [loading, setLoading] = useState(true);
  const capitalize = (str) =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  const lineups = matchData?.lineups?.lineups ?? null;
  const { id } = useParams();
  const fakePreview = [{
    id: 954520,
    date: '13-12-2025',
    time: '17:30',
    word_count: 666,
    country: { id: 8, name: 'england' },
    league: { id: 228, name: 'Premier League' },
    stage: { id: 13908, name: 'Premier League', is_active: true },
    teams: {
      home: { id: 3104, name: 'Burnley' },
      away: { id: 4145, name: 'Fulham' }
    },
    match_data: {
      weather: { temp_f: 38.5, temp_c: 3.6, description: 'clear ' },
      excitement_rating: 5.5,
      prediction: { type: 'over_under', total: '3.5', choice: 'over' }
    },
    preview_content: [
      {
        name: 'p1',
        content: "Burnley will host Fulham at Turf Moor this Saturday, December 13, kicking off at 17:30 UTC under clear skies and a brisk 38°F. Nestled in a town historically shaped by the coal mining industry and textile mills, Burnley's pitch often reflects the grit and determination of its working-class roots, where local fans create a palpable atmosphere that echoes through the stands like the echoes of the town’s industrial past. The last Premier League meeting between these sides, on February 3, 2024, ended in a 2-2 draw, with Burnley’s D. Fofana notably scoring twice, demonstrating the team’s blend of industrious pressing and quick counterattacking play. As the Clarets prepare for this clash, the match promises the same intense tactical battle familiar to those who know the pace and unpredictability of north-west English football."
      },
      {
        name: 'h1',
        content: 'Burnley’s Clarets seek to turn Turf Moor’s passionate atmosphere into points against next opponents.'
      },
      {
        name: 'p2',
        content: 'Burnley’s recent form reflects a side struggling to find a foothold in the Premier League’s relentless pace, having lost their last five matches without managing a single draw. Their attacking play has been notably subdued, managing just four goals across those games, a stark contrast to the high-energy, direct style traditionally associated with Lancashire’s football ethos, where industrious pressing and set-piece grit usually come to the fore. Against similarly positioned teams this season, Burnley’s results have been balanced but unspectacular, averaging two goals scored and conceded per game, underscoring an ongoing challenge in maintaining defensive solidity while trying to break down opponents. Sitting 19th with a collection of ten points from 15 matches—including three wins and eleven defeats—Burnley’s rhythm at Turf Moor is often defined by a vocal crowd that demands physicality and commitment, even as recent performances have faltered. Their latest outing ended in a narrow 1-2 loss to Newcastle, where Z. Flemming continued to'
      },
      {
        name: 'h2',
        content: 'Fulham look to steady the ship at Turf Moor as the Cottagers chase points against Burnley’s workmanlike Clarets'
      },
      {
        name: 'p3',
        content: 'Fulham have struggled to collect points on their recent trips, losing four of their last five away games, though they have managed to find the net five times during those matches. Against teams of similar standing this season, they have secured two wins and one defeat, averaging just over 1.6 goals scored and 1.3 conceded per game. Their latest outing saw them fall 2-1 to Crystal Palace, with H. Wilson providing their only goal. The squad arrives for this fixture without notable absences, aiming to improve their away record.'
      },
      {
        name: 'p4',
        content: 'In their recent encounters, the two sides have seen just over two and a half goals per game on average across five matches, reflecting a balance in scoring opportunities. Looking back over the longer history of 44 meetings, Burnley have claimed victory in 25 of those fixtures, while Fulham have emerged victorious 12 times, with seven games ending in draws. This record shows a pattern of competitive games where Burnley have held the upper hand overall, though the matches often provide occasions for both teams to press forward and create chances.'
      },
      {
        name: 'h3',
        content: 'Burnley and Fulham light up Turf Moor with eight-goal thriller reflecting Clarets’ gritty, high-tempo style'
      },
      {
        name: 'p5',
        content: "When Burnley and Fulham last faced off, the clash unfolded like a fierce contest on a windy Turf Moor afternoon, where eight goals shattered the rhythm of the game, culminating in a 2-2 draw that felt like a hard-fought draw on a cobbled street under the watchful eyes of old mill chimneys. Both sides will step onto the pitch aware that this encounter often turns into a battle of wills, with quick shifts in momentum resembling the unpredictable gusts off Pendle Hill. The players' body language before kickoff will reveal a readiness to test each other's mettle, balancing the rugged, no-nonsense approach typical of Lancashire football with the slicker, more measured passing Fulham brings from the capital, setting the stage for another contest where bravery and tactical smarts will blend like a well-crafted pint at the local, promising a match that captures the grit and flow of life in Burnley itself."
      }
    ]
  }]


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
      {/* Container Título */}
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
              <Box sx={{ display: "flex", alignItems: "center", margin: 1, gap: 1 }}>

                <Avatar
                  src={logos[matchData.teams.home.name]}
                  sx={{ width: 70, height: 70 , "& img": { objectFit: "contain" }, border: "3px solid #064c91"}}
                />
                <ClearIcon sx={{ fontSize: 26, color: "#064c91" }} />

                <Avatar
                  src={logos[matchData.teams.away.name]}
                  sx={{ width: 70, height: 70 , "& img": { objectFit: "contain" }, border: "3px solid #064c91"}}
                />

              </Box>

              <Typography variant="h5" className={styles.previewTitle}>
                Preview
              </Typography>

              <Typography variant="body2" color="text.secondary">

                <Typography variant="body1">
                  Previsão do Tempo: {fakePreview[0].match_data.weather.description}
                </Typography>
                <Typography variant="body1">
                  Temperatura: {fakePreview[0].match_data.weather.temp_c}ºC
                </Typography>
                <br />
              </Typography>

              <Typography variant="body1" color="text.secondary" sx={{ fontWeight: "bold", textAlign: "justify" }}>
                {fakePreview[0].preview_content[0].content}
              </Typography>
              <br />
              <Typography variant="body1" color="text.secondary" sx={{ textAlign: "justify" }}>
                {fakePreview[0].preview_content[1].content}
              </Typography>
              <br />
              <Typography variant="body1" color="text.secondary" sx={{ textAlign: "justify" }}>
                {fakePreview[0].preview_content[2].content}
              </Typography>
              <br />
              <Typography variant="body1" color="text.secondary" sx={{ textAlign: "justify" }}>
                {fakePreview[0].preview_content[3].content}
              </Typography>
              <br />
              <Typography variant="body1" color="text.secondary" sx={{ textAlign: "justify" }}>
                {fakePreview[0].preview_content[4].content}
              </Typography>
              <br />
              <Typography variant="body1" color="text.secondary" sx={{ textAlign: "justify" }}>
                {fakePreview[0].preview_content[5].content}
              </Typography>
              <br />
              <Typography variant="body1" color="text.secondary" sx={{ textAlign: "justify" }}>
                {fakePreview[0].preview_content[6].content}
              </Typography>
              <br />
              <Typography variant="body1" color="text.secondary" sx={{ textAlign: "justify" }}>
                {fakePreview[0].preview_content[7].content}
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
                  Mercado: {fakePreview[0].match_data.prediction.type}
                </Typography>
                <Typography variant="body1">
                  Aposta: {fakePreview[0].match_data.prediction.choice} {fakePreview[0].match_data.prediction.total}
                </Typography>
              </Paper>

              <Paper className={`${styles.boxVencedor} ${styles.caixa20}`} elevation={2}>

                <Typography variant="h5" sx={{ color: '#064c91' }}>
                  Vencedor da Partida
                </Typography>

                <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 1, color: 'red' }}  >
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