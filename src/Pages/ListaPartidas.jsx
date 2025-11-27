import { Grid, Typography, Card, SearchBar } from "../Components";
import { useEffect, useState } from "react";
import { getMatches } from "../services/getMatches";
import { useNavigate } from "react-router-dom";
import styles from "./ListaPartidas.module.css";

export default function ListaPartidas() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [leagueHeader, setLeagueHeader] = useState(null);
  const navigate = useNavigate();

  const getTeamName = (team) => {
    if (!team || !team.name || team.name === "None") return "Não disponível";
    return team.name;
  };

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const response = await getMatches();
        setLeagueHeader(response.leagueHeader);
        const allMatches = response.results || [];
        const validMatches = allMatches.filter(
          (match) =>
            match?.teams?.home?.name &&
            match?.teams?.home?.name !== "None" &&
            match?.teams?.away?.name &&
            match?.teams?.away?.name !== "None"
        );
        setMatches(validMatches.slice(0, 30));
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return (
      <Typography variant="body1" sx={{ mt: 2 }}>
        Carregando dados das partidas...
      </Typography>
    );
  }

  if (!matches || !Array.isArray(matches)) {
    return (
      <Typography color="error" variant="body1">
        Erro: não foi possível carregar os dados.
        {matches?.error && ` (${matches.error})`}
      </Typography>
    );
  }

  if (matches.length === 0) {
    return (
      <Typography color="error" variant="body1">
        Nenhuma partida encontrada.
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

        <SearchBar
          className={styles.searchBar}
        />

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


          <Typography className={styles.title}>
            {leagueHeader?.leagueName || "Carregando liga..."} </Typography>
        </Grid>



        <Grid
          id="containerCards"
          container
          spacing={2}
          className={styles.containerCards}
        >
          {matches.map((match) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              className={styles.cardItem}
              key={match.id}
            >
              <Card
                onClick={() => navigate(`/analisePartida/${match.id}`)}
                className={styles.card}
              >
                <Typography
                  variant="subtitle1"
                  className={styles.cardTitle}
                >
                  {getTeamName(match.teams.home)} vs{" "}
                  {getTeamName(match.teams.away)}
                </Typography>

                <Typography variant="body2" className={styles.cardText}>
                  Data: {match.date}
                </Typography>

                <Typography variant="body2" className={styles.cardText}>
                  Hora: {match.time}
                </Typography>

                <Typography variant="body2" className={styles.cardText}>
                  Status: {match.status}
                </Typography>

              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </>
  );
}
