import { Grid, Typography, Box } from "../Components";
import { Divider } from "../Components";
import { List, ListItem, ListItemText, ListItemIcon } from "@mui/material";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import styles from "./JogoResponsavel.module.css";

export default function JogoResponsavel() {
  return (
    <>
      <Grid
        id="containerTitulo"
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
            p: 1,
          }}
        >
          Jogo Responsável
        </Typography>
      </Grid>

      <Box
        id="BoxJogoResp"
        className={styles.boxInfo}
      >
        <Typography className={styles.sectionTitle}>
          O que é apostar com responsabilidade?
        </Typography>

        <Divider
          textAlign="center"
          className={styles.divider}
        >
        </Divider>

        <Typography variant="body1" sx={{ lineHeight: 1.5, margin: "8px 0" }} align="left">
          Apostar deve ser uma forma de entretenimento — nunca uma ferramenta para resolver problemas financeiros ou emocionais. Jogar com responsabilidade significa <strong>reconhecer os seus limites, tomar decisões conscientes e manter o controle sobre o tempo e o dinheiro investidos.</strong>
        </Typography>
        <Typography variant="body1" sx={{ lineHeight: 1.5, margin: "8px 0" }} align="left">
          A prática responsável protege você, mantém o jogo saudável e garante que a experiência permaneça leve, segura e positiva. Lembre-se: você aposta pelo prazer da emoção, não pela obrigação de ganhar. A melhor aposta é sempre aquela feita com equilíbrio.
        </Typography>
        <Typography variant="body1" sx={{ lineHeight: 1.5, margin: "8px 0" }} align="left">
          Para isso, recomenda-se:
        </Typography>

        <List className={styles.list}>
          <ListItem>
            <ListItemIcon>
              <SportsSoccerIcon sx={{ color: "#10be58ff", fontSize: "38px" }}/>
            </ListItemIcon>
            <ListItemText>
              <Typography variant="body1" sx={{ lineHeight: 1.5, margin: "8px 0" }} align="left">
                Definir previamente um orçamento.
              </Typography>
            </ListItemText> 
          </ListItem>
          <ListItem>
            
            <ListItemIcon>
              <SportsSoccerIcon sx={{ color: "#10be58ff", fontSize: "38px" }}/>
            </ListItemIcon>
            <ListItemText>
              <Typography variant="body1" sx={{ lineHeight: 1.5, margin: "8px 0" }} align="left">
                Evitar perseguir perdas.
              </Typography>
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <SportsSoccerIcon sx={{ color: "#10be58ff", fontSize: "38px"   }} />
            </ListItemIcon>
            <ListItemText>
              <Typography variant="body1" sx={{ lineHeight: 1.5, margin: "8px 0" }} align="left">
                Fazer pausas regulares.
              </Typography>
            </ListItemText>
          </ListItem>
          <ListItem>
              <ListItemIcon>
                <SportsSoccerIcon sx={{ color: "#10be58ff", fontSize: "38px"  }}/>
            </ListItemIcon>
            <ListItemText>
              <Typography variant="body1" sx={{ lineHeight: 1.5, margin: "8px 0" }} align="left">
                 Use recursos da sua plataforma para limitar seus depósitos, o tempo de jogo ou acesso à plataforma.
              </Typography>
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <SportsSoccerIcon sx={{ color: "#c21111ff", fontSize: "38px" }}/>
            </ListItemIcon>
            <ListItemText>
              <Typography variant="body1" sx={{ lineHeight: 1.5, margin: "8px 0" }} align="left">
                Se sentir que o jogo está afetando seu bem-estar, procure ajuda especializada.
              </Typography>
            </ListItemText>
          </ListItem>

        </List>
      </Box>
    </>
  );
}
