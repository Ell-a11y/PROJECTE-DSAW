import { useEffect, useState } from "react";
import CardObject from "./components/CardObject";
import { objectsList } from "./communicationsManager";

export default function App() {
  const [lista, setLista] = useState([]);
  useEffect(() => { // Cargara una funcion que cargara toda la lista de objetos para ponerlos en una lista aparte con los atributos correspondientes
    async function cargarTodo() {
      const objetos = await objectsList();
      const normalizados = objetos.map((obj) => ({
        id: obj.id,
        nom: obj.nom,
        imatge: obj.imatge,
        user_nom: obj.user_nom ?? "Anonim",
        categoria_nom: obj.categoria_nom ?? "Sense categoria",
        descripcio: obj.descipcio ?? obj.descripcio,
        qualitat: obj.qualitat,
        estat: obj.estat,
        districte: obj.districte,
      }));
      setLista(normalizados);
    }
    cargarTodo();
  }, []); // Cargara solo al principio
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        gap: "16px",
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "wrap",
        padding: "24px",
        background: "#b2d1ff",
      }}
    >
      {lista.map((recurso) => ( // Cargara la lista de los objetos
        <CardObject key={recurso.id} resource={recurso} />
      ))}
    </main>
  );
}
