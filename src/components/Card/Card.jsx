import { Link } from "react-router-dom";
// import { format } from 'timeago.js';
import { useAuth } from "../../contexts/AuthContext";
import noimage from "../../assets/no-image.jpg";
import {
  MdCreditCard,
  MdCreditCardOff,
  MdFastfood,
  MdNoFood,
  MdOutlineWifi,
  MdOutlineWifiOff,
  MdPower,
  MdPowerOff,
} from "react-icons/md";
import firebase from "../../firebase";
import "./card.css";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

import CustomSlider from "../CustomSlider/CustomSlider";
import Avatar from "react-avatar";
const db = firebase.firestore().collection("campingsPending");

const Cardd = ({ campingParam }) => {
  const { user } = useAuth();

  function formatDate(date) {
    const formattedDate = new Date(date);
    const day = formattedDate.getDate().toString().padStart(2, "0");
    const month = (formattedDate.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-indexed
    const year = formattedDate.getFullYear();

    return `${day}/${month}/${year}`;
  }

  return (
    <div style={{ paddingBottom: "30px"}} >
      {/* <Link to={`/details/${campingParam.id}`} className=""> */}
        <Card sx={{ maxWidth: 345, minWidth: 250}}>
          {campingParam.imagesUrls.length > 0 ? (
            <CustomSlider >
              {campingParam.imagesUrls.map((image, index) => {
                return <img key={index} style={{ height: "200px" }} src={image} alt={"imagen de Acampado"} />;
              })}
            </CustomSlider>
          ) : (
            <CardMedia style={{ height: "100%" }}  title="green iguana" >
              <Avatar src={noimage} ></Avatar>
            </CardMedia>
          )}

          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {campingParam.name}
            </Typography>
            <Typography gutterBottom variant="h5" component="div">
              ${campingParam.price}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {/* <h5 className="name">${campingParam.price}</h5> */}
              {/* Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents
            except Antarctica */}
              {/* <h5> */}
              Publicado: {campingParam.createdAt ? formatDate(campingParam.createdAt.toDate()) : null}
              {/* </h5> */}
              {/* <h5 style={{ bottom: 4, right: 1, width: 200 }}>
              
            </h5> */}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {campingParam.state}, {campingParam.location}
            </Typography>
          </CardContent>
          <Divider orientation="horizontal" flexItem />
          <CardActions style={{ justifyContent: "center", backgroundColor: "white" }}>
            <Stack direction="row" spacing={2} height={50} style={{alignItems: "center"}}>
              {campingParam.amenities != undefined ? (
                campingParam.amenities.wifi ? (
                  <MdOutlineWifi className="toggleIcon open" style={{ color: "green" }} />
                ) : (
                  <MdOutlineWifiOff className="toggleIcon open" style={{ color: "red" }} />
                )
              ) : null}
              <Divider orientation="vertical" flexItem />

              {campingParam.amenities != undefined ? (
                campingParam.amenities.shop ? (
                  <MdFastfood className="toggleIcon open" style={{ color: "green" }} />
                ) : (
                  <MdNoFood className="toggleIcon open" style={{ color: "red" }} />
                )
              ) : null}

              <Divider orientation="vertical" flexItem />
              {campingParam.amenities != undefined ? (
                campingParam.amenities.power ? (
                  <MdPower className="toggleIcon open" style={{ color: "green" }} />
                ) : (
                  <MdPowerOff className="toggleIcon open" style={{ color: "red" }} />
                )
              ) : null}

              <Divider orientation="vertical" flexItem />
              {campingParam.amenities != undefined ? (
                campingParam.amenities.tarjetas ? (
                  <MdCreditCard className="toggleIcon open" style={{ color: "green" }} />
                ) : (
                  <MdCreditCardOff className="toggleIcon open" style={{ color: "red" }} />
                )
              ) : null}
              <Divider orientation="vertical" flexItem />
              <Link to={`/details/${campingParam.id}`} style={{ textDecoration: 'none' }} className="reviewsbtn">
                VER
                {/* {campingParam.reviews.length} {`${campingParam.reviews.length <= 1 ? "review" : "reviews"}`} */}
              </Link>
            </Stack>
            {/* <Box display="flex" sx={{ flexDirection: "row", justifyContent: "space-evenly" }}>
            
          </Box> */}
          </CardActions>
        </Card>
      {/* </Link> */}
    </div>
  );
};

export default Cardd;

// <div className="card__container">
// <div className="image__container">
// <CustomSlider>
//   {campingParam.imagesUrls.map((image, index) => {
//     return <img key={index} src={image} alt={"imagen de Acampado"} />;
//   })}
// </CustomSlider>
//   {/* <img
//     src={campingParam.imageUrl ? campingParam.imageUrl : myImage}
//     alt={campingParam.name}
//     className="product__image"
//   /> */}
// </div>

// <div className="card__text">
//   {/* {user ? user.uid === prod.owner &&
//   <button className="del-btn" onClick={() => removeFromDB(prod)}><MdDelete /></button> : null} */}
//   <div className="card__text-details">
//     <h4 className="name">{campingParam.name}</h4>
//     <h5 className="name">${campingParam.price}</h5>
//     <p className="description mobile">{`${campingParam.description.substring(0, 40)}...`}</p>
//     <p className="description desktop">{`${campingParam.description.substring(0, 60)}...`}</p>

//     <div className="card__text-sub-details">
//       <h5>Publicado: {campingParam.createdAt ? formatDate(campingParam.createdAt.toDate()) : null}</h5>
//       {/* <h5>Subido por {campingParam.username ? campingParam.username : "Anonimo"}</h5> */}
//       <h5 style={{ bottom: 4, right: 1, width: 200 }}>
//         {campingParam.state}, {campingParam.location}
//       </h5>
//     </div>
//     <div style={{ width: "100%" }}>
//       <Box display="flex" sx={{ flexDirection: "row", justifyContent: "space-evenly" }}>
//         <Link to={`/details/${campingParam.id}`} className="reviews">
//           VER
//           {/* {campingParam.reviews.length} {`${campingParam.reviews.length <= 1 ? "review" : "reviews"}`} */}
//         </Link>
//       </Box>
//     </div>
//   </div>
// </div>
// </div>
