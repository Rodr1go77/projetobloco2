import "./App.module.css";
import { useEffect, useState } from "react";
import Login from "./Pages/Login";
import Registro from "./Pages/Registro";
import EsqueciMinhaSenha from "./Pages/EsqueciMinhaSenha";
import ListaPartidas from "./Pages/ListaPartidas";
import AnalisePartida from "./Pages/AnalisePartida";
import RedefinirSenha from "./Pages/RedefinirSenha";
import Perfil from "./Pages/Perfil";
import JogoResponsavel from "./Pages/JogoResponsavel";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Authentication from "./services/Authentication";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
  Navigate,
} from "react-router-dom";
import RoutesPath from "./routes/RoutesPath";
import AuthLayout from "./layout/AuthLayout";
import PublicLayout from "./layout/PublicLayout";

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

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route
          path="/"
          element={<Navigate to={RoutesPath.LOGIN} replace />}
        />
        {/* Publicas */}
        <Route
          path={RoutesPath.LOGIN}
          element={<Login onLoginSuccess={() => setIsAuthenticated(true)} />}
        />
        <Route element={<PublicLayout />}>
          <Route
            path={RoutesPath.ESQUECI_SENHA}
            element={<EsqueciMinhaSenha />}
          />
          <Route path={RoutesPath.REGISTRO} element={<Registro />} />
          <Route path={RoutesPath.RESETAR_SENHA} element={<RedefinirSenha />} />
        </Route>

        {/* Privadas */}
        <Route element={<AuthLayout isAuthenticated={isAuthenticated} />}>
          <Route
            path={RoutesPath.LISTA_PARTIDAS}
            element={<ListaPartidas />}
          />
          <Route
            path={RoutesPath.ANALISE_PARTIDA}
            element={<AnalisePartida />}
          />
          <Route path={RoutesPath.PERFIL} element={<Perfil />} />
          <Route
            path={RoutesPath.JOGO_RESPONSAVEL}
            element={<JogoResponsavel />}
          />
        </Route>
      </Route>
    )
  );

  return (
    <>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  );
}
