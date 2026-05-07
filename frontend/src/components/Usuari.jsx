import { useEffect, useState } from "react";
import { getUser } from "./../communicationsManager";

export default function App() {
    const [persona, setPersona] = useState({});

    useEffect(() => {
        async function InfoUser() {
            const data = await getUser();
            setPersona({nom: data.nom, cognom: data.cognom, email: data.email});
        }
        InfoUser();
    }, []);
    useEffect(() => {
        console.log("PERSONA ACTUALIZADA:", persona);
    }, [persona]);
    return (<>
        <section>
            <h2>Nom: {persona.nom} {persona.cognom} </h2>
            <h2>Email: {persona.email} </h2>
        </section>
    </>)
};