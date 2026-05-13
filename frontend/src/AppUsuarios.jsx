import { useEffect, useState } from "react";
import UserInfo from "./components/Usuari";
import CardObject from "./components/CardObject";
import { objectsList, getUser } from "./communicationsManager";
import AddObject from "./components/AddObject";
export default function App() {
    const [lista, setLista] = useState([]);
    useEffect(() => { // Fa que la funcio carregui els objectes que son del usuari que ha entrat
        async function cargarDatos() {
            const objects = await objectsList();
            const user = await getUser();
            const filtrados = [];
            for(const obj of objects){
                if(obj.users == user.id) {
                    filtrados.push(obj)
                }
            }
            setLista(filtrados); // Pone en la lista los objetos filtrados
        }
        cargarDatos();
    }, []); // Carrega una sola vegada
    return (
        <>
            <UserInfo /> {/* Carrega la informacio del usuari */}
            <article>
                <h1> Els teus objectes </h1>
                <details>
                    <summary> Afelleix el teu objecte </summary>
                    <AddObject/> {/* El formulari de creacio dels objectes */}
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
                    {/* Carrega la llista d'objectes filtrats */}
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
