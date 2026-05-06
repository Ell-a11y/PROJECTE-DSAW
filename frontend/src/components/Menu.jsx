import { useEffect, useState } from "react";
import { getCategories } from "./../communicationsManager";

function App() {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    async function cargar() {
      const data = await getCategories();
      console.log("Array" + data)
      setCategorias(data);
    }
    cargar();
  }, []);
  console.log(categorias);
  
  return (
    <nav>
      <details>
        <summary> Categories </summary>

        {categorias.map(cat => (
          <li key={cat.id}>
            <a href="/">{cat.nombre}</a>
          </li>
        ))}
      </details>
    </nav>
  );
}

export default App;