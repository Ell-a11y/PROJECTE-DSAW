// Importacions necesaries
import { useState } from "react";
import {login} from "./../communicationsManager"
export default function App() {
    // Estado para saber si el modal está abierto o cerrado
    const [open, setOpen] = useState(false);
    const [mode, setMode] = useState(false);
    const [nuevoComentario, setNuevoComentario] = useState("");
    const Login = () => {
        const [email, setEmail] = useState("");
        const [passwd, setPasswd] = useState("");
        return(
            <>
                <label> Coloca el teu email: </label>
                <input type="email" name="email" id="email" placeholder="exemple@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <label> Posar la teva password </label>
                <input type="password" name="password" id="password" value={passwd} onChange={(e) => setPasswd(e.target.value)}/>
                <button type="button" onClick={() => login({"email": email, "password": passwd})}> Login </button>
            </>
        )
    }
    const Registro = () => {
        console.log(mode)
        return(
            <>
                <p> Adios </p>
            </>
        )
    }
return (
<>
    <button className="afellir-comment" onClick={() => setOpen(true)}>
        Login / Registre
    </button>
    {/*Si "open" es true: se muestra el modal sino nada*/}
{open && (
    /* Cuando haces click fuera del modal, se cierra */
<div className="modal-backdrop" onClick={() => setOpen(false)}>
    {/* Caja del modal */}
    {/* Evita que al hacer click dentro del modal se cierre automáticamente */}
    <div className="modal" onClick={(e) => e.stopPropagation()}>
        {/* Cabecera del modal */}
        <div className="modal-header">
            {/* Título */}
            <h2> Inicia sesio amb el teu compte o crea el compte </h2>
            {/* Botón para cerrar */}
            <button onClick={() => setOpen(false)}> ✕ </button>
        </div>
        {/* Contenido del modal */}
        <button onClick={() => setMode(true)}> Login </button>
        <button onClick={() => setMode(false)}> Registre </button>
        {mode ? <Login/> : <Registro/>}
    </div>
</div>
)}
</>
  );
}