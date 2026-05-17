import { useParams } from "react-router-dom";
import CardObject from "../components/CardObject";
import { useEffect, useState } from "react";
import { objectsList } from "../communicationsManager";

export default function AppDistricte() {
  const [lista, setLista] = useState([]);
  const [loading, setLoading] = useState(true);
  const { districte } = useParams();

  useEffect(() => {
    async function cargarTodo() {
      try {
        const objetos = await objectsList();
        const normalizados = objetos.map((obj) => ({
          id: obj.id,
          nom: obj.nom,
          imatge: obj.imatge,
          user_nom: obj.user_nom ?? "Anònim",
          categoria_nom: obj.categoria_nom ?? "Sense categoria",
          descripcio: obj.descipcio ?? obj.descripcio,
          qualitat: obj.qualitat,
          estat: obj.estat,
          districte: obj.districte,
        }));
        const filtrada = normalizados.filter((obj) => districte === obj.districte);
        setLista(filtrada);
      } finally {
        setLoading(false);
      }
    }
    cargarTodo();
  }, [districte]);

  const mensaje =
    !districte ? "Districte inexistent…" :
    lista.length === 0 ? "No hi ha objectes en aquest districte." : "";

  return (
    <main id="main-content" className="page-main">
      <header className="page-header">
        <h1>Districte: {districte ?? "—"}</h1>
      </header>

      {loading ? (
        <p className="loading-text" role="status">Carregant…</p>
      ) : mensaje ? (
        <p className="empty-state" role="status">{mensaje}</p>
      ) : (
        <section className="cards-grid" aria-label={`Objectes a ${districte}`}>
          {lista.map((recurso) => (
            <CardObject key={recurso.id} resource={recurso} />
          ))}
        </section>
      )}
    </main>
  );
}
