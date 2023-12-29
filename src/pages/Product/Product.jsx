import {useState} from 'react';
import firebase from '../../firebase';
import {v4 as uuidv4} from 'uuid';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader';

import './product.css';
import { useNavigate } from 'react-router-dom';

const db = firebase.firestore().collection('campings');

const Product = () => {
  const history = useNavigate();
  const {user} = useAuth();

  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState(null);
  const [review, setReview] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = async(e) => {
    const file = e.target.files[0];
    const storageRef = firebase.storage().ref();
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file);
    const url = await fileRef.getDownloadURL();
    setImageUrl(url);
  }

  const prod = {
      id: uuidv4(),
      username: user.displayName ? user.displayName : 'Anonymous',
      owner: user? user.uid : 'Anonymous',
      ownerEmail: user? user.email : 'Anonymous',
      name: productName,
      price: productPrice,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      description: description,
      imageUrl: imageUrl,
      reviews: [{
        owner: user? user.uid : 'Anonymous',
        username: user.displayName? user.displayName : 'Anonymous',
        review: review
      }]
    }

  const handleSubmit = async(e) => {
    e.preventDefault()
    setLoading(true)
    try{
      await uploadProduct(prod)
      setLoading(false)
      toast.success('Lugar cargado correctamente!', {theme: "colored", autoClose: 2000 })
      setProductName('')
      setDescription('')
      setImageUrl(null)
      setReview('')
      history('/');
    } catch(err) {
      setError(err.message)
      setLoading(false)
      toast.error( error? `${error}` : 'Hubo un error al guardar!', {theme: "colored", autoClose: 2000 })
    }
    
  }

  function uploadProduct(product){
    db
    .doc(product.id)
    .set(product)
  }

  return (
    <form onSubmit={handleSubmit} className="product__container">
      <h2 className="heading">Cargar un lugar</h2>

      
      <div className="input__container">
        <label>Nombre Lugar</label>
        <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} required/>
      </div>

      <div className="input__container">
        <label>Precio</label>
        <input type="number" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} required/>
      </div>

      <div className="input__container">
        <label>Descripción</label>
        <textarea cols="10" rows="10" value={description} onChange={(e) => setDescription(e.target.value)} required/>
      </div>

      <div className="input__container">
        <label>Imagen</label>
        <input type="file"  onChange={handleFileChange} />
      </div>

      <div className="input__container">
        <label>Obervación</label>
        <input type="text" value={review} onChange={(e) => setReview(e.target.value)} required />
      </div>

      <button className="btn">{loading ? <Loader height='1em'/> : 'GUARDAR'}</button>
    </form>
  )
}

export default Product
