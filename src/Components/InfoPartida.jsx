import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {
  Typography,
  Divider,
  autocompleteClasses,
  Button,
} from "@mui/material";

import { useEffect, useState } from "react";

export default function InfoPartida() {

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
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          marginBottom: 5,
          // height: "80vh",
          display: "flex",
          flexDirection: "column",
          width: 1000,
          justifyContent: "center",
          alignItems: "center",
          border: "2px solid #1976d2",
          borderRadius: "7px",
          padding: 4,
          margin: "auto",
        }}
      >
        <Typography
          sx={{
            fontWeight: "bolder",
            fontSize: "2rem",
            marginBottom: 3,
            color: "white",
          }}
        >
          {" "}
         INFORMAÇÕES DA PARTIDA
        </Typography>


        
      </Box>
    </Box>
  );
}
