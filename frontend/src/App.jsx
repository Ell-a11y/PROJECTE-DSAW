import { BrowserRouter, Routes, Route } from "react-router-dom";
import App1 from "./App1";
import App2 from "./App2";
import MenuNav from "./AppMenu";
import Usuario from "./AppUsuarios"
import { AuthProvider } from "./AuthContext";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<MenuNav/>}>
            <Route path="/" element={<App1 />} />
            <Route path="/app2/:id" element={<App2 />} />
            <Route path="/usuari" element={<Usuario />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
