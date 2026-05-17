import { useEffect, useState } from "react";
import { getUser } from "./../communicationsManager";

export default function Usuari() {
  const [persona, setPersona] = useState(null);

  useEffect(() => {
    async function InfoUser() {
      const data = await getUser();
      setPersona({ nom: data.nom, cognom: data.cognom, email: data.email });
    }
    InfoUser();
  }, []);

  if (!persona) {
    return (
      <section className="user-profile" aria-live="polite">
        <p className="loading-text">Carregant perfil…</p>
      </section>
    );
  }

  return (
    <section className="user-profile" aria-labelledby="user-profile-title">
      <h2 id="user-profile-title" className="user-profile__title">El teu perfil</h2>
      <p className="user-profile__detail">
        <strong>Nom:</strong> {persona.nom} {persona.cognom}
      </p>
      <p className="user-profile__detail">
        <strong>Email:</strong> {persona.email}
      </p>
    </section>
  );
}
