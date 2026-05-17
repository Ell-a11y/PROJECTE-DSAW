import { useEffect, useState } from "react";
import { getCategories, getDistricts } from "./../communicationsManager";
import { Link } from "react-router-dom";
import "./../CSS/Menu.css";

function App() {
  const [categorias, setCategorias] = useState([]);
  const [districtes, setDistrictes] = useState([]);

  useEffect(() => { // Carga las categorias i districtes
    async function cargar() {
      const data = await getCategories();
      const dataDis = await getDistricts();
      setCategorias(data);
      setDistrictes(dataDis);
    }
    cargar();
  }, []);
  
  return (
    <nav className="navbar">
      <section className="dropdown">
        <details>
          <summary> Categories </summary>
          <div className="dropdown-menu">
          {/* Cargaran todas las categorias y se pondran los enlaces corresponientes para cada categoria */}
          {categorias.map(cat => (
            <li key={cat.id}>
              <Link to={`/categoria/${cat.categoria}`}>{cat.categoria}</Link>
            </li>
          ))}
          </div>
        </details>
      </section>
      <section className="dropdown">
        <details>
          <summary> Districtes </summary>
          <div className="dropdown-menu">
          {/* Cargaran todos los distritos y se pondran los enlaces corresponientes para cada categoria */}
          {districtes.map(dis => (
            <li key={dis.id}>
              <Link to={`/districte/${dis.name}`}>{dis.name}</Link>
            </li>
          ))}
          </div>
        </details>
      </section>
    </nav>
  );
}

export default App;