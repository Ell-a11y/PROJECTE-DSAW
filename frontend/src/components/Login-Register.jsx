import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { login, register, getUser } from "./../communicationsManager";
import { useAuth } from "../AuthContext";
import "./../CSS/Login - Register.css";

const PASSWORD_RULES = [
  { id: "length", label: "Mínim 8 caràcters", test: (p) => p.length >= 8 },
  { id: "upper", label: "Almenys 1 majúscula (A-Z)", test: (p) => /[A-Z]/.test(p) },
  { id: "digit", label: "Almenys 1 dígit (0-9)", test: (p) => /\d/.test(p) },
  {
    id: "special",
    label: "Almenys 1 caràcter especial (!@#$…)",
    test: (p) => /[!@#$%^&*()_\-+=[\]{};':"\\|,.<>/?]/.test(p),
  },
];

function isPasswordValid(password) {
  return PASSWORD_RULES.every((rule) => rule.test(password));
}

function isEmailValid(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function IconEye() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function IconEyeOff() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

function FieldError({ id, message }) {
  if (!message) return null;
  return (
    <p id={id} className="field-error" role="alert">
      {message}
    </p>
  );
}

function PasswordInput({ id, value, onChange, onBlur, autoComplete, errorId, errorMessage, showRules }) {
  const [visible, setVisible] = useState(false);
  const describedBy = [errorId, showRules ? "password-rules" : null].filter(Boolean).join(" ") || undefined;

  return (
    <div className="password-field">
      <input
        id={id}
        type={visible ? "text" : "password"}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        autoComplete={autoComplete}
        aria-invalid={errorMessage ? "true" : undefined}
        aria-describedby={describedBy}
        required
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

function PasswordRules({ password, showAll }) {
  const hasInput = password.length > 0;
  return (
    <ul id="password-rules" className="password-rules" aria-label="Requisits de la contrasenya">
      {PASSWORD_RULES.map((rule) => {
        const ok = rule.test(password);
        const visible = showAll || hasInput;
        if (!visible) return null;
        return (
          <li key={rule.id} className={ok ? "password-rules__item--ok" : "password-rules__item--pending"}>
            <span aria-hidden="true">{ok ? "✓" : "○"}</span> {rule.label}
          </li>
        );
      })}
    </ul>
  );
}

function LoginForm({ onSuccess }) {
  const [email, setEmail] = useState("");
  const [passwd, setPasswd] = useState("");
  const [errors, setErrors] = useState({});

  async function handleLogin(e) {
    e.preventDefault();
    const next = {};
    if (!email.trim()) next.email = "Introdueix el teu correu electrònic.";
    else if (!isEmailValid(email)) next.email = "El correu electrònic no és vàlid.";
    if (!passwd) next.password = "Introdueix la teva contrasenya.";

    if (Object.keys(next).length > 0) {
      setErrors(next);
      return;
    }

    const respuesta = await login({ email, password: passwd });
    if (!respuesta.token) {
      setErrors({ general: respuesta.error || "Credencials incorrectes." });
    } else {
      setErrors({});
      await onSuccess();
    }
  }

  return (
    <form onSubmit={handleLogin} noValidate>
      <div className="form-group">
        <label htmlFor="login-email">Correu electrònic</label>
        <input
          id="login-email"
          type="email"
          placeholder="exemple@gmail.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setErrors((prev) => ({ ...prev, email: undefined, general: undefined }));
          }}
          autoComplete="email"
          aria-invalid={errors.email ? "true" : undefined}
          aria-describedby={errors.email ? "login-email-error" : undefined}
          required
        />
        <FieldError id="login-email-error" message={errors.email} />
      </div>

      <div className="form-group">
        <label htmlFor="login-password">Contrasenya</label>
        <PasswordInput
          id="login-password"
          value={passwd}
          onChange={(e) => {
            setPasswd(e.target.value);
            setErrors((prev) => ({ ...prev, password: undefined, general: undefined }));
          }}
          autoComplete="current-password"
          errorId={errors.password ? "login-password-error" : undefined}
          errorMessage={errors.password}
        />
        <FieldError id="login-password-error" message={errors.password} />
      </div>

      <FieldError id="login-general-error" message={errors.general} />

      <div className="modal-form-actions">
        <button type="submit" className="btn-primary">Iniciar sessió</button>
      </div>
    </form>
  );
}

function RegistroForm({ onSuccess }) {
  const [nom, setNom] = useState("");
  const [cognom, setCognom] = useState("");
  const [telefon, setTelefon] = useState("");
  const [email, setEmail] = useState("");
  const [passwd, setPasswd] = useState("");
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const setFieldError = (field, message) => {
    setErrors((prev) => ({ ...prev, [field]: message || undefined }));
  };

  const validateNom = (value) => {
    if (!value.trim()) return "El nom és obligatori.";
    if (!/^[a-zA-ZÀ-ÿ]+$/.test(value)) return "Només es permeten lletres.";
    return "";
  };

  const validateCognom = (value) => {
    if (!value.trim()) return "El cognom és obligatori.";
    if (!/^[a-zA-ZÀ-ÿ]+$/.test(value)) return "Només es permeten lletres.";
    return "";
  };

  const validateEmail = (value) => {
    if (!value.trim()) return "El correu electrònic és obligatori.";
    if (!isEmailValid(value)) return "Format no vàlid. Exemple: nom@exemple.com";
    return "";
  };

  const validateTelefon = (value) => {
    if (!value.trim()) return "El telèfon és obligatori.";
    if (!/^[6-9]\d{8}$/.test(value)) return "9 dígits, començant per 6, 7, 8 o 9.";
    return "";
  };

  const validatePassword = (value) => {
    if (!value) return "La contrasenya és obligatòria.";
    if (!isPasswordValid(value)) return "La contrasenya no compleix tots els requisits.";
    return "";
  };

  const validateAll = () => {
    const next = {
      nom: validateNom(nom),
      cognom: validateCognom(cognom),
      email: validateEmail(email),
      telefon: validateTelefon(telefon),
      password: validatePassword(passwd),
    };
    const cleaned = Object.fromEntries(
      Object.entries(next).filter(([, msg]) => msg)
    );
    setErrors(cleaned);
    setTouched({ nom: true, cognom: true, email: true, telefon: true, password: true });
    return Object.keys(cleaned).length === 0;
  };

  async function handleRegistro(e) {
    e.preventDefault();
    if (!validateAll()) return;

    await register({ email, password: passwd, nom, cognom, telefon });
    const respuesta = await login({ email, password: passwd });
    if (!respuesta.token) {
      setErrors({ general: "Error en iniciar sessió després del registre." });
    } else {
      setErrors({});
      await onSuccess();
    }
  }

  return (
    <form onSubmit={handleRegistro} noValidate>
      <div className="form-group">
        <label htmlFor="reg-nom">Nom</label>
        <input
          id="reg-nom"
          type="text"
          value={nom}
          onChange={(e) => {
            setNom(e.target.value);
            if (touched.nom) setFieldError("nom", validateNom(e.target.value));
            else setFieldError("nom", undefined);
          }}
          onBlur={() => {
            setTouched((t) => ({ ...t, nom: true }));
            setFieldError("nom", validateNom(nom));
          }}
          autoComplete="given-name"
          aria-invalid={errors.nom ? "true" : undefined}
          aria-describedby={errors.nom ? "reg-nom-error" : undefined}
          required
        />
        <FieldError id="reg-nom-error" message={errors.nom} />
      </div>

      <div className="form-group">
        <label htmlFor="reg-cognom">Cognom</label>
        <input
          id="reg-cognom"
          type="text"
          value={cognom}
          onChange={(e) => {
            setCognom(e.target.value);
            if (touched.cognom) setFieldError("cognom", validateCognom(e.target.value));
            else setFieldError("cognom", undefined);
          }}
          onBlur={() => {
            setTouched((t) => ({ ...t, cognom: true }));
            setFieldError("cognom", validateCognom(cognom));
          }}
          autoComplete="family-name"
          aria-invalid={errors.cognom ? "true" : undefined}
          aria-describedby={errors.cognom ? "reg-cognom-error" : undefined}
          required
        />
        <FieldError id="reg-cognom-error" message={errors.cognom} />
      </div>

      <div className="form-group">
        <label htmlFor="reg-email">Correu electrònic</label>
        <input
          id="reg-email"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (touched.email) setFieldError("email", validateEmail(e.target.value));
            else setFieldError("email", undefined);
          }}
          onBlur={() => {
            setTouched((t) => ({ ...t, email: true }));
            setFieldError("email", validateEmail(email));
          }}
          autoComplete="email"
          placeholder="nom@exemple.com"
          aria-invalid={errors.email ? "true" : undefined}
          aria-describedby={errors.email ? "reg-email-error" : undefined}
          required
        />
        <FieldError id="reg-email-error" message={errors.email} />
      </div>

      <div className="form-group">
        <label htmlFor="reg-telefon">Telèfon</label>
        <input
          id="reg-telefon"
          type="tel"
          value={telefon}
          onChange={(e) => {
            setTelefon(e.target.value);
            if (touched.telefon) setFieldError("telefon", validateTelefon(e.target.value));
            else setFieldError("telefon", undefined);
          }}
          onBlur={() => {
            setTouched((t) => ({ ...t, telefon: true }));
            setFieldError("telefon", validateTelefon(telefon));
          }}
          autoComplete="tel"
          inputMode="numeric"
          placeholder="612345678"
          aria-invalid={errors.telefon ? "true" : undefined}
          aria-describedby={errors.telefon ? "reg-telefon-error" : undefined}
          required
        />
        <FieldError id="reg-telefon-error" message={errors.telefon} />
      </div>

      <div className="form-group">
        <label htmlFor="registro-password">Contrasenya</label>
        <p className="field-hint">Requisits: mínim 8 caràcters, majúscula, dígit i caràcter especial.</p>
        <PasswordInput
          id="registro-password"
          value={passwd}
          showRules
          onChange={(e) => {
            const val = e.target.value;
            setPasswd(val);
            if (touched.password) setFieldError("password", validatePassword(val));
            else setFieldError("password", undefined);
          }}
          onBlur={(e) => {
            setTouched((t) => ({ ...t, password: true }));
            setFieldError("password", validatePassword(e.target.value));
          }}
          autoComplete="new-password"
          errorId={errors.password ? "reg-password-error" : undefined}
          errorMessage={errors.password}
        />
        <PasswordRules password={passwd} showAll />
        <FieldError id="reg-password-error" message={errors.password} />
      </div>

      <FieldError id="reg-general-error" message={errors.general} />

      <div className="modal-form-actions">
        <button type="submit" className="btn-primary">Registrar-se</button>
      </div>
    </form>
  );
}

