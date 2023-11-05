import { Link, useNavigate } from "react-router-dom";
import useSesionStore from "../store/sesion.store";
import { successMessage } from "./messages";

const Navbar = (dateTime) => {
  const { isAuth } = useSesionStore.getState();
  const navigate = useNavigate();
  const cerrarSesion = useSesionStore((state) => state.logout);
  const userData = useSesionStore((state) => state.userData);
  const salir = () => {
    successMessage("Sesión cerrada", "Se ha cerrado la sesión con éxito");
    cerrarSesion();
    navigate("/");
  };
  return (
    <>
      <nav className="navbar navbar-expand navbar-light navbar-white">
        <div className="container">
          <lord-icon
            src="https://cdn.lordicon.com/hnppcsvw.json"
            trigger="hover"
            colors="primary:#4030e8,secondary:#66a1ee"
            style={{ width: "50px", height: "50px" }}
          ></lord-icon>
          <div className="navbar-brand">
            <Link to={"/"} className="brand-text link-dark">
              Stocket
            </Link>
          </div>

          <ul className="navbar-nav">
            {isAuth ? (
              <>
                <li className="nav-item"></li>
                <li className="nav-item d-none d-sm-inline-block">
                  <a href="index3.html" className="nav-link">
                    Home
                  </a>
                </li>
                <li className="nav-item d-none d-sm-inline-block">
                  <a href="#" className="nav-link">
                    Contact
                  </a>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown4"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Help
                  </a>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown4"
                  >
                    <a className="dropdown-item" href="#">
                      FAQ
                    </a>
                    <a className="dropdown-item" href="#">
                      Support
                    </a>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item" href="#">
                      Contact
                    </a>
                  </div>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item"></li>
                <li className="nav-item"></li>
                <li className="nav-item"></li>
              </>
            )}
          </ul>

          <form
            className="form-inline ml-3"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div className="input-group input-group-sm">
              <input
                className="form-control form-control-navbar"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={dateTime.dateTime}
                readOnly
              />
              <div className="input-group-append">
                <div className="btn btn-navbar">
                  <i className="ri-time-line"></i>
                </div>
              </div>
            </div>
          </form>

          <ul className="navbar-nav ml-auto">
            {isAuth ? (
              <>
                <div className="btn-group">
                  <button type="button" className="btn btn-primary">
                    Sesión iniciada como {userData.username}
                  </button>
                  <button
                    type="button"
                    className="btn btn-default dropdown-toggle dropdown-icon"
                    data-toggle="dropdown"
                  >
                    <span className="sr-only">Toggle Dropdown</span>
                  </button>
                  <div className="dropdown-menu" role="menu">
                    <a className="dropdown-item" href="#">
                      Action
                    </a>
                    <a className="dropdown-item" href="#">
                      Another action
                    </a>
                    <a className="dropdown-item" href="#">
                      Something else here
                    </a>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item" onClick={salir}>
                      Salir
                    </a>
                  </div>
                </div>
              </>
            ) : (
              <div className="btn-group nav-item">
                <Link
                  to={"/register"}
                  type="button"
                  className="btn btn-primary"
                >
                  Registrarse <i className="ri-user-add-line"></i>
                </Link>
                <Link to={"/login"} type="button" className="btn btn-secondary">
                  Entrar <i className="ri-login-box-line"></i>
                </Link>
              </div>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
