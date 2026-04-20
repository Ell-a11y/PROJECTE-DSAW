import CardObject from "./components/CardObject";
import "./App.css";

const recursosPrueba = [
  {
    nom: "Taladro Bosch",
    imatge:
      "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80",
    categoria: 2,
    usuario: 1,
    descripcio: "Taladro en buen estado para tareas de bricolaje.",
    qualitat: "normal",
    estat: "prestamo",
    districte: "Barcelona",
  },
  {
    nom: "Bicicleta urbana",
    imatge:
      "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=800&q=80",
    categoria: 4,
    usuario: 2,
    descripcio: "Bici de paseo ideal para desplazamientos cortos.",
    qualitat: "alta",
    estat: "disponible",
    districte: "Gracia",
  },
];

function App() {
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
        background: "#f2f4f7",
      }}
    >
      {recursosPrueba.map((recurso) => (
        <CardObject key={`${recurso.nom}-${recurso.usuario}`} resource={recurso} />
      ))}
    </main>
  );
}

export default App;
