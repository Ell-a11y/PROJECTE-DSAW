import { useParams } from "react-router-dom";
import CardObject from "./components/CardObject";
import { useEffect, useState } from "react";
import { objectsList } from "./communicationsManager";


export default function App() {
  const [lista, setLista] = useState([]);
  const { categoria } = useParams();
  useEffect(() => {
    async function cargarTodo() {
      const objetos = await objectsList();
      const normalizados = objetos.map((obj) => ({
        id: obj.id,
        nom: obj.nom,
        imatge: obj.imatge,
        usuario_nom: obj.user_nom ?? "Anonim",
        categoria_nom: obj.categoria_nom ?? "Sense categoria",
        descripcio: obj.descipcio ?? obj.descripcio,
        qualitat: obj.qualitat,
        estat: obj.estat,
        districte: obj.districte,
      }));
        const lista = [];
        for(const x in normalizados) {
            if(categoria == normalizados[x].categoria_nom) lista.push(normalizados[x]);
        }
        setLista(lista)
    }
    cargarTodo();
  });
  function RevisionCat() {
    let mensaje = "";
    if(categoria == undefined) {
      mensaje = "Categoria inexistent...";
    } else if(lista.length == 0){
      mensaje = "No hi han objectes...";
    }

    return (
      <p>{mensaje}</p>
    )
  }
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
      <RevisionCat/>
    </main>
  );
}