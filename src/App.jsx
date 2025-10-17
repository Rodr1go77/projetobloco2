import "./App.css";
import Login from "./Pages/Login";
import Registro from "./Pages/Registro";
import EsqueciMinhaSenha from "./Pages/EsqueciMinhaSenha";
import Home from "./Pages/Home";
import AnalisePartida from "./Pages/AnalisePartida";
import Perfil from "./Pages/Perfil";
import {supabase} from "./services/supabaseClient";

export default function App() {
  return (
    <div>
      <Login />
      <Registro />
      <EsqueciMinhaSenha />
      <Home />
      <AnalisePartida />
      <Perfil />
    </div>
  );
}
