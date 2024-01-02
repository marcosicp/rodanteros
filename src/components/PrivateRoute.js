import { Route,  Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const PrivateRoute = ({children, ...rest}) => {

  const {user} = useAuth()

  return user ? 
    children
   : (
    <Navigate to="/login" /> // Redirect to login if not authenticated
  );

  // return (
  //   <Route
  //   {...rest}
  //   render={() => user ? children : <Navigate to="/login" />}
  //   >  
  //   </Route>
  // )
}

export default PrivateRoute
