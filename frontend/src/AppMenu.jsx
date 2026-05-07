import MenuNav from "./components/Menu";
import { Outlet } from "react-router-dom";
import Login from "./components/Login-Register";
import "./AppMenu.css";
function App() {
  return (
    <>
      <nav>
        <a href="/"> Home </a>
        <MenuNav/>
        <Login/>
      </nav>
      <Outlet/>
    </>
  );
}

export default App;