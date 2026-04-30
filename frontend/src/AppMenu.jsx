import MenuNav from "./components/Menu";
import { Outlet } from "react-router-dom";
import Login from "./components/Login-Register";
import "./AppMenu.css";
function App() {
  return (
    <nav>
      <MenuNav/>
      <Outlet/>
      <Login></Login>
    </nav>
  );
}

export default App;