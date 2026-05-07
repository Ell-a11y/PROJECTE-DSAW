import { useEffect, useState } from "react";
import UserInfo from "./components/Usuari";
import CardObject from "./components/ObjectPage";
import { objectsList, getUser } from "./communicationsManager";

export default function App() {
    const [lista, setLista] = useState([]);
    useEffect(() => {
        async function cargarDatos() {
            const objects = await objectsList();
            const user = await getUser();
            const filtrados = objects.filter(obj => obj.usuario === user.id);
            setLista(filtrados);
            console.log("FILTRADOS: " + lista)
        }
        cargarDatos();
    }, []);
    return (
        <>
            <UserInfo />
            <section>
                {lista.map((recurso) => (
                    <CardObject
                        key={`${recurso.nom}-${recurso.usuario}`}
                        resource={recurso}
                    />
                ))}
            </section>
        </>
    );
}
