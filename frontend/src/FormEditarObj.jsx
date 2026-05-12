import {useAuth} from "./AuthContext"
import AddObject from "./components/AddObject";

export default function formulariEdit() {
    const log = useAuth();
    function RevisarLog() {
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