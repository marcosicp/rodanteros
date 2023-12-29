import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import AuthProvider from './contexts/AuthContext';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


// toast.configure();

// ReactDOM.render(
//   <React.StrictMode>
//     <AuthProvider>
//       <App />
//       <ToastContainer closeButton={true} position="top-center" />
//     </AuthProvider>
//   </React.StrictMode>,
//   document.getElementById('root')
// );

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
      <ToastContainer closeButton={true} position="top-center" />
    </AuthProvider>
  </React.StrictMode>
);



