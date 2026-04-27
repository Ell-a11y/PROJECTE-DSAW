import "./ObjectPage.css";

function comentariosGen(array, idObj) {
  const lista = [];

  for (let i = 0; i < array.length; i++) {
    if (array[i].id_objeto === idObj) {
      lista.push(
        <article key={array[i].id} className="comentari-item">
          <span>{array[i].comentari}</span><br/>
          <span> Fecha: {array[i].fecha}  -  Usuari: {array[i].id_usuario}</span>
        </article>
      );
    }
  }
  return lista;
}

const objectPage = ({ resource, comment}) => {
    if (!resource) return (<p>Recurso no encontrado</p>);
    const params = new URLSearchParams(window.location.search);
    const idObj = Number(params.get("id"));
    if(idObj == 0) window.location = "/";
    const recurso = resource.find(r => r.id === idObj);
    if (recurso.id == idObj) {
        return (
            <article className="main">
                <h1 className="titol-section"> {recurso.nom} </h1>
                <article className="contenedor">
                    <article className="contenedor-img">
                        <img
                            className="obj-image"
                            src={recurso.imatge}
                            alt={recurso.nom}
                            loading="lazy"
                            onError={(event) => {
                            event.currentTarget.src =
                                "https://t4.ftcdn.net/jpg/06/57/37/01/360_F_657370150_pdNeG5pjI976ZasVbKN9VqH1rfoykdYU.jpg";
                            }}
                        />
                    </article>
                    <article className="contenedor-item">
                        <span className="obj-item">Estat: {recurso.estat}</span>
                        <span className="obj-item">Districte: {recurso.districte}</span>
                        <span className="obj-item">Categoria: {recurso.categoria}</span>
                        <span className="obj-item">Qualitat: {recurso.qualitat}</span>
                        <span className="obj-item">Usuari: {recurso.usuario}</span>
                    </article>
                </article>
                <button onClick={() => {alert("Solicitat.")}} className="solicitar"> Solicitar objecte </button>
                <section id="contenidor-comentaris">
                    <h1 className="titol-section title-comment"> Comentaris </h1>
                      {comentariosGen(comment, idObj)}
                </section>
            </article>
        )
    } else {
        window.location.href = "./..";
    }
}

export default objectPage;