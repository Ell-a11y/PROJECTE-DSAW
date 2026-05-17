import { useEffect, useState } from "react";
import CardObject from "../components/CardObject";
import { objectsList } from "../communicationsManager";

export default function App1() {
  const [lista, setLista] = useState([]);
  const [loading, setLoading] = useState(true);

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
        setLista(normalizados);
      } finally {
        setLoading(false);
      }
    }
    cargarTodo();
  }, []);

  return (
    <main id="main-content" className="page-main">
      <header className="page-header">
        <h1>Objectes disponibles a Barcelona</h1>
        <p>
          Dona o demana en préstec objectes infrautilitzats i fomenta l&apos;economia
          del compartir al teu barri.
        </p>
      </header>

      {loading ? (
        <p className="loading-text" role="status" aria-live="polite">
          Carregant objectes…
        </p>
      ) : lista.length === 0 ? (
        <p className="empty-state" role="status">
          Encara no hi ha objectes publicats.
        </p>
      ) : (
        <section className="cards-grid" aria-label="Llista d'objectes">
          {lista.map((recurso) => (
            <CardObject key={recurso.id} resource={recurso} />
          ))}
        </section>
      )}
    </main>
  );
}
