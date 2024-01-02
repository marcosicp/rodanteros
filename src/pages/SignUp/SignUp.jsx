import {useState} from 'react';
import { useAuth } from '../../contexts/AuthContext';

//Components
import Loader from '../../components/Loader';
import ErrorDiv from '../../components/ErrorDiv';

const SignUp = () => {

  const { signUp, logOut, loading, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleSubmit = async(e) => {
    e.preventDefault()
      await signUp(email, password, username)
      logOut()
      setEmail('')
      setPassword('')
      setUsername('')
  }

  return (
    <form onSubmit={handleSubmit} className="product__container">
      <h2 className="heading">Create an account</h2>
      {error && <ErrorDiv component={error}/>}
      <div className="input__container">
        <label>Usuario</label>
        <input type="text" placeholder="Ingrese su usuario" value={username} onChange={(e) => setUsername(e.target.value)}/>
      </div>

      <div className="input__container">
        <label>Email</label>
        <input type="text" placeholder="Ingrese su email" required value={email} onChange={(e) => setEmail(e.target.value)}/>
      </div>

      <div className="input__container">
        <label>Contraseña</label>
        <input type="password" placeholder="Ingrese su contraseña" required value={password} onChange={(e) => setPassword(e.target.value)}/>
      </div>

      <button className="btn">{loading ? <Loader height='1em'/> : 'Registrarme'}</button>
    </form>
  )
}

export default SignUp
