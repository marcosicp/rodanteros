import { useState } from "react";
import { Link, useHistory, useNavigate } from "react-router-dom";
import { CgMenuRight, CgClose } from "react-icons/cg";
import "./header.css";
import { useAuth } from "../../contexts/AuthContext";
import { Icon } from "@mui/material";
import iconMarca from "../../assets/marca_acampado.png";

const Header = () => {
  const history = useNavigate();

  const { user, logOut } = useAuth();

  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    setIsOpen(false);
    await logOut();
    history("/");
  };

  return (
    <header className="header">
      <nav className="navbar">
        <img width="180px" src={iconMarca} alt="{prod.name}" className="" />
        <Link to="/" className="logo-link" style={{ paddingRight: "60%" }}>
          {/* Rodanteros */}
        </Link>

        <div className="navbar__links-container" >
          <div className="nav__links" style={{width: "330px"}}>
            <Link to="/" className="nav__link">
              Home
            </Link>
            {/* <Link to="/product" className="nav__link">Camping</Link> */}
            {user && (
              <Link to="/campings" className="nav__link">
                Camping
              </Link>
            )}
            {!user && (
              <Link to="/login" className="nav__link login">
                Login
              </Link>
            )}
            {!user && (
              <Link to="/signup" className="nav__link login">
                Sign up
              </Link>
            )}
            {user && (
              <Link to="/" className="nav__link login" onClick={handleLogout}>
                Logout
              </Link>
            )}
          </div>

          <div className="menu__icon" onClick={() => setIsOpen((prev) => !prev)}>
            {!isOpen ? <CgMenuRight className="toggleIcon open" /> : <CgClose className="toggleIcon close" />}
          </div>

          {isOpen && (
            <div className="nav__links-mobile">
              <Link to="/" className="nav__link" onClick={() => setIsOpen(false)}>
                Home
              </Link>
              <Link to="/campings" className="nav__link" onClick={() => setIsOpen(false)}>
                Campings
              </Link>
              {!user && (
                <Link to="/login" className="nav__link login" onClick={() => setIsOpen(false)}>
                  Ingresar
                </Link>
              )}
              {!user && (
                <Link to="/signup" className="nav__link login" onClick={() => setIsOpen(false)}>
                  Registro
                </Link>
              )}
              {user && (
                <Link to="/" className="nav__link login" onClick={handleLogout}>
                  Salir
                </Link>
              )}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
