import { useEffect, useState } from "react";
import { getUser } from "./../communicationsManager";

// Revisa el Usuari en base el fetch
export default function App() {
    const [persona, setPersona] = useState({});
    useEffect(() => {
        async function InfoUser() {
            const data = await getUser();
            setPersona({nom: data.nom, cognom: data.cognom, email: data.email});
        }
        InfoUser(); // Agafa la info del usuari per posarla informacio del usuari
    }, []);
    return (<>
        <section>
            <h2>Nom: {persona.nom} {persona.cognom} </h2>
            <h2>Email: {persona.email} </h2>
        </section>
    </>)
};