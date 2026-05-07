import { useEffect, useState } from "react";
import UserInfo from "./components/Usuari";
import CardObject from "./components/CardObject";
import { objectsList, getUser } from "./communicationsManager";
import AddObject from "./components/AddObject";
export default function App() {
    const [lista, setLista] = useState([]);
    useEffect(() => {
        async function cargarDatos() {
            const objects = await objectsList();
            const user = await getUser();
            console.log(objects)
            const filtrados = [];
            for(const obj of objects){
                if(obj.users == user.id) {
                    console.log("OBJETO PERSONA")
                    filtrados.push(obj)
                }
            }
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
                <section style={{
                minHeight: "25vh",
                display: "flex",
                gap: "16px",
                alignItems: "center",
                justifyContent: "center",
                flexWrap: "wrap",
                padding: "24px",
            }}>

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
