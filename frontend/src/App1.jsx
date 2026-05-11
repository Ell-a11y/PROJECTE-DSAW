import { useEffect, useState } from "react";
import CardObject from "./components/CardObject";
import { objectsList } from "./communicationsManager";

export default function App() {
  const [lista, setLista] = useState([]);
  useEffect(() => {
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
  }, []);
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
      {lista.map((recurso) => (
        <CardObject key={recurso.id} resource={recurso} />
      ))}
    </main>
  );
}
