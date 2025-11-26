import { Grid, Typography, Card } from "../Components";
import { useEffect, useState } from "react";
import { getMatches } from "../services/getMatches";

export default function ListaPartidas() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  const getTeamName = (team) => {
    if (!team || !team.name || team.name === "None") return "Indefinido";
    return team.name;
  };

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const response = await getMatches();
        if (!response.error) {
          setMatches(response.results.slice(0, 30));
          console.log("Matches no estado:", response.results.slice(0, 30));
        } else {
          console.error("Erro ao buscar partidas:", response.error);
        }
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
        sx={{ display: "flex", justifyContent: "center" }}
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
              fontSize: "2rem",
              textAlign: "center",
              color: "white",
              p:1
            }}
          >
            BUSCA DE PARTIDAS AQUI
          </Typography>
        </Grid>

        <Grid
          id="containerCards"
          container
          spacing={2}
          justifyContent="space-evenly"
        >
          {matches.map((match) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              sx={{ display: "flex", justifyContent: "center" }}
              key={match.id}
            >
              <Card
                onClick={() => alert(`Id do jogo: ${match.id}`)}
                sx={{
                  padding: 2,
                  ":hover": { transform: "scale(1.05)", border: "1px solid #1976d2" },
                  transition: "0.2s",
                  cursor: "pointer",
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  backgroundColor: "#AAC4F5",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "365px",
                }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: "bold",
                    color: "#185491ff",
                    textTransform: "upperCase",
                    textAlign: "center",
                  }}
                >
                  {getTeamName(match.teams.home)} vs{" "}
                  {getTeamName(match.teams.away)}
                </Typography>

                <Typography variant="body2" sx={{ color: "black" }}>
                  Data: {match.date}
                </Typography>

                <Typography variant="body2" sx={{ color: "black" }}>
                  Hora: {match.time}
                </Typography>

                <Typography variant="body2" sx={{ color: "black" }}>
                  Status: {match.status}
                </Typography>
                
                <Typography variant="body2" sx={{ color: "black" }}>
                  Teste {match.league}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </>
  );
}
