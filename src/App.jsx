import "./App.css";
import Login from "./Pages/Login";
import Registro from "./Pages/Registro";
import EsqueciMinhaSenha from "./Pages/EsqueciMinhaSenha";
import Home from "./Pages/Home";
import AnalisePartida from "./Pages/AnalisePartida";
import Perfil from "./Pages/Perfil";
import { ThemeProvider, createTheme} from "@mui/material/styles";

// import Components from "./Pages/Components";
// import { supabase } from "./services/supabaseClient";

const theme = createTheme({
palette: {
  primary: {
    main: "#1976d2",
  },
  secondary: {
    main: "#dbaa37",
  }
}
})

export default function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Login />
      <Registro />
      </ThemeProvider>
      <EsqueciMinhaSenha />
      <Home />
      <AnalisePartida />
      <Perfil />
      <Components />
    </>
  );
}
