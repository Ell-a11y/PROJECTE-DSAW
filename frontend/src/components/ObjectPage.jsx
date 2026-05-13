import "./ObjectPage.css";
import Registro from "./RegistroObj";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { createTransaction, updateOneObject } from "../communicationsManager";
import { useAuth } from "../AuthContext";

function formatCommentDate(isoString) { // Crea el format de la data
  if (!isoString) return "";
  const d = new Date(isoString);
  if (Number.isNaN(d.getTime())) return isoString;
  return d.toLocaleString("ca-ES", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function comentariosGen(array, idObj) { // Funcio de generacio de comentaris
  return (
    <>
    {array.map((comentario) => (
      <article key={comentario.id} className="comentari-item">
        <span>{comentario.comentari}</span>
        <br />
        <span>Data: {formatCommentDate(comentario.data)} - Usuari: {comentario.user_nom}</span>
      </article>
    ))}
    </>
  );
}

const objectPage = ({ resource, comment, id, onCommentAdded }) => {
  const navigate = useNavigate();
  const { status, user } = useAuth();
  const [endDate, setEndDate] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const idObj = Number(id);

  useEffect(() => {
    if (!idObj || idObj == "") { {/* Si el objeto es nulo manda al home */}
      navigate("/", { replace: true });
    }
  }, [idObj, navigate]); {/* Actualitza cada vegada que es actualiza alguns d'aquestos dos */}

  useEffect(() => {
    if (!resource || resource.id !== idObj) { {/* Si el objecte no existeix o no coincideix no retorna nada */}
      return;
    }
  }, [resource, idObj]); {/* Actualitza cada vegada que es actualiza alguns d'aquestos dos */}
  const recurso = resource;
  const checkEstat=()=>{ {/*Revisa el estat*/}
    if (recurso.estat === 'per_prestat') {
      return true;
    }
    return false;
  };
  const handleCreateTransaction = async () => { {/* Creacio de la transaccio */}
    if (checkEstat() && !endDate) {
      alert("Selecciona una fecha de fin para el préstamo.");
      return;
    }
    const donador = recurso.users;
    const receptor = user?.id;
    const objecte = recurso.id;
    const temporal = checkEstat();
    const data_ini = new Date().toISOString().split("T")[0];
    const data_fi = checkEstat() ? endDate : null;
    const transaction = { donador, receptor, objecte, temporal, data_ini, data_fi };
    await createTransaction(transaction);
    await updateOneObject({...recurso, estat: temporal ? 'ja_prestat' : 'ja_donat' });
    setShowConfirmModal(false);
    navigate(0); // Recarga la pagina del objeto
  };

  if (!idObj) return null; 

  if (!resource) return <p>Carregant...</p>;

  if (recurso.id !== idObj) {/* Si el objecte no coincideix no carregara */}
    return (
      <div>
        <p>Carregant...</p>
        <button onClick={() => navigate(`/`)}>Tornar a la pàgina principal</button>
      </div>
    );
  return (
    <article className="main">
      <h1 className="titol-section"> {recurso.nom} </h1>
      <article className="contenedor">
        <article className="contenedor-img">
          <img
            className="obj-image"
            src={recurso.imatge}
            alt={recurso.nom}
            loading="lazy"
            onError={(event) => {
              event.currentTarget.src =
                "https://t4.ftcdn.net/jpg/06/57/37/01/360_F_657370150_pdNeG5pjI976ZasVbKN9VqH1rfoykdYU.jpg";
            }}
          />
        </article>
        <article className="contenedor-item">
          <span className="obj-item">Estat: {recurso.estat}</span>
          <span className="obj-item">Districte: {recurso.districte}</span>
          <span className="obj-item">Categoria: {recurso.categoria_nom}</span>
          <span className="obj-item">Qualitat: {recurso.qualitat}</span>
          <span className="obj-item">Usuari: {recurso.user_nom}</span>
        </article>
      </article>
      {(recurso.users != user?.id && (recurso.estat === "per_prestat" || recurso.estat === "donatiu")) && <button
        onClick={() => {
          // veu si el objecte es del usuari, o be si ja esta prestat o donat, en algun cas dels comentats no sortida el boto
          // Pero si no es el cass sortida el buto per pedir l'objecte
          if (status === "checking") {
            return;
          }
          if (status !== "authenticated") {
            alert("Has d'iniciar sessio per poder solicitar objectes.");
            return;
          }
          setShowConfirmModal(true);
        }}
        className="solicitar"
      >
        Solicitar objecte
      </button>}

      {showConfirmModal && (
        // L'objecte tindra que tenir una confirmacio del usuari i en cas que sigui positiva es tindra que posar la data de retornacio del
        // producte en cas que sigui de prestam, en cas contrari es anira a la pagina del objecte sense boto perque ja esta prestat
        <div className="modal-overlay" role="dialog" aria-modal="true">
          <div className="modal-content">
            <h2 className="modal-title">Confirmar transaccio</h2>
            <p className="modal-text">
              Estas segur que vols sol-licitar aquest objecte?
            </p>

            {recurso.estat === "per_prestat" && (
              <div className="modal-field">
                <label htmlFor="data-fi" className="modal-label">
                  Data fi del prestec
                </label>
                <input
                  id="data-fi"
                  className="modal-date-input"
                  type="date"
                  value={endDate}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => setEndDate(e.target.value)}
                  required
                />
              </div>
            )}
            {/* {Gestio del modal} */}
            <div className="modal-actions">
              <button type="button" className="modal-btn cancel" onClick={() => setShowConfirmModal(false)}>
                Cancel-lar
              </button>
              <button type="button" className="modal-btn confirm" onClick={handleCreateTransaction}>
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}

      <section id="contenidor-comentaris">
        <article>
          <h1 className="titol-section title-comment"> Comentaris </h1>
          <Registro onCommentAdded={onCommentAdded} />
        </article>
        {comentariosGen(comment, idObj)}
      </section>
    </article>
  );
};

export default objectPage;
