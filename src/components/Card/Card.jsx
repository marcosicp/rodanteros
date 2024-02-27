import { Link } from "react-router-dom";
// import { format } from 'timeago.js';
import { useAuth } from "../../contexts/AuthContext";
import { MdDelete } from "react-icons/md";
import firebase from "../../firebase";
import "./card.css";
import { Box } from "@mui/material";

import myImage from "../../assets/no-image.jpg";
import CustomSlider from "../CustomSlider/CustomSlider";
const db = firebase.firestore().collection("campingsPending");

const Card = ({ campingParam }) => {
  const { user } = useAuth();

  function formatDate(date) {
    const formattedDate = new Date(date);
    const day = formattedDate.getDate().toString().padStart(2, "0");
    const month = (formattedDate.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-indexed
    const year = formattedDate.getFullYear();

    return `${day}/${month}/${year}`;
  }
debugger
  return (

    <div className="card__container">
      <div className="image__container">
      <CustomSlider>
        {campingParam.imagesUrls.map((image, index) => {
          return <img key={index} src={image} alt={"imagen de Acampado"} />;
        })}
      </CustomSlider>
        {/* <img
          src={campingParam.imageUrl ? campingParam.imageUrl : myImage}
          alt={campingParam.name}
          className="product__image"
        /> */}
      </div>

      <div className="card__text">
        {/* {user ? user.uid === prod.owner && 
        <button className="del-btn" onClick={() => removeFromDB(prod)}><MdDelete /></button> : null} */}
        <div className="card__text-details">
          <h4 className="name">{campingParam.name}</h4>
          <h5 className="name">${campingParam.price}</h5>
          <p className="description mobile">{`${campingParam.description.substring(0, 40)}...`}</p>
          <p className="description desktop">{`${campingParam.description.substring(0, 60)}...`}</p>

          <div className="card__text-sub-details">
            <h5>Publicado: {campingParam.createdAt ? formatDate(campingParam.createdAt.toDate()) : null}</h5>
            <h5>Subido por {campingParam.username ? campingParam.username : "Anonimo"}</h5>
            <h5 style={{ bottom: 4, right: 1, width: 200 }}>
              {campingParam.state}, {campingParam.location}
            </h5>
          </div>
          <div style={{ width: "100%" }}>
            <Box display="flex" sx={{ flexDirection: "row", justifyContent: "space-evenly" }}>
              <Link to={`/details/${campingParam.id}`} className="reviews">
                VER
                {/* {campingParam.reviews.length} {`${campingParam.reviews.length <= 1 ? "review" : "reviews"}`} */}
              </Link>
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
