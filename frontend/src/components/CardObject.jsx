import "./CardObject.css";
import { useLocation, Link } from "react-router-dom";
import { deleteOneObject } from "./../communicationsManager";
import { useState } from "react";

const CardObject = ({ resource: recurso }) => {
  const [visible, setVisible] = useState(true);
  const location = useLocation();

  if (!recurso || !visible) return null;

  const {
    id,
    nom,
    imatge,
    descripcio,
    estat,
    districte,
    categoria_nom,
    qualitat,
    usuario_nom,
  } = recurso;

  const isUserPage = location.pathname === "/usuari";

  async function borrar() {
    await deleteOneObject(id);
    setVisible(false);
  }

  return (
    <article className="card-component">
      <img
        className="card-image"
        src={imatge}
        alt={nom}
        loading="lazy"
        onError={(event) => {
          event.currentTarget.src =
            "https://t4.ftcdn.net/jpg/06/57/37/01/360_F_657370150_pdNeG5pjI976ZasVbKN9VqH1rfoykdYU.jpg";
        }}
      />

      <div className="card-content">
        <h2 className="card-title">{nom}</h2>
        <p className="card-description">{descripcio}</p>

        <div className="card-meta">
          <span className="meta-item">Estat: {estat}</span>
          <span className="meta-item">Districte: {districte}</span>
          <span className="meta-item">Categoria: {categoria_nom}</span>
          <span className="meta-item">Qualitat: {qualitat}</span>
          <span className="meta-item">Usuari: {usuario_nom}</span>
        </div>

        <Link to={`/app2/${id}`} className="meta-button">
          Pagina del producte
        </Link>
      </div>
      {isUserPage && (
        <>
          <button onClick={borrar}>Eliminar</button>
          <button>Editar...</button>
        </>
      )}
    </article>
  );
};

export default CardObject;
