import { useState } from "react";
import firebase from "../../firebase";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";

import "./camping.css";
import { useNavigate } from "react-router-dom";
import { Autocomplete, TextField } from "@mui/material";
import UploadFiles from "../../components/FileUploader";

const db = firebase.firestore().collection("campingsPending");

const Camping = () => {
  const history = useNavigate();
  const { user } = useAuth();

  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productPhone, setProductPhone] = useState("");
  const [productState, setProductState] = useState("");
  const [productLocation, setProductLocation] = useState("");
  const [productAddress, setProductAddress] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [review, setReview] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fileData, setFileData] = useState([]);

  const uploadToFirebase = async (e) => {
    for (let i = 0; i < fileData.length; i++) {
      const file = fileData[i];
    
      try {
        const storageRef = firebase.storage().ref("campings/" + camping.id);
        const fileRef = storageRef.child(file.name);
        await fileRef.put(file);
        const url = await fileRef.getDownloadURL();
        camping.imagesUrls.push(url);
      } catch (error) {
        // Handle any errors that occur during upload
        console.error("Error uploading file:", error);
      }
    }
    await uploadProduct(camping);
    // setImageUrl(url);
  };

  const provincesArgentina = [
    { label: "Buenos Aires", isoCode: "AR-B" },
    { label: "Catamarca", isoCode: "AR-K" },
    { label: "Chaco", isoCode: "AR-H" },
    { label: "Chubut", isoCode: "AR-U" },
    { label: "Córdoba", isoCode: "AR-X" },
    { label: "Corrientes", isoCode: "AR-W" },
    { label: "Entre Ríos", isoCode: "AR-E" },
    { label: "Formosa", isoCode: "AR-P" },
    { label: "Jujuy", isoCode: "AR-Y" },
    { label: "La Pampa", isoCode: "AR-L" },
    { label: "La Rioja", isoCode: "AR-F" },
    { label: "Mendoza", isoCode: "AR-M" },
    { label: "Misiones", isoCode: "AR-N" },
    { label: "Neuquén", isoCode: "AR-Q" },
    { label: "Río Negro", isoCode: "AR-R" },
    { label: "Salta", isoCode: "AR-A" },
    { label: "San Juan", isoCode: "AR-J" },
    { label: "San Luis", isoCode: "AR-D" },
    { label: "Santa Cruz", isoCode: "AR-Z" },
    { label: "Santa Fe", isoCode: "AR-S" },
    { label: "Santiago del Estero", isoCode: "AR-G" },
    { label: "Tierra del Fuego", isoCode: "AR-V" },
    { label: "Tucumán", isoCode: "AR-T" },
  ];

  const camping = {
    id: uuidv4(),
    username: user.displayName ? user.displayName : "Anonymous",
    owner: user ? user.uid : "Anonymous",
    ownerEmail: user ? user.email : "Anonymous",
    name: productName,
    price: productPrice,
    address: productAddress,
    phone: productPhone,
    location: productLocation,
    state: productState,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    description: description,
    imagesUrls: [],
    reviews: [
      {
        owner: user ? user.uid : "Anonymous",
        username: user.displayName ? user.displayName : "Anonymous",
        review: review,
      },
    ],
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    debugger;
    try {
      await uploadToFirebase();
      

      setLoading(false);
      toast.success("Lugar cargado correctamente!", { theme: "colored", autoClose: 2000 });
      setProductName("");
      setDescription("");
      setImageUrl(null);
      setReview("");
      history("/");
    } catch (err) {
      setError(err.message);
      setLoading(false);
      toast.error(error ? `${error}` : "Hubo un error al guardar!", { theme: "colored", autoClose: 2000 });
    }
  };

  const handleDrop = (event) => {
    // Access dropped files and other properties from the event object
    const droppedFiles = event;

    // Ensure maximum of 2 files are selected
    if (droppedFiles.length > 2) {
      alert("Only a maximum of 2 images can be uploaded.");
      return;
    }

    // Update state with dropped files (assuming they meet criteria)
    setFileData(droppedFiles);
  };

  function uploadProduct(product) {
    db.doc(product.id).set(product);
  }

  const setLocation = async (e) => {
    setProductLocation(e);
  };

  return (
    <form onSubmit={handleSubmit} className="product__container">
      <h2 className="heading">Cargar un lugar</h2>

      <div className="input__container">
        <label>Nombre Lugar</label>
        <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} required />
      </div>

      <div className="input__container">
        <label>Direccion</label>
        <input
          type="text"
          value={productAddress}
          placeholder="En caso de tener, dejar vacio este campo"
          onChange={(e) => setProductAddress(e.target.value)}
        />
      </div>

      <div className="input__container">
        <label>Localidad</label>
        <input type="text" value={productState} onChange={(e) => setProductState(e.target.value)} required />
      </div>

      <div>
        <label>Provincia</label>
        <Autocomplete
          disablePortal
          required
          id="combo-box-demo"
          options={provincesArgentina}
          onChange={(v, e) => setLocation(e != null ? e.label : "")}
          renderInput={(params) => <TextField {...params} />}
        />
      </div>

      <div className="input__container">
        <label>Telefono</label>
        <input type="text" value={productPhone} onChange={(e) => setProductPhone(e.target.value)} />
      </div>

      <div className="input__container">
        <label>Precio</label>
        <input type="number" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} required />
      </div>

      <div className="input__container">
        <label>Descripción</label>
        <textarea
          cols="10"
          rows="10"
          placeholder="Comenta una breve descripción del lugar y que incluye el precio indicado"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      <div className="input__container">
        <label>Imagen </label> (Minimo 1 imagen, maximo 2)
        <UploadFiles onDrop={handleDrop}></UploadFiles>
      </div>

      <div className="input__container">
        <label>Observación</label>
        <input
          type="text"
          placeholder="Contanos como fue tu experiencia en este lugar"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          required
        />
      </div>

      <button className="btn">{loading ? <Loader height="1em" /> : "GUARDAR"}</button>
    </form>
  );
};

export default Camping;
