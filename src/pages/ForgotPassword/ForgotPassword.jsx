import {useState} from 'react';
import { useAuth } from '../../contexts/AuthContext';

//Components
import Loader from '../../components/Loader';
import ErrorDiv from '../../components/ErrorDiv';


const ForgotPassword = () => {

  const { sendPasswordResetEmail, loading, error } = useAuth();

  const [email, setEmail] = useState('');

  const handleSubmit = async(e) => {
    e.preventDefault()
    await sendPasswordResetEmail(email)
    setEmail('');
  }

  return (
    <form onSubmit={handleSubmit} className="product__container">
      <h2 className="heading">Olvide mi contraseña</h2>
      {error && <ErrorDiv component={error}/>}
      <div className="input__container">
        <label>Email</label>
        <input type="text" placeholder="Ingrese su email" value={email} onChange={(e) => setEmail(e.target.value)}/>
      </div>

      <button className="btn">{loading ? <Loader /> : 'Restablecer contraseña'}</button>
    </form>
  )
}

export default ForgotPassword
