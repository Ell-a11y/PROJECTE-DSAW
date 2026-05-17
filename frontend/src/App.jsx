import { BrowserRouter, Routes, Route } from "react-router-dom";
import App1 from "./Pages/App1";
import App2 from "./Pages/App2";
import MenuNav from "./Pages/AppMenu";
import Usuario from "./Pages/AppUsuarios"
import FormEdit from "./Pages/FormEditarObj"
import AppCategories from "./Pages/AppCategories"
import AppDistricte from "./Pages/AppDistricte"
import { AuthProvider } from "./AuthContext";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Cogera por defecto siempre MenuNav como contenedor principal de todo */}
          <Route element={<MenuNav/>}> 
            <Route path="/" element={<App1 />} />
            <Route path="/app2/:id" element={<App2 />} />
            <Route path="/app2/" element={<App2 />} />
            <Route path="/usuari" element={<Usuario />} />
            <Route path="/usuari/edit/:id" element={<FormEdit />} />
            <Route path="/categoria/:categoria" element={<AppCategories />} />
            <Route path="/categoria/" element={<AppCategories />} />
            <Route path="/districte/:districte" element={<AppDistricte />} />
            <Route path="/districte/" element={<AppDistricte />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
