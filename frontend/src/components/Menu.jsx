import { useEffect, useState } from "react";
import { getCategories, getDistricts } from "./../communicationsManager";
import { Link } from "react-router-dom";
import "./../CSS/Menu.css";

function Menu() {
  const [categorias, setCategorias] = useState([]);
  const [districtes, setDistrictes] = useState([]);

  useEffect(() => {
    async function cargar() {
      const data = await getCategories();
      const dataDis = await getDistricts();
      setCategorias(data);
      setDistrictes(dataDis);
    }
    cargar();
  }, []);

  return (
    <div className="filter-nav" aria-label="Filtres">
      <details className="filter-menu">
        <summary className="filter-menu__summary">Categories</summary>
        <ul className="filter-menu__list" role="list">
          {categorias.map((cat) => (
            <li key={cat.id}>
              <Link to={`/categoria/${cat.categoria}`}>{cat.categoria}</Link>
            </li>
          ))}
        </ul>
      </details>
      <details className="filter-menu">
        <summary className="filter-menu__summary">Districtes</summary>
        <ul className="filter-menu__list" role="list">
          {districtes.map((dis) => (
            <li key={dis.id}>
              <Link to={`/districte/${dis.name}`}>{dis.name}</Link>
            </li>
          ))}
        </ul>
      </details>
    </div>
  );
}

export default Menu;
