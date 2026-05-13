import "./CardObject.css";
import { useLocation, Link } from "react-router-dom";
import { deleteOneObject } from "./../communicationsManager";
import { useState } from "react";

const CardObject = ({ resource: recurso }) => {
  const [visible, setVisible] = useState(true);
  const location = useLocation();

  if (!recurso || !visible) return null;

  const { // Creamos la base del objeto, dejando fuera cualquier otro tipo de informacion
    id,
    nom,
    imatge,
    descripcio,
    estat,
    districte,
    categoria_nom,
    qualitat,
    user_nom,
  
  } = recurso;

  const isUserPage = location.pathname === "/usuari"; // Revisa si el PATHNAME es del usuario

  async function borrar() { // Funcion per eliminar el objecte
    await deleteOneObject(id);
    setVisible(false);
  }
  return ( // Creem els cards amb l'informacio dels Objectes
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
          <span className="meta-item">Usuari: {user_nom}</span>
        </div>

        <Link to={`/app2/${id}`} className="meta-button">
          Pagina del producte
        </Link>
      </div>
      {isUserPage && ( // Si la pagina es una pagina de editar apareixeran aquestos botons
        <>
          <button onClick={borrar}>Eliminar</button>
          <button><Link to={`/usuari/edit/${id}`}>Editar...</Link></button>
        </>
      )}
    </article>
  );
};

export default CardObject;
