import { useState, useEffect } from "react";
import "./../CSS/AddObject.css";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import {
  getCategories,
  getDistricts,
  createOneObject,
  getUser,
  updateOneObject,
  objectsList,
} from "../communicationsManager";

export default function AddObject() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [quality, setQuality] = useState("bé");
  const [status, setStatus] = useState("per_prestat");
  const [district, setDistrict] = useState("");
  const [districts, setDistricts] = useState([]);

  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const isEditPage = location.pathname.includes("/edit");

  useEffect(() => {
    const fetchCategories = async () => {
      const cats = await getCategories();
      setCategories(cats);
      if (cats.length) setCategory(String(cats[0].id));
    };
    const fetchDistricts = async () => {
      const dists = await getDistricts();
      setDistricts(dists);
      if (dists.length) setDistrict(dists[0].name);
    };
    fetchCategories();
    fetchDistricts();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Selecciona un fitxer d'imatge.");
      e.target.value = "";
      setImage(null);
      return;
    }
    setImage(file.name);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = await getUser();
    const payload = {
      nom: name,
      descipcio: description,
      imatge: image,
      categoria: Number(category),
      qualitat: quality,
      estat: status,
      districte: district,
      users: user.id,
    };

    if (isEditPage) {
      payload.id = id;
      await updateOneObject(payload);
      navigate(`/app2/${id}`);
    } else {
      await createOneObject(payload);
      const objectes = await objectsList();
      const filtrados = objectes.filter((obj) => obj.users == user.id);
      const ultimo = filtrados[filtrados.length - 1];
      if (ultimo) navigate(`/app2/${ultimo.id}`);
    }
  };

  return (
    <form className="add-object-form" onSubmit={handleSubmit}>
      <h2>{isEditPage ? "Editar objecte" : "Afegeix un objecte"}</h2>

      <div className="form-group">
        <label htmlFor="obj-nom">Nom</label>
        <input id="obj-nom" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>

      <div className="form-group">
        <label htmlFor="obj-desc">Descripció</label>
        <textarea id="obj-desc" value={description} onChange={(e) => setDescription(e.target.value)} required />
      </div>

      <div className="form-group">
        <label htmlFor="obj-img">Imatge</label>
        <input id="obj-img" type="file" accept="image/*" onChange={handleImageChange} />
      </div>

      <div className="form-group">
        <label htmlFor="obj-cat">Categoria</label>
        <select id="obj-cat" value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.categoria}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="obj-qual">Qualitat</label>
        <select id="obj-qual" value={quality} onChange={(e) => setQuality(e.target.value)}>
          <option value="bé">Bé</option>
          <option value="normal">Normal</option>
          <option value="malament">Malament</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="obj-estat">Tipus</label>
        <select id="obj-estat" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="per_prestat">Per préstec</option>
          <option value="donatiu">Donatiu</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="obj-dist">Districte</label>
        <select id="obj-dist" value={district} onChange={(e) => setDistrict(e.target.value)}>
          {districts.map((d) => (
            <option key={d.id} value={d.name}>{d.name}</option>
          ))}
        </select>
      </div>

      <button className="add-object-form-button" type="submit">
        {isEditPage ? "Guardar canvis" : "Publicar objecte"}
      </button>
    </form>
  );
}
