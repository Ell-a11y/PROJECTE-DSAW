// Importacions necesaries
import { useState, useEffect } from "react";
import { login, register, getUser } from "./../communicationsManager";
import { useAuth } from "../AuthContext";
import "./Login - Register.css";

function IconEye() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function IconEyeOff() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

function PasswordInput({ id, value, onChange, autoComplete }) {
  const [visible, setVisible] = useState(false);
  return (
    <div className="password-field">
      <input
        id={id}
        type={visible ? "text" : "password"}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
      />
      <button
        type="button"
        className="password-toggle"
        onClick={() => setVisible((v) => !v)}
        aria-label={visible ? "Amagar contrasenya" : "Mostrar contrasenya"}
        aria-pressed={visible}
      >
        {visible ? <IconEyeOff /> : <IconEye />}
      </button>
    </div>
  );
}

export default function App() {
    const { status, refreshSession, logout } = useAuth();
    // Estado para saber si el modal está abierto o cerrado
    const [open, setOpen] = useState(false); // Si se abre o se cierra
    const [mode, setMode] = useState("registro");

    useEffect(() => {
        if (status === "authenticated") {
            setMode("usuario");
        } else if (status === "unauthenticated") {
            setMode("registro");
        }
    }, [status]);
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
                await refreshSession();
                setMode("usuario")
            }
        }

        return (
            <>
                <div className="form-row">
                <label>Coloca el teu email:</label>
                <input type="email" placeholder="exemple@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="form-row">
                <label htmlFor="login-password">Posar la teva password</label>
                <PasswordInput
                  id="login-password"
                  value={passwd}
                  onChange={(e) => setPasswd(e.target.value)}
                  autoComplete="current-password"
                /></div>
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
        await register({email, password: passwd, nom, cognom, telefon});
        const respuesta = await login({ email, password: passwd });
        if (!respuesta.token) {
            setError("Error al iniciar sesión después del registro");
        } else {
            setError("");
            setOpen(false); // cerrar modal
            await refreshSession();
            setMode("usuario");
        }
    }
    const verificarTelefono = (e) => {
        const telefono = e.target.value;
        const regex = /^[6-9]\d{8}$/;
        const correcto = regex.test(telefono);
        if (!correcto) {
            setError("El teléfono debe tener 9 dígitos y empezar por 6, 7, 8 o 9");
        } else {
            setError("");
        }
        setTelefon(telefono);

    }
     const verificarEmail = (e) => {
        const email = e.target.value;
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const correcto = regex.test(email);
        if (!correcto) {
            setError("El email no es válido");
        } else {
            setError("");
        }
        setEmail(email);
    }
    const verificarAlphabeticos = (e, funcion) => {
        const texto = e.target.value;
        const regex = /^[a-zA-Z]+$/;
        const correcto = regex.test(texto);
        if (!correcto) {
            setError("El texto no es válido");
        } else {
            setError("");
        }
        funcion(texto);
    }
    const verificarPassword = (e) => {
        const password = e.target.value;
        const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?]).{8,}$/;
        const correcto = regex.test(password);
        if (!correcto) {
            setError("La contraseña debe tener minimo 8 caracteres, al menos 1 mayuscula, 1 digito y 1 caracter especial.");
        } else {
            setError("");
        }
        setPasswd(password);
    }
    return (
        <>
            <div className="form-row">
            <label>Nom:</label>
            <input value={nom} onChange={(e) => verificarAlphabeticos(e, setNom)} />
            </div>
            <div className="form-row">
            <label>Cognom:</label>
            <input value={cognom} onChange={(e) => verificarAlphabeticos(e, setCognom)} />    
            </div>
            <div className="form-row">
            <label>Email:</label>
            <input value={email} onChange={(e) => verificarEmail(e)} />
            </div>
            <div className="form-row">
            <label>Telefon:</label>
            <input value={telefon} onChange={(e) => verificarTelefono(e)} />
            </div>
            <div className="form-row">
            <label htmlFor="registro-password">Contrasenya:</label>
            <PasswordInput
              id="registro-password"
              value={passwd}
              onChange={(e) => verificarPassword(e)}
              autoComplete="new-password"
            /></div>
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
                    logout();
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