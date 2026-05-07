import { useEffect, useState } from "react";
import { getCategories } from "./../communicationsManager";

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
            <a href="/">{cat.categoria}</a>
          </li>
        ))}
      </details>
    </nav>
  );
}

export default App;