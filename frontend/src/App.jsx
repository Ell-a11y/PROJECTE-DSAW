import { BrowserRouter, Routes, Route } from "react-router-dom";
import App1 from "./App1";
import App2 from "./App2";
import MenuNav from "./AppMenu";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MenuNav/>}>
          <Route path="/" element={<NavF/>, <App1 />} />
          <Route path="/app2" element={<NavF/>, <App2 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
