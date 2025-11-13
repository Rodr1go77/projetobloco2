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
import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";
import NavMenu from "./Pages/NavMenu";
import RoutesPath from "./routes/RoutesPath";

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
  const navigate =  useNavigate

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
        {isAuthenticated ? (
          <ListaPartidas />
        ) : (
          <Login onLoginSuccess={() => setIsAuthenticated(true)} />
        )}
        {/* <ListaPartidas /> */}
        {/* <NavMenu /> */}

      <Routes>
        <Route path={RoutesPath.LOGIN} element={<Login />} />
        <Route path={RoutesPath.LISTA_PARTIDAS} element={<ListaPartidas />} />
        <Route path={RoutesPath.REGISTRO} element={<Registro />} />
        <Route path={RoutesPath.ESQUECI_SENHA} element={<EsqueciMinhaSenha />} />
        <Route path={RoutesPath.PERFIL} element={<Perfil />} />
        <Route path={RoutesPath.ANALISE_PARTIDA} element={<AnalisePartida />} />
        <Route path={RoutesPath.JOGO_RESPONSAVEL} element={<JogoResponsavel />} />
      </Routes>

      </ThemeProvider>

      {/* <AnalisePartida /> */}
      {/* <EsqueciMinhaSenha /> */}
      {/* <Perfil /> */}
      {/* <JogoResponsavel /> */}
    </>
  );
}
