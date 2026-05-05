// Importacions necesaries
import { useState } from "react";
import {login, register} from "./../communicationsManager"
export default function App() {
    // Estado para saber si el modal está abierto o cerrado
    const [open, setOpen] = useState(false); // Si se abre o se cierra
    const [mode, setMode] = useState(false); // Saber si va a registro o login
    const Login = () => {
        const [email, setEmail] = useState("");
        const [passwd, setPasswd] = useState("");
        const [error, setError] = useState("");

        async function handleLogin() {
            const respuesta = await login({ email, password: passwd });
            if (!respuesta.token) {
                setError(respuesta.error);
            } else {
                setError("");
                setOpen(false);
            }
        }

        return (
            <>
                <label>Coloca el teu email:</label>
                <input
                    type="email"
                    placeholder="exemple@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label>Posar la teva password</label>
                <input
                    type="password"
                    value={passwd}
                    onChange={(e) => setPasswd(e.target.value)}
                />

                <button type="button" onClick={handleLogin}>
                    Login
                </button>

                {error && <p style={{ color: "red" }}>{error}</p>}
            </>
        );
    };
    const Registro = () => {
        const [nom, setNom] = useState("");
        const [cognom, setCognom] = useState("");
        const [telefon, setTelefon] = useState("");
        const [email, setEmail] = useState("");
        const [passwd, setPasswd] = useState("");
        return(
            <>
                <label> Nom: </label>
                <input type="text" name="Nom" id="input-nom" value={nom} onChange={(e) => setNom(e.target.value)}/>
                <label> Cognom: </label>
                <input type="text" name="Cognom" id="input-cognom" value={cognom} onChange={(e) => setCognom(e.target.value)}/>
                <label> Email: </label>
                <input type="text" name="Email" id="input-email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <label> Telefon: </label>
                <input type="text" name="Telefon" id="input-telefon" value={telefon} onChange={(e) => setTelefon(e.target.value)}/>
                <label> Contrasenya: </label>
                <input type="text" name="Contrasenya" id="input-psswd" value={passwd} onChange={(e) => setPasswd(e.target.value)}/>
                <button type="button" onClick={() => register(
                    {
                        "email": email,
                        "password": passwd,
                        "nom": nom,
                        "cognom": cognom,
                        "telefon": telefon
                    }
                )}> Login </button>
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