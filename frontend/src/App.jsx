import { BrowserRouter, Routes, Route } from "react-router-dom";
import App1 from "./App1";
import App2 from "./App2";
import MenuNav from "./AppMenu";
import Usuario from "./AppUsuarios"
import FormEdit from "./FormEditarObj"
import AppCategories from "./AppCategories"
import { AuthProvider } from "./AuthContext";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<MenuNav/>}>
            <Route path="/" element={<App1 />} />
            <Route path="/app2/:id" element={<App2 />} />
            <Route path="/app2/" element={<App2 />} />
            <Route path="/usuari" element={<Usuario />} />
            <Route path="/usuari/edit/:id" element={<FormEdit />} />
            <Route path="/categoria/:categoria" element={<AppCategories />} />
            <Route path="/categoria/" element={<AppCategories />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
