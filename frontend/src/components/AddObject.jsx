import { useState, useEffect } from "react";
import "./AddObject.css";
import { getCategories, getDistricts, createOneObject } from "../communicationsManager";

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
    useEffect(() => {
        const fetchCategories = async () => {   
            const categories = await getCategories();
            console.log(categories);
            setCategories(categories);
            setCategory(categories[0].id);
        }
        fetchCategories();
        const fetchDistricts = async () => {
            const districts = await getDistricts();
            console.log(districts);
            setDistricts(districts);
            setDistrict(districts[0].name);
        }
        fetchDistricts();
    }, []);
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(name, description, image, category, quality, status, district);
        createOneObject({nom: name, descipcio: description, imatge: image, categoria: category, qualitat: quality, estat: status, districte: district, users: 9});
    }
    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
      
        if (!file.type.startsWith("image/")) {
          alert("Please select an image file.");
          e.target.value = ""; // reset input
          setImage(null);
          return;
        }
      
        setImage(file.name);
      };
    return (
        <form className="add-object-form" onSubmit={handleSubmit}>
            <h1>Añadir objeto</h1>
            <input className="add-object-form-input" type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <input className="add-object-form-input" type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />

            <input className="add-object-form-input" type="file" accept="image/*" onChange={handleImageChange} />
            <select className="add-object-form-input" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)}>
                {categories.map((category) => (
                    <option key={category.id} value={category.id}>{category.categoria}</option>
                ))}
            </select>
            <select className="add-object-form-input" placeholder="Quality" value={quality} onChange={(e) => setQuality(e.target.value)}>
                <option value="bé">bé</option>
                <option value="normal">normal</option>
                <option value="malament">malament</option>
            </select>
            <select className="add-object-form-input" placeholder="Status" value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="per_prestat">per_prestat</option>
                <option value="donatiu">donatiu</option>
            </select>
            <select className="add-object-form-input" placeholder="District" value={district} onChange={(e) => setDistrict(e.target.value)}>
                {districts.map((district) => (
                    <option key={district.id} value={district.id}>{district.name}</option>
                ))}
            </select>
            <button className="add-object-form-button" type="submit">Add Object</button>
        </form>
    );
}