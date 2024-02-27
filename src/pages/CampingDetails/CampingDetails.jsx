import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import firebase from "../../firebase";
import { useAuth } from "../../contexts/AuthContext";
import "./camping-details.css";
import CampingCard from "../../components/CampingCard/CampingCard";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";

import Comment from "../../components/Comment/Comment";
import { Rating } from "@mui/material";
import PageLoader from "../../components/PageLoader";

const db = firebase.firestore().collection("campings");

const CampingDetails = () => {
  const { user } = useAuth();

  const [campingParam, setCamping] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [rev, setRev] = useState("");
  const [raiting, setRaitingValue] = useState(0);

  const { id } = useParams();

  useEffect(() => {
    const getCamping = () => {
      setLoading(true);
      try {
        db.doc(id)
          .get()
          .then((querySnapShot) => {
            var items = {};
            items = querySnapShot.data();

            setCamping(items);
            setLoading(false);
          });
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    getCamping();
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      if (raiting != 0) {
        setLoading(true);
        db.doc(id).update({
          reviews: firebase.firestore.FieldValue.arrayUnion({
            owner: user ? user.uid : "unknown",
            username: user.displayName ? user.displayName : "Anonymous",
            review: rev,
            raiting: raiting,
          }),
        });
        setLoading(false);
        setRev("");
        setRaitingValue(0);
        toast.success("Gracias por enviar su comentario!", { theme: "colored", autoClose: 3000 });
      } else {
        toast.success("Por favor igrese una puntuación usado las estrellas!", { theme: "colored", autoClose: 2000 });
      }
    } catch (err) {
      setError(err.message);
      setLoading(false);
      toast.error(error ? `${error}` : "Ocurrio un error al enviar cometario!", { theme: "colored", autoClose: 2000 });
    }
  };

  const handleClick = (rev) => {
    db.doc(id).update({
      reviews: firebase.firestore.FieldValue.arrayRemove({
        owner: user.uid,
        review: rev,
        username: user.displayName ? user.displayName : "Anonymous",
      }),
    });
  };

  return loading ? (
    <PageLoader />
  ) : (
    <div className="product__container">
      <CampingCard campingParam={campingParam} />

      <div className="reviews__container">
        <h4 className="product__observaciones">
          <span className="product__observaciones__span">
            {campingParam.reviews != undefined ? campingParam.reviews.length : 0}{" "}
            {campingParam.reviews != undefined
              ? `${campingParam.reviews.length <= 1 ? "observación" : "observaciones"}`
              : ""}
          </span>
        </h4>
        {campingParam.reviews != undefined
          ? campingParam.reviews.map((review) => (
              <Comment key={review.review} review={review} handleClick={handleClick} />
            ))
          : null}
      </div>

      {user ? (
        <form onSubmit={handleSubmit} className="review__form">
          <Rating
            name="simple-controlled"
            value={raiting}
            precision={0.5}
            onChange={(event, newValue) => {
              setRaitingValue(newValue);
            }}
          />
          <textarea
            cols="10"
            rows="10"
            placeholder="Por favor deje su observación"
            required
            value={rev}
            onChange={(e) => setRev(e.target.value)}
          ></textarea>
          <button type="submit" className="review-btn">
            {loading ? <Loader /> : "Enviar"}
          </button>
        </form>
      ) : (
        <div className="login-msg">Por favor registrese para dejar una observación</div>
      )}
    </div>
  );
};

export default CampingDetails;
