import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {
  Typography,
  Divider,
  autocompleteClasses,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";

export default function AnalisePartida() {
  const [matchData, setMatchData] = useState(null);
  const [loading, setLoading] = useState(true);


  
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
          ANÁLISE DA PARTIDA
        </Typography>
      </Box>
    </Box>
  );
}
