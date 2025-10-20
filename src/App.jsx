import "./App.css";
import { useEffect, useState } from "react";
import React from "react";
import Login from "./Pages/Login";
import Registro from "./Pages/Registro";
import EsqueciMinhaSenha from "./Pages/EsqueciMinhaSenha";
import Home from "./Pages/Home";
import AnalisePartida from "./Pages/AnalisePartida";
import Perfil from "./Pages/Perfil";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Components from "./Pages/Components";
import Authentication from "./services/Authentication";

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
        {isAuthenticated ? (
          <Home />
        ) : (
          <Login onLoginSuccess={() => setIsAuthenticated(true)} />
        )}
      </ThemeProvider>

      {/* <Registro /> */}
      {/* <EsqueciMinhaSenha /> */}
      {/* <AnalisePartida /> */}
      {/* <Perfil /> */}
      {/* <Components /> */}
    </>
  );
}
