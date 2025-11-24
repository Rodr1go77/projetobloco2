import { Grid, Typography } from "../Components";

export default function EsqueciMinhaSenha() {
  return (
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
        justifyContent: "space-evenly",
        alignItems: "center",
        textAlign: "center",
        border: "4px solid #1976d2",
        borderRadius: "8px",
        width: "100%",
        padding: 1,
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
        }}
      >
        Esqueci minha senha
      </Typography>
    </Grid>
  );
}
