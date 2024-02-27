import { BrowserRouter as Router, Switch, Route, Routes } from 'react-router-dom';


import Header from './components/Header/Header';
import Home from './pages/Home/Home';
// import Product from './pages/Product/Product';
// import Reviews from './pages/Reviews/Reviews';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import PrivateRoute from './components/PrivateRoute';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import { Fragment } from 'react';
import Camping from './pages/Camping/Camping';
import CampingDetails from './pages/CampingDetails/CampingDetails';


function App() {

  return (
    <Router>
      <Fragment>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />}>
            {/* <Route path="/" element={<Home />}> </Route> */}
          </Route>
          <Route exact path='/campings' element={<PrivateRoute path="/campings" >
            <Camping />
          </PrivateRoute>}>
          </Route>
          <Route path="/details/:id" element={<CampingDetails />}>
            {/* <Reviews /> */}
          </Route>
          <Route path="/signup" element={<SignUp />}>
            {/* <SignUp /> */}
          </Route>
          <Route path="/login" element={<Login />}>
            {/* <Login /> */}
          </Route>
          <Route path="/forgotPassword" element={<ForgotPassword />}>
            {/* <ForgotPassword /> */}
          </Route>
        </Routes>
      </Fragment>
    </Router>
  );
}

export default App;
