import { useEffect, useState } from "react";
import UserInfo from "../components/Usuari";
import CardObject from "../components/CardObject";
import { objectsList, getUser } from "../communicationsManager";
import AddObject from "../components/AddObject";
import "../CSS/AppUsuarios.css";

export default function AppUsuarios() {
  const [lista, setLista] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function cargarDatos() {
      try {
        const objects = await objectsList();
        const user = await getUser();
        const filtrados = objects.filter((obj) => obj.users == user.id);
        setLista(filtrados);
      } finally {
        setLoading(false);
      }
    }
    cargarDatos();
  }, []);

  return (
    <main id="main-content" className="user-page">
      <UserInfo />
      <article>
        <header className="user-objects__header">
          <h1>Els teus objectes</h1>
        </header>

        <details className="add-object-panel">
          <summary>Afegeix el teu objecte</summary>
          <AddObject />
        </details>

        {loading ? (
          <p className="loading-text" role="status" aria-live="polite">
            Carregant els teus objectes…
          </p>
        ) : lista.length === 0 ? (
          <p className="empty-state" role="status">
            Encara no has publicat cap objecte.
          </p>
        ) : (
          <section className="cards-grid" aria-label="Els teus objectes">
            {lista.map((recurso) => (
              <CardObject key={recurso.id ?? `${recurso.nom}-${recurso.users}`} resource={recurso} />
            ))}
          </section>
        )}
      </article>
    </main>
  );
}
