import "./App.css";
import { useEffect, useState } from "react";
import React from "react";
import Login from "./Pages/Login";
import Registro from "./Pages/Registro";
import EsqueciMinhaSenha from "./Pages/EsqueciMinhaSenha";
import ListaPartidas from "./Pages/ListaPartidas";
import AnalisePartida from "./Pages/AnalisePartida";
import Perfil from "./Pages/Perfil";
import JogoResponsavel from "./Pages/JogoResponsavel";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Authentication from "./services/Authentication";
import {
  Routes,
  Route,
} from "react-router-dom";
import RoutesPath from "./routes/RoutesPath";
import AuthLayout from "./layout/AuthLayout";

// import { supabase } from "./services/supabaseClient";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dbaa37",
    },
  },
});

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      setTimeout(async () => {
        const auth = await Authentication.isAuthenticated();
        setIsAuthenticated(auth);
      }, 2000);
    };
    checkAuth();
  }, []);

  return (
    <>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route
            path={RoutesPath.LOGIN} element={<Login onLoginSuccess={() => setIsAuthenticated(true)} />}
          />
          <Route element={<AuthLayout isAuthenticated={isAuthenticated}/>}>
            <Route path={RoutesPath.LISTA_PARTIDAS} element={<ListaPartidas />}/>
            <Route path={RoutesPath.ANALISE_PARTIDA} element={<AnalisePartida />}/>
            <Route path={RoutesPath.REGISTRO} element={<Registro />} />
            <Route path={RoutesPath.ESQUECI_SENHA}element={<EsqueciMinhaSenha />}/>
            <Route path={RoutesPath.PERFIL} element={<Perfil />} />
            <Route path={RoutesPath.JOGO_RESPONSAVEL}element={<JogoResponsavel />}/>
          </Route>

        </Routes>
      </ThemeProvider>
    </>
  );
}
