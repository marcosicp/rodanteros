import { createContext, useContext, useState, useEffect } from "react";
import firebase from "../firebase";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const signUp = async (email, password, name) => {
    setLoading(false);
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        setUser(response.user);
        const user = firebase.auth().currentUser;
        user.updateProfile({
          displayName: name,
        });
        setLoading(false);
        window.location.replace("/login");
        toast.success("Usuario creado correctamente!", {
          theme: "colored",
          autoClose: 2000,
        });
        return response.user;
      })
      .catch((err) => {
        
        setError(err.message);
        setLoading(false);
      });
  };

  const login = (email, password) => {
    setLoading(true);
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        setUser(response.user);
        setLoading(false);
        window.location.replace("/");
        toast.success("Bienvenido!", {
          theme: "colored",
          autoClose: 2000,
        });
        return response.user;
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  const logOut = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        setUser(false);
      });
  };

  const sendPasswordResetEmail = (email) => {
    setLoading(true);
    return firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        setLoading(false);
        toast.success("Por favor, revisa tu email para restablecer tu contraseña", {
          theme: "colored",
          autoClose: 2000,
        });
        return true;
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  const signInWithGoogle = () => {
    setLoading(true);

    return firebase
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(async (response) => {
        setUser(response.user);
        setLoading(false);
        window.location.replace("/");
        toast.success("Bienvenido!", {
          theme: "colored",
          autoClose: 2000,
        });
        return response.user;
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
        toast.error(error ? `${error}` : "Algo salio mal!", {
          theme: "colored",
          autoClose: 2000,
        });
      });
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
      setIsAuthenticating(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const values = {
    loading,
    user,
    error,
    isAuthenticating,
    signUp,
    login,
    logOut,
    sendPasswordResetEmail,
    signInWithGoogle,
  };

  return (
    <AuthContext.Provider value={values}>
      {!isAuthenticating && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
