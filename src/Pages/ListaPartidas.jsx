import { Grid, Typography, Card, Box, Avatar, SearchBar } from "../Components";
import { useEffect, useState } from "react";
import { getMatches } from "../services/getMatches";
import { useNavigate } from "react-router-dom";
import styles from "./ListaPartidas.module.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import logos from "../assets/images/escudos_premier/logos";
import ClearIcon from "@mui/icons-material/Clear";

export default function ListaPartidas() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [leagueHeader, setLeagueHeader] = useState(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 150;
  const navigate = useNavigate();


  // pega nome do time
  const getTeamName = (team) => {
    if (!team || !team.name || team.name === "None") return "Não disponível";
    return team.name;
  };

  // formata data
  const toDate = (dateStr) => {
    if (!dateStr) return null;
    const [d, m, y] = dateStr.split("/");
    return new Date(`${y}-${m}-${d}`);
  };

  // filtro de dados
  const filteredData = (matches ?? []).filter((item) => {
    if (!search) return true;
    const termo = search.toLowerCase();
    return (
      item.teams.home.name.toLowerCase().includes(termo) ||
      item.teams.away.name.toLowerCase().includes(termo)
    );
  });

  //
  const visibleFilteredData = filteredData.slice(0, page * pageSize);


  useEffect(() => {
    async function loadMatches() {
      try {
        setLoading(true);
        const response = await getMatches();
        const allMatches = response?.results ?? [];
        console.log("Carregando LISTA de partidas...");
        setLeagueHeader(response.leagueHeader);
        const cutoffDate = toDate("01/12/2025");
        const validMatches = allMatches.filter((match) => {
          const home = match?.teams?.home?.name;
          const away = match?.teams?.away?.name;
          const matchDate = toDate(match?.date);

          return (
            home &&
            home !== "None" &&
            away &&
            away !== "None" &&
            matchDate &&
            matchDate >= cutoffDate
          );
        });

        setMatches(validMatches.slice(0, 150));
      } finally {
        setLoading(false);
      }
    }
    loadMatches();
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


        <Grid id="containerTitulo"
          item
          xs={12}
          sm={12}
          md={10}
          lg={8}
          xl={6}
          className={styles.containerTitulo}
        >
          <Typography className={styles.title}>
            {leagueHeader?.leagueName || "Carregando liga..."}{" "}
          </Typography>

        </Grid>

        <SearchBar
          className={styles.searchBar}
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }} />

        <Grid
          id="containerCards"
          container
          spacing={2}
          className={styles.containerCards}
        >
          {visibleFilteredData.map((match) => (
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

                <Box sx={{ display: "flex", alignItems: "center", gap: 2, padding: 2 }}>
                  <Avatar
                    src={logos[match.teams.home.name]}
                    sx={{ padding: 1.5, width: 50, height: 50, backgroundColor: "white", border: "3px solid #064c91", "& img": { objectFit: "contain" } }}
                  />
                  <ClearIcon sx={{ fontSize: 36, color: "#064c91" }} />
                  <Avatar
                    src={logos[match.teams.away.name]}
                    sx={{ padding: 1.5, width: 50, height: 50, backgroundColor: "white", border: "3px solid #064c91", "& img": { objectFit: "contain" } }}
                  />
                </Box>

                <Typography variant="subtitle1" className={styles.cardTitle}>
                  {getTeamName(match.teams.home)} vs{" "}
                  {getTeamName(match.teams.away)}
                </Typography>


                <Box className={styles.boxData}>
                  <Typography variant="body2" className={styles.cardText}>
                    Data: {match.date}
                  </Typography>

                  <Typography variant="body2" className={styles.cardText}>
                    Hora: {match.time}
                  </Typography>

                  <Typography variant="body2" className={styles.cardText}>
                    Status: {match.status}
                  </Typography>
                  <Typography variant="body2" className={styles.cardText}>
                    Preview:
                    {match.match_preview?.has_preview ? (
                      <VisibilityIcon sx={{ color: "#185491", ml: 0.5 }} />
                    ) : (
                      <VisibilityOffIcon sx={{ color: "gray", ml: 0.5 }} />
                    )}
                  </Typography>
                </Box>
              </Card>

            </Grid>
          ))}
        </Grid>
      </Grid>
    </>
  );
}