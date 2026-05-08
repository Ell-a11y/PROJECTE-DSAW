import "./CardObject.css";
import { Link } from "react-router-dom";

const CardObject = ({ resource: recurso }) => {
  if (!recurso) return null;

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
        <Link to={`/app2/${id}`} className="meta-button">Pagina del producte</Link>
      </div>
    </article>
  );
};

export default CardObject;
