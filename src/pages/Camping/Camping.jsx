import { useState } from "react";
import firebase from "../../firebase";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import NumberFormat from "react-number-format";
import PatternFormat from "react-number-format";
import "./camping.css";
import { useNavigate } from "react-router-dom";
import { Autocomplete, Avatar, Box, Checkbox, FormControlLabel, FormGroup, TextField } from "@mui/material";
import UploadFiles from "../../components/FileUploader";
import {
  MdCreditCard,
  MdCreditCardOff,
  MdFastfood,
  MdNoFood,
  MdOutlinePets,
  MdOutlineWifi,
  MdOutlineWifiOff,
  MdPets,
  MdPower,
  MdPowerOff,
} from "react-icons/md";

const db = firebase.firestore().collection("campingsPending");

const Camping = () => {
  const history = useNavigate();
  const { user } = useAuth();
  const initFormValues = {
    placeName: {
      value: "",
      error: false,
      errorMessage: "You must enter a name",
    },
    placePrice: {
      value: 0,
      error: false,
      errorMessage: "You must enter an age",
    },
    placePhone: {
      value: "",
      error: false,
      errorMessage: "You must enter your liked tech stacks",
    },
    placeState: {
      value: "",
      error: false,
      errorMessage: "You must choose your job title",
    },
    placeLocation: {
      value: "",
      error: false,
      errorMessage: "You must choose your job title",
    },
    placeAddress: {
      value: "",
      error: false,
      errorMessage: "You must choose your job title",
    },
    placeDescription: {
      value: "",
      error: false,
      errorMessage: "You must choose your job title",
    },
  };
  const [formValues, setFormValues] = useState(initFormValues);

  const [amenities, setAmenities] = useState({
    wifi: false,
    shop: false,
    power: false,
    kids: false,
    cards: false,
  });
  const [imageUrl, setImageUrl] = useState(null);
  const [review, setReview] = useState("");
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
    name: formValues.placeName.value,
    price: formValues.placePrice.value,
    address: formValues.placeAddress.value,
    phone: formValues.placePhone.value,
    location: formValues.placeLocation.value,
    state: formValues.placeState.value,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    description: formValues.placeDescription.value,
    imagesUrls: [],
    reviews: [
      {
        owner: user ? user.uid : "Anonymous",
        username: user.displayName ? user.displayName : "Anonymous",
        review: review,
      },
    ],
    amenities: amenities,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formFields = Object.keys(formValues);
    let newFormValues = { ...formValues };

    for (let index = 0; index < formFields.length; index++) {
      const currentField = formFields[index];
      const currentValue = formValues[currentField].value;

      if (currentValue === "") {
        newFormValues = {
          ...newFormValues,
          [currentField]: {
            ...newFormValues[currentField],
            error: true,
          },
        };
      }
    }

    setFormValues(newFormValues);

    if (e.target.checkValidity()) {
    } else {
      toast.error("Complete los campos requeridos", { theme: "colored", autoClose: 4000 });
      return;
    }

    setLoading(true);

    try {
      if (review === "") {
        camping.reviews = [];
      }
      await uploadToFirebase();

      setLoading(false);
      toast.success("Lugar cargado correctamente!", { theme: "colored", autoClose: 2000 });
      // setPlaceName("");
      setFormValues(initFormValues);
      setFileData([]);
      setAmenities({
        wifi: false,
        shop: false,
        power: false,
        kids: false,
        cards: false,
      });
      // setPlaceDescription("");
      setImageUrl(null);
      setFileData([]);
      setReview("");
      // history("/");
    } catch (err) {
      setError(err.message);
      setLoading(false);
      toast.error(error ? `${error}` : "Hubo un error al guardar!", { theme: "colored", autoClose: 4000 });
    }
  };

  const handleDrop = (event) => {
    // Access dropped files and other properties from the event object
    const droppedFiles = event;

    // Ensure maximum of 2 files are selected
    if (droppedFiles.length > 2) {
      alert("Solo se permiten como máximo dos imágenes.");
      return;
    }

    // Update state with dropped files (assuming they meet criteria)
    setFileData(droppedFiles);
  };

  function uploadProduct(product) {
    db.doc(product.id).set(product);
  }

  const handleChangePrestacion = (event) => {
    setAmenities({
      ...amenities,
      [event.target.name]: event.target.checked,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: {
        ...formValues[name],
        value,
        error: value === "" ? true : false,
      },
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} className="product__container" noValidate>
      <h2 className="heading">Cargar un lugar</h2>

      <div className="input__container">
        <label>Nombre Lugar</label>
        <TextField
          type="text"
          name="placeName"
          value={formValues.placeName.value}
          required
          error={formValues.placeName.error}
          helpertext={formValues.placeName.error ? "Este campo es requerido" : ""}
          style={{ backgroundColor: "white" }}
          onChange={handleChange}
        />
      </div>

      <div className="input__container">
        <label>Direccion</label>
        <TextField
          name="placeAddress"
          type="text"
          style={{ backgroundColor: "white" }}
          value={formValues.placeAddress.value}
          placeholder="En caso de no tener, dejar vacio este campo"
          onChange={handleChange}
        ></TextField>
      </div>

      <div className="input__container">
        <label>Localidad</label>
        <TextField
          type="text"
          name="placeLocation"
          required
          style={{ backgroundColor: "white" }}
          error={formValues.placeLocation.error}
          helperText={formValues.placeLocation.error ? "Este campo es requerido" : ""}
          value={formValues.placeLocation.value}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Provincia</label>
        <Autocomplete
          value={formValues.placeState.value}
          disablePortal
          name="placeState"
          required
          style={{ backgroundColor: "white" }}
          id="combo-box-demo"
          options={provincesArgentina}
          onChange={(v, e) =>
            handleChange(
              e != null
                ? { target: { name: "placeState", value: e.label } }
                : { target: { name: "placeState", value: "" } }
            )
          }
          renderInput={(params) => (
            <TextField
              error={formValues.placeState.error}
              helperText={formValues.placeState.error ? "Este campo es requerido" : ""}
              {...params}
            />
          )}
        />
      </div>

      <div className="input__container">
        <label>Telefono</label>

        <PatternFormat
          name="placePhone"
          format="+54 #### #########"
          renderText={(formattedValue) => <TextField>{formattedValue}</TextField>}
          onChange={handleChange}
          value={formValues.placePhone.value}
        ></PatternFormat>
      </div>

      <div className="input__container">
        <label>Precio (Si desconoce el precio dejar cero)</label>
        <NumberFormat
          name="placePrice"
          type="text"
          renderText={(formattedValue) => <TextField>{formattedValue}</TextField>}
          decimalScale={2}
          onChange={handleChange}
          error={formValues.placePrice.error ? "Este campo es requerido" : ""}
          prefix={"$"}
          thousandSeparator="."
          decimalSeparator=","
          value={formValues.placePrice.value}
        ></NumberFormat>
      </div>

      <div className="">
        <label>Descripción</label>
        <TextField
          name="placeDescription"
          style={{ backgroundColor: "white" }}
          rows="5"
          margin="none"
          variant="outlined"
          multiline={true}
          error={formValues.placeDescription.error}
          helperText={formValues.placeDescription.error ? "Este campo es requerido" : ""}
          placeholder="Comenta una breve descripción del lugar y que incluye el precio indicado. Recuerda que es una reseña generica y no personal."
          value={formValues.placeDescription.value}
          onChange={handleChange}
          required
        />
      </div>

      <div className="">
        <label>Instalaciones</label>
      </div>
      <FormGroup style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly" }}>
        <FormControlLabel
          labelPlacement="bottom"
          control={
            <Checkbox
              name="wifi"
              checkedIcon={
                <Avatar sx={{ bgcolor: "green" }} variant="rounded">
                  <MdOutlineWifi />
                </Avatar>
              }
              icon={
                <Avatar sx={{ bgcolor: "red" }} variant="rounded">
                  <MdOutlineWifiOff />
                </Avatar>
              }
              onChange={handleChangePrestacion}
            />
          }
          label="Wifi"
        />
        <FormControlLabel
          labelPlacement="bottom"
          control={
            <Checkbox
              name="shop"
              checkedIcon={
                <Avatar sx={{ bgcolor: "green" }} variant="rounded">
                  <MdFastfood />
                </Avatar>
              }
              icon={
                <Avatar sx={{ bgcolor: "red" }} variant="rounded">
                  <MdNoFood />
                </Avatar>
              }
              onChange={handleChangePrestacion}
            />
          }
          label="Proveduria"
        />
        <FormControlLabel
          labelPlacement="bottom"
          control={
            <Checkbox
              name="power"
              checkedIcon={
                <Avatar sx={{ bgcolor: "green" }} variant="rounded">
                  <MdPower />
                </Avatar>
              }
              icon={
                <Avatar sx={{ bgcolor: "red" }} variant="rounded">
                  <MdPowerOff />
                </Avatar>
              }
              onChange={handleChangePrestacion}
            />
          }
          label="Electricidad"
        />
        <FormControlLabel
          labelPlacement="bottom"
          control={
            <Checkbox
              name="cards"
              checkedIcon={
                <Avatar sx={{ bgcolor: "green" }} variant="rounded">
                  <MdCreditCard />
                </Avatar>
              }
              icon={
                <Avatar sx={{ bgcolor: "red" }} variant="rounded">
                  <MdCreditCardOff />
                </Avatar>
              }
              onChange={handleChangePrestacion}
            />
          }
          label="Pago Electronico"
        />
        {/* <FormControlLabel
          labelPlacement="bottom"
          control={
            <Checkbox
              name="petFrendly"
              checkedIcon={
                <Avatar sx={{ bgcolor: "green" }} variant="rounded">
                  <MdOutlinePets />
                </Avatar>
              }
              icon={
                <Avatar sx={{ bgcolor: "red" }} variant="rounded">
                  <MdPets />
                </Avatar>
              }
              onChange={handleChangePrestacion}
            />
          }
          label="Pago Electronico"
        /> */}
      </FormGroup>

      <div className="input__container">
        <label>Imagen </label>
        {fileData.length < 1 ? (
          <label style={{ fontSize: 12, color: "red" }}>Debe agregar una imagen al menos</label>
        ) : (
          <p></p>
        )}
        (Minimo 1 imagen, maximo 2)
        <UploadFiles onDrop={handleDrop}></UploadFiles>
        
      </div>

      <button type="submit" className="btn">
        {loading ? <Loader height="1em" /> : "GUARDAR"}
      </button>
    </Box>
  );
};

export default Camping;
