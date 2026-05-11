import { useEffect, useState } from "react";
import { getCategories } from "./../communicationsManager";
import { Link } from "react-router-dom";

function App() {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    async function cargar() {
      const data = await getCategories();
      setCategorias(data);
    }
    cargar();
  }, []);
  
  return (
    <nav>
      <details>
        <summary> Categories </summary>

        {categorias.map(cat => (
          <li key={cat.id}>
            <Link to={`/categoria/${cat.categoria}`}>{cat.categoria}</Link>
          </li>
        ))}
      </details>
    </nav>
  );
}

export default App;