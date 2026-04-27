import { useState, useEffect } from 'react';
import { SERVER_URL, login, register, objectsList, createOneObject } from '../communicationsManager';
function comentariosGen(array, idObj) {
  const lista = [];

  for (let i = 0; i < array.length; i++) {
    if (array[i].id_objeto === idObj) {
      lista.push(
        <article key={array[i].id}>
          <span>{array[i].comentari}</span><br/>
          <span> Fecha: {array[i].fecha}  -  Usuari: {array[i].id_usuario}</span>
        </article>
      );
    }
  }

  return lista;
}

const ObjectPage = ({ resource, comment}) => {
    const [user, setUser] = useState(null);
    const [objects, setObjects] = useState([]);
    useEffect(() => {
        const fetchUser = async () => {
            const user = await login({ email: 'hola3@test.com', password: '1234' });
            localStorage.setItem('token', user.token);
            setUser(user);
        };
        const createUser = async () => {
            const user = await register({ email: 'hola3@test.com', password: '1234', nom: 'Hola', cognom: '1', telefon: 1234567890 });
            setUser(user);
        };
        const createObject = async () => {
            const object = await createOneObject({ nom: 'Taladro Bosch', imatge: 'https://blocks.astratic.com/img/general-img-landscape.png', categoria: 2, usuario: 1, descipcio: 'Taladro en buen estado para tareas de bricolaje.', qualitat: 'normal', estat: 'per_prestat', districte: 'Barcelona', users: 9});
        };
        const getObjects = async () => {
            const objects = await objectsList();
            console.log(objects);
            
            setObjects(objects);
        };

            fetchUser();
            getObjects();
    }, []);
    if (!resource) return (<p>Recurso no encontrado</p>);
    const params = new URLSearchParams(window.location.search);
    const idObj = Number(params.get("id"));
    const recurso = resource.find(r => r.id === idObj);
    if (recurso.id == idObj) {
        return (
            <article>
                <h1 style={{
                    color : "black"
                }}> {recurso.nom} </h1>
                <article className="contenedor">
                    <article className="contenedor-img">
                        <img
                            className="card-image"
                            src={recurso.imatge}
                            alt={recurso.nom}
                            loading="lazy"
                            onError={(event) => {
                            event.currentTarget.src =
                                "https://t4.ftcdn.net/jpg/06/57/37/01/360_F_657370150_pdNeG5pjI976ZasVbKN9VqH1rfoykdYU.jpg";
                            }}
                        />
                    </article>
                    <article>
                        <span className="meta-item">Estat: {recurso.estat}</span>
                        <span className="meta-item">Districte: {recurso.districte}</span>
                        <span className="meta-item">Categoria: {recurso.categoria}</span>
                        <span className="meta-item">Qualitat: {recurso.qualitat}</span>
                        <span className="meta-item">Usuari: {recurso.usuario}</span>
                    </article>
                </article>
                <button onClick={() => {alert("Solicitat.")}}> Solicitar objecte </button>
                <section id="contenidor-comentaris">
                      {comentariosGen(comment, idObj)}
                </section>
            </article>
        )
    } else if(idObj == 0) {
        window.location.href = "./..";
    }
}

export default ObjectPage;