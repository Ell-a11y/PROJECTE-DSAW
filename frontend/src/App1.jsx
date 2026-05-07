import { useEffect, useState } from "react";
import CardObject from "./components/CardObject";
import { objectsList, getOneUser, getCategories, getUser } from "./communicationsManager";

export default function App() {
    const [lista, setLista] = useState([]);
    useEffect(() => {
        async function cargarTodo() {
            const objetos = await objectsList();
            let registre = null;
            try {  // si no hay token o falla
                registre = await getUser();
            } catch {
                registre = null;
            }
            let usuariosLista = []; // Guardar los Usuarios
            if (registre) {
                try {
                    usuariosLista = await getOneUser();
                    if (!Array.isArray(usuariosLista)) {
                        usuariosLista = []; // por si devuelve un objeto en vez de array
                    }
                } catch {
                    usuariosLista = [];
                }
            }
            // 4. Categorías: con fallback
            let categoriasLista = [];
            try {
                categoriasLista = await getCategories();
            } catch {
                categoriasLista = [];
            }
            const normalizados = objetos.map(obj => {
                // usuario: por defecto Anonim
                let userName = "Anonim";
                if (registre && Array.isArray(usuariosLista) && usuariosLista.length > 0) {
                    const userObj = usuariosLista.find(
                        u => Number(u.id) === Number(obj.users)
                    );
                    if (userObj && userObj.nom) {
                        userName = userObj.nom;
                    }
                }
                const categoriaObj = categoriasLista.find(
                    c => Number(c.id) === Number(obj.categoria)
                );
                const categoriaName = categoriaObj ? categoriaObj.categoria : "Sense categoria";
                return {
                    id: obj.id,
                    nom: obj.nom,
                    imatge: obj.imatge,
                    usuario_nom: userName,
                    categoria_nom: categoriaName,
                    descripcio: obj.descipcio,
                    qualitat: obj.qualitat,
                    estat: obj.estat,
                    districte: obj.districte
                };
            });
            setLista(normalizados);
        }
        cargarTodo();
    }, []);
    return (
        <main
            style={{
                minHeight: "100vh",
                display: "flex",
                gap: "16px",
                alignItems: "center",
                justifyContent: "center",
                flexWrap: "wrap",
                padding: "24px",
                background: "#b2d1ff",
            }}>
            {lista.map((recurso) => (
                <CardObject key={recurso.id} resource={recurso} />
            ))}
        </main>
    );
}