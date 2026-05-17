import { useAuth } from "../AuthContext";
import AddObject from "../components/AddObject";

export default function FormEditarObj() {
  const log = useAuth();

  return (
    <main id="main-content" className="page-main">
      {log.status === "checking" ? (
        <p className="loading-text" role="status">Comprovant sessió…</p>
      ) : log.status !== "authenticated" ? (
        <p className="empty-state" role="status">Has d&apos;iniciar sessió per editar objectes.</p>
      ) : (
        <AddObject />
      )}
    </main>
  );
}
