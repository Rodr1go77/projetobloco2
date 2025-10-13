import "./App.css"
import Main from "./Components/Main";
import AnalisePartida from "./Components/AnalisePartida"
import InfoPartida from "./Components/InfoPartida";
import JogoResponsavel from "./Components/JogoResponsavel"
import Cadastro from "./Components/Cadastro"

export default function App() {
  return (
    <div >
      <Main/>
      <AnalisePartida/>
      <InfoPartida/>
      <JogoResponsavel/>
      <Cadastro/>
    </div>
  );
}



