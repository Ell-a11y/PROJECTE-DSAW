// Importacions necesaries
import { useState } from "react";
import "./../CSS/RegistroObj.css";
import { createOneComment } from "./../communicationsManager";
import { useAuth } from "../AuthContext";
import { useParams } from "react-router-dom";

export default function Registro({ onCommentAdded }) {
  const {id} = useParams();
  // Estado para saber si el modal está abierto o cerrado
  const [open, setOpen] = useState(false);
  const [nuevoComentario, setNuevoComentario] = useState("");
  const {user} = useAuth();
  const idObj = Number(id);
  return (
<>
    <button className="afellir-comment" onClick={() => setOpen(true)}>
        Posar un comentari
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
            <h2>Posa el teu comentari...</h2>
            {/* Botón para cerrar */}
            <button onClick={() => setOpen(false)}> ✕ </button>
        </div>
        {/* Contenido del modal */}
        <form className="modal-content">
            <label id="form_coment_label"> Comentari: </label>
            <textarea value={nuevoComentario} onChange={(e) => setNuevoComentario(e.target.value)} placeholder="Escriu el teu comentari..." className="comentari-textarea"/>
            <button
              type="button"
              onClick={async () => {
                const newComment = {
                  comentari: nuevoComentario,
                  user: user?.id,
                  objecte: idObj,
                };
                await createOneComment(newComment);
                setNuevoComentario("");
                setOpen(false);
                if (onCommentAdded) await onCommentAdded();
              }}
            >
              Enviar comentari
            </button>
        </form>
    </div>
</div>
)}
</>
  );
}