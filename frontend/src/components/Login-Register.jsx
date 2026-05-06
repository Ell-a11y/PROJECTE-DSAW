// Importacions necesaries
import { useState } from "react";
import {login, register} from "./../communicationsManager"
export default function App() {
    // Estado para saber si el modal está abierto o cerrado
    const [open, setOpen] = useState(false); // Si se abre o se cierra
    const [mode, setMode] = useState("registro"); // Saber si va a registro, login o logueado
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
                setMode("usuario")
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
        const [error, setError] = useState("");
        async function handleRegistro() {
        const reg = await register({email, password: passwd, nom, cognom, telefon});
        const respuesta = await login({ email, password: passwd });
        if (!respuesta.token) {
            setError("Error al iniciar sesión después del registro");
        } else {
            setError("");
            setOpen(false); // cerrar modal
            setMode("usuario");
        }
    }

    return (
        <>
            <label>Nom:</label>
            <input value={nom} onChange={(e) => setNom(e.target.value)} />
            <label>Cognom:</label>
            <input value={cognom} onChange={(e) => setCognom(e.target.value)} />
            <label>Email:</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} />
            <label>Telefon:</label>
            <input value={telefon} onChange={(e) => setTelefon(e.target.value)} />
            <label>Contrasenya:</label>
            <input value={passwd} onChange={(e) => setPasswd(e.target.value)} />
            <button type="button" onClick={handleRegistro}>
                Registrar
            </button>
            {error && <p style={{ color: "red" }}>{error}</p>}
        </>
    );
    };
return (
<>
    {mode !== "usuario" ? (
        <button className="afellir-comment" onClick={() => setOpen(true)}>
            Login / Registre
        </button>
    ) : (
        <button className="afellir-comment" type="button" href="/usuaris/id"> Usuari </button>
    )}
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
        <button onClick={() => setMode("login")}> Login </button>
        <button onClick={() => setMode("registro")}> Registre </button>
        {mode === "login" && <Login />}
        {mode === "registro" && <Registro />}
        {mode === "usuario" && <button>Usuari</button>}    </div>
</div>
)}
</>
  );
}