import { useNavigate } from "react-router-dom";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import "./campingCard.css";
import { Typography } from "@mui/material";
import CustomSlider from "../CustomSlider/CustomSlider";

const CampingCard = ({ campingParam }) => {
  const history = useNavigate();

  function formatDate(date) {
    // Create a new Date object to ensure consistent formatting
    const formattedDate = new Date(date);

    // Get individual date and time components
    const day = formattedDate.getDate().toString().padStart(2, "0");
    const month = (formattedDate.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-indexed
    const year = formattedDate.getFullYear();

    // Construct the formatted string
    return `${day}/${month}/${year}`;
  }

  return (
    <div className="product__card-container">
      <button className="back-btn" onClick={() => history("/")}>
        <MdOutlineKeyboardBackspace className="back-icon" />
      </button>
      <div className="product__image-container">
        <h2 className="heading">{campingParam.name}</h2>

        <h5>
          Publicado el {campingParam.createdAt ? formatDate(campingParam.createdAt.toDate()) : null} por{" "}
          {campingParam.username ? campingParam.username : "Anonimo"}
        </h5>

        <CustomSlider>
          {campingParam.imagesUrls.map((image, index) => {
            return <img key={index} src={image} alt={"imagen de Acampado"} />;
          })}
        </CustomSlider>
        {/* <img
          src={campingParam.imageUrl ? campingParam.imageUrl : "https://source.unsplash.com/1600x900/?nature,water"}
          alt={campingParam.name}
          className="product__image"
        /> */}
      </div>

      <div className="product__card-text">
        <Typography gutterBottom variant="h5" component="div" textAlign={"center"}>
          PRECIO ${campingParam.price}
        </Typography>

        <p className="product__description">{campingParam.description}</p>
        <p className="product__description">
          <strong>Direccion:</strong> {campingParam.address}
        </p>
        <p className="product__description">
          <strong>Ciudad:</strong> {campingParam.state}, {campingParam.location}
        </p>

        <p className="product__description">
          <strong>Telefono: </strong>
          {campingParam.phone}
        </p>
      </div>
    </div>
  );
};

export default CampingCard;
