// Importacions necesaries
import { useState } from "react";
import "./RegistroObj.css";
import { comentariosGen } from "./ObjectPage";
import "./../communicationsManager"

const params = new URLSearchParams(window.location.search);
const idObj = Number(params.get("id"));
export default function App() {
  // Estado para saber si el modal está abierto o cerrado
  const [open, setOpen] = useState(false);
  const [nuevoComentario, setNuevoComentario] = useState("");
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
            <button type="button" onClick={() => (setOpen(false), function() {
                alert('Comentari: ' + nuevoComentario);
                const Objeto = {
                    "comentari": nuevoComentario,
                    "user": 7,
                    "objecte": idObj
                };
                commentsByObject(Objeto);
                })}> Enviar comentari </button>
        </form>
    </div>
</div>
)}
</>
  );
}