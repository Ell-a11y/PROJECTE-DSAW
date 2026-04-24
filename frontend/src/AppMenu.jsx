import MenuNav from "./components/Menu";
import { Outlet } from "react-router-dom"

function App() {
  return (
    <>
      <MenuNav/>
      <Outlet/>
    </>
  );
}

export default App;