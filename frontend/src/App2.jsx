import ObjectPage from "./components/ObjectPage";

const recursosPrueba = [
  {
    id:1,
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
    id:2,
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
const comentaris = [
  {
    id:1,
    id_usuario: 2,
    id_objeto: 2,
    comentari: "Es una bicicleta muy buena.",
    fecha: "14/12/1990",
  },
  {
    id:2,
    id_usuario: 6,
    id_objeto: 1,
    comentari: "Es un taladro en pesimo estado crak.",
    fecha: "01/05/-379",
  },
  {
    id:3,
    id_usuario: 90,
    id_objeto: 2,
    comentari: "¿Se puede quedar para siempre pero sin robar?",
    fecha: "06/01/1792",
  },
  {
    id:4,
    id_usuario: 14,
    id_objeto: 1,
    comentari: "Ganador de mil batallas.",
    fecha: "26/04/2026",
  },
]

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
    <ObjectPage key={`${recursosPrueba.nom}`} resource={recursosPrueba} comment={comentaris}/>
    </main>
  );
}

export default App;
