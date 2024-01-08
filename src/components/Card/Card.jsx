import { Link } from 'react-router-dom';
// import { format } from 'timeago.js';
import { useAuth } from '../../contexts/AuthContext';
import { MdDelete } from 'react-icons/md';
import firebase from '../../firebase';
import './card.css';
import { Box } from '@mui/material';

import myImage from '../../assets/no-image.jpg';
const db = firebase.firestore().collection('campingsPending');


const Card = ({ prod }) => {

  const { user } = useAuth();

  // function deleteFile(url) {
  //   return firebase
  //     .storage()
  //     .refFromURL(url)
  //     .delete()
  //     .then(res => console.log(res))
  //     .catch(err => console.log(err))
  // }

  // function deleteProduct(prod) {
  //   return db
  //     .doc(prod.id)
  //     .delete(prod)
  //     .catch(err => {
  //       console.log(err.message);
  //     })
  // }

  // async function removeFromDB(prod) {
  //   await deleteProduct(prod)
  //   await deleteFile(prod.imageUrl)
  // }

  function formatDate(date) {
    // Create a new Date object to ensure consistent formatting
    const formattedDate = new Date(date);

    // Get individual date and time components
    const day = formattedDate.getDate().toString().padStart(2, '0');
    const month = (formattedDate.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
    const year = formattedDate.getFullYear();

    // Construct the formatted string
    return `${day}/${month}/${year}`;
  }

  return (
    <div className="card__container">
      <div className="image__container">
        <img src={prod.imageUrl ? prod.imageUrl : myImage} alt={prod.name} className="product__image" />
      </div>

      <div className="card__text">
        {/* {user ? user.uid === prod.owner && 
        <button className="del-btn" onClick={() => removeFromDB(prod)}><MdDelete /></button> : null} */}
        <div className="card__text-details">
          <h4 className="name">{prod.name}</h4>
          <h5 className="name">${prod.price}</h5>
          <p className="description mobile">{`${prod.description.substring(0, 40)}...`}</p>
          <p className="description desktop">{`${prod.description.substring(0, 60)}...`}</p>

          <div className="card__text-sub-details">

            <h5>Publicado: {prod.createdAt ? formatDate(prod.createdAt.toDate()) : null}</h5>
            <h5>Subido por {prod.username ? prod.username : 'Anonimo'}</h5>
            <h5 style={{ bottom: 4, right:1, width:200 }}>{prod.state}, {prod.location}</h5>
          </div>
          <div style={{ width: '100%' }}>
            <Box display="flex" sx={{ flexDirection: 'row', justifyContent: 'space-evenly', }} >
              <Box  >
                <Link to={`/reviews/${prod.id}`} className="reviews">
                  {prod.reviews.length} {`${prod.reviews.length <= 1 ? 'review' : 'reviews'}`}
                </Link></Box>
              <div >
                </div>
            </Box>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card
