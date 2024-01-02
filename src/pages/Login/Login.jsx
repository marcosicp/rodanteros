import './login.css';
import {useState} from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

//Components
import { FcGoogle } from 'react-icons/fc';
import Loader from '../../components/Loader';
import ErrorDiv from '../../components/ErrorDiv';


const Login = () => {

  const { login, signInWithGoogle, loading, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async(e) => {
    e.preventDefault()
     await login(email, password)  
     setEmail('')
     setPassword('')
  }

  const handleGoogle = async() => {
    await signInWithGoogle()
  }

  return (
    <form onSubmit={handleSubmit} className="product__container">
      <h2 className="heading">Login</h2>
      {error && <ErrorDiv component={error}/>}
      <div className="input__container">
        <label>Email</label>
        <input type="text" placeholder="Ingrese su email" required value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>

      <div className="input__container">
        <label>Contraseña</label>
        <input type="password" placeholder="Ingrese su contraseña" required value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>

        <h4 onClick={handleGoogle} className="login__page-link">
          <FcGoogle className="google"/> Ingresar con Google
        </h4>
       <h4>No tiene cuenta? <Link to="/signup" className="login__page-link">Registrarme</Link></h4>
       <h4>Olvido su contraseña? <Link to="/forgotPassword" className="login__page-link">Restablecer</Link></h4>
      <button className="btn">{loading ? <Loader /> : 'Login'}</button>
    </form>
  )
}

export default Login
