const ObjectPage = ({ resource: recurso }) => {
    if (!recurso) return null;
    const {
    id,
    nom,
    imatge,
    descripcio,
    estat,
    districte,
    categoria,
    qualitat,
    usuario,
    } = recurso;
    return (
        <article>
            <h1> {name} </h1>
            <article className="contenedor">
                <article className="contenedor-img">
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
                </article>
                <article>
                    <span className="meta-item">Estat: {estat}</span>
                    <span className="meta-item">Districte: {districte}</span>
                    <span className="meta-item">Categoria: {categoria}</span>
                    <span className="meta-item">Qualitat: {qualitat}</span>
                    <span className="meta-item">Usuari: {usuario}</span>
                </article>
            </article>
            <button onClick={() => {alert("Solicitat.")}}> Solicitar objecte </button>
        </article>
    )
}

export default ObjectPage;