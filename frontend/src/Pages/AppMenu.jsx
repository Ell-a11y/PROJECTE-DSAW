import MenuNav from "../components/Menu";
import { Outlet } from "react-router-dom";
import Login from "../components/Login-Register";
import "../CSS/AppMenu.css";
// This function is responsible for displaying the Nav Menu
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