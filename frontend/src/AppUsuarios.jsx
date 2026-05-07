import { useEffect, useState } from "react";
import UserInfo from "./components/Usuari";
import CardObject from "./components/ObjectPage";
import { objectsList, getUser } from "./communicationsManager";
import AddObject from "./components/AddObject";
export default function App() {
    const [lista, setLista] = useState([]);
    useEffect(() => {
        async function cargarDatos() {
            const objects = await objectsList();
            const user = await getUser();
            const filtrados = objects.filter(obj => Number(obj.usuario) == Number(user.id));
            setLista(filtrados);
            console.log("FILTRADOS: " + lista)
        }
        cargarDatos();
    }, []);
    useEffect(() => {
        console.log("LISTA ACTUALIZADA:", lista);
    }, [lista]);
    return (
        <>
            <UserInfo />
            <article>
                <h1> Els teus objectes </h1>
                <details>
                    <summary> Afelleix el teu objecte </summary>
                    <AddObject/>
                </details>
                <section>
                    {lista.map((recurso) => (
                        <CardObject
                            key={`${recurso.nom}-${recurso.usuario}`}
                            resource={recurso}
                        />
                    ))}
                </section>
            </article>
        </>
    );
}
