import { getUser, getOneObject } from "./../communicationsManager";
import { useState, useEffect} from "react"
import { useParams } from "react-router-dom";

export default function EdicioObj() {
    const { id } = useParams();
    const [objeto, setObj] = useState();
    const [nom, setNom] = useState();
    const [descripcion, setDesc] = useState();
    const [imatge, setImage] = useState();
    
    useEffect(() => {
        async function cargarDatos() {
            const user = await getUser();
            const obj = await getOneObject(id);
            let decisio;
            if(obj.users == user.id) {
                decisio = obj;
            } else {
                decisio = false;
            }   
            setObj(decisio);
            console.log(decisio);
            
        }
        cargarDatos();
    }, [])
    function Form() {
        if(objeto == false) return <p> El objecte no es de la teva propietat...</p>
        return <p> Formulari carregant... </p>
    }
    return(<Form/>)
}