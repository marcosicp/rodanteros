import { BrowserRouter as Router, Switch, Route, Routes } from 'react-router-dom';


import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import Product from './pages/Product/Product';
import Reviews from './pages/Reviews/Reviews';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import PrivateRoute from './components/PrivateRoute';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import { Fragment } from 'react';


function App() {

  return (
    <Router>
      <Fragment>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />}>
            {/* <Route path="/" element={<Home />}> </Route> */}

          </Route>
          <Route exact path='/product' element={<PrivateRoute path="/product" >
            <Product />
          </PrivateRoute>}>
            {/* <Route exact path='/product' element={<Product />} /> */}
          </Route>

          {/* <PrivateRoute path="/product" >
            <Product />
          </PrivateRoute> */}
          {/* <Route path="/product" element={<Product />} >
            <Product />
          </Route> */}
          <Route path="/reviews/:id" element={<Reviews />}>
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