export default function LoginRegister() {
  const { status, refreshSession, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("registro");

  useEffect(() => {
    if (status === "authenticated") {
      setMode("usuario");
    } else if (status === "unauthenticated") {
      setMode("registro");
    }
  }, [status]);

  const handleSuccess = async () => {
    setOpen(false);
    await refreshSession();
    setMode("usuario");
  };

  return (
    <>
      {mode !== "usuario" ? (
        <button type="button" className="auth-trigger" onClick={() => setOpen(true)}>
          Iniciar sessió
        </button>
      ) : (
        <Link
          to="/usuari"
          className="auth-trigger"
          onClick={async (e) => {
            const data = await getUser();
            if (data.detail === "Token expirado") {
              e.preventDefault();
              logout();
              setMode("login");
              alert("La teva sessió ha expirat.");
            }
          }}
        >
          El meu perfil
        </Link>
      )}

      {open && (
        <div className="modal-backdrop" role="presentation" onClick={() => setOpen(false)}>
          <div
            className="modal auth-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="auth-modal-title"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h2 id="auth-modal-title">Inicia sessió o crea el teu compte</h2>
              <button type="button" className="modal-close" onClick={() => setOpen(false)} aria-label="Tancar el diàleg">✕</button>
            </div>

            <div className="modal-tabs" role="tablist" aria-label="Tipus de formulari">
              <button
                type="button"
                role="tab"
                aria-selected={mode === "login"}
                className={`modal-tab ${mode === "login" ? "is-active" : ""}`}
                onClick={() => setMode("login")}
              >
                Iniciar sessió
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={mode === "registro"}
                className={`modal-tab ${mode === "registro" ? "is-active" : ""}`}
                onClick={() => setMode("registro")}
              >
                Registre
              </button>
            </div>

            <div className="modal-body">
              {mode === "login" && <LoginForm onSuccess={handleSuccess} />}
              {mode === "registro" && <RegistroForm onSuccess={handleSuccess} />}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
