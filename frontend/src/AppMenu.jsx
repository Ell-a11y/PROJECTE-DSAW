import MenuNav from "./components/Menu";
import { Outlet } from "react-router-dom";
import Login from "./components/Login-Register";
import Usuari from "./components/Usuari"
import "./AppMenu.css";
function App() {
  return (
    <>
      <nav>
        <a href="/"> Home </a>
        <MenuNav/>
        <Login/>
        <Usuari/>
      </nav>
      <Outlet/>
    </>
  );
}

export default App;