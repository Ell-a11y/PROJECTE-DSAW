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
    <nav>
      <section>
        <details>
          <summary> Categories </summary>
          {/* Cargaran todas las categorias y se pondran los enlaces corresponientes para cada categoria */}
          {categorias.map(cat => (
            <li key={cat.id}>
              <Link to={`/categoria/${cat.categoria}`}>{cat.categoria}</Link>
            </li>
          ))}
        </details>
      </section>
      <section>
        <details>
          <summary> Districtes </summary>
          {/* Cargaran todos los distritos y se pondran los enlaces corresponientes para cada categoria */}
          {districtes.map(dis => (
            <li key={dis.id}>
              <Link to={`/districte/${dis.name}`}>{dis.name}</Link>
            </li>
          ))}
        </details>
      </section>
    </nav>
  );
}

export default App;