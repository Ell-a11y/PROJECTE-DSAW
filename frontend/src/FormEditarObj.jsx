import {useAuth} from "./AuthContext"
import AddObject from "./components/AddObject";

export default function formulariEdit() {
    const log = useAuth(); // Mira si el usuario esta logueado
    function RevisarLog() { // Funcion que chequeada el estado de logueado o no, en caso que no este autenticado no lo deja entrar hasta que lo este
        if(log.status == "cheking") {
            return <p> Comproban... </p>
        } else if(log.status != "authenticated") {
            return <p> No estas autenticat... </p>
        }      
        return <AddObject/>;
    }
    return(
        <main>
            <RevisarLog/>
        </main>
    )
}