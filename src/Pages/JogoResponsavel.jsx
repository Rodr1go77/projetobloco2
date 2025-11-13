import Box from "@mui/material/Box";
import {
  Typography
} from "@mui/material";

export default function JogoResponsavel() {
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
      Jogo Responsável
        </Typography>
      </Box>
    </Box>
  );
}
