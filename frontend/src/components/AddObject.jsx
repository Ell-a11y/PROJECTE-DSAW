import { useState, useEffect } from "react";
import "./AddObject.css";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { getCategories, getDistricts, createOneObject, getUser, updateOneObject, objectsList} from "../communicationsManager";

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
    let { id } = useParams(); 
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            const categories = await getCategories();
            setCategories(categories);
            setCategory(categories[0].id);
        };
        const fetchDistricts = async () => {
            const districts = await getDistricts();
            setDistricts(districts);
            setDistrict(districts[0].name);
        };
        fetchCategories();
        fetchDistricts();
    }, []);

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (!file.type.startsWith("image/")) {
            alert("Please select an image file.");
            e.target.value = "";
            setImage(null);
            return;
        }
        setImage(file.name);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = await getUser();
        let payload = {
            nom: name,
            descipcio: description,
            imatge: image,
            categoria: Number(category),
            qualitat: quality,
            estat: status,
            districte: district,
            users: user.id
        };
        const isEditPage = location.pathname.includes("/edit");
        if(isEditPage) {
            payload.id = id;
            await updateOneObject(payload);
            navigate(`/app2/${id}`);
        } else {
            await createOneObject(payload);
            const objectes = await objectsList();
            let filtrados = [];
            for(const obj of objectes){
                if(obj.users == user.id) {
                    filtrados.push(obj)
                }
            }
            const ultimo = filtrados[filtrados.length - 1];
            navigate(`/app2/${ultimo.id}`);
        }
    };

    return (
        <form className="add-object-form" onSubmit={handleSubmit}>
            <h1>Añadir objeto</h1>
            <input className="add-object-form-input" type="text" placeholder="Name"
                value={name} onChange={(e) => setName(e.target.value)} />
            <input className="add-object-form-input" type="text" placeholder="Description"
                value={description} onChange={(e) => setDescription(e.target.value)} />
            <input className="add-object-form-input" type="file" accept="image/*"
                onChange={handleImageChange} />
            <select className="add-object-form-input" value={category}
                onChange={(e) => setCategory(e.target.value)}>
                {categories.map((category) => (
                    <option key={category.id} value={category.id}>{category.categoria}</option>
                ))}
            </select>
            <select className="add-object-form-input" value={quality}
                onChange={(e) => setQuality(e.target.value)}>
                <option value="bé">bé</option>
                <option value="normal">normal</option>
                <option value="malament">malament</option>
            </select>
            <select className="add-object-form-input" value={status}
                onChange={(e) => setStatus(e.target.value)}>
                <option value="per_prestat">per_prestat</option>
                <option value="donatiu">donatiu</option>
            </select>
            <select className="add-object-form-input" value={district}
                onChange={(e) => setDistrict(e.target.value)}>
                {districts.map((district) => (
                    <option key={district.id} value={district.name}>{district.name}</option>
                ))}
            </select>
            <button className="add-object-form-button" type="submit">Add Object</button>
        </form>
    );
}