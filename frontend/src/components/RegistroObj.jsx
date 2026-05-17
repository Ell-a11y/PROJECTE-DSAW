import { useState } from "react";
import "./../CSS/RegistroObj.css";
import { createOneComment } from "./../communicationsManager";
import { useAuth } from "../AuthContext";
import { useParams } from "react-router-dom";

export default function Registro({ onCommentAdded }) {
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [nuevoComentario, setNuevoComentario] = useState("");
  const [error, setError] = useState("");
  const { user } = useAuth();
  const idObj = Number(id);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nuevoComentario.trim()) {
      setError("Escriu un comentari abans d'enviar.");
      return;
    }
    setError("");
    await createOneComment({
      comentari: nuevoComentario,
      user: user?.id,
      objecte: idObj,
    });
    setNuevoComentario("");
    setOpen(false);
    if (onCommentAdded) await onCommentAdded();
  };

  return (
    <>
      <button type="button" className="comment-trigger" onClick={() => setOpen(true)}>
        Posar un comentari
      </button>

      {open && (
        <div className="modal-backdrop" role="presentation" onClick={() => setOpen(false)}>
          <div
            className="modal comment-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="comment-modal-title"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h2 id="comment-modal-title">Posa el teu comentari</h2>
              <button type="button" className="modal-close" onClick={() => setOpen(false)} aria-label="Tancar el diàleg">✕</button>
            </div>
            <form className="modal-body" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="comentari-text">Comentari</label>
                <textarea
                  id="comentari-text"
                  value={nuevoComentario}
                  onChange={(e) => {
                    setNuevoComentario(e.target.value);
                    if (e.target.value.trim()) setError("");
                  }}
                  placeholder="Escriu el teu comentari…"
                  className="comentari-textarea"
                  aria-invalid={error ? "true" : undefined}
                  aria-describedby={error ? "comentari-error" : undefined}
                  required
                />
                {error && (
                  <p id="comentari-error" className="field-error" role="alert">{error}</p>
                )}
              </div>
              <div className="modal-form-actions">
                <button type="submit" className="btn-primary">Enviar comentari</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
