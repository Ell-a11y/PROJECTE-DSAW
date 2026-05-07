// Importacions necesaries
import { useState, useEffect } from "react";
import {login, register, getUser} from "./../communicationsManager"
export default function App() {
    // Estado para saber si el modal está abierto o cerrado
    const [open, setOpen] = useState(false); // Si se abre o se cierra
    const [mode, setMode] = useState(() => {
        return localStorage.getItem("token") ? "usuario" : "registro";
    });
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
                <input type="email" placeholder="exemple@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <label>Posar la teva password</label>
                <input type="password" value={passwd} onChange={(e) => setPasswd(e.target.value)}/>
                <button type="button" onClick={handleLogin}> Login </button>
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
            <button type="button" onClick={handleRegistro}> Registrar </button>
            {error && <p style={{ color: "red" }}>{error}</p>}
        </>
    );
    };
return (
<>
    {mode != "usuario" ? (
        <button className="afellir-comment" onClick={() => setOpen(true)}>
            Login / Registre
        </button>
    ) : (
        <button
            className="afellir-comment"
            type="button"
            onClick={async () => {
                const data = await getUser();
                if(data.detail == "Token expirado") {
                    localStorage.removeItem("token");
                    setMode("login");
                    alert("La teva sesio a expirat.")
                    return null;
                }
                window.location.href = "/usuari";
            }}>
            Usuari
        </button>
    )}
    {open && (
        <div className="modal-backdrop" onClick={() => setOpen(false)}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2> Inicia sesio amb el teu compte o crea el compte </h2>
                    <button onClick={() => setOpen(false)}> ✕ </button>
                </div>
                <button onClick={() => setMode("login")}> Login </button>
                <button onClick={() => setMode("registro")}> Registre </button>
                {mode === "login" && <Login />}
                {mode === "registro" && <Registro />}
            </div>
        </div>
    )}
</>
);
}