import ObjectPage from "./components/ObjectPage";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getOneObject, commentsByObject } from "./communicationsManager";
import "./App2.css";

function App() {
  const { id } = useParams();
  const [object, setObject] = useState(null);
  const [comments, setComments] = useState([]);
  useEffect(() => {
    const fetchObject = async () => {
      const object = await getOneObject(id);
      const comments = await commentsByObject(id);
      setComments(comments);
      setObject(object);
    };
    fetchObject();    
  }, [id]);

  return (
    <main className="app2-page">
      <ObjectPage key={id} resource={object} comment={comments} id={id} />
    </main>
  );
}

export default App;
