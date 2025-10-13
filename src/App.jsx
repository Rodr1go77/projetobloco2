import "./App.css"
import Login from "./Components/Login";
import Registro from "./Components/Registro"
import EsqueciMinhaSenha from "./Components/EsqueciMinhaSenha"
import Home from "./Components/Home";
import AnalisePartida from "./Components/AnalisePartida"
import Perfil from "./Components/Perfil"

export default function App() {
  return (
    <div >
      <Login/>
      <Registro/>
      <EsqueciMinhaSenha/>
      <Home/>
      <AnalisePartida/>
      <Perfil/>
    </div>
  );
}



