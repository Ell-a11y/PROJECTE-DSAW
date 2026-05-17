import ObjectPage from "../components/ObjectPage";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getOneObject, commentsByObject } from "../communicationsManager";
import "../CSS/App2.css";

function App() {
  const { id } = useParams(); // Agafem el id dels parametres
  const [object, setObject] = useState(null);
  const [comments, setComments] = useState([]);
  useEffect(() => {
    const fetchObject = async () => { // se afagan els comentaris i l'objecte
      const object = await getOneObject(id);
      const comments = await commentsByObject(id);
      setComments(comments);
      setObject(object);
    };
    fetchObject();    
  }, [id]); // Es actualiza quan el ID cambia

  const refreshComments = async () => { // Se cogen los comentarios del objeto
    const next = await commentsByObject(id);
    setComments(next);
  };

  return (
    <main id="main-content" className="app2-page">
      <ObjectPage
        key={id}
        resource={object}
        comment={comments}
        id={id}
        onCommentAdded={refreshComments}
      /> {/* Es executa la funcio de añadir els objectes*/}
    </main>
  );
}

export default App;
