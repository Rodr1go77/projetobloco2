import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {
  Typography,
  Card,
  List,
  ListItem,
  Divider,
  autocompleteClasses,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";

export default function AnalisePartida() {
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
    <Box sx={{ display: "flex",  justifyContent: "center", alignItems: "center", height: "100vh", }}>
      
      <Box  sx={{ marginBottom: 5, display: "flex", flexDirection: "column",  width: 1000, justifyContent: "center",  
        alignItems: "center", border: "2px solid #1976d2", borderRadius: "7px", padding: 4, margin: "auto" }} >

        <Typography sx={{ fontWeight: "bolder", fontSize: "2rem", marginBottom: 3, color: "white" }}> ANÁLISE DA PARTIDA </Typography>
        
        <Typography variant="h3" gutterBottom align="center">
         {matchData.teams.home.name} vs {matchData.teams.away.name}
        </Typography>

<Box>
<Typography variant="h5" > Odds da partida <br />
</Typography>
</Box>

<Typography variant="h5" > 
  {matchData.teams.home.name} - {matchData.odds.match_winner.home} {" "} - 
  Empate - {matchData.odds.match_winner.draw} {" "}- {" "} 
    {matchData.teams.away.name} - {matchData.odds.match_winner.away}
    </Typography>

<Box>
  <br />
<Typography variant="h5" > Vencedor do Confronto:  {matchData.winner} <br />

</Typography>
</Box>



        <Typography variant="body1" gutterBottom align="center"> 
          <br />
         Data da partida: {matchData.date} <br />
         Horário do jogo: {matchData.time} <br />
         Campeonato: {matchData.league.name} <br />
         País: {matchData.country.name} <br />
         Estádio: {matchData.stadium.name} <br />
         Cidade: {matchData.stadium.city}
         </Typography>
         
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



      </Box>

    </Box>
  );
}
